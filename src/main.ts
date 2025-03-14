import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // Swagger-Import



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger Konfiguration
  const config = new DocumentBuilder()
    .setTitle('Dishcovery API') // Titel deiner API
    .setDescription('Die API-Dokumentation für Dishcovery') // Beschreibung
    .setVersion('1.0') // API-Version
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger unter /api verfügbar


  app.enableCors({
    origin: 'http://localhost:4200', //Frontend-Port
    credentials: true,
  })

  await app.listen(3001); //Statischer Port festgelegt
}
bootstrap();
