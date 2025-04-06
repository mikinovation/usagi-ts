import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { compile } from 'json-schema-to-typescript';

const SCHEMA_URL = 'https://storage.googleapis.com/coderabbit_public_assets/schema.v2.json';
const OUTPUT_PATH = resolve(import.meta.dir, '../src/types.ts');
const SCHEMA_PATH = resolve(import.meta.dir, '../src/schema.json');

async function generateTypes() {
  try {
    console.log('Fetching schema...');
    const response = await fetch(SCHEMA_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch schema: ${response.status} ${response.statusText}`);
    }
    
    const schema = await response.json();
    
    writeFileSync(SCHEMA_PATH, JSON.stringify(schema, null, 2));
    
    console.log('Generating TypeScript types...');
    const typeDefs = await compile(schema, 'CodeRabbitConfig', {
      bannerComment: '/* This file is auto-generated. Do not edit it manually. */',
      style: {
        singleQuote: true,
        semi: true,
        tabWidth: 2,
      },
    });
    
    console.log('Writing types to file...');
    writeFileSync(OUTPUT_PATH, typeDefs);
    
    console.log('Types generated successfully!');
  } catch (error) {
    console.error('Error generating types:', error);
    process.exit(1);
  }
}

generateTypes();
