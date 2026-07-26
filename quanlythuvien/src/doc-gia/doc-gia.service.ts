import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocGia } from './doc-gia.entity';

@Injectable()
export class DocGiaService {
  constructor(
    @InjectRepository(DocGia)
    private readonly docGiaRepository: Repository<DocGia>,
  ) {}

  findAll() {
    return this.docGiaRepository.find();
  }

  async findOne(id: number) {
    const dg = await this.docGiaRepository.findOne({ where: { id } });
    if (!dg) throw new NotFoundException(`Không tìm thấy độc giả ID ${id}`);
    return dg;
  }

  create(data: Partial<DocGia>) {
    return this.docGiaRepository.save(data);
  }

  async update(id: number, data: Partial<DocGia>) {
    await this.findOne(id);
    await this.docGiaRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.docGiaRepository.delete(id);
  }
}
