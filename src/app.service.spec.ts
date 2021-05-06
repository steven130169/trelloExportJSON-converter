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
    const convertToExcel = appService.convertToExcel(trelloCards);
  });
});
