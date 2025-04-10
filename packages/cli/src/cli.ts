#!/usr/bin/env bun
import { existsSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { generateYaml } from '@usagi-ts/core';

async function main() {
  try {
    const cwd = process.cwd();
    const configPath = resolve(cwd, 'usagi.config.ts');
    
    if (!existsSync(configPath)) {
      console.error('Error: Could not find usagi.config.ts');
      process.exit(1);
    }
    
    const configModule = await import(`file://${configPath}`);
    const config = configModule.default;
    
    if (!Array.isArray(config)) {
      console.error('Error: Config must export an array of configurations');
      process.exit(1);
    }
    
    const yaml = generateYaml(config);
    
    const outputPath = resolve(cwd, '.coderabbit.yml');
    writeFileSync(outputPath, yaml);
    
    console.log(`Successfully generated .coderabbit.yml`);
  } catch (error) {
    console.error('Error generating YAML config:', error);
    process.exit(1);
  }
}

main();
