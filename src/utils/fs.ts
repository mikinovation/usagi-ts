import { 
  access, mkdir, readFile, writeFile, 
  rm, copyFile, cp, stat 
} from 'node:fs/promises';
import path from 'node:path';

/**
 * Check if a file or directory exists
 * 
 * @param filePath Path to check
 * @returns True if the file or directory exists, false otherwise
 */
export async function exists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Create a directory if it doesn't exist
 * 
 * @param dirPath Directory path
 * @returns True if the directory was created or already exists, false otherwise
 */
export async function ensureDir(dirPath: string): Promise<boolean> {
  try {
    await mkdir(dirPath, { recursive: true });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Read a JSON file
 * 
 * @param filePath Path to the JSON file
 * @returns Parsed JSON object or null if reading failed
 */
export async function readJsonFile<T = any>(filePath: string): Promise<T | null> {
  try {
    const fileContent = await readFile(filePath, 'utf8');
    return JSON.parse(fileContent) as T;
  } catch (error) {
    return null;
  }
}

/**
 * Write a JSON file
 * 
 * @param filePath Path to the JSON file
 * @param data Data to write
 * @param pretty Whether to format the JSON with indentation
 * @returns True if the file was written successfully, false otherwise
 */
export async function writeJsonFile(
  filePath: string, 
  data: any, 
  pretty: boolean = true
): Promise<boolean> {
  try {
    const content = pretty 
      ? JSON.stringify(data, null, 2) 
      : JSON.stringify(data);
    
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, content, 'utf8');
    
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Delete a file or directory
 * 
 * @param filePath Path to delete
 * @returns True if the file or directory was deleted successfully, false otherwise
 */
export async function remove(filePath: string): Promise<boolean> {
  try {
    await rm(filePath, { recursive: true, force: true });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Copy a file or directory
 * 
 * @param source Source path
 * @param destination Destination path
 * @returns True if the file or directory was copied successfully, false otherwise
 */
export async function copy(source: string, destination: string): Promise<boolean> {
  try {
    const stats = await stat(source);
    
    if (stats.isDirectory()) {
      await cp(source, destination, { recursive: true });
    } else {
      // Ensure the directory exists
      await mkdir(path.dirname(destination), { recursive: true });
      await copyFile(source, destination);
    }
    
    return true;
  } catch (error) {
    return false;
  }
}
