import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Sach } from './sach.entity';
import { SachController } from './sach.controller';
import { SachService } from './sach.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sach]),
  ],
  controllers: [SachController],
  providers: [SachService],
})
export class SachModule {}