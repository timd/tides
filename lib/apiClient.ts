import axios, { AxiosResponse } from "axios";

export interface ApiData {
  data: any
  err: string
  result: boolean
}

const endpointUrl = 'https://environment.data.gov.uk/flood-monitoring/id/stations/E73639-anglian/readings.json?today&_sorted'

export async function getApiData(): Promise<ApiData> {

  let response;

  try {
    response = await axios.get(endpointUrl);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response && err.response.status === 404) {
       return {
          result: false,
          data: null,
          err: '404 server error'
        };
      }
    } else {
      return {
        result: false,
        data: null,
        err: 'Unknown server error'
        }
      };
  };

  return {
    result: true,
    data: response?.data.items,
    err: ""
  }
}
  
