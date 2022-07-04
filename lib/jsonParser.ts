import { IDogTrendObject } from "./tides";

export interface Tide {
  time: string;
  depth: number;
}

export function extractTides(sourceJSON: Array<any>): Array<Tide> {

  const returnArray = new Array<Tide>();

  for (let element of sourceJSON) {
    returnArray.push({
      time: element.dateTime,
      depth: element.value
    })
  }

  return returnArray;
}

export function determineTrend(tides: Array<Tide>): string {

  let delta = tides[0].depth - tides[1].depth 

  if (delta == 0) return 'turning';
  
  if (delta > 0) return 'coming in';

  return 'going out';

}

export function generateData(sourceJSON: Array<any>) {

  const tides = extractTides(sourceJSON);

  const height = Math.abs(tides[0].depth).toFixed(2);
  const relative = tides[0].depth > 0 ? "above" : "below";
  const trend = determineTrend(tides);
  const dogTrend = determineDogTrend(trend, tides[0].depth);

  return {
    height: height,
    relative: relative,
    trend : trend,
    dogTrend: dogTrend
  };
  
}

export function determineDogTrend(trend: string, depth: number): IDogTrendObject {

  if (trend == 'going out') {

    if (depth > 2) {
      return {
        prefix: "It's",
        action: "not worth",
        suffix: "setting off yet"
      }
      
    } else {
      return {
        prefix: "There's",
        action: "plenty of time",
        suffix: "to walk the dog"
      }
    }

  } else {

    if (depth > 0) {
      return {
        prefix: "There's",
        action: "not enough time",
        suffix: "to walk the dog"
      }
    } else {
      return {
        prefix: "There's",
        action: "still enough time",
        suffix: "to walk the dog"
      }
    }

  }
  
}
