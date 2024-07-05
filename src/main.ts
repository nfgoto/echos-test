import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// TODO: utiliser un module de configuration pour recuperer les variables d'environnement
const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();


  const config = new DocumentBuilder()
    .setTitle('Documentation API')
    .setDescription("documentation pour l'API Nest.js")
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(port);

  process.on('SIGINT', async () => {
    // TODO: handle process shutdown gracefully
    console.log('process interrupted');
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    // TODO: handle process shutdown gracefully
    console.log('process terminated');
    process.exit(0);
  });
}
bootstrap();
