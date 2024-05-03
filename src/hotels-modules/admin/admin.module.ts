// Código para el módulo de administradores en la aplicación de la cadena de hoteles
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './entities/admin.entity';
import { AdminController } from './controllers/admin.controller';
import { AdminService } from './services/admin.service';
// import { ResetPasswordController } from './controllers/resetPassword.controller';
// import { UsersService } from './services/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Admin.name,
        schema: AdminSchema,
      },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
