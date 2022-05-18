import { Repository } from 'typeorm';
import { CreateHouseDto } from './dto/create-house.dto';
import { House } from './entities/house-entity';
export declare class HouseService {
    private readonly houseRepository;
    constructor(houseRepository: Repository<House>);
    findAll(): Promise<House[]>;
    create(createHouseDto: CreateHouseDto): Promise<House>;
}
