"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSachDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_sach_dto_1 = require("./create-sach.dto");
class UpdateSachDto extends (0, mapped_types_1.PartialType)(create_sach_dto_1.CreateSachDto) {
}
exports.UpdateSachDto = UpdateSachDto;
//# sourceMappingURL=update-sach.dto.js.map