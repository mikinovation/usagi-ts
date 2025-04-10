import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { resolve, join } from 'path';
import { UsagiExtendedConfig } from './enhanced-types';

/**
 * Discovers and loads a configuration package by name
 * @param {string} packageName - Name of the package to load
 * @returns {Promise<UsagiExtendedConfig|null>} The loaded configuration or null if not found
 */
export async function discoverPackage(
  packageName: string
): Promise<UsagiExtendedConfig | null> {
  try {
    // Try to load from node_modules
    const packagePath = require.resolve(packageName);
    const packageConfig = await import(packagePath);
    return packageConfig.default || packageConfig;
  } catch (e) {
    try {
      // Try to load from local path
      const localPath = resolve(process.cwd(), packageName);
      if (existsSync(localPath)) {
        const localConfig = await import(`file://${localPath}`);
        return localConfig.default || localConfig;
      }
    } catch (e) {
      console.warn(`Package not found: ${packageName}`);
    }
    return null;
  }
}

/**
 * Lists all available configuration packages in node_modules
 * @returns {string[]} Array of available package names
 */
export function listAvailablePackages(): string[] {
  const packages: string[] = [];
  const nodeModulesPath = resolve(process.cwd(), 'node_modules');
  
  if (!existsSync(nodeModulesPath)) {
    return packages;
  }
  
  /**
   * Search a directory recursively for usagi-config packages
   * @param {string} dirPath - Directory path to search
   * @param {string} prefix - Prefix for package names (for scoped packages)
   */
  function searchDir(dirPath: string, prefix: string = '') {
    try {
      const entries = readdirSync(dirPath);
      
      for (const entry of entries) {
        const fullPath = join(dirPath, entry);
        
        if (statSync(fullPath).isDirectory()) {
          if (entry.startsWith('@')) {
            // Org scope directory
            searchDir(fullPath, `${entry}/`);
          } else if (entry.includes('usagi-config')) {
            // Found a config package
            packages.push(`${prefix}${entry}`);
          } else if (prefix) {
            // Check inside org packages
            const pkgJsonPath = join(fullPath, 'package.json');
            if (existsSync(pkgJsonPath)) {
              try {
                const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf8'));
                if (pkgJson.name && pkgJson.name.includes('usagi-config')) {
                  packages.push(`${prefix}${entry}`);
                }
              } catch (e) {
                // Ignore JSON parse errors
              }
            }
          }
        }
      }
    } catch (e) {
      // Ignore directory read errors
    }
  }
  
  searchDir(nodeModulesPath);
  return packages;
}

/**
 * Finds all configuration files in a package directory
 * @param {string} packageRoot - Root directory of the package
 * @returns {string[]} Array of configuration file paths
 */
export function findConfigFilesInPackage(packageRoot: string): string[] {
  const configFiles: string[] = [];
  
  /**
   * Recursively scan a directory for configuration files
   * @param {string} dirPath - Directory path to scan
   */
  function scanDir(dirPath: string) {
    try {
      const entries = readdirSync(dirPath);
      
      for (const entry of entries) {
        const fullPath = join(dirPath, entry);
        
        if (statSync(fullPath).isDirectory()) {
          scanDir(fullPath);
        } else if (
          entry === 'usagi.config.ts' || 
          entry === 'usagi.config.js' ||
          entry.endsWith('.usagi.ts') ||
          entry.endsWith('.usagi.js')
        ) {
          configFiles.push(fullPath);
        }
      }
    } catch (e) {
      // Ignore directory read errors
    }
  }
  
  scanDir(packageRoot);
  return configFiles;
}

/**
 * Extracts instruction sets from a configuration
 * @param {UsagiExtendedConfig} config - Configuration to extract instruction sets from
 * @returns {Record<string, string>} Map of instruction set names to their instructions
 */
export function extractInstructionSets(config: UsagiExtendedConfig): Record<string, string> {
  const result: Record<string, string> = {};
  
  if (config.instruction_sets) {
    for (const [name, set] of Object.entries(config.instruction_sets)) {
      if (typeof set.instructions === 'string') {
        result[name] = set.instructions;
      } else {
        // For function-based instructions, store a placeholder
        result[name] = `[Function: ${name}]`;
      }
    }
  }
  
  return result;
}

/**
 * Extracts rule collections from a configuration
 * @param {UsagiExtendedConfig} config - Configuration to extract rule collections from
 * @returns {Record<string, string[]>} Map of collection names to their rules
 */
export function extractRuleCollections(config: UsagiExtendedConfig): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  
  if (config.rule_collections) {
    for (const [name, collection] of Object.entries(config.rule_collections)) {
      result[name] = collection.rules;
    }
  }
  
  return result;
}
