import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { staticBaseUrl } from './constants';

@Controller('upload')
export class UploadController {
  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return {
      name: file.originalname,
      url: staticBaseUrl + file.originalname,
      status: 'success',
      message: '上传成功',
      type: 'image',
    };
  }
}
