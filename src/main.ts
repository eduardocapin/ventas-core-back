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
        format: winston.format.combine(
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}] ${message}`;
          }),
        ),
      }),
      // Log de rotación diaria
      new winston.transports.DailyRotateFile({
        filename: 'logs/%DATE%-converter-back.log', // Nombre con fecha
        datePattern: 'YYYY-MM-DD',                  // Formato de fecha en el nombre
        level: 'info',                              // Nivel mínimo de log
        zippedArchive: true,                        // Comprimir los antiguos
        maxSize: '20m',                             // Máximo 20MB por archivo
        maxFiles: '14d',                            // Mantener 14 días
        format: winston.format.combine(
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          winston.format.printf(({ timestamp, level, message, context }) => {
            return `${timestamp} [${level.toUpperCase()}]${context ? ' [' + context + ']' : ''} ${message}`;
          }),
        ),
      }),
    ],
  });

  const app = await NestFactory.create(AppModule, { logger });
  
  // Habilitar CORS
  app.enableCors({
    origin: ['http://localhost:4200', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });
  
  // Establece el prefijo global para todas las rutas
  app.setGlobalPrefix('api');
  // Habilitar la validación global
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Convierte los parámetros de tipo string a tipo correcto
  }));

  app.useLogger(logger);
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
