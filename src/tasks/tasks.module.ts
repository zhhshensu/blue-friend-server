import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { UserModule } from '../user/user.module';
import { HouseModule } from '../house/house.module';

@Module({
  imports: [UserModule, HouseModule],
  providers: [TasksService],
})
export class TasksModule {}
