import { Worker } from 'bullmq';
const connection={url:process.env.REDIS_URL||'redis://localhost:6379'};
new Worker('notifications',async job=>console.info(`[development email] ${job.data.title}`),{connection}); console.info('ResolveDesk worker running');
