// Código para el módulo de persistencia en la aplicación de la cadena de hoteles
import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import dbConfig from './db_config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof dbConfig>) => {
        const { db, env } = configService;
        const uriDb =
          env === 'local'
            ? `${db.connection}${db.host}/${db.name}`
            : `mongodb+srv://${db.user}:${db.password}@continental.9suzdf4.mongodb.net/${db.atlas}`;
        return {
          uri: uriDb,
        };
      },
      inject: [dbConfig.KEY],
    }),
  ],
})
export class PersistenceModule {}

// import { Global, Module } from '@nestjs/common';
// import { ConfigType } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';
// import dbConfig from './db_config';

// @Global()
// @Module({
//   imports: [
//     MongooseModule.forRootAsync({
//       useFactory: (configService: ConfigType<typeof dbConfig>) => {
//         const { db, env } = configService;
//         const uriDb =
//           env === 'local'
//             ? `${db.connection}${db.host}/${db.name}`
//             : `mongodb+srv://${db.user}:${db.password}@continental.9suzdf4.mongodb.net/${db.atlas}?retryWrites=true&w=majority&appName=continental`;
//         return {
//           uri: uriDb,
//         };
//       },
//       inject: [dbConfig.KEY],
//     }),
//   ],
// })
// export class PersistenceModule {}
