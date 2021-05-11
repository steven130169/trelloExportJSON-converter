import {
  Controller,
  Get,
  Post,
  Render,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { AppService } from './app.service';
import { Express, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root() {
    return { message: 'select your trello exported json' };
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    res.header(
      'Content-disposition',
      'attachment; filename=anlikodullendirme.xlsx',
    );
    res.type(
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    const trelloJSON = JSON.parse(file.buffer.toString());
    const trelloJSONCards = this.appService.getTrelloJSONCards(trelloJSON);
    const trelloJSONActions = this.appService.getTrelloJSONActions(trelloJSON);
    const convertToExcel = this.appService.convertToExcel(
      trelloJSONCards,
      trelloJSONActions,
    );
    console.log(`file convert finished`);
    res.send(convertToExcel);
    return;
  }
}
