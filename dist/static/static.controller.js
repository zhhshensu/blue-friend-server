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
exports.StaticController = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const uploadDistDir = (0, path_1.join)(__dirname, '../../dist/', 'upload_dist');
console.log('uploadDistDir', uploadDistDir);
let StaticController = class StaticController {
    render(subPath, res) {
        const filePath = (0, path_1.join)(uploadDistDir, subPath);
        return res.sendFile(filePath);
    }
};
__decorate([
    (0, common_1.Get)(':subPath'),
    __param(0, (0, common_1.Param)('subPath')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], StaticController.prototype, "render", null);
StaticController = __decorate([
    (0, common_1.Controller)('static')
], StaticController);
exports.StaticController = StaticController;
//# sourceMappingURL=static.controller.js.map