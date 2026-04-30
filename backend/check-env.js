import 'dotenv/config';

const requiredEnvVars = [
    'PORT',
    'MONGODB_URI',
    'JWT_SECRET',
    'CORS_ORIGIN'
];

let missing = false;

for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        console.error(`❌ ERROR: Missing required environment variable: ${envVar}`);
        missing = true;
    }
}

if (missing) {
    console.error('Application failed to start: Environment variables are not properly configured.');
    process.exit(1);
}

console.log('✅ All required environment variables are present.');
