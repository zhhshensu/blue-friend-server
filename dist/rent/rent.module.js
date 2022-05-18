"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentModule = void 0;
const common_1 = require("@nestjs/common");
const rent_service_1 = require("./rent.service");
const rent_controller_1 = require("./rent.controller");
const typeorm_1 = require("@nestjs/typeorm");
const rent_entity_1 = require("./entities/rent-entity");
let RentModule = class RentModule {
};
RentModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([rent_entity_1.Rent])],
        providers: [rent_service_1.RentService],
        controllers: [rent_controller_1.RentController],
    })
], RentModule);
exports.RentModule = RentModule;
//# sourceMappingURL=rent.module.js.map