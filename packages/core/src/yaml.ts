import { dump } from 'js-yaml';
import { UsagiExtendedConfigItem } from './enhanced-types';
import { resolveExtendedConfig } from './config-resolver';

/**
 * Generates YAML configuration from flat-config style config items
 * @param {UsagiExtendedConfigItem|UsagiExtendedConfigItem[]} configs - Configuration items
 * @param {Record<string, string>} env - Environment variables
 * @returns {string} Generated YAML configuration
 */
export function generateYaml(
  configs: UsagiExtendedConfigItem | UsagiExtendedConfigItem[],
  env = process.env
): string {
  const mergedConfig = resolveExtendedConfig(configs, env);
  return dump(mergedConfig);
}
