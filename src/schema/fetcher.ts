import { mkdir, writeFile, readFile, exists as fileExists } from 'node:fs/promises';
import path from 'node:path';
import { logger } from '../utils/logger.js';

/**
 * Fetch JSON schema from URL or local file path
 * 
 * @param schemaPath URL or file path to the schema
 * @returns The schema object or null if fetching failed
 */
export async function fetchSchema(schemaPath: string): Promise<Record<string, any> | null> {
  try {
    if (schemaPath.startsWith('http://') || schemaPath.startsWith('https://')) {
      const response = await fetch(schemaPath);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch schema: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } else {
      const filePath = path.resolve(process.cwd(), schemaPath);
      
      if (!await fileExists(filePath)) {
        throw new Error(`Schema file not found: ${filePath}`);
      }
      
      const fileContent = await readFile(filePath, 'utf8');
      return JSON.parse(fileContent);
    }
  } catch (error) {
    logger.error('Error fetching schema:', error);
    return null;
  }
}

/**
 * Cache schema to a local file
 * 
 * @param schema The schema object to cache
 * @param cacheDir Directory to store the cached schema
 * @returns Path to the cached schema file or null if caching failed
 */
export async function cacheSchema(
  schema: Record<string, any>, 
  cacheDir: string = './.usagi-cache'
): Promise<string | null> {
  try {
    await mkdir(cacheDir, { recursive: true });
    
    const cachePath = path.join(cacheDir, `schema-${Date.now()}.json`);
    
    await writeFile(cachePath, JSON.stringify(schema, null, 2));
    
    return cachePath;
  } catch (error) {
    logger.error('Error caching schema:', error);
    return null;
  }
}
