import { dump } from 'js-yaml';
import { CodeRabbitConfig } from './types';
import { resolveConfig, UsagiConfigItem } from './define-config';
import { deepMerge } from './utils';

export function generateYaml(configs: UsagiConfigItem[], env = process.env) {
  const resolvedConfigs = resolveConfig(configs, env);
  
  const mergedConfig = mergeConfigs(resolvedConfigs);
  
  return dump(mergedConfig);
}

function mergeConfigs(configs: Partial<CodeRabbitConfig>[]) {
  return configs.reduce((result, config) => {
    return deepMerge(result, config);
  }, {} as CodeRabbitConfig);
}
