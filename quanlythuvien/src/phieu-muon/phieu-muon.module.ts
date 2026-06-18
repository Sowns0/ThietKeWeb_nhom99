import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhieuMuonController } from './phieu-muon.controller';
import { PhieuMuonService } from './phieu-muon.service';
import { PhieuMuon } from './phieu-muon.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PhieuMuon])
  ],
  controllers: [PhieuMuonController],
  providers: [PhieuMuonService],
})
export class PhieuMuonModule {}