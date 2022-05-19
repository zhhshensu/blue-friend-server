"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const common_module_1 = require("./common/common.module");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const configuration_1 = require("./config/configuration");
const schedule_1 = require("@nestjs/schedule");
const tasks_module_1 = require("./tasks/tasks.module");
const house_module_1 = require("./house/house.module");
const user_module_1 = require("./user/user.module");
const upload_module_1 = require("./upload/upload.module");
const static_module_1 = require("./static/static.module");
const rent_module_1 = require("./rent/rent.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const { host = 'localhost', port = 5432, username = 'postgres', password, database, synchronize, } = configService.get('db');
                    return {
                        type: 'postgres',
                        host,
                        port,
                        username,
                        password,
                        database,
                        autoLoadEntities: true,
                        synchronize,
                    };
                },
            }),
            common_module_1.CommonModule,
            schedule_1.ScheduleModule.forRoot(),
            tasks_module_1.TasksModule,
            house_module_1.HouseModule,
            user_module_1.UserModule,
            upload_module_1.UploadModule,
            static_module_1.StaticModule,
            rent_module_1.RentModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map