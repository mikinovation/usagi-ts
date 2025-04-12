// TODO: replace @usagi-ts/core with usagi-ts
import { defineUsagiConfig } from '@usagi-ts/core';

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
