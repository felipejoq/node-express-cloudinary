import 'dotenv/config';

import env from 'env-var';

export const envs = {
  PORT: env.get('PORT').default('3000').asPortNumber(),
  CLOUDINARY_CLOUD_NAME: env.get('CLOUDINARY_CLOUD_NAME').required().asString(),
  CLOUDINARY_API_KEY: env.get('CLOUDINARY_API_KEY').required().asString(),
  CLOUDINARY_API_SECRET: env.get('CLOUDINARY_API_SECRET').required().asString(),
}