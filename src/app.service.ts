import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';

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
  CardId: string;
  IdList: string;
  StartDate: string;
  FrontOrBack: string;
  CardName: string;
  Department: string;
  Urgent: boolean;
  LowOrMediumOrHigh: string;
  BugOrIssue: string;
  DueDate: string;
  ListName: string;
};

interface List {
  id: string;
  name: string;
  closed: boolean;
  pos: number;
  softLimit: null;
  creationMethod: null;
  idBoard: string;
  limits: {
    cards: {
      openPerList: {
        status: string;
        disableAt: number;
        warnAt: number;
      };
      totalPerList: {
        status: string;
        disableAt: number;
        warnAt: number;
      };
    };
  };
  subscribed: boolean;
}

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

  getTrelloJSONLists(trelloJSON: any) {
    return trelloJSON.lists;
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

  convertCardsToSheet(trelloCards: Card[], trelloLists: List[]): Sheet[] {
    const SheetArray: Sheet[] = [];
    for (const trelloCard of trelloCards) {
      const row: Sheet = {
        IdList: '',
        CardId: '',
        CardName: '',
        FrontOrBack: '',
        LowOrMediumOrHigh: '',
        BugOrIssue: '',
        Department: '',
        Urgent: false,
        StartDate: '',
        DueDate: '',
        ListName: '',
      };
      row.CardId = trelloCard.id;
      row.IdList = trelloCard.idList;
      row.CardName = trelloCard.name;
      row.DueDate = trelloCard.badges.due;
      row.StartDate = trelloCard.badges.start;
      for (const trelloList of trelloLists) {
        if (trelloCard.idList === trelloList.id) {
          row.ListName = trelloList.name;
        }
      }
      for (const label of trelloCard.labels) {
        if (label.id === '607fb9c802c92385ca7a4973') {
          row.Urgent = true;
        }
        if (
          label.id === '60586998158be7197805acef' ||
          label.id === '6058698d50fd7c842f8ff51d'
        ) {
          row.BugOrIssue = label.name;
        }
        if (
          label.id === '6058695d16c5518d01eac2c0' ||
          label.id === '605869542c110c1c57596200' ||
          label.id === '6082401e59d175532ab79416'
        ) {
          row.FrontOrBack = label.name;
        }
        if (
          label.id === '5ff6f4806542d4941900ccc9' ||
          label.id === '603261221e2b7c12ba525535' ||
          label.id === '5ff6f4806542d4941900cccb' ||
          label.id === '6034bdb7799fa01375ec695e' ||
          label.id === '6082403be433702922bf4a9d'
        ) {
          row.Department = label.name;
        }
        if (
          label.id === '5ff6f4806542d4941900ccca' ||
          label.id === '5ff6f4806542d4941900ccc4' ||
          label.id === '5ff6f4806542d4941900ccc5'
        ) {
          row.LowOrMediumOrHigh = label.name;
        }
      }
      console.debug(`row is ${JSON.stringify(row)}`);
      SheetArray.push(row);
    }
    return SheetArray;
  }
}
