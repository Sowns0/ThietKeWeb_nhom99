"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhieuMuonService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const phieu_muon_entity_1 = require("./phieu-muon.entity");
const sach_entity_1 = require("../sach/sach.entity");
const doc_gia_entity_1 = require("../doc-gia/doc-gia.entity");
let PhieuMuonService = class PhieuMuonService {
    phieuMuonRepository;
    sachRepository;
    docGiaRepository;
    constructor(phieuMuonRepository, sachRepository, docGiaRepository) {
        this.phieuMuonRepository = phieuMuonRepository;
        this.sachRepository = sachRepository;
        this.docGiaRepository = docGiaRepository;
    }
    async create(data) {
        if (data.doc_gia_id) {
            const docGia = await this.docGiaRepository.findOne({ where: { id: data.doc_gia_id } });
            if (!docGia) {
                throw new common_1.BadRequestException(`doc_gia_id ${data.doc_gia_id} không tồn tại`);
            }
        }
        if (data.sach_id) {
            const sach = await this.sachRepository.findOne({ where: { id: data.sach_id } });
            if (!sach) {
                throw new common_1.BadRequestException(`sach_id ${data.sach_id} không tồn tại`);
            }
        }
        const newPhieu = this.phieuMuonRepository.create(data);
        return await this.phieuMuonRepository.save(newPhieu);
    }
    async findAll() {
        return await this.phieuMuonRepository.find();
    }
    async findOne(id) {
        const phieu = await this.phieuMuonRepository.findOne({ where: { id } });
        if (!phieu)
            throw new common_1.NotFoundException(`Không tìm thấy phiếu mượn ID ${id}`);
        return phieu;
    }
    async update(id, data) {
        const phieu = await this.findOne(id);
        Object.assign(phieu, data);
        return await this.phieuMuonRepository.save(phieu);
    }
    async remove(id) {
        const phieu = await this.findOne(id);
        await this.phieuMuonRepository.remove(phieu);
    }
};
exports.PhieuMuonService = PhieuMuonService;
exports.PhieuMuonService = PhieuMuonService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(phieu_muon_entity_1.PhieuMuon)),
    __param(1, (0, typeorm_1.InjectRepository)(sach_entity_1.Sach)),
    __param(2, (0, typeorm_1.InjectRepository)(doc_gia_entity_1.DocGia)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PhieuMuonService);
//# sourceMappingURL=phieu-muon.service.js.map