import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { exists } from '../utils/fs.js';
import { logger } from '../utils/logger.js';

/**
 * Configuration object interface
 */
export type UsagiConfig = {
  schema?: {
    url?: string;
    cacheDir?: string;
    filter?: string[];
  };
  types?: {
    outputDir?: string;
    prefix?: string;
    suffix?: string;
    banner?: string;
    singleFile?: boolean;
    singleFileName?: string;
    fileNaming?: 'kebab' | 'camel' | 'pascal' | 'snake';
    prettier?: boolean;
  };
  hooks?: {
    beforeGenerate?: () => Promise<void> | void;
    afterGenerate?: (result: any) => Promise<void> | void;
  };
  [key: string]: any;
}

/**
 * Merge multiple configuration objects
 * 
 * @param configs Array of configuration objects
 * @returns Merged configuration
 */
export function mergeConfigs(configs: UsagiConfig[]): UsagiConfig {
  const result: UsagiConfig = {};
  
  for (const config of configs) {
    for (const [key, value] of Object.entries(config)) {
      if (value === null || value === undefined) {
        continue;
      }
      
      if (typeof value === 'object' && !Array.isArray(value)) {
        result[key] = {
          ...(result[key] || {}),
          ...value
        };
      } else {
        result[key] = value;
      }
    }
  }
  
  return result;
}

/**
 * Load configuration from a file
 * 
 * @param configPath Path to the configuration file
 * @returns Loaded configuration object or null if loading failed
 */
export async function loadConfig(configPath: string): Promise<UsagiConfig | null> {
  try {
    const resolvedPath = path.resolve(process.cwd(), configPath);
    
    if (!await exists(resolvedPath)) {
      throw new Error(`Configuration file not found: ${resolvedPath}`);
    }
    
    if (resolvedPath.endsWith('.js') || resolvedPath.endsWith('.mjs')) {
      const module = await import(resolvedPath);
      
      let configurations: UsagiConfig[] = [];
      
      if (Array.isArray(module.default)) {
        configurations = module.default;
      } else if (typeof module.default === 'object') {
        configurations = [module.default];
      } else if (typeof module.configs === 'object' && Array.isArray(module.configs)) {
        configurations = module.configs;
      } else {
        throw new Error('Invalid configuration format: Expected default export as object or array');
      }
      
      return mergeConfigs(configurations);
    } else if (resolvedPath.endsWith('.json')) {
      const fileContent = await readFile(resolvedPath, 'utf8');
      return JSON.parse(fileContent);
    } else {
      throw new Error(`Unsupported configuration file format: ${path.extname(resolvedPath)}`);
    }
  } catch (error) {
    logger.error('Error loading configuration:', error);
    return null;
  }
}

/**
 * Find and load the nearest configuration file
 * 
 * @param startDir Directory to start searching from
 * @param configNames Possible configuration file names
 * @returns Loaded configuration object or null if not found
 */
export async function findConfig(
  startDir: string = process.cwd(),
  configNames: string[] = ['usagi.config.js', 'usagi.config.mjs', 'usagi.config.json']
): Promise<UsagiConfig | null> {
  let currentDir = startDir;
  
  while (true) {
    for (const configName of configNames) {
      const configPath = path.join(currentDir, configName);
      
      if (await exists(configPath)) {
        return await loadConfig(configPath);
      }
    }
    
    const parentDir = path.dirname(currentDir);
    
    if (parentDir === currentDir) {
      break;
    }
    
    currentDir = parentDir;
  }
  
  return null;
}
