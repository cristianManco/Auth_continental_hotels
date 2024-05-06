// Código para la aplicación de la cadena de hoteles
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  const config = new DocumentBuilder()
    .setTitle('Continental Hotels API')
    .setDescription(
      'La API de Continental Hotels proporciona una interfaz completa para la gestión de hoteles, incluyendo reservas, administración de habitaciones, facturación y más. Esta API está diseñada para ser fácil de usar y altamente flexible, permitiendo una integración sencilla con una variedad de sistemas de gestión de hoteles.',
    )
    .setVersion('1.0')
    .addTag('Hoteles', 'Operaciones relacionadas con la gestión de hoteles')
    .addTag(
      'Reservas',
      'Operaciones relacionadas con la gestión de reservas de hotel',
    )
    .addTag(
      'Facturación',
      'Operaciones relacionadas con la facturación y los pagos',
    )
    .addBearerAuth() // Añade soporte para la autenticación Bearer
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix('/api');
  await app.listen(port);
  console.log(
    `La aplicación está en ejecución en: http://localhost:${port}/api`,
  );
}
bootstrap();
