import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getTrelloJSONCards(trelloJSON: any) {
    return trelloJSON.cards;
  }

  getTrelloJSONActions(trelloJSON: any) {
    return trelloJSON.actions;
  }

  convertToExcel(trelloCards: any, trelloActions: any) {
    const workBook = XLSX.utils.book_new();
    console.log(`trello file is converting to sheet`);
    const workSheetCards = XLSX.utils.json_to_sheet(trelloCards);
    XLSX.utils.book_append_sheet(workBook, workSheetCards, 'cards');
    const workSheetActions = XLSX.utils.json_to_sheet(trelloActions);
    XLSX.utils.book_append_sheet(workBook, workSheetActions, 'actions');
    console.log(`excel file is writing`);
    return XLSX.write(workBook, {
      bookType: 'xlsx',
      type: 'buffer',
    });
  }
  s2ab(wbBook) {
    const buf = new ArrayBuffer(wbBook.length); //convert wbBook to arrayBuffer
    const view = new Uint8Array(buf); //create uint8array as viewer
    for (let i = 0; i < wbBook.length; i++)
      view[i] = wbBook.charCodeAt(i) & 0xff; //convert to octet
    return buf;
  }
}
