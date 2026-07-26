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
exports.DocGiaController = void 0;
const common_1 = require("@nestjs/common");
const doc_gia_service_1 = require("./doc-gia.service");
const create_doc_gia_dto_1 = require("./dto/create-doc-gia.dto");
const update_doc_gia_dto_1 = require("./dto/update-doc-gia.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let DocGiaController = class DocGiaController {
    docGiaService;
    constructor(docGiaService) {
        this.docGiaService = docGiaService;
    }
    findAll() {
        return this.docGiaService.findAll();
    }
    findOne(id) {
        return this.docGiaService.findOne(Number(id));
    }
    create(body) {
        return this.docGiaService.create(body);
    }
    update(id, body) {
        return this.docGiaService.update(Number(id), body);
    }
    remove(id) {
        return this.docGiaService.remove(Number(id));
    }
};
exports.DocGiaController = DocGiaController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DocGiaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DocGiaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_doc_gia_dto_1.CreateDocGiaDto]),
    __metadata("design:returntype", void 0)
], DocGiaController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_doc_gia_dto_1.UpdateDocGiaDto]),
    __metadata("design:returntype", void 0)
], DocGiaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DocGiaController.prototype, "remove", null);
exports.DocGiaController = DocGiaController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('doc-gia'),
    __metadata("design:paramtypes", [doc_gia_service_1.DocGiaService])
], DocGiaController);
//# sourceMappingURL=doc-gia.controller.js.map