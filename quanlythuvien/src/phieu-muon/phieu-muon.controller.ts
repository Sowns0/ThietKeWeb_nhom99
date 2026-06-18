import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PhieuMuonService } from './phieu-muon.service';
import { PhieuMuon } from './phieu-muon.entity';

@Controller('phieu-muon')
export class PhieuMuonController {
  constructor(private readonly phieuMuonService: PhieuMuonService) {}

  @Post()
  create(@Body() data: Partial<PhieuMuon>) {
    return this.phieuMuonService.create(data);
  }

  @Get()
  findAll() {
    return this.phieuMuonService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<PhieuMuon>) {
    return this.phieuMuonService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.phieuMuonService.remove(+id);
  }
}