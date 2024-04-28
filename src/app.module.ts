import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import db_config from './develop/persistence/db_config';
import { PersistenceModule } from './develop/persistence/persistence.module';
import { AuthModule } from './develop/authenticate/auth.module';
import { AdminModule } from './hotels-modules/admin/admin.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './develop/authenticate/Guard/jwt.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [db_config],
    }),
    PersistenceModule,
    AuthModule,
    AdminModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
