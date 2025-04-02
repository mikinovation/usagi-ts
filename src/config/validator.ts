

import Ajv from 'ajv';
import { UsagiConfig } from './loader.js';
import { logger } from '../utils/logger.js';

/**
 * Validation result interface
 */
export interface ValidationResult {
  valid: boolean;
  errors: Array<{
    message: string;
    path: string;
  }>;
}

// Configuration schema
const configSchema = {
  type: 'object',
  properties: {
    schema: {
      type: 'object',
      properties: {
        url: { type: 'string', format: 'uri' },
        cacheDir: { type: 'string' },
        filter: {
          type: 'array',
          items: { type: 'string' }
        }
      },
      additionalProperties: false
    },
    types: {
      type: 'object',
      properties: {
        outputDir: { type: 'string' },
        prefix: { type: 'string' },
        suffix: { type: 'string' },
        banner: { type: 'string' },
        singleFile: { type: 'boolean' },
        singleFileName: { type: 'string' },
        fileNaming: { 
          type: 'string',
          enum: ['kebab', 'camel', 'pascal', 'snake']
        },
        prettier: { type: 'boolean' }
      },
      additionalProperties: false
    },
    hooks: {
      type: 'object',
      properties: {
        beforeGenerate: { },
        afterGenerate: { }
      },
      additionalProperties: false
    }
  },
  additionalProperties: true
};

/**
 * Validate configuration against schema
 * 
 * @param config Configuration object to validate
 * @param schema Optional schema to validate against
 * @returns Validation result
 */
export async function validateConfig(
  config: UsagiConfig, 
  schema?: Record<string, any>
): Promise<ValidationResult> {
  try {
    const ajv = new Ajv({
      allErrors: true,
      strictSchema: false
    });
    
    // Add format validators
    ajv.addFormat('uri', {
      type: 'string',
      validate: (uri: string) => {
        try {
          new URL(uri);
          return true;
        } catch {
          return false;
        }
      }
    });
    
    // Use provided schema or default config schema
    const validator = ajv.compile(schema || configSchema);
    
    const valid = validator(config);
    
    if (!valid && validator.errors) {
      return {
        valid: false,
        errors: validator.errors.map(err => ({
          message: err.message || 'Unknown error',
          path: err.instancePath || '/'
        }))
      };
    }
    
    return {
      valid: true,
      errors: []
    };
  } catch (error) {
    logger.error('Error validating configuration:', error);
    return {
      valid: false,
      errors: [{
        message: error instanceof Error ? error.message : 'Unknown error',
        path: '/'
      }]
    };
  }
}
