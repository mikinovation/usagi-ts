import { logger } from '../utils/logger.js';

/**
 * Interface representing the parsed schema structure
 */
export type ParsedSchema = {
  title: string;
  description?: string;
  version?: string;
  definitions: Record<string, any>;
  rootTypes: string[];
  mainSchema: Record<string, any>;
}

/**
 * Parse a JSON schema into a more usable structure
 * 
 * @param schema The raw JSON schema object
 * @returns Parsed schema structure or null if parsing failed
 */
export function parseSchema(schema: Record<string, any>): ParsedSchema | null {
  try {
    if (!schema || typeof schema !== 'object') {
      throw new Error('Invalid schema format: Schema must be an object');
    }

    const title = schema.title || 'UnknownSchema';
    const description = schema.description;
    const version = schema.$schema;
    
    const definitions = schema.definitions || {};
    
    const rootTypes = Object.keys(definitions);
    
    return {
      title,
      description,
      version,
      definitions,
      rootTypes,
      mainSchema: schema
    };
  } catch (error) {
    logger.error('Error parsing schema:', error);
    return null;
  }
}

/**
 * Extract a specific definition from the schema
 * 
 * @param schema The parsed schema
 * @param definitionName The name of the definition to extract
 * @returns The definition object or null if not found
 */
export function extractDefinition(
  schema: ParsedSchema, 
  definitionName: string
): Record<string, any> | null {
  try {
    if (!schema.definitions[definitionName]) {
      throw new Error(`Definition not found: ${definitionName}`);
    }
    
    return schema.definitions[definitionName];
  } catch (error) {
    logger.error('Error extracting definition:', error);
    return null;
  }
}

/**
 * Filter schema to only include specified definitions
 * 
 * @param schema The parsed schema
 * @param definitionNames Array of definition names to include
 * @returns A new schema with only the specified definitions
 */
export function filterSchema(
  schema: ParsedSchema, 
  definitionNames: string[]
): ParsedSchema {
  const filteredDefinitions: Record<string, any> = {};
  
  definitionNames.forEach(name => {
    if (schema.definitions[name]) {
      filteredDefinitions[name] = schema.definitions[name];
    }
  });
  
  return {
    ...schema,
    definitions: filteredDefinitions,
    rootTypes: definitionNames.filter(name => schema.definitions[name] !== undefined)
  };
}
