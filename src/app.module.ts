import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CobaModule } from './coba/coba.module';

@Module({
  imports: [UserModule, CobaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
