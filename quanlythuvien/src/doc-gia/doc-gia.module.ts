import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocGia } from './doc-gia.entity';
import { DocGiaController } from './doc-gia.controller';
import { DocGiaService } from './doc-gia.service';

@Module({
  imports: [TypeOrmModule.forFeature([DocGia])],
  controllers: [DocGiaController],
  providers: [DocGiaService],
})
export class DocGiaModule {}
