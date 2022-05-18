import { Connection } from 'typeorm';
import { HouseService } from '../house/house.service';
export declare class TasksService {
    private readonly houseService;
    private readonly connection;
    private readonly logger;
    private getHouseInfo;
    constructor(houseService: HouseService, connection: Connection);
    handleTimeout(): Promise<void>;
    createHouseInfo(createInfo: any): Promise<void>;
}
