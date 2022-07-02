import axios, { AxiosResponse } from "axios";

const endpointUrl = 'https://environment.data.gov.uk/flood-monitoring/id/stations/E73639-anglian/readings.json?today&_sorted'

export async function getApiData() {

  axios.get(endpointUrl).then( response => {
    return response.data.items;
  }).catch( err => {

    if (axios.isAxiosError(err)) {
      if (err.response && err.response.status === 404) {
       return {
          result: false,
          err: '404 server error'
        };
      }
    } else {
      return {
        result: false,
        err: 'Unknown server error'
        }
      };
    });

  };