"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRentDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_rent_dto_1 = require("./create-rent.dto");
class UpdateRentDto extends (0, mapped_types_1.PartialType)(create_rent_dto_1.CreateRentDto) {
}
exports.UpdateRentDto = UpdateRentDto;
//# sourceMappingURL=update-rent.dto.js.map