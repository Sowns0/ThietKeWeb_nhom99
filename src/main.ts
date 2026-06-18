import { createApp } from './app';

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const app = createApp();

app.listen(PORT, () => {
  console.log(`✅ Server đang chạy tại: http://localhost:${PORT}`);
  console.log(`📌 DocGia API: http://localhost:${PORT}/doc-gia`);
});
