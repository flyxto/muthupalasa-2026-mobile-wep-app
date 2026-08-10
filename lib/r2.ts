import { S3Client } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';

// Auto-load .env.local if variables are missing
if (!process.env.CF_ACCOUNT_ID) {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf-8');
    for (const line of envConfig.split('\n')) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [key, ...values] = trimmed.split('=');
        process.env[key.trim()] = values.join('=').trim();
      }
    }
  }
}

const accountId = process.env.CF_ACCOUNT_ID;
const accessKeyId = process.env.CF_ACCESS_KEY_ID;
const secretAccessKey = process.env.CF_SECRET_ACCESS_KEY;

export const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: accessKeyId || '',
    secretAccessKey: secretAccessKey || '',
  },
});

export const R2_BUCKET_NAME = process.env.CF_BUCKET_NAME || 'muthupalasa';
export const R2_PUBLIC_URL = (process.env.CF_PUBLIC_URL || '').replace(/\/$/, '');
