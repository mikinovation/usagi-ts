import { test, expect, mock, describe } from 'bun:test';
import { generateYaml } from './yaml';
import { dump } from 'js-yaml';
import defu from 'defu';

const resolveConfigMock = mock((configs, env) => 
  configs.map(c => typeof c === 'function' ? c(env) : c)
);

const dumpMock = mock((obj) => `mocked-yaml-output: ${JSON.stringify(obj)}`);

mock.module('./define-config', () => ({
  resolveConfig: resolveConfigMock
}));

mock.module('js-yaml', () => ({
  dump: dumpMock
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
    
    test('should correctly merge configs with defu', () => {
      const configs = [
        { 
          language: 'en-US',
          reviews: {
            profile: 'assertive',
            auto_review: {
              enabled: false
            }
          }
        },
        {
          reviews: {
            auto_review: {
              enabled: true,
              drafts: true
            }
          }
        }
      ];
      
      generateYaml(configs);
      
      const expectedMergedConfig = {
        language: 'en-US',
        reviews: {
          profile: 'assertive',
          auto_review: {
            enabled: false, // Not overridden by true in second config due to defu behavior
            drafts: true
          }
        }
      };
      
      expect(dump).toHaveBeenCalledWith(expectedMergedConfig);
    });
    
    test('should use process.env by default if no env is provided', () => {
      const configs = [
        { language: 'en-US' },
        { early_access: true }
      ];
      
      const resolveConfigMock = mock((configs) => configs);
      
      mock.module('./define-config', () => ({
        resolveConfig: resolveConfigMock
      }));
      
      generateYaml(configs);
      
      expect(resolveConfigMock).toHaveBeenCalledWith(configs, process.env);
    });
  });
});
