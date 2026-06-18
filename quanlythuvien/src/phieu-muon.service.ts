import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhieuMuon } from './phieu-muon.entity';

@Injectable()
export class PhieuMuonService {
  constructor(
    @InjectRepository(PhieuMuon)
    private readonly phieuMuonRepository: Repository<PhieuMuon>,
  ) {}

  // POST /phieu-muon
  async create(data: Partial<PhieuMuon>): Promise<PhieuMuon> {
    const newPhieu = this.phieuMuonRepository.create(data);
    return await this.phieuMuonRepository.save(newPhieu);
  }

  // GET /phieu-muon
  async findAll(): Promise<PhieuMuon[]> {
    return await this.phieuMuonRepository.find();
  }

  async findOne(id: number): Promise<PhieuMuon> {
    const phieu = await this.phieuMuonRepository.findOne({ where: { id } });
    if (!phieu) throw new NotFoundException(`Không tìm thấy phiếu mượn ID ${id}`);
    return phieu;
  }

  // PUT /phieu-muon/:id
  async update(id: number, data: Partial<PhieuMuon>): Promise<PhieuMuon> {
    const phieu = await this.findOne(id);
    Object.assign(phieu, data);
    return await this.phieuMuonRepository.save(phieu);
  }

  // DELETE /phieu-muon/:id
  async remove(id: number): Promise<void> {
    const phieu = await this.findOne(id);
    await this.phieuMuonRepository.remove(phieu);
  }
}