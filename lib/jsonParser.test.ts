import { Tide, extractTides, determineTrend } from './jsonParser';

const sourceJSON = [
  {
    "@id": "http://environment.data.gov.uk/flood-monitoring/data/readings/E73639-anglian-level-tidal_level-Mean-15_min-mAOD/2022-07-02T10-30-00Z",
    "dateTime": "2022-07-02T10:30:00Z",
    "measure": "http://environment.data.gov.uk/flood-monitoring/id/measures/E73639-anglian-level-tidal_level-Mean-15_min-mAOD",
    "value": 0.072
  },
  {
    "@id": "http://environment.data.gov.uk/flood-monitoring/data/readings/E73639-anglian-level-tidal_level-Mean-15_min-mAOD/2022-07-02T10-15-00Z",
    "dateTime": "2022-07-02T10:15:00Z",
    "measure": "http://environment.data.gov.uk/flood-monitoring/id/measures/E73639-anglian-level-tidal_level-Mean-15_min-mAOD",
    "value": -0.286
  },
  {
    "@id": "http://environment.data.gov.uk/flood-monitoring/data/readings/E73639-anglian-level-tidal_level-Mean-15_min-mAOD/2022-07-02T10-00-00Z",
    "dateTime": "2022-07-02T10:00:00Z",
    "measure": "http://environment.data.gov.uk/flood-monitoring/id/measures/E73639-anglian-level-tidal_level-Mean-15_min-mAOD",
    "value": -0.644
  },
  {
    "@id": "http://environment.data.gov.uk/flood-monitoring/data/readings/E73639-anglian-level-tidal_level-Mean-15_min-mAOD/2022-07-02T09-45-00Z",
    "dateTime": "2022-07-02T09:45:00Z",
    "measure": "http://environment.data.gov.uk/flood-monitoring/id/measures/E73639-anglian-level-tidal_level-Mean-15_min-mAOD",
    "value": -0.979
  },
  {
    "@id": "http://environment.data.gov.uk/flood-monitoring/data/readings/E73639-anglian-level-tidal_level-Mean-15_min-mAOD/2022-07-02T09-30-00Z",
    "dateTime": "2022-07-02T09:30:00Z",
    "measure": "http://environment.data.gov.uk/flood-monitoring/id/measures/E73639-anglian-level-tidal_level-Mean-15_min-mAOD",
    "value": -1.29
  }
];

describe('When parsing JSON', () => {

  it('should dump the values into an array of Tide objects', () => {
    const results = extractTides(sourceJSON);
    expect(results).toHaveLength(5);
  });

  it('should parse the values correctly', () => {
    const results = extractTides(sourceJSON);
    expect(results[0].time).toBe('2022-07-02T10:30:00Z');
    expect(results[0].depth).toBe(0.072);
    expect(results[4].depth).toBe(-1.29);
  });

});

describe('When calculating trend', () => {

  it('should determine the trend correctly when the tide is rising from a negative height', () => {
    
    let tides: Array<Tide> = [
      {
        time: '2022-07-02T10:30:00Z',
        depth: 0.072
      },
      {
        time: '2022-07-02T10:15:00Z',
        depth: -0.286
      }
    ];

    const trend = determineTrend(tides);
    expect(trend).toBe('rising');

  });

  it('should determine the trend correctly when the tide is rising from a positive height', () => {
    
    let tides: Array<Tide> = [
      {
        time: '2022-07-02T10:30:00Z',
        depth: 0.44
      },
      {
        time: '2022-07-02T10:15:00Z',
        depth: 0.072
      }
    ];

    const trend = determineTrend(tides);
    expect(trend).toBe('rising');
    
  });

  it('should determine the trend correctly when the tide is falling from a positive height', () => {
    
    let tides: Array<Tide> = [
      {
        time: '2022-07-02T10:30:00Z',
        depth: 1.0
      },
      {
        time: '2022-07-02T10:15:00Z',
        depth: 2.0
      }
    ];

    const trend = determineTrend(tides);
    expect(trend).toBe('falling');
  });

  it('should determine the trend correctly when the tide is falling from a negative height', () => {
    
    let tides: Array<Tide> = [
      {
        time: '2022-07-02T10:30:00Z',
        depth: -2.013
      },
      {
        time: '2022-07-02T10:15:00Z',
        depth: -1.816
      }
    ];

    const trend = determineTrend(tides);
    expect(trend).toBe('falling');
  });

  it('should determine the trend correctly when the tide is turning with a positive height', () => {
    
    let tides: Array<Tide> = [
      {
        time: '2022-07-02T10:30:00Z',
        depth: -2.013
      },
      {
        time: '2022-07-02T10:15:00Z',
        depth: -2.013
      }
    ];

    const trend = determineTrend(tides);
    expect(trend).toBe('turning');
  });

});