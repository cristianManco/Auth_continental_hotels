// Código para la aplicación de la cadena de hoteles
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './develop/persistence/db_config';
import { PersistenceModule } from './develop/persistence/persistence.module';
import { AuthModule } from './develop/authenticate/auth.module';
import { AdminModule } from './hotels-modules/admin/admin.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './develop/authenticate/Guard/jwt.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,
    }),
    PersistenceModule,
    AuthModule,
    AdminModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
