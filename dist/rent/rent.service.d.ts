import { Repository } from 'typeorm';
import { CreateRentDto } from './dto/create-rent.dto';
import { Rent } from './entities/rent-entity';
export declare class RentService {
    private readonly rentRepository;
    constructor(rentRepository: Repository<Rent>);
    findAll(): Promise<Rent[]>;
    create(createRentDto: CreateRentDto): Promise<Rent>;
}
