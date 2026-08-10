import 'dotenv/config';
import app from './app';
import { connectDB, disconnectDB } from './config/db';
import { startMlService, stopMlService } from './config/mlService';
import { verifyEmailConnection } from './utils/email';

const PORT = process.env.PORT || 5000;

async function start() {
  await startMlService(); // logs a warning and continues if this fails - doesn't block the API

  try {
    await connectDB();
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }

  const server = app.listen(PORT, () => {
    console.log(`Blitz Paints API listening on http://localhost:${PORT}`);
  });
  const emailReady = await verifyEmailConnection();
  if (!emailReady) {
    console.warn('Email service is unavailable - enquiries will still save, but no notification will be sent.');
  }
  const shutdown = async (signal: string) => {
    console.log(`\n${signal} received. Shutting down gracefully...`);
    stopMlService();
    server.close(async () => {
      await disconnectDB();
      process.exit(0);
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

start();