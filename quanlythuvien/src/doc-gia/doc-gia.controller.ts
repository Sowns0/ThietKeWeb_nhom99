import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { DocGiaService } from './doc-gia.service';
import { CreateDocGiaDto } from './dto/create-doc-gia.dto';
import { UpdateDocGiaDto } from './dto/update-doc-gia.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('doc-gia')
export class DocGiaController {
  constructor(private readonly docGiaService: DocGiaService) {}

  @Get()
  findAll() {
    return this.docGiaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.docGiaService.findOne(Number(id));
  }

  @Post()
  create(@Body() body: CreateDocGiaDto) {
    return this.docGiaService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateDocGiaDto) {
    return this.docGiaService.update(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.docGiaService.remove(Number(id));
  }
}
