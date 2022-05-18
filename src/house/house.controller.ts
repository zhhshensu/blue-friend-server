import { Controller, Get, Post, Body } from '@nestjs/common';
import { HouseService } from './house.service';

@Controller('house')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @Get()
  findAll() {
    return this.houseService.findAll();
  }
}
