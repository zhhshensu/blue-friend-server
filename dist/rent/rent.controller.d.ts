import { CreateRentDto } from './dto/create-rent.dto';
import { RentService } from './rent.service';
export declare class RentController {
    private readonly rentService;
    constructor(rentService: RentService);
    findAll(): Promise<import("./entities/rent-entity").Rent[]>;
    create(createRentDto: CreateRentDto): Promise<import("./entities/rent-entity").Rent>;
}
