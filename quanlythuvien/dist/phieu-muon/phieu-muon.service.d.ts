import { Repository } from 'typeorm';
import { PhieuMuon } from './phieu-muon.entity';
import { Sach } from '../sach/sach.entity';
import { DocGia } from '../doc-gia/doc-gia.entity';
export declare class PhieuMuonService {
    private readonly phieuMuonRepository;
    private readonly sachRepository;
    private readonly docGiaRepository;
    constructor(phieuMuonRepository: Repository<PhieuMuon>, sachRepository: Repository<Sach>, docGiaRepository: Repository<DocGia>);
    create(data: Partial<PhieuMuon>): Promise<PhieuMuon>;
    findAll(): Promise<PhieuMuon[]>;
    findOne(id: number): Promise<PhieuMuon>;
    update(id: number, data: Partial<PhieuMuon>): Promise<PhieuMuon>;
    remove(id: number): Promise<void>;
}
