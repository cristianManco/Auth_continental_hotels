// Código para el módulo de persistencia en la aplicación de la cadena de hoteles
import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import dbConfig from './db_config';
import { Privated } from '../decorators/private.decorator';

@Privated()
@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof dbConfig>) => {
        const { db, env } = configService;
        const uriDb =
          env === 'local'
            ? `mongodb+srv://${db.user}:${db.password}@cluster0.mg3yga1.mongodb.net/`
            : `${db.connection}${db.host}/${db.name}`;
        return {
          uri: uriDb,
        };
      },
      inject: [dbConfig.KEY],
    }),
  ],
})
export class PersistenceModule {}
