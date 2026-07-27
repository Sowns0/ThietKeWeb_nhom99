import { PhieuMuonService } from './phieu-muon.service';
import { CreatePhieuMuonDto } from './dto/create-phieu-muon.dto';
import { UpdatePhieuMuonDto } from './dto/update-phieu-muon.dto';
export declare class PhieuMuonController {
    private readonly phieuMuonService;
    constructor(phieuMuonService: PhieuMuonService);
    create(data: CreatePhieuMuonDto): Promise<import("./phieu-muon.entity").PhieuMuon>;
    findAll(): Promise<import("./phieu-muon.entity").PhieuMuon[]>;
    update(id: string, data: UpdatePhieuMuonDto): Promise<import("./phieu-muon.entity").PhieuMuon>;
    remove(id: string): Promise<void>;
}
