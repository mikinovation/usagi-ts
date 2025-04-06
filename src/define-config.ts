import { CodeRabbitConfig } from './types';
import { validateConfig } from './validate';

export type UsagiConfigItem = 
  | Partial<CodeRabbitConfig>
  | ((env: Record<string, string>) => Partial<CodeRabbitConfig>);

export function defineUsagiConfig(configs: UsagiConfigItem[]) {
  return configs;
}

export function resolveConfig(configs: UsagiConfigItem[], env = process.env) {
  const resolvedConfigs = configs.map(config => {
    if (typeof config === 'function') {
      return config(env);
    }
    return config;
  });
  
  resolvedConfigs.forEach(validateConfig);
  
  return resolvedConfigs;
}
