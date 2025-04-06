/* This file is auto-generated. Do not edit it manually. */

export interface CodeRabbitConfig {
  /**
   * Set the language for reviews by using the corresponding ISO language code.
   */
  language?:
    | 'de'
    | 'de-DE'
    | 'de-AT'
    | 'de-CH'
    | 'en'
    | 'en-US'
    | 'en-AU'
    | 'en-GB'
    | 'en-CA'
    | 'en-NZ'
    | 'en-ZA'
    | 'es'
    | 'es-AR'
    | 'fr'
    | 'fr-CA'
    | 'fr-CH'
    | 'fr-BE'
    | 'nl'
    | 'nl-BE'
    | 'pt-AO'
    | 'pt'
    | 'pt-BR'
    | 'pt-MZ'
    | 'pt-PT'
    | 'ar'
    | 'ast-ES'
    | 'ast'
    | 'be-BY'
    | 'be'
    | 'br-FR'
    | 'br'
    | 'ca-ES'
    | 'ca'
    | 'ca-ES-valencia'
    | 'ca-ES-balear'
    | 'da-DK'
    | 'da'
    | 'de-DE-x-simple-language'
    | 'el-GR'
    | 'el'
    | 'eo'
    | 'fa'
    | 'ga-IE'
    | 'ga'
    | 'gl-ES'
    | 'gl'
    | 'it'
    | 'ja-JP'
    | 'ja'
    | 'km-KH'
    | 'km'
    | 'ko-KR'
    | 'ko'
    | 'pl-PL'
    | 'pl'
    | 'ro-RO'
    | 'ro'
    | 'ru-RU'
    | 'ru'
    | 'sk-SK'
    | 'sk'
    | 'sl-SI'
    | 'sl'
    | 'sv'
    | 'ta-IN'
    | 'ta'
    | 'tl-PH'
    | 'tl'
    | 'tr'
    | 'uk-UA'
    | 'uk'
    | 'zh-CN'
    | 'zh'
    | 'crh-UA'
    | 'crh'
    | 'nb'
    | 'no'
    | 'nl-NL'
    | 'de-DE-x-simple-language-DE'
    | 'es-ES'
    | 'it-IT'
    | 'fa-IR'
    | 'sv-SE'
    | 'de-LU'
    | 'fr-FR';
  /**
   * Set the tone of reviews and chat. Example: 'You must use talk like Mr. T. I pity the fool who doesn't!'
   */
  tone_instructions?: string;
  /**
   * Enable early-access features.
   */
  early_access?: boolean;
  /**
   * Enable free tier features for users not on a paid plan.
   */
  enable_free_tier?: boolean;
  /**
   * Automatically resolve threads when code changes address the feedback. When disabled, metrics are still tracked but threads won't be marked as resolved.
   */
  auto_resolve_threads?: boolean;
  /**
   * Settings related to reviews.
   */
  reviews?: {
    /**
     * Set the profile for reviews. Assertive profile yields more feedback, that may be considered nitpicky.
     */
    profile?: 'chill' | 'assertive';
    /**
     * Approve the review once CodeRabbit's comments are resolved. Note: In GitLab, all discussions must be resolved.
     */
    request_changes_workflow?: boolean;
    /**
     * Generate a high level summary of the changes in the PR/MR description.
     */
    high_level_summary?: boolean;
    /**
     * Placeholder in the PR/MR description that gets replaced with the high level summary.
     */
    high_level_summary_placeholder?: string;
    /**
     * Include the high level summary in the walkthrough comment.
     */
    high_level_summary_in_walkthrough?: boolean;
    /**
     * Add this keyword in the PR/MR title to auto-generate the title.
     */
    auto_title_placeholder?: string;
    /**
     * Auto Title Instructions | Custom instructions for auto-generating the PR/MR title.
     */
    auto_title_instructions?: string;
    /**
     * Post review details on each review. Additionally, post a review status when a review is skipped in certain cases.
     */
    review_status?: boolean;
    /**
     * Set the commit status to 'pending' when the review is in progress and 'success' when it is complete.
     */
    commit_status?: boolean;
    /**
     * Set the commit status to 'failure' when the PR cannot be reviewed by CodeRabbit for any reason.
     */
    fail_commit_status?: boolean;
    /**
     * Generate walkthrough in a markdown collapsible section.
     */
    collapse_walkthrough?: boolean;
    /**
     * Generate a summary of the changed files in the walkthrough.
     */
    changed_files_summary?: boolean;
    /**
     * Generate sequence diagrams in the walkthrough.
     */
    sequence_diagrams?: boolean;
    /**
     * Generate an assessment of how well the changes address the linked issues in the walkthrough.
     */
    assess_linked_issues?: boolean;
    /**
     * Include possibly related issues in the walkthrough.
     */
    related_issues?: boolean;
    /**
     * Related PRs | Include possibly related pull requests in the walkthrough.
     */
    related_prs?: boolean;
    /**
     * Suggest labels based on the changes in the pull request in the walkthrough.
     */
    suggested_labels?: boolean;
    /**
     * Automatically apply the suggested labels to the PR/MR.
     */
    auto_apply_labels?: boolean;
    /**
     * Suggest reviewers based on the changes in the pull request in the walkthrough.
     */
    suggested_reviewers?: boolean;
    /**
     * Automatically assign suggested reviewers to the pull request
     */
    auto_assign_reviewers?: boolean;
    /**
     * Generate a poem in the walkthrough comment.
     */
    poem?: boolean;
    /**
     * Labeling Instructions | Provide guidelines for suggesting labels for the PR/MR. When specific labels or instructions are provided, only those labels are considered, though previous examples are still used to inform the suggestions. If no such labels are provided, suggestions are based solely on previous PR/MRs.
     */
    labeling_instructions?: {
      /**
       * Label to suggest for the PR/MR. Example: frontend
       */
      label: string;
      /**
       * Instructions for the label. Example: Apply when the PR/MR contains changes to the react components.
       */
      instructions: string;
    }[];
    /**
     * Specify file patterns to include or exclude in a review using glob patterns (e.g., !dist/**, src/**). These patterns also apply to 'git sparse-checkout', including specified patterns and ignoring excluded ones (starting with '!') when cloning the repository.
     */
    path_filters?: string[];
    /**
     * Path Instructions | Provide specific additional guidelines for code review based on file paths.
     */
    path_instructions?: {
      /**
       * File path glob pattern. Example: ** /*.js
       */
      path: string;
      /**
       * Provides specific additional guidelines for code review based on file paths.
       */
      instructions: string;
    }[];
    /**
     * Abort the in-progress review if the pull request is closed or merged.
     */
    abort_on_close?: boolean;
    auto_review?: {
      /**
       * Automatic Review | Automatic code review
       */
      enabled?: boolean;
      /**
       * Automatic Incremental Review | Automatic incremental code review on each push
       */
      auto_incremental_review?: boolean;
      /**
       * Ignore reviewing if the title of the pull request contains any of these keywords (case-insensitive).
       */
      ignore_title_keywords?: string[];
      /**
       * Restrict automatic reviews to only those pull requests that match one of the specified labels.
       */
      labels?: string[];
      /**
       * Review draft PRs/MRs.
       */
      drafts?: boolean;
      /**
       * Base branches (other than the default branch) to review. Accepts regex patterns.
       */
      base_branches?: string[];
    };
    finishing_touches?: {
      /**
       * Docstrings | Options for generating Docstrings for your PRs/MRs.
       */
      docstrings?: {
        /**
         * Docstrings | Allow CodeRabbit to generate docstrings for PRs/MRs.
         */
        enabled?: boolean;
      };
    };
    /**
     * Tools that provide additional context to code reviews.
     */
    tools?: {
      /**
       * Enable ast-grep | ast-grep is a code analysis tool that helps you to find patterns in your codebase using abstract syntax trees patterns. | v0.31.1
       */
      'ast-grep'?: {
        /**
         * List of rules directories.
         */
        rule_dirs?: string[];
        /**
         * List of utils directories.
         */
        util_dirs?: string[];
        /**
         * Use ast-grep essentials package.
         */
        essential_rules?: boolean;
        /**
         * Predefined packages to be used.
         */
        packages?: string[];
      };
      /**
       * ShellCheck is a static analysis tool that finds bugs in your shell scripts.
       */
      shellcheck?: {
        /**
         * Enable ShellCheck | ShellCheck is a static analysis tool that finds bugs in your shell. | Enable ShellCheck integration. | v0.10.0
         */
        enabled?: boolean;
      };
      /**
       * Ruff is a Python linter and code formatter.
       */
      ruff?: {
        /**
         * Enable Ruff | Ruff is a Python linter and code formatter. |  Enable Ruff integration. | v0.8.2
         */
        enabled?: boolean;
      };
      /**
       * markdownlint-cli2 is a static analysis tool to enforce standards and consistency for Markdown files.
       */
      markdownlint?: {
        /**
         * Enable markdownlint | markdownlint-cli2 is a static analysis tool to enforce standards and consistency for Markdown files. | Enable markdownlint integration. | v0.17.2
         */
        enabled?: boolean;
      };
      /**
       * GitHub Checks integration configuration.
       */
      'github-checks'?: {
        /**
         * Enable GitHub Checks
         * 			| Enable integration, defaults to true
         * 			| Enable GitHub Checks integration.
         */
        enabled?: boolean;
        /**
         * Time in milliseconds to wait for all GitHub Checks to conclude.
         */
        timeout_ms?: number;
      };
      /**
       * LanguageTool is a style and grammar checker for 30+ languages.
       */
      languagetool?: {
        /**
         * Enable LanguageTool | Enable LanguageTool integration.
         */
        enabled?: boolean;
        /**
         * IDs of rules to be enabled. The rule won't run unless 'level' is set to a level that activates the rule.
         */
        enabled_rules?: string[];
        /**
         * IDs of rules to be disabled. Note: EN_UNPAIRED_BRACKETS, and EN_UNPAIRED_QUOTES are always disabled.
         */
        disabled_rules?: string[];
        /**
         * IDs of categories to be enabled.
         */
        enabled_categories?: string[];
        /**
         * IDs of categories to be disabled. Note: TYPOS, TYPOGRAPHY, and CASING are always disabled.
         */
        disabled_categories?: string[];
        /**
         * Only the rules and categories whose IDs are specified with 'enabledRules' or 'enabledCategories' are enabled.
         */
        enabled_only?: boolean;
        /**
         * If set to 'picky', additional rules will be activated, i.e. rules that you might only find useful when checking formal text.
         */
        level?: 'default' | 'picky';
      };
      /**
       * Biome is a fast formatter, linter, and analyzer for web projects.
       */
      biome?: {
        /**
         * Enable Biome | Biome is a fast formatter, linter, and analyzer for web projects. | Enable Biome integration. | v1.9.4
         */
        enabled?: boolean;
      };
      /**
       * Hadolint is a Dockerfile linter.
       */
      hadolint?: {
        /**
         * Enable Hadolint | Hadolint is a Dockerfile linter. | Enable Hadolint integration. | v2.12.0
         */
        enabled?: boolean;
      };
      /**
       * SwiftLint integration configuration object.
       */
      swiftlint?: {
        /**
         * Enable SwiftLint | SwiftLint is a Swift linter. | Enable SwiftLint integration. | v0.57.0
         */
        enabled?: boolean;
        /**
         * Optional path to the SwiftLint configuration file relative to the repository. This is useful when the configuration file is named differently than the default '.swiftlint.yml' or '.swiftlint.yaml'.
         */
        config_file?: string;
      };
      /**
       * PHPStan is a tool to analyze PHP code.
       */
      phpstan?: {
        /**
         * Enable PHPStan | PHPStan requires [config file](https://phpstan.org/config-reference#config-file) in your repository root. Please ensure that this file contains the `paths:` parameter. | v2.0.3
         */
        enabled?: boolean;
        /**
         * Level | Specify the [rule level](https://phpstan.org/user-guide/rule-levels) to run. This setting is ignored if your configuration file already has a `level:` parameter.
         */
        level?: 'default' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'max';
      };
      /**
       * golangci-lint is a fast linters runner for Go.
       */
      'golangci-lint'?: {
        /**
         * Enable golangci-lint | golangci-lint is a fast linters runner for Go. | Enable golangci-lint integration. | v1.64.8
         */
        enabled?: boolean;
        /**
         * Optional path to the golangci-lint configuration file relative to the repository. Useful when the configuration file is named differently than the default '.golangci.yml', '.golangci.yaml', '.golangci.toml', '.golangci.json'.
         */
        config_file?: string;
      };
      /**
       * YAMLlint is a linter for YAML files.
       */
      yamllint?: {
        /**
         * Enable YAMLlint | YAMLlint is a linter for YAML files. | Enable YAMLlint integration. | v1.35.1
         */
        enabled?: boolean;
      };
      /**
       * Gitleaks is a secret scanner.
       */
      gitleaks?: {
        /**
         * Enable Gitleaks | Gitleaks is a secret scanner. | Enable Gitleaks integration. | v8.21.2
         */
        enabled?: boolean;
      };
      /**
       * Checkov is a static code analysis tool for infrastructure-as-code files.
       */
      checkov?: {
        /**
         * Enable Checkov | Checkov is a static code analysis tool for infrastructure-as-code files. | v3.2.334
         */
        enabled?: boolean;
      };
      /**
       * Detekt is a static code analysis tool for Kotlin files.
       */
      detekt?: {
        /**
         * Enable detekt | detekt is a static code analysis tool for Kotlin files. | v1.23.7
         */
        enabled?: boolean;
        /**
         * Optional path to the detekt configuration file relative to the repository.
         */
        config_file?: string;
      };
      /**
       * ESLint is a static code analysis tool for JavaScript files.
       */
      eslint?: {
        /**
         * Enable ESLint | ESLint is a static code analysis tool for JavaScript files.
         */
        enabled?: boolean;
      };
      /**
       * RuboCop is a Ruby static code analyzer (a.k.a. linter ) and code formatter.
       */
      rubocop?: {
        /**
         * Enable RuboCop | RuboCop is a Ruby static code analyzer (a.k.a. linter ) and code formatter. | v1.73
         */
        enabled?: boolean;
      };
      /**
       * Buf offers linting for Protobuf files.
       */
      buf?: {
        /**
         * Enable Buf | Buf offers linting for Protobuf files. | v1.47.2
         */
        enabled?: boolean;
      };
      /**
       * Regal is a linter and language server for Rego.
       */
      regal?: {
        /**
         * Enable Regal | Regal is a linter and language server for Rego. | v0.29.2
         */
        enabled?: boolean;
      };
      /**
       * actionlint is a static checker for GitHub Actions workflow files.
       */
      actionlint?: {
        /**
         * Enable actionlint | is a static checker for GitHub Actions workflow files. | v1.7.4
         */
        enabled?: boolean;
      };
      /**
       * PMD is an extensible multilanguage static code analyzer. It’s mainly concerned with Java.
       */
      pmd?: {
        /**
         * Enable PMD | PMD is an extensible multilanguage static code analyzer. It’s mainly concerned with Java. | v7.8.0
         */
        enabled?: boolean;
        /**
         * Optional path to the PMD configuration file relative to the repository.
         */
        config_file?: string;
      };
      /**
       * Cppcheck is a static code analysis tool for the C and C++ programming languages.
       */
      cppcheck?: {
        /**
         * Enable Cppcheck | Cppcheck is a static code analysis tool for the C and C++ programming languages. | v2.10-2
         */
        enabled?: boolean;
      };
      /**
       * Semgrep is a static analysis tool designed to scan code for security vulnerabilities and code quality issues.
       */
      semgrep?: {
        /**
         * Enable Semgrep | Semgrep is a static analysis tool designed to scan code for security vulnerabilities and code quality issues. | Enable Semgrep integration. | v1.99.0
         */
        enabled?: boolean;
        /**
         * Optional path to the Semgrep configuration file relative to the repository.
         */
        config_file?: string;
      };
      /**
       * CircleCI tool is a static checker for CircleCI config files.
       */
      circleci?: {
        /**
         * Enable CircleCI | CircleCI tool is a static checker for CircleCI config files. | v0.1.31151
         */
        enabled?: boolean;
      };
      /**
       * SQLFluff is an open source, dialect-flexible and configurable SQL linter.
       */
      sqlfluff?: {
        /**
         * Enable SQLFluff | SQLFluff is an open source, dialect-flexible and configurable SQL linter. | v3.3.0
         */
        enabled?: boolean;
      };
      /**
       * Configuration for Prisma Schema linting to ensure schema file quality
       */
      prismaLint?: {
        /**
         * Enable Prisma Schema linting | Prisma Schema linting helps maintain consistent and error-free schema files | v0.10.0
         */
        enabled?: boolean;
      };
    };
  };
  chat?: {
    /**
     * Enable the bot to reply automatically without requiring the user to tag it.
     */
    auto_reply?: boolean;
    /**
     * Enable Issue creation by CodeRabbit from PR comments.
     */
    create_issues?: boolean;
    integrations?: {
      jira?: {
        /**
         * Jira | Enable the Jira integration for opening issues, etc. 'auto' disables the integration for public repositories.
         */
        usage?: 'auto' | 'enabled' | 'disabled';
      };
      linear?: {
        /**
         * Linear | Enable the Linear integration for opening issues, etc. 'auto' disables the integration for public repositories.
         */
        usage?: 'auto' | 'enabled' | 'disabled';
      };
    };
  };
  knowledge_base?: {
    /**
     * Opt out | Opt out of all knowledge base features that require data retention.
     */
    opt_out?: boolean;
    web_search?: {
      /**
       * Web Search | Enable the web search integration.
       */
      enabled?: boolean;
    };
    learnings?: {
      /**
       * Learnings | Specify the scope of learnings to use for the knowledge base. 'local' uses the repository's learnings, 'global' uses the organization's learnings, and 'auto' uses repository's learnings for public repositories and organization's learnings for private repositories.
       */
      scope?: 'local' | 'global' | 'auto';
    };
    issues?: {
      /**
       * Issues | Specify the scope of git platform (GitHub/GitLab) issues to use for the knowledge base. 'local' uses the repository's issues, 'global' uses the organization's issues, and 'auto' uses repository's issues for public repositories and organization's issues for private repositories.
       */
      scope?: 'local' | 'global' | 'auto';
    };
    jira?: {
      /**
       * Jira | Enable the Jira knowledge base integration. 'auto' disables the integration for public repositories.
       */
      usage?: 'auto' | 'enabled' | 'disabled';
      /**
       * Jira Project Keys | Specify the Jira project keys to use for the knowledge base.
       */
      project_keys?: string[];
    };
    linear?: {
      /**
       * Linear | Enable the Linear knowledge base integration. 'auto' disables the integration for public repositories.
       */
      usage?: 'auto' | 'enabled' | 'disabled';
      /**
       * Linear Team Keys | Specify the Linear team keys (identifiers) to use for the knowledge base. E.g. 'ENG'
       */
      team_keys?: string[];
    };
    pull_requests?: {
      /**
       * Pull Requests | Specify the scope of pull requests to use for the knowledge base. 'local' uses the repository's pull requests, 'global' uses the organization's pull requests, and 'auto' uses repository's pull requests for public repositories and organization's pull requests for private repositories.
       */
      scope?: 'local' | 'global' | 'auto';
    };
  };
  code_generation?: {
    /**
     * Settings related to the generation of docstrings.
     */
    docstrings?: {
      /**
       * Set the language for docstrings by using the corresponding ISO language code.
       */
      language?:
        | 'de'
        | 'de-DE'
        | 'de-AT'
        | 'de-CH'
        | 'en'
        | 'en-US'
        | 'en-AU'
        | 'en-GB'
        | 'en-CA'
        | 'en-NZ'
        | 'en-ZA'
        | 'es'
        | 'es-AR'
        | 'fr'
        | 'fr-CA'
        | 'fr-CH'
        | 'fr-BE'
        | 'nl'
        | 'nl-BE'
        | 'pt-AO'
        | 'pt'
        | 'pt-BR'
        | 'pt-MZ'
        | 'pt-PT'
        | 'ar'
        | 'ast-ES'
        | 'ast'
        | 'be-BY'
        | 'be'
        | 'br-FR'
        | 'br'
        | 'ca-ES'
        | 'ca'
        | 'ca-ES-valencia'
        | 'ca-ES-balear'
        | 'da-DK'
        | 'da'
        | 'de-DE-x-simple-language'
        | 'el-GR'
        | 'el'
        | 'eo'
        | 'fa'
        | 'ga-IE'
        | 'ga'
        | 'gl-ES'
        | 'gl'
        | 'it'
        | 'ja-JP'
        | 'ja'
        | 'km-KH'
        | 'km'
        | 'ko-KR'
        | 'ko'
        | 'pl-PL'
        | 'pl'
        | 'ro-RO'
        | 'ro'
        | 'ru-RU'
        | 'ru'
        | 'sk-SK'
        | 'sk'
        | 'sl-SI'
        | 'sl'
        | 'sv'
        | 'ta-IN'
        | 'ta'
        | 'tl-PH'
        | 'tl'
        | 'tr'
        | 'uk-UA'
        | 'uk'
        | 'zh-CN'
        | 'zh'
        | 'crh-UA'
        | 'crh'
        | 'nb'
        | 'no'
        | 'nl-NL'
        | 'de-DE-x-simple-language-DE'
        | 'es-ES'
        | 'it-IT'
        | 'fa-IR'
        | 'sv-SE'
        | 'de-LU'
        | 'fr-FR';
    };
  };
}
