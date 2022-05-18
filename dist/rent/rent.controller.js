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
exports.RentController = void 0;
const common_1 = require("@nestjs/common");
const create_rent_dto_1 = require("./dto/create-rent.dto");
const rent_service_1 = require("./rent.service");
let RentController = class RentController {
    constructor(rentService) {
        this.rentService = rentService;
    }
    findAll() {
        return this.rentService.findAll();
    }
    create(createRentDto) {
        return this.rentService.create(createRentDto);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rent_dto_1.CreateRentDto]),
    __metadata("design:returntype", void 0)
], RentController.prototype, "create", null);
RentController = __decorate([
    (0, common_1.Controller)('rent'),
    __metadata("design:paramtypes", [rent_service_1.RentService])
], RentController);
exports.RentController = RentController;
//# sourceMappingURL=rent.controller.js.map