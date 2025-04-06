import { test, expect, mock, describe } from 'bun:test';
import { generateYaml } from './yaml';
import defu from 'defu';

mock.module('./define-config', () => ({
  resolveConfig: mock((configs, env) => configs.map(c => 
    typeof c === 'function' ? c(env) : c
  ))
}));

mock.module('js-yaml', () => ({
  dump: mock((obj) => `mocked-yaml-output: ${JSON.stringify(obj)}`)
}));

describe('yaml', () => {
  describe('generateYaml', () => {
    test('should generate YAML from config objects', () => {
      const configs = [
        { language: 'en-US' },
        { reviews: { profile: 'chill' } }
      ];
      
      const result = generateYaml(configs);
      
      const expectedMergedConfig = defu(
        { language: 'en-US' }, 
        { reviews: { profile: 'chill' } }
      );
      
      expect(result).toContain(JSON.stringify(expectedMergedConfig));
    });
    
    test('should resolve function configs with environment', () => {
      const mockEnv = { NODE_ENV: 'test' };
      
      const configs = [
        { language: 'en-US' },
        (env: Record<string, string>) => ({ 
          env: env.NODE_ENV 
        })
      ];
      
       mock.module('./define-config', () => ({
        resolveConfig: mock(() => [
        { language: 'en-US' },
        { env: 'test' }
        ])
      }))
      
      const result = generateYaml(configs, mockEnv);
      
      expect(result).toContain('language');
      expect(result).toContain('en-US');
      expect(result).toContain('env');
      expect(result).toContain('test');
    });
    
    test('should use process.env by default if no env is provided', () => {
      const configs = [
        { language: 'en-US' },
        { early_access: true }
      ];
      
      const resolveConfigMock = mock((configs) => configs);
      mock.module('./define-config', () => ({
        resolveConfig: resolveConfigMock
      }))
      
      generateYaml(configs);
      
      expect(resolveConfigMock).toHaveBeenCalledWith(configs, process.env);
    });
  });
});
