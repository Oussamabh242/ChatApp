import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', // Replace with your frontend origin
    credentials: true, // Allow credentials
  });
  await app.listen(3001);
}
bootstrap();
