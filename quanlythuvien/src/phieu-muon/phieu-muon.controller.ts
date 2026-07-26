import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { PhieuMuonService } from './phieu-muon.service';
import { CreatePhieuMuonDto } from './dto/create-phieu-muon.dto';
import { UpdatePhieuMuonDto } from './dto/update-phieu-muon.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('phieu-muon')
export class PhieuMuonController {
  constructor(private readonly phieuMuonService: PhieuMuonService) {}

  @Post()
  create(@Body() data: CreatePhieuMuonDto) {
    return this.phieuMuonService.create(data);
  }

  @Get()
  findAll() {
    return this.phieuMuonService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdatePhieuMuonDto) {
    return this.phieuMuonService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.phieuMuonService.remove(+id);
  }
}
