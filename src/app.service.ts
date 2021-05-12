import { Injectable } from "@nestjs/common";
import * as XLSX from "xlsx";

export type Card = {
  descData: { emoji: any };
  attachments: {
    date: string;
    edgeColor: string;
    fileName: string;
    pos: number;
    bytes: number;
    idMember: string;
    name: string;
    previews: {
      scaled: boolean;
      bytes: number;
      width: number;
      _id: string;
      id: string;
      url: string;
      height: number;
    }[];
    isUpload: boolean;
    mimeType: string;
    id: string;
    url: string;
  }[];
  idLabels: string[];
  shortUrl: string;
  dueComplete: boolean;
  dateLastActivity: string;
  idList: string;
  idMembersVoted: any[];
  shortLink: string;
  creationMethod: null;
  cover: {
    idUploadedBackground: null;
    brightness: string;
    color: null;
    size: string;
    idAttachment: null;
    idPlugin: null;
  };
  dueReminder: number;
  subscribed: boolean;
  pos: number;
  idChecklists: any[];
  pluginData: any[];
  id: string;
  email: string;
  limits: {
    checklists: {
      perCard: { warnAt: number; disableAt: number; status: string };
    };
    attachments: {
      perCard: { warnAt: number; disableAt: number; status: string };
    };
    stickers: {
      perCard: { warnAt: number; disableAt: number; status: string };
    };
  };
  customFieldItems: any[];
  address: null;
  idBoard: string;
  locationName: null;
  cardRole: null;
  coordinates: null;
  start: string;
  checkItemStates: null;
  url: string;
  labels: {
    idBoard: string;
    color: null | string;
    name: string;
    id: string;
  }[];
  badges: {
    comments: number;
    attachments: number;
    attachmentsByType: { trello: { board: number; card: number } };
    dueComplete: boolean;
    start: string;
    description: boolean;
    checkItemsEarliestDue: null;
    subscribed: boolean;
    due: null;
    viewingMemberVoted: boolean;
    location: boolean;
    votes: number;
    fogbugz: string;
    checkItems: number;
    checkItemsChecked: number;
  };
  idMembers: string[];
  idShort: number;
  due: null;
  idAttachmentCover: string;
  isTemplate: boolean;
  name: string;
  closed: boolean;
  manualCoverAttachment: boolean;
  desc: string;
};
export type Sheet = {
  StartDate: string;
  FrontOrBack: string;
  CardName: string;
  Department: string;
  Urgent: boolean;
  LowOrMediumOrHigh: string;
  BugOrIssue: string;
  DueDate: string;
};

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getTrelloJSONCards(trelloJSON: any): Card[] {
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

  convertCardsToSheet(trelloCards: Card[]) {
    for (const trelloCard of trelloCards) {
      let row: Sheet;
      row.CardName = trelloCard.name;
    }
  }
}
