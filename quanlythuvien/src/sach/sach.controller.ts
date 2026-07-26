import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { SachService } from './sach.service';
import { CreateSachDto } from './dto/create-sach.dto';
import { UpdateSachDto } from './dto/update-sach.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('sach')
export class SachController {
  constructor(private readonly sachService: SachService) {}

  @Get()
  findAll() {
    return this.sachService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sachService.findOne(Number(id));
  }

  @Post()
  create(@Body() body: CreateSachDto) {
    return this.sachService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateSachDto) {
    return this.sachService.update(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sachService.remove(Number(id));
  }
}
