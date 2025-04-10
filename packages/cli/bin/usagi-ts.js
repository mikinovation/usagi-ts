#!/usr/bin/env bun

import { join } from 'path';

const isDev = process.env.NODE_ENV === 'development';
const entryPath = isDev ? '../src/cli.ts' : '../dist/cli.js';

import(join(import.meta.dirname, entryPath));
