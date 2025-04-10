import { CodeRabbitConfig } from './types';

/**
 * Represents a reusable set of review instructions
 */
export interface InstructionSet {
  /** Optional description of the instruction set */
  description?: string;
  /** The instruction content, can include template variables */
  instructions: string;
}

/**
 * Parameters for template substitution
 */
export interface TemplateParameters {
  [key: string]: string;
}

/**
 * Enhanced path instruction that can reference instruction sets
 */
export interface EnhancedPathInstruction {
  /** Glob pattern for matching file paths */
  path: string;
  /** Raw instructions or reference to an instruction set */
  instructions: string | {
    /** Name of the instruction set to use */
    use: string;
    /** Optional parameters to customize the instruction set */
    with?: TemplateParameters;
  };
}

/**
 * Collection of AST rules that can be shared and reused
 */
export interface RuleCollection {
  /** Optional description of the rule collection */
  description?: string;
  /** List of rule IDs to include */
  rules: string[];
  /** External packages containing AST rules */
  packages?: string[];
}

/**
 * Extended configuration that builds on the standard CodeRabbit config
 */
export interface UsagiExtendedConfig extends Partial<CodeRabbitConfig> {
  /** Reusable instruction sets that can be referenced by path instructions */
  instruction_sets?: {
    [name: string]: InstructionSet;
  };
  
  /** Enhanced path instructions that can use templates */
  enhanced_path_instructions?: EnhancedPathInstruction[];
  
  /** Reusable collections of AST rules */
  rule_collections?: {
    [name: string]: RuleCollection;
  };
}

/**
 * Configuration item that can be a static object or a function
 */
export type UsagiExtendedConfigItem = 
  | UsagiExtendedConfig
  | ((env: Record<string, string>) => UsagiExtendedConfig)
  | UsagiExtendedConfigItem[]; // Support for nested arrays of configs
