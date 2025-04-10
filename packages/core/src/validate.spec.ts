
import { test, expect, describe } from 'bun:test';
import { validateConfig } from './validate';
import { CodeRabbitConfig } from './types';

describe('validate', () => {
  describe('validateConfig', () => {
    test('should pass with valid config', () => {
      const config: Partial<CodeRabbitConfig> = {
        language: 'en-US',
        tone_instructions: 'Be friendly',
        early_access: false,
        reviews: {
          profile: 'chill',
          auto_review: {
            enabled: true
          }
        }
      };
      
      // If validation passes, it should not throw an error
      expect(() => validateConfig(config)).not.toThrow();
    });
    
    test('should throw error when version is not a number', () => {
      const config = {
        version: '2' as any, // Type casting to simulate incorrect type
      };
      
      expect(() => validateConfig(config)).toThrow('Version must be a number');
    });
    
    test('should not throw for empty config', () => {
      const config = {};
      
      expect(() => validateConfig(config)).not.toThrow();
    });
    
    test('should not throw when version is a valid number', () => {
      const config = {
        version: 2
      };
      
      expect(() => validateConfig(config)).not.toThrow();
    });
  });
});
