import { HouseService } from './house.service';
export declare class HouseController {
    private readonly houseService;
    constructor(houseService: HouseService);
    findAll(): Promise<import("./entities/house-entity").House[]>;
}
