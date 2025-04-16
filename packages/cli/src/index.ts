#!/usr/bin/env bun
import { existsSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { generateYaml, packageUtils } from '@usagi-ts/core';

/**
 * Main CLI function
 * Handles command parsing and execution
 */
export async function runGenerateConfig() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (command === 'list-packages') {
    listPackages();
    return;
  }
  
  try {
    const cwd = process.cwd();
    const configPath = resolve(cwd, 'usagi.config.ts');
    
    if (!existsSync(configPath)) {
      console.error('Error: Could not find usagi.config.ts');
      process.exit(1);
    }
    
    const configModule = await import(`file://${configPath}`);
    const config = configModule.default;
    
    // Generate YAML with flat-config style support
    const yaml = generateYaml(config);
    
    const outputPath = resolve(cwd, '.coderabbit.yml');
    writeFileSync(outputPath, yaml);
    
    console.log(`Successfully generated .coderabbit.yml`);
  } catch (error) {
    console.error('Error generating YAML config:', error);
    process.exit(1);
  }
}

/**
 * Lists all available usagi-ts configuration packages
 */
function listPackages() {
  const packages = packageUtils.listAvailablePackages();
  
  if (packages.length === 0) {
    console.log('No usagi-ts configuration packages found.');
    return;
  }
  
  console.log('Available configuration packages:');
  packages.forEach((pkg: string) => {
    console.log(`- ${pkg}`);
  });
}
