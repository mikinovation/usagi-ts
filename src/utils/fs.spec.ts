import { test, expect, mock, describe } from 'bun:test';
import { 
  exists, ensureDir, readJsonFile, writeJsonFile, 
  remove, copy 
} from './fs';
import { mkdir } from 'node:fs/promises';

mock.module('node:fs/promises', () => ({
  access: mock(),
  mkdir: mock(() => Promise.resolve()),
  readFile: mock(),
  writeFile: mock(),
  rm: mock(),
  copyFile: mock(),
  cp: mock(),
  stat: mock(),
}));

// Mock the logger to prevent console output during tests
mock.module('./logger', () => ({
  logger: {
    error: mock(),
    info: mock(),
    warn: mock(),
    debug: mock(),
    success: mock(),
  },
}));

describe('utils/fs', () => {
  test('exists returns true when file exists', async () => {
    const result = await exists('test-file.txt');
    
    expect(result).toBe(true);
  });

  test('exists returns false when file does not exist', async () => {
    mock.module('node:fs/promises', () => ({
      access: mock(() => Promise.reject(new Error('File not found')))
    }));
    
    const result = await exists('non-existent-file.txt');
    
    expect(result).toBe(false);
  });

  test('ensureDir creates directory successfully', async () => {
    const result = await ensureDir('/test/directory');
    
    expect(result).toBe(true);
    expect(mkdir).toHaveBeenCalledWith('/test/directory', { recursive: true });
  });

  test('ensureDir returns false when directory creation fails', async () => {
    mock.module('node:fs/promises', () => ({
      mkdir: mock(() => Promise.reject(new Error('Permission denied')))
    }));
    
    const result = await ensureDir('/test/directory');
    
    expect(result).toBe(false);
  });

  test('readJsonFile returns parsed JSON when file is valid', async () => {
    const mockJson = JSON.stringify({ key: 'value' });
    mock.module('node:fs/promises', () => ({
      readFile: mock(() => Promise.resolve(mockJson))
    }));
    
    const result = await readJsonFile('test.json');
    
    expect(result).toEqual({ key: 'value' });
  });

  test('readJsonFile returns null when file reading fails', async () => {
    mock.module('node:fs/promises', () => ({
      readFile: mock(() => Promise.reject(new Error('File not found')))
    }));
    
    const result = await readJsonFile('test.json');
    
    expect(result).toBeNull();
  });

  test('readJsonFile returns null when JSON parsing fails', async () => {
    mock.module('node:fs/promises', () => ({
      readFile: mock(() => Promise.resolve('invalid json'))
    }));
    
    const result = await readJsonFile('test.json');
    
    expect(result).toBeNull();
  });

  test('writeJsonFile writes pretty JSON successfully', async () => {
    mock.module('node:fs/promises', () => ({
      writeFile: mock(() => Promise.resolve()),
      mkdir: mock(() => Promise.resolve())
    }));
    
    const data = { key: 'value' };
    
    const result = await writeJsonFile('test.json', data, true);
    
    expect(result).toBe(true);
  });

  test('writeJsonFile writes compact JSON when pretty is false', async () => {
    mock.module('node:fs/promises', () => ({
      writeFile: mock(() => Promise.resolve()),
      mkdir: mock(() => Promise.resolve())
    }));
    
    const data = { key: 'value' };
    
    const result = await writeJsonFile('test.json', data, false);
    
    expect(result).toBe(true);
  });

  test('writeJsonFile returns false when writing fails', async () => {
    mock.module('node:fs/promises', () => ({
      writeFile: mock(() => Promise.reject(new Error('Permission denied'))),
      mkdir: mock(() => Promise.resolve())
    }));
    
    const result = await writeJsonFile('test.json', { key: 'value' });
    
    expect(result).toBe(false);
  });

  test('remove deletes file successfully', async () => {
    mock.module('node:fs/promises', () => ({
      rm: mock(() => Promise.resolve())
    }));
    
    const result = await remove('test.json');
    
    expect(result).toBe(true);
  });

  test('remove returns false when deletion fails', async () => {
    mock.module('node:fs/promises', () => ({
      rm: mock(() => Promise.reject(new Error('Permission denied')))
    }));
    
    const result = await remove('test.json');
    
    expect(result).toBe(false);
  });

  test('copy copies file successfully', async () => {
    mock.module('node:fs/promises', () => ({
      stat: mock(() => Promise.resolve({ isDirectory: () => false })),
      copyFile: mock(() => Promise.resolve()),
      mkdir: mock(() => Promise.resolve())
    }));
    
    const result = await copy('source.txt', 'destination.txt');
    
    expect(result).toBe(true);
  });

  test('copy copies directory successfully', async () => {
    mock.module('node:fs/promises', () => ({
      stat: mock(() => Promise.resolve({ isDirectory: () => true })),
      cp: mock(() => Promise.resolve())
    }));
    
    const result = await copy('source-dir', 'destination-dir');
    
    expect(result).toBe(true);
  });

  test('copy returns false when copying fails', async () => {
    mock.module('node:fs/promises', () => ({
      stat: mock(() => Promise.reject(new Error('File not found')))
    }));
    
    const result = await copy('source.txt', 'destination.txt');
    
    expect(result).toBe(false);
  });
});
