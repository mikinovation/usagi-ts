import { CodeRabbitConfig } from './types';
import { UsagiExtendedConfig } from './enhanced-types';

export function validateConfig(config: Partial<CodeRabbitConfig> | UsagiExtendedConfig): void {
  const extendedConfig = config as UsagiExtendedConfig;
  if (extendedConfig.version !== undefined && typeof extendedConfig.version !== 'number') {
    throw new Error('Version must be a number');
  }
}
