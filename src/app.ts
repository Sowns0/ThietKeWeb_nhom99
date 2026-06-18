import express from 'express';
import createDocGiaRouter from './doc-gia/doc-gia.module';

export function createApp() {
  const app = express();

  // Middleware
  app.use(express.json());

  // Routes
  app.use('/doc-gia', createDocGiaRouter());

  // Test route
  app.get('/', (req, res) => {
    res.send('🚀 Server Quản Lý Thư Viện đang chạy!');
  });

  return app;
}
