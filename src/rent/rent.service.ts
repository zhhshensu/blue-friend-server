import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRentDto } from './dto/create-rent.dto';
import { Rent } from './entities/rent-entity';

@Injectable()
export class RentService {
  constructor(
    @InjectRepository(Rent) private readonly rentRepository: Repository<Rent>,
  ) {}

  findAll() {
    return this.rentRepository.find();
  }

  create(createRentDto: CreateRentDto) {
    const rent = this.rentRepository.create(createRentDto);
    return this.rentRepository.save(rent);
  }
}
