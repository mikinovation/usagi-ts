import path from 'path';
import glob from 'fast-glob';
import { UsagiConfig } from './loader';

/**
 * Resolve relative paths in configuration to absolute paths
 * 
 * @param config Configuration object with relative paths
 * @param baseDir Base directory to resolve paths from
 * @returns Configuration with resolved absolute paths
 */
export function resolveConfigPaths(
  config: UsagiConfig, 
  baseDir: string = process.cwd()
): UsagiConfig {
  const resolvedConfig = { ...config };
  
  // Resolve schema cache directory
  if (resolvedConfig.schema?.cacheDir) {
    resolvedConfig.schema.cacheDir = path.resolve(baseDir, resolvedConfig.schema.cacheDir);
  }
  
  // Resolve types output directory
  if (resolvedConfig.types?.outputDir) {
    resolvedConfig.types.outputDir = path.resolve(baseDir, resolvedConfig.types.outputDir);
  }
  
  return resolvedConfig;
}

/**
 * Expand glob patterns in configuration
 * 
 * @param config Configuration object with glob patterns
 * @param baseDir Base directory to resolve patterns from
 * @returns Configuration with expanded glob patterns
 */
export async function expandConfigGlobs(
  config: UsagiConfig,
  baseDir: string = process.cwd()
): Promise<UsagiConfig> {
  const expandedConfig = { ...config };
  
  // Expand filter patterns
  if (expandedConfig.schema?.filter && Array.isArray(expandedConfig.schema.filter)) {
    const patterns = expandedConfig.schema.filter;
    
    // Expand glob patterns to actual file names
    const matchedFiles = await glob(patterns, {
      cwd: baseDir,
      onlyFiles: true,
      absolute: false
    });
    
    // Replace filter with expanded file list
    expandedConfig.schema.filter = matchedFiles;
  }
  
  return expandedConfig;
}

/**
 * Apply configuration defaults
 * 
 * @param config Configuration object
 * @returns Configuration with defaults applied
 */
export function applyConfigDefaults(config: UsagiConfig): UsagiConfig {
  const withDefaults: UsagiConfig = { ...config };
  
  withDefaults.schema = {
    url: 'https://storage.googleapis.com/coderabbit_public_assets/schema.v2.json',
    cacheDir: './.usagi-cache',
    ...withDefaults.schema
  };
  
  withDefaults.types = {
    outputDir: './types',
    fileNaming: 'kebab',
    prettier: true,
    ...withDefaults.types
  };
  
  withDefaults.hooks = withDefaults.hooks || {};
  
  return withDefaults;
}

/**
 * Prepare configuration for use
 * 
 * @param config Raw configuration object
 * @param baseDir Base directory
 * @returns Prepared configuration
 */
export async function prepareConfig(
  config: UsagiConfig,
  baseDir: string = process.cwd()
): Promise<UsagiConfig> {
  let preparedConfig = applyConfigDefaults(config);
  
  preparedConfig = resolveConfigPaths(preparedConfig, baseDir);
  
  preparedConfig = await expandConfigGlobs(preparedConfig, baseDir);
  
  return preparedConfig;
}
