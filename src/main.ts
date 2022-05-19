import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug'],
  });
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const port = configService.get('port');
  app.enableCors();
  await app.listen(port);
}
bootstrap();
