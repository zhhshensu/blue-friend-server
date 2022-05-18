import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreateRentDto } from './dto/create-rent.dto';
import { RentService } from './rent.service';

@Controller('rent')
export class RentController {
  constructor(private readonly rentService: RentService) {}
  @Get()
  findAll() {
    return this.rentService.findAll();
  }
  @Post()
  create(@Body() createRentDto: CreateRentDto) {
    return this.rentService.create(createRentDto);
  }
}
