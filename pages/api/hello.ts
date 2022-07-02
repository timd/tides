import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const url = 'https://environment.data.gov.uk/flood-monitoring/id/stations/E73639-anglian/readings.json?today&_sorted';

  axios.get(url).then( response => {
    res.status(200).json(response.data.items[0].value);  
    console.log(response.data);
  });
    
}
