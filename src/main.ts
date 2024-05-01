// Código para la aplicación de la cadena de hoteles
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  const config = new DocumentBuilder()
    .setTitle('Continental Hotels API')
    .setDescription('API para la gestión de la cadena de hoteles Continental.')
    .setVersion('1.0')
    .addTag('Hoteles')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(
    `La aplicación está en ejecución en: http://localhost:${port}/api`,
  );
}
bootstrap();
