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
  //todo V 1. 前後端那一欄位，要新增「環境」的tag
  // 2. 開始與結束日期，只需要顯示YYYY-MM-DD
  // 3. 欄位改中文：前/後/環境端、等級、Bug/Issue、單位、緊急(Y/N)、開始日、結束日

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
    const trelloJSONLists = this.appService.getTrelloJSONLists(trelloJSON);
    const trelloCardsSheet = this.appService.convertCardsToSheet(
      trelloJSONCards,
      trelloJSONLists,
    );
    const convertToExcel = this.appService.convertToExcel(
      trelloCardsSheet,
      trelloJSONActions,
    );
    console.log(`file convert finished`);
    res.send(convertToExcel);
    return;
  }
}
