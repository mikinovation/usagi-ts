import { CodeRabbitConfig } from './types';

export const presets = {
  basic: {
    version: 2,
    reviews: {
      auto_review: {
        enabled: true,
      },
    },
  } as Partial<CodeRabbitConfig>,
  strict: {
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
  } as Partial<CodeRabbitConfig>,
};
