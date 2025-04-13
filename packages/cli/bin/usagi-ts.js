#!/usr/bin/env node
import { runGenerateConfig } from '../dist/index.js';

runGenerateConfig().catch(err => {
  console.error(err);
  process.exit(1);
});
