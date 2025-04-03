import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { fetchSchema } from './schema/fetcher';
import { parseSchema } from './schema/parser';
import { generateTypes } from './schema/generator';
import { loadConfig } from './config/loader';
import { validateConfig } from './config/validator';
import { logger } from './utils/logger';
import { mkdir, writeFile, readFile, access } from 'node:fs/promises';
import path from 'node:path';

const DEFAULT_SCHEMA_URL = 'https://storage.googleapis.com/coderabbit_public_assets/schema.v2.json';

const program = new Command();

program
  .name('usagi-ts')
  .description('Generate TypeScript types from CodeRabbit schema with eslint-style flat config')
  .version('0.1.0');

program
  .command('init')
  .description('Initialize a new usagi-ts configuration')
  .option('-d, --dir <directory>', 'Directory to initialize in', '.')
  .action(async (options) => {
    const spinner = ora('Initializing usagi-ts...').start();
    try {
      const targetDir = path.resolve(process.cwd(), options.dir);
      
      const configPath = path.join(targetDir, 'usagi.config.js');
      try {
        await access(configPath);
        spinner.info(`Config file already exists at ${chalk.blue(configPath)}`);
      } catch {
        const templatePath = path.resolve(
          // @ts-ignore
          path.dirname(import.meta.url.pathname || ''),
          '../templates/config.js.template'
        );
        
        const template = await readFile(templatePath, 'utf8');
        await writeFile(configPath, template);
        spinner.succeed(`Created config file at ${chalk.green(configPath)}`);
      }
      
      const typesDir = path.join(targetDir, 'types');
      try {
        await access(typesDir);
        spinner.info(`Types directory already exists at ${chalk.blue(typesDir)}`);
      } catch {
        await mkdir(typesDir, { recursive: true });
        spinner.succeed(`Created types directory at ${chalk.green(typesDir)}`);
      }
      
      logger.success('Initialization complete!');
    } catch (error) {
      spinner.fail('Initialization failed');
      logger.error('Error during initialization:', error);
      process.exit(1);
    }
  });

program
  .command('generate')
  .description('Generate TypeScript types from schema')
  .option('-s, --schema <url>', 'Schema URL', DEFAULT_SCHEMA_URL)
  .option('-o, --output <directory>', 'Output directory for generated types', './types')
  .option('-c, --config <path>', 'Path to config file', './usagi.config.js')
  .option('-f, --force', 'Force overwrite existing files', false)
  .action(async (options) => {
    const spinner = ora('Generating TypeScript types...').start();
    
    try {
      spinner.text = 'Loading configuration...';
      const config = await loadConfig(options.config);
      
      if (!config) {
        spinner.fail('Failed to load configuration');
        return;
      }
      
      spinner.text = 'Validating configuration...';
      const isValid = await validateConfig(config);
      
      if (!isValid) {
        spinner.fail('Invalid configuration');
        return;
      }
      
      spinner.text = `Fetching schema from ${options.schema}...`;
      const schema = await fetchSchema(options.schema);
      
      if (!schema) {
        spinner.fail('Failed to fetch schema');
        return;
      }
      
      spinner.text = 'Parsing schema...';
      const parsedSchema = parseSchema(schema);
      
      spinner.text = 'Generating TypeScript types...';
      const outputPath = path.resolve(process.cwd(), options.output);
      
      await mkdir(outputPath, { recursive: true });
      
      const result = await generateTypes(parsedSchema, {
        outputPath,
        ...config,
        force: options.force
      });
      
      spinner.succeed(`Generated ${chalk.green(result.fileCount)} TypeScript files in ${chalk.blue(outputPath)}`);
      logger.info(`Files generated: ${result.files.join(', ')}`);
      
    } catch (error) {
      spinner.fail('Generation failed');
      logger.error('Error during type generation:', error);
      process.exit(1);
    }
  });

program
  .command('validate')
  .description('Validate configuration against schema')
  .option('-c, --config <path>', 'Path to config file', './usagi.config.js')
  .option('-s, --schema <url>', 'Schema URL', DEFAULT_SCHEMA_URL)
  .action(async (options) => {
    const spinner = ora('Validating configuration...').start();
    
    try {
      const config = await loadConfig(options.config);
      
      if (!config) {
        spinner.fail('Failed to load configuration');
        return;
      }
      
      spinner.text = `Fetching schema from ${options.schema}...`;
      const schema = await fetchSchema(options.schema);
      
      if (!schema) {
        spinner.fail('Failed to fetch schema');
        return;
      }
      
      spinner.text = 'Validating configuration against schema...';
      const validationResult = await validateConfig(config, schema);
      
      if (validationResult.valid) {
        spinner.succeed('Configuration is valid!');
      } else {
        spinner.fail('Configuration is invalid');
        logger.error('Validation errors:');
        validationResult.errors.forEach((err, index) => {
          logger.error(`${index + 1}. ${err.message} at ${err.path}`);
        });
        process.exit(1);
      }
      
    } catch (error) {
      spinner.fail('Validation failed');
      logger.error('Error during validation:', error);
      process.exit(1);
    }
  });

program.parse();

if (process.argv.length <= 2) {
  program.help();
}
