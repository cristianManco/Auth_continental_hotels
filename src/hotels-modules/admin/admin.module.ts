import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { admins, adminSchema } from './entities/admin.entity';
import { AdminController } from './controllers/admin.controller';
import { AdminService } from './services/admin.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: admins.name,
        schema: adminSchema,
      },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
