import { z } from 'zod';

export function envSchema() {
  return z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

    DATABASE_URL: z.string().nonempty(),

    VALID_ORIGINS: z.preprocess((value) => String(value).split(','), z.array(z.url())),

    OTP_TTL_IN_SECONDS: z.preprocess((val) => Number(val), z.number().int().positive()).default(300),

    // REDIS CONFIGURATIONS
    REDIS_CACHE_URL: z.string().nonempty(),
    REDIS_CACHE_USE_TLS: z.preprocess((val) => val === 'true', z.boolean()).default(false),

    // CACHE CONFIGURATIONS
    CACHE_TTL_IN_SECONDS: z.preprocess((val) => Number(val), z.number().int().positive()).default(1800),
  });
}
