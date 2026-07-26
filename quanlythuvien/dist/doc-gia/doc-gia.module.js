"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocGiaModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const doc_gia_entity_1 = require("./doc-gia.entity");
const doc_gia_controller_1 = require("./doc-gia.controller");
const doc_gia_service_1 = require("./doc-gia.service");
let DocGiaModule = class DocGiaModule {
};
exports.DocGiaModule = DocGiaModule;
exports.DocGiaModule = DocGiaModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([doc_gia_entity_1.DocGia])],
        controllers: [doc_gia_controller_1.DocGiaController],
        providers: [doc_gia_service_1.DocGiaService],
    })
], DocGiaModule);
//# sourceMappingURL=doc-gia.module.js.map