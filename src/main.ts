import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  app.enableCors(); // permite  habilitar el envio de datos del puerto de ejecucion de reactjs

  const config = new DocumentBuilder()
    .setTitle('Continental Hotels API')
    .setDescription(
      'The Continental Hotels API provides a complete interface for hotel management, including reservations, room management, billing and more. This API is designed to be easy to use and highly flexible, allowing easy integration with a variety of hotel management systems.',
    )
    .setVersion('1.0')
    .addTag('Hotels', 'Operations related to hotel management')
    .addTag('Reservas', 'Operations related to hotel reservation management')
    .addTag('Billing', 'Invoicing and payment transactions')
    .addBearerAuth() // Adds support for Bearer authentication
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.setGlobalPrefix('/api');
  await app.listen(port);
  console.log(`The application is running in: http://localhost:${port}/api`);
}
bootstrap();

