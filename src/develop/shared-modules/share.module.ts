import { Module } from '@nestjs/common';
import { EncriptService } from './encript/encript.service';

const providers = [EncriptService];

@Module({
  providers: [...providers],
  exports: [...providers],
})
export class ShareModule {}
