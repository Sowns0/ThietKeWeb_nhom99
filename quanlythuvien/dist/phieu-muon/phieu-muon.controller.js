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
exports.PhieuMuonController = void 0;
const common_1 = require("@nestjs/common");
const phieu_muon_service_1 = require("./phieu-muon.service");
const create_phieu_muon_dto_1 = require("./dto/create-phieu-muon.dto");
const update_phieu_muon_dto_1 = require("./dto/update-phieu-muon.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let PhieuMuonController = class PhieuMuonController {
    phieuMuonService;
    constructor(phieuMuonService) {
        this.phieuMuonService = phieuMuonService;
    }
    create(data) {
        return this.phieuMuonService.create(data);
    }
    findAll() {
        return this.phieuMuonService.findAll();
    }
    update(id, data) {
        return this.phieuMuonService.update(+id, data);
    }
    remove(id) {
        return this.phieuMuonService.remove(+id);
    }
};
exports.PhieuMuonController = PhieuMuonController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_phieu_muon_dto_1.CreatePhieuMuonDto]),
    __metadata("design:returntype", void 0)
], PhieuMuonController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PhieuMuonController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_phieu_muon_dto_1.UpdatePhieuMuonDto]),
    __metadata("design:returntype", void 0)
], PhieuMuonController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PhieuMuonController.prototype, "remove", null);
exports.PhieuMuonController = PhieuMuonController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('phieu-muon'),
    __metadata("design:paramtypes", [phieu_muon_service_1.PhieuMuonService])
], PhieuMuonController);
//# sourceMappingURL=phieu-muon.controller.js.map