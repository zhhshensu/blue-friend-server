import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';
import { HouseModule } from './house/house.module';
import { UserModule } from './user/user.module';
import { UploadModule } from './upload/upload.module';
import { StaticModule } from './static/static.module';
import { RentModule } from './rent/rent.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: '.env', //
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const {
          host = 'localhost',
          port = 5432,
          username = 'postgres',
          password,
          database,
          synchronize,
        } = configService.get('db');
        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          autoLoadEntities: true,
          synchronize,
        };
      },
    }),
    CommonModule,
    ScheduleModule.forRoot(),
    TasksModule,
    HouseModule,
    UserModule,
    UploadModule,
    StaticModule,
    RentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
