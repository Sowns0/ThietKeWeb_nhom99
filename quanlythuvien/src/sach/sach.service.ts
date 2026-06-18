import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Sach } from './sach.entity';

@Injectable()
export class SachService {
  constructor(
    @InjectRepository(Sach)
    private sachRepository: Repository<Sach>,
  ) {}

  findAll() {
    return this.sachRepository.find();
  }

  findOne(id: number) {
    return this.sachRepository.findOne({
      where: { id },
    });
  }

  create(data: Partial<Sach>) {
    return this.sachRepository.save(data);
  }

  update(id: number, data: Partial<Sach>) {
    return this.sachRepository.update(id, data);
  }

  remove(id: number) {
    return this.sachRepository.delete(id);
  }
}