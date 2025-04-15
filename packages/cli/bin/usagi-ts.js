#!/usr/bin/env node
import { runGenerateConfig } from '../../../dist/cli.js';

runGenerateConfig().catch(err => {
  console.error(err);
  process.exit(1);
});
