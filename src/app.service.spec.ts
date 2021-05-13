import { AppService, Sheet } from './app.service';
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
      CardName: 'W096-01 主監控地圖>告警列表的即時影像無效',
      FrontOrBack: '前端',
      BugOrIssue: 'bug',
      LowOrMediumOrHigh: 'High',
      Department: '研三',
      Urgent: true,
      StartDate: '2021-04-21T00:00:00.000Z',
      DueDate: '2021-04-27T00:24:00.000Z',
    };
    expect(appService.convertCardsToSheet(trelloCards)[125]).toMatchObject(
      expected,
    );
  });
});
