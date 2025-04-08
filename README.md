# usagi-ts

A TypeScript utility for managing CodeRabbit configuration files with flat config support.

[![CI](https://github.com/yourusername/usagi-ts/actions/workflows/ci.yml/badge.svg)](https://github.com/yourusername/usagi-ts/actions/workflows/ci.yml)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Features

- Define CodeRabbit configurations using TypeScript
- Support for ESLint-style flat configuration
- Environment-aware configuration
- Type-safe configuration with auto-generated TypeScript types
- Generate YAML output compatible with CodeRabbit
- Extensible configuration approach

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
  // Base configuration
  {
    language: 'en-US',
    reviews: {
      profile: 'chill',
      auto_review: {
        enabled: true,
      },
    },
  },
  // Environment-specific configuration
  (env) => ({
    early_access: env.NODE_ENV === 'development',
  }),
]);
```

Generate the CodeRabbit YAML configuration:

```bash
usagi
```

This will create a `.coderabbit.yml` file in your project root.

## Configuration Options

The `usagi.config.ts` file exports an array of configuration objects or functions that return configuration objects. The configurations are merged using the `defu` library, with earlier configurations taking precedence over later ones.

### Basic Configuration

```typescript
import { defineUsagiConfig } from 'usagi-ts';

export default defineUsagiConfig([
  {
    language: 'en-US',
    tone_instructions: 'Be friendly and helpful',
    reviews: {
      profile: 'chill',
      auto_review: {
        enabled: true,
        drafts: false,
      },
    },
  },
]);
```

### Environment-Aware Configuration

You can use functions to create environment-aware configurations:

```typescript
import { defineUsagiConfig } from 'usagi-ts';

export default defineUsagiConfig([
  // Base configuration
  {
    language: 'en-US',
    reviews: {
      profile: 'chill',
    },
  },
  // Production configuration
  (env) => env.NODE_ENV === 'production' ? {
    reviews: {
      auto_review: {
        enabled: true,
        drafts: false,
      },
    },
  } : {},
  // Development configuration
  (env) => env.NODE_ENV === 'development' ? {
    early_access: true,
    reviews: {
      auto_review: {
        enabled: true,
        drafts: true,
      },
    },
  } : {},
]);
```

### Using Presets

The library includes some presets you can use as a starting point:

```typescript
import { defineUsagiConfig } from 'usagi-ts';
import { presets } from 'usagi-ts/presets';

export default defineUsagiConfig([
  // Use the basic preset
  presets.basic,
  // Override specific options
  {
    language: 'en-GB',
  },
]);
```

## Available Presets

### Basic

```typescript
{
  version: 2,
  reviews: {
    auto_review: {
      enabled: true,
    },
  },
}
```

### Strict

```typescript
{
  version: 2,
  reviews: {
    auto_review: {
      enabled: true,
      approve_threshold: 90,
    },
    rules: [
      {
        name: "Require tests",
        pattern: "**/*.test.{js,ts}",
        condition: "required",
      },
    ],
  },
}
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
    },
  },
]);

const yaml = generateYaml(configs);
console.log(yaml);
```

## Development

To develop usagi-ts locally:

```bash
# Clone the repository
git clone https://github.com/yourusername/usagi-ts.git
cd usagi-ts

# Install dependencies
bun install

# Run in development mode with watch
bun dev

# Build the project
bun run build

# Test the CLI
bun run start

# Run tests
bun test
```

## License

[MIT License](LICENSE) © 2025 Mikihiro Saito
