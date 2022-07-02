import axios from 'axios';
import { getApiData } from './apiClient';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('The API client', () => {

  it('should retrieve data from the API', async () => {

    const data = [
      {
        "@id": "http://environment.data.gov.uk/flood-monitoring/data/readings/E73639-anglian-level-tidal_level-Mean-15_min-mAOD/2022-07-02T11-30-00Z",
        "dateTime": "2022-07-02T11:30:00Z",
        "measure": "http://environment.data.gov.uk/flood-monitoring/id/measures/E73639-anglian-level-tidal_level-Mean-15_min-mAOD",
        "value": 1.521
      },
      {
        "@id": "http://environment.data.gov.uk/flood-monitoring/data/readings/E73639-anglian-level-tidal_level-Mean-15_min-mAOD/2022-07-02T11-15-00Z",
        "dateTime": "2022-07-02T11:15:00Z",
        "measure": "http://environment.data.gov.uk/flood-monitoring/id/measures/E73639-anglian-level-tidal_level-Mean-15_min-mAOD",
        "value": 1.172
      },
    ];
    
    //mockedAxios.get.mockResolvedValue(data);

    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(data));

    const returnedData = await getApiData();
    expect(returnedData).toBeDefined;

    await expect(mockedAxios.get).toBeCalledTimes(1);


  });

});