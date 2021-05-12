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
    const sheet: Sheet[] = [
      {
        CardName: '',
        FrontOrBack: '',
        BugOrIssue: '',
        LowOrMediumOrHigh: '',
        Department: '',
        Urgent: true,
        StartDate: '',
        DueDate: '',
      },
    ];
    const trelloCards = appService.getTrelloJSONCards(mockTrello);
    console.info(`trelloCards`, trelloCards);
    expect(appService.convertCardsToSheet(trelloCards)[0]).toMatchObject({
      CardName: 'card name',
      FrontOrBack: '前端',
      BugOrIssue: 'bug',
      LowOrMediumOrHigh: 'Low',
      Department: '研三',
      Urgent: true,
      StartDate: '2021-04-24T00:00:00.000Z',
      DueDate: '2021-04-24T00:00:00.000Z',
    });
  });
});
