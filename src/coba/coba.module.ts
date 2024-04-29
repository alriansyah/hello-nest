import { Module } from '@nestjs/common';
import { CobaController } from './coba.controller';

@Module({
  controllers: [CobaController]
})
export class CobaModule {}
