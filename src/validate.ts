import { CodeRabbitConfig } from './types';

export function validateConfig(config: Partial<CodeRabbitConfig>): void {
  if (config.version && typeof config.version !== 'number') {
    throw new Error('Version must be a number');
  }
}
