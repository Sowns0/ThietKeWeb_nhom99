import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Query } from '@nestjs/common';
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

  @Get('scrape-pinterest')
  async scrapePinterest(@Query('q') q: string) {
    try {
      const response = await fetch(`https://www.pinterest.com/search/pins/?q=${encodeURIComponent(q)}`);
      const html = await response.text();
      const match = html.match(/https:\/\/i\.pinimg\.com\/[a-zA-Z0-9x]+\/[0-9a-f\/]+\.(?:jpg|png|jpeg|webp)/i);
      if (match && match[0]) {
        return { url: match[0] };
      }
      return { url: '' };
    } catch (e) {
      return { url: '' };
    }
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
