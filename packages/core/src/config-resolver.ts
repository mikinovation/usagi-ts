import defu from 'defu';
import { UsagiExtendedConfig, UsagiExtendedConfigItem } from './enhanced-types';
import { CodeRabbitConfig } from './types';
import { validateConfig } from './validate';

/**
 * Resolves extended configuration with flat-config style processing
 */
export function resolveExtendedConfig(
  configs: UsagiExtendedConfigItem | UsagiExtendedConfigItem[],
  env = process.env
): Partial<CodeRabbitConfig> {
  const flattenedConfigs = flattenConfigs(configs, env);

  flattenedConfigs.forEach(validateConfig);

  const mergedConfig = mergeConfigs(flattenedConfigs);
  
  return processInstructionSets(mergedConfig);
}

/**
 * Recursively flattens nested config arrays and resolves function configs
 */
function flattenConfigs(
  configItem: UsagiExtendedConfigItem | UsagiExtendedConfigItem[], 
  env = process.env
): UsagiExtendedConfig[] {
  if (Array.isArray(configItem)) {
    return configItem.flatMap(item => flattenConfigs(item, env));
  } else if (typeof configItem === 'function') {
    const resolvedConfig = configItem(env as any);
    
    if (Array.isArray(resolvedConfig)) {
      return flattenConfigs(resolvedConfig, env);
    } else {
      return [resolvedConfig];
    }
  } else {
    // Return regular config objects as a single-item array
    return [configItem];
  }
}

/**
 * Merges an array of configurations using defu
 * Later configs take precedence over earlier ones when merging
 */
function mergeConfigs(configs: UsagiExtendedConfig[]): UsagiExtendedConfig {
  return configs.reduce((result, config) => {
    return defu(result, config);
  }, {} as UsagiExtendedConfig);
}

/**
 * Processes instruction sets and enhanced path instructions
 */
function processInstructionSets(config: UsagiExtendedConfig): Partial<CodeRabbitConfig> {
  const { 
    instruction_sets, 
    enhanced_path_instructions, 
    rule_collections,
    ...standardConfig 
  } = config;
  
  if (instruction_sets && enhanced_path_instructions) {
    if (!standardConfig.reviews) {
      standardConfig.reviews = {};
    }
    
    const pathInstructions = standardConfig.reviews.path_instructions || [];
    
    for (const enhancedInst of enhanced_path_instructions) {
      if (typeof enhancedInst.instructions === 'string') {
        pathInstructions.push({
          path: enhancedInst.path,
          instructions: enhancedInst.instructions
        });
      } else if (typeof enhancedInst.instructions === 'object' && enhancedInst.instructions.use) {
        const instructionSet = instruction_sets[enhancedInst.instructions.use];
        
        if (instructionSet) {
          const processedInstructions = processTemplate(
            instructionSet.instructions,
            enhancedInst.instructions.with || {}
          );
          
          pathInstructions.push({
            path: enhancedInst.path,
            instructions: processedInstructions
          });
        }
      }
    }
    
    standardConfig.reviews.path_instructions = pathInstructions;
  }
  
  if (rule_collections) {
    if (!standardConfig.reviews) {
      standardConfig.reviews = {};
    }
    
    if (!standardConfig.reviews.tools) {
      standardConfig.reviews.tools = {};
    }
    
    const astGrepConfig = standardConfig.reviews.tools['ast-grep'] || {};
    const packages = astGrepConfig.packages || [];
    const ruleDirs = astGrepConfig.rule_dirs || [];
    
    for (const collection of Object.values(rule_collections)) {
      if (collection.packages) {
        packages.push(...collection.packages);
      }
      
      if (collection.rules) {
        console.log(`Processing ${collection.rules.length} rules from collection`);
      }
    }
    
    standardConfig.reviews.tools['ast-grep'] = {
      ...astGrepConfig,
      packages: [...new Set(packages)],
      rule_dirs: [...new Set(ruleDirs)]
    };
  }
  
  return standardConfig;
}

/**
 * Processes a template string with variable substitution and conditionals
 */
function processTemplate(template: string, params: Record<string, string>): string {
  let result = template;
  
  for (const [key, value] of Object.entries(params)) {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    result = result.replace(regex, value);
  }
  
  const conditionalRegex = /{{#if\s+([^}]+)}}([\s\S]*?){{\/if}}/g;
  result = result.replace(conditionalRegex, (_match, condition, content) => {
    const conditionValue = params[condition];
    return conditionValue ? content : '';
  });
  
  return result;
}
