import { Controller, Get, Param, Res } from '@nestjs/common';
import { join } from 'path';

const uploadDistDir = join(__dirname, '../../dist/', 'upload_dist');
console.log('uploadDistDir', uploadDistDir);

@Controller('static')
export class StaticController {
  @Get(':subPath')
  render(@Param('subPath') subPath, @Res() res) {
    const filePath = join(uploadDistDir, subPath);
    return res.sendFile(filePath);
  }
}
