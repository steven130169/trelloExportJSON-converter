import { AppService } from './app.service';
import * as mockTrello from './__mocks__/exported.json';

describe('app.service', function () {
  let appService: AppService;
  beforeEach(() => {
    // eslint-disable-next-line prefer-const
    appService = new AppService();
  });

  it('should be get cards', function () {
    const trelloJSON: any = mockTrello;
    const expected = [
      {
        id: '5ff6f4bf984b6521289c0d87',
        address: null,
        checkItemStates: null,
        closed: false,
        coordinates: null,
        creationMethod: null,
        dateLastActivity: '2021-04-21T05:36:08.565Z',
      },
    ];
    const trelloCards = appService.getTrelloJSONCards(trelloJSON);
    expect(trelloCards[0]).toMatchObject(expected[0]);
  });
  it('should be convert to excel page', function () {
    const trelloCards = appService.getTrelloJSONCards(mockTrello);
    const trelloActions = appService.getTrelloJSONActions(mockTrello);
    const convertToExcel = appService.convertToExcel(
      trelloCards,
      trelloActions,
    );
    expect(convertToExcel).toBeInstanceOf(Buffer);
  });

  it('should be convert to excel page sheet', function () {
    const trelloCards = appService.getTrelloJSONCards(mockTrello);
    const expected = {
      CardId: '607fbf085938946d0ee4e611',
      IdList: '60823bb62cbaaf8c17a0c840',
      CardName: 'W096-01 主監控地圖>告警列表的即時影像無效',
      FrontOrBack: '前端',
      BugOrIssue: 'bug',
      LowOrMediumOrMajorOrCritical: 'High',
      Department: '研三',
      Urgent: true,
      StartDate: '2021-4-21',
      StartDateWeek: 16,
      DueDate: '2021-4-27',
      DueDateWeek: 17,
      ListName: '緊急項目驗收完成',
    };
    const trelloLists = appService.getTrelloJSONLists(mockTrello);
    expect(
      appService.convertCardsToSheet(trelloCards, trelloLists)[125],
    ).toMatchObject(expected);
  });

  it('should be convert to YYYY-MM-DD', function () {
    const mockISODate = '1970-01-01T00:00:00.000Z';
    const expected = '1970-1-1';
    const actual = appService.convertDateToYYYYMMDDByISODate(mockISODate);
    expect(actual).toEqual(expected);
  });
  it('should be get week', function () {
    const mockISODate = '1970-1-1';
    const expected = 1;
    const actual = appService.getWeek(mockISODate);
    expect(actual[1]).toEqual(expected);
  });
});
