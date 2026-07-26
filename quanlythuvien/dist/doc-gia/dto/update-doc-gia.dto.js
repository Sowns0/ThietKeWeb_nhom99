"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDocGiaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_doc_gia_dto_1 = require("./create-doc-gia.dto");
class UpdateDocGiaDto extends (0, mapped_types_1.PartialType)(create_doc_gia_dto_1.CreateDocGiaDto) {
}
exports.UpdateDocGiaDto = UpdateDocGiaDto;
//# sourceMappingURL=update-doc-gia.dto.js.map