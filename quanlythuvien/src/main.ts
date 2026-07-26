import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { AppModule } from './app.module';
import cookieParser = require('cookie-parser');
import session = require('express-session');
import { UserService } from './user/user.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: '*',
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

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use(cookieParser());
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
      },
    }),
  );

  // Serve frontend static files from the backend so both share the same origin.
  try {
    const staticPath = join(process.cwd(), 'library-ui');
    app.useStaticAssets(staticPath);
    console.log('Serving static assets from', staticPath);
  } catch (err) {
    console.warn('Failed to serve static assets:', err?.message ?? err);
  }

  const userService = app.get(UserService);
  await userService.ensureDefaultUser();

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port, '0.0.0.0');
  console.log(`App running on port ${port}`);
}
bootstrap();
