import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cho phép frontend localhost và GitHub Codespaces gọi backend
  app.enableCors({
    origin: [
      /^http:\/\/localhost:\d+$/,
      /^http:\/\/127\.0\.0\.1:\d+$/,
      /^https:\/\/.*\.app\.github\.dev$/,
    ],
    credentials: true,
    methods: [
      'GET',
      'POST',
      'PUT',
      'PATCH',
      'DELETE',
      'OPTIONS',
    ],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
    ],
  });

  // Đọc cookie từ request
  app.use(cookieParser());

  // Cấu hình session
  app.use(
    session({
      secret:
        process.env.SESSION_SECRET ??
        'library-dev-secret-change-me',

      resave: false,
      saveUninitialized: false,

      cookie: {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      },
    }),
  );

  const port = Number(process.env.PORT ?? 3000);

  await app.listen(port, '0.0.0.0');

  console.log(`App running on port ${port}`);
}

bootstrap();