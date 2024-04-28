import { Module } from '@nestjs/common';
import { EncriptService } from './encript/encript.service';

const providers = [EncriptService];

@Module({
  providers: [],
  controllers: [],
  exports: [...providers],
})
export class ShareModule {}
