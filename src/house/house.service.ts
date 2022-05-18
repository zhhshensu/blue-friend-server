import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHouseDto } from './dto/create-house.dto';
import { House } from './entities/house-entity';

@Injectable()
export class HouseService {
  constructor(
    @InjectRepository(House)
    private readonly houseRepository: Repository<House>,
  ) {}

  findAll() {
    return this.houseRepository.find({
      skip: 0,
      take: 50
    });
  }

  create(createHouseDto: CreateHouseDto) {
    const house = this.houseRepository.create(createHouseDto);
    return this.houseRepository.save(house);
  }
}
