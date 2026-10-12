import { Queue } from 'bullmq';
const connection={url:process.env.REDIS_URL||'redis://localhost:6379'}; export const notificationQueue=new Queue('notifications',{connection});
export async function queueNotification(data:{organizationId:string;title:string}) { try { await notificationQueue.add('email',data,{attempts:3,removeOnComplete:100}); } catch { console.info('[email:dev]',data.title); } }
