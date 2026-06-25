import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';
import createDocGiaRouter from './doc-gia/doc-gia.module';
import { defaultDocGiaService } from './doc-gia/doc-gia.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use('/doc-gia', createDocGiaRouter(defaultDocGiaService));

  const port = Number(process.env.PORT || 3000);
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
