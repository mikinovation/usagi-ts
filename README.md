# usagi-ts

A CLI tool built with Bun for generating TypeScript types from CodeRabbit schema with flat config support.

## Features

- Generate TypeScript types from CodeRabbit schema
- Support for ESLint-style flat configuration
- Customizable type generation options
- Filter specific types from the schema
- Format output with Prettier
- Extensible hooks system

## Installation

<!-- TODO: How to install -->

## Quick Start

Initialize a new configuration in your project:

```bash
usagi-ts init
```

This will create a `usagi.config.js` file in your project root.

Generate types from the schema:

```bash
usagi-ts generate
```

## Configuration

usagi-ts uses a flat configuration system similar to ESLint's flat config. You can define your configuration in a `usagi.config.js` file:

```javascript
export default [
  // Base configuration
  {
    schema: {
      url: 'https://storage.googleapis.com/coderabbit_public_assets/schema.v2.json',
      cacheDir: './.usagi-cache',
    },
    types: {
      outputDir: './types',
      fileNaming: 'kebab',
      prettier: true
    }
  },
  // Additional configurations can be added to override or extend the base
  {
    types: {
      prefix: 'CR'
    }
  }
];
```

## Configuration Options

### Schema Options

| Option | Type | Description |
|--------|------|-------------|
| `url` | `string` | URL or file path to the schema |
| `cacheDir` | `string` | Directory to cache the schema |
| `filter` | `string[]` | List of type names to include |

### Type Generation Options

| Option | Type | Description |
|--------|------|-------------|
| `outputDir` | `string` | Output directory for generated types |
| `prefix` | `string` | Prefix for generated type names |
| `suffix` | `string` | Suffix for generated type names |
| `banner` | `string` | Custom banner comment for generated files |
| `singleFile` | `boolean` | Generate all types in a single file |
| `singleFileName` | `string` | Name of the single file |
| `fileNaming` | `'kebab' \| 'camel' \| 'pascal' \| 'snake'` | File naming convention |
| `prettier` | `boolean` | Format with prettier |

### Hooks

| Hook | Description |
|------|-------------|
| `beforeGenerate` | Called before type generation |
| `afterGenerate` | Called after type generation with the result |

## CLI Commands

### Initialize

```bash
usagi-ts init [options]
```

Options:
- `-d, --dir <directory>`: Directory to initialize in (default: ".")

### Generate

```bash
usagi-ts generate [options]
```

Options:
- `-s, --schema <url>`: Schema URL (default: CodeRabbit schema URL)
- `-o, --output <directory>`: Output directory for generated types (default: "./types")
- `-c, --config <path>`: Path to config file (default: "./usagi.config.js")
- `-f, --force`: Force overwrite existing files

### Validate

```bash
usagi-ts validate [options]
```

Options:
- `-c, --config <path>`: Path to config file (default: "./usagi.config.js")
- `-s, --schema <url>`: Schema URL (default: CodeRabbit schema URL)

## Programmatic Usage

You can also use usagi-ts programmatically in your Node.js applications:

```typescript
import { 
  fetchSchema, 
  parseSchema, 
  generateTypes, 
  loadConfig 
} from 'usagi-ts';

async function generateTypesFromSchema() {
  // Load configuration
  const config = await loadConfig('./usagi.config.js');
  
  // Fetch schema
  const schema = await fetchSchema(config.schema.url);
  
  // Parse schema
  const parsedSchema = parseSchema(schema);
  
  // Generate types
  const result = await generateTypes(parsedSchema, {
    outputPath: config.types.outputDir,
    ...config.types
  });
  
  console.log(`Generated ${result.fileCount} files`);
}

generateTypesFromSchema();
```

## License

MIT
