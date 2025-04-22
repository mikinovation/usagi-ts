# usagi-ts

A TypeScript utility for managing CodeRabbit configuration files with flat config support.

## Features

- Define CodeRabbit configurations using TypeScript
- Support for flat configuration system
- Environment-aware configuration
- Type-safe configuration with auto-generated TypeScript types
- Generate YAML output compatible with CodeRabbit
- Function-based review instructions for dynamic content generation

## Installation

```bash
# Using npm
npm install -D usagi-ts

# Using yarn
yarn add -D usagi-ts

# Using bun
bun add -D usagi-ts
```

## Quick Start

Create a `usagi.config.ts` file in your project root:

```typescript
import { defineUsagiConfig } from 'usagi-ts';

export default defineUsagiConfig([
  {
    language: 'en-US',
    reviews: {
      profile: 'chill',
      auto_review: {
        enabled: true,
      },
    },
  },
]);
```

Generate the CodeRabbit YAML configuration:

```bash
usagi
```

This will create a `.coderabbit.yml` file in your project root.

## Flat Configuration System

usagi-ts supports a flat configuration system that allows you to directly import and use configuration modules.

### Key Benefits

- **Direct Module Imports**: Import configuration modules directly using standard JavaScript imports
- **Composable Configurations**: Easy to compose configurations from multiple sources
- **Better TypeScript Support**: Full type checking for imported configuration modules
- **Simplified Inheritance**: No need for string-based references to external packages

### Basic Usage

```typescript
import { defineUsagiConfig } from 'usagi-ts';

// Import shared configuration modules directly
import baseConfig from './configs/base-config';
import jsConfig from '@my-org/usagi-js-config';

export default defineUsagiConfig([
  // Configurations are merged in order (earlier configs have higher precedence)
  baseConfig,   // Base organization configuration
  jsConfig,     // JavaScript-specific configuration
  
  // Inline configuration objects
  {
    reviews: {
      profile: 'assertive', // Override settings from imported configs
      auto_review: {
        drafts: true
      }
    }
  }
]);
```

### Sharing Configuration Modules

You can create reusable configuration modules in your project or as separate packages:

```typescript
// configs/base-config.ts
import { UsagiExtendedConfig } from 'usagi-ts';

/**
 * Base organization configuration
 * @type {UsagiExtendedConfig}
 */
const baseConfig: UsagiExtendedConfig = {
  language: 'en-US',
  reviews: {
    profile: 'chill',
    auto_review: {
      enabled: true,
    },
  },
  
  // Shared instruction sets
  instruction_sets: {
    typescript: {
      description: 'Standard Typescript review instructions',
      instructions: (params: { constantsStyle: string }): string => `
        Review JavaScript code against these standards:
        1. Use the "function" keyword for functions. "Arrow functions" are prohibited.
        2. When defining types in TypeScript, utilize "type" aliases instead of "interface".
        3. Constants should be named using ${params.constantsStyle || 'UpperCamel'}.
      `
    }
  }
};

export default baseConfig;
```

### Function Configurations

You can use functions to create environment-aware configurations:

```typescript
import { defineUsagiConfig } from 'usagi-ts';
import baseConfig from './configs/base-config';

const configWithParams = (params: { early_access: boolean }) => ({
  early_access: params.early_access,
});

export default defineUsagiConfig([
  baseConfig,
  envConfig({
    early_access: true,
  }),
]);
```

### Nested Configurations

Configurations can include nested arrays, which will be flattened automatically:

```typescript
import { defineUsagiConfig } from 'usagi-ts';
import baseConfig from './configs/base-config';
import { jsConfigs } from './configs/js-configs';

export default defineUsagiConfig([
  baseConfig,
  jsConfigs, // This can be an array of configurations
  {
    // Project-specific overrides
    reviews: {
      profile: 'assertive',
    }
  }
]);
```

### Order of Precedence

Configurations are merged in the order they appear in the array, with later entries taking precedence over earlier ones.

```typescript
import { defineUsagiConfig } from 'usagi-ts';

export default defineUsagiConfig([
  // Lower precedence
  { reviews: { profile: 'chill' } },
  
  // Higher precedence (will override the above)
  { reviews: { profile: 'assertive' } }
]);

// Result: { reviews: { profile: 'assertive' } }
```

## Function-Based Review Instructions

usagi-ts supports powerful function-based review instructions that allow you to dynamically generate review instructions based on parameters:

```typescript
import { defineUsagiConfig } from 'usagi-ts';
import baseConfig from './configs/base-config';

export default defineUsagiConfig([
  baseConfig,
  {
    instructions: [
      {
        path: ["src/**/*.ts", "src/**/*.tsx"],
        instructions: {
          use: "typescript",
          with: {
            constantsStyle: "UPPER_SNAKE_CASE"
          }
        }
      }
    ]
  }
]);
```

## CLI Commands

### Generate

```bash
usagi
```

Generates a `.coderabbit.yml` file in the current directory based on the `usagi.config.ts` file.

## Programmatic Usage

You can also use usagi-ts programmatically in your applications:

```typescript
import { generateYaml, defineUsagiConfig } from 'usagi-ts';

const configs = defineUsagiConfig([
  {
    language: 'en-US',
    reviews: {
      profile: 'chill',
    }
  },
]);

const yaml = generateYaml(configs);
console.log(yaml);
```

## License

[MIT License](LICENSE) © 2025 Mikihiro Saito
