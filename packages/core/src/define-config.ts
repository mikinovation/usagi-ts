import { UsagiExtendedConfigItem } from './enhanced-types';

/**
 * Defines a flat-config style configuration for usagi-ts
 * Supports direct module imports similar to ESLint flat config
 * @param {UsagiExtendedConfigItem|UsagiExtendedConfigItem[]} configs - Configuration items
 * @returns {UsagiExtendedConfigItem|UsagiExtendedConfigItem[]} The original configuration items
 */
export function defineUsagiConfig(
  configs: UsagiExtendedConfigItem | UsagiExtendedConfigItem[]
) {
  return configs;
}
