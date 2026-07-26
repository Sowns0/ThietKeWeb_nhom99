import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhieuMuon } from './phieu-muon.entity';
import { Sach } from '../sach/sach.entity';
import { DocGia } from '../doc-gia/doc-gia.entity';

@Injectable()
export class PhieuMuonService {
  constructor(
    @InjectRepository(PhieuMuon)
    private readonly phieuMuonRepository: Repository<PhieuMuon>,
    @InjectRepository(Sach)
    private readonly sachRepository: Repository<Sach>,
    @InjectRepository(DocGia)
    private readonly docGiaRepository: Repository<DocGia>,
  ) {}

  async create(data: Partial<PhieuMuon>): Promise<PhieuMuon> {
    if (data.doc_gia_id) {
      const docGia = await this.docGiaRepository.findOne({ where: { id: data.doc_gia_id } });
      if (!docGia) {
        throw new BadRequestException(`doc_gia_id ${data.doc_gia_id} không tồn tại`);
      }
    }

    if (data.sach_id) {
      const sach = await this.sachRepository.findOne({ where: { id: data.sach_id } });
      if (!sach) {
        throw new BadRequestException(`sach_id ${data.sach_id} không tồn tại`);
      }
    }

    const newPhieu = this.phieuMuonRepository.create(data);
    return await this.phieuMuonRepository.save(newPhieu);
  }

  async findAll(): Promise<PhieuMuon[]> {
    return await this.phieuMuonRepository.find();
  }

  async findOne(id: number): Promise<PhieuMuon> {
    const phieu = await this.phieuMuonRepository.findOne({ where: { id } });
    if (!phieu) throw new NotFoundException(`Không tìm thấy phiếu mượn ID ${id}`);
    return phieu;
  }

  async update(id: number, data: Partial<PhieuMuon>): Promise<PhieuMuon> {
    const phieu = await this.findOne(id);
    Object.assign(phieu, data);
    return await this.phieuMuonRepository.save(phieu);
  }

  async remove(id: number): Promise<void> {
    const phieu = await this.findOne(id);
    await this.phieuMuonRepository.remove(phieu);
  }
}
