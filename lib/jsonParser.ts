export interface Tide {
  time: string;
  depth: number;
}

export function extractTides(sourceJSON: Array<any>): Array<Tide> {

  const returnArray = new Array<Tide>;

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
  
  if (delta > 0) return 'rising';

  return 'falling';

}