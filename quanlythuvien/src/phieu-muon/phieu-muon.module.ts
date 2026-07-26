import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhieuMuonController } from './phieu-muon.controller';
import { PhieuMuonService } from './phieu-muon.service';
import { PhieuMuon } from './phieu-muon.entity';
import { Sach } from '../sach/sach.entity';
import { DocGia } from '../doc-gia/doc-gia.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PhieuMuon, Sach, DocGia])
  ],
  controllers: [PhieuMuonController],
  providers: [PhieuMuonService],
})
export class PhieuMuonModule {}
