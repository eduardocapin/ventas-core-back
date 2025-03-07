import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = WinstonModule.createLogger({
    transports: [
      // Logs en consola
      new winston.transports.Console({
        format: winston.format.simple(),
      }),
      // Log de rotación diaria
      new winston.transports.DailyRotateFile({
        filename: 'logs/%DATE%-converter-back.txt', // Usará la fecha para nombrar los archivos
        datePattern: 'YYYY-MM-DD', // Formato de fecha en el nombre del archivo
        level: 'info', // Nivel de log mínimo
        zippedArchive: true, // Comprime los logs antiguos
        maxSize: '20m', // Tamaño máximo del archivo antes de rotar (20MB)
        maxFiles: '14d', // Cuántos días mantener los logs
      }),
    ],
  });

  const app = await NestFactory.create(AppModule, { logger });
  // Establece el prefijo global para todas las rutas
  app.setGlobalPrefix('api');
  // Habilitar la validación global
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Convierte los parámetros de tipo string a tipo correcto
  }));

  //Documentación
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Descripción de tu API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
