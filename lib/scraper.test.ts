import exp from 'constants';
import { 
  extractFirstHighTideTime, 
  extractFirstHighTideHeight,
  extractSecondHighTideTime,
  extractSecondHighTideHeight, 
  extractFirstLowTideTime,
  extractFirstLowTideHeight, 
  extractSecondLowTideTime, 
  extractSecondLowTideHeight, 
  getHtml, 
  convertTextToTime} from './scraper';

const url = 'https://www.tide-forecast.com/locations/Whitehaven/tides/latest';

describe('When scraping', () => {

  it('should get the HTML page', async () => {
    const result = await getHtml(url);
    expect(result).toBeDefined;
  });

  it('should extract the first high tide time from the html', async () => {
    const testHtml = '<table class="tide-day-tides"><tbody><tr itemscope="itemscope" itemtype="http://schema.org/Event"><th class="tide-day-tides__header">Tide<img alt="tide state" class="tide-day-tides__icon" src="/images/table__icon--tide.svg" width="20px"></th><th class="tide-day-tides__header">Time (BST)<span class="tide-day-tides__sub-header">&amp; Date</span></th><th class="tide-day-tides__header">Height</th></tr><tr><td>High Tide</td><td><b> 1:10 AM</b><span class="tide-day-tides__secondary">(Fri 15 July)</span></td><td class="js-two-units-length-value" data-units="Metric"><b class="js-two-units-length-value__primary">7.79 m</b> <span class="js-two-units-length-value__secondary tide-day-tides__secondary">(25.54 ft)</span></td></tr><tr><td>Low Tide</td><td><b> 7:28 AM</b><span class="tide-day-tides__secondary">(Fri 15 July)</span></td><td class="js-two-units-length-value" data-units="Metric"><b class="js-two-units-length-value__primary">-0.16 m</b> <span class="js-two-units-length-value__secondary tide-day-tides__secondary">(-0.52 ft)</span></td></tr><tr><td>High Tide</td><td><b> 1:40 PM</b><span class="tide-day-tides__secondary">(Fri 15 July)</span></td><td class="js-two-units-length-value" data-units="Metric"><b class="js-two-units-length-value__primary">7.51 m</b> <span class="js-two-units-length-value__secondary tide-day-tides__secondary">(24.64 ft)</span></td></tr><tr><td>Low Tide</td><td><b> 7:46 PM</b><span class="tide-day-tides__secondary">(Fri 15 July)</span></td><td class="js-two-units-length-value" data-units="Metric"><b class="js-two-units-length-value__primary">0.22 m</b> <span class="js-two-units-length-value__secondary tide-day-tides__secondary">(0.72 ft)</span></td></tr></tbody></table>';
    //const testHtml = await getHtml('https://www.tide-forecast.com/locations/Whitehaven/tides/latest');

    const results = extractFirstHighTideTime(testHtml);
    expect(results).toBe(' 1:10 AM');
  });

  it('should extract the first high tide height from the html', async () => {
    const testHtml = '<table class="tide-day-tides"><tbody><tr itemscope="itemscope" itemtype="http://schema.org/Event"><th class="tide-day-tides__header">Tide<img alt="tide state" class="tide-day-tides__icon" src="/images/table__icon--tide.svg" width="20px"></th><th class="tide-day-tides__header">Time (BST)<span class="tide-day-tides__sub-header">&amp; Date</span></th><th class="tide-day-tides__header">Height</th></tr><tr><td>High Tide</td><td><b> 1:10 AM</b><span class="tide-day-tides__secondary">(Fri 15 July)</span></td><td class="js-two-units-length-value" data-units="Metric"><b class="js-two-units-length-value__primary">7.79 m</b> <span class="js-two-units-length-value__secondary tide-day-tides__secondary">(25.54 ft)</span></td></tr><tr><td>Low Tide</td><td><b> 7:28 AM</b><span class="tide-day-tides__secondary">(Fri 15 July)</span></td><td class="js-two-units-length-value" data-units="Metric"><b class="js-two-units-length-value__primary">-0.16 m</b> <span class="js-two-units-length-value__secondary tide-day-tides__secondary">(-0.52 ft)</span></td></tr><tr><td>High Tide</td><td><b> 1:40 PM</b><span class="tide-day-tides__secondary">(Fri 15 July)</span></td><td class="js-two-units-length-value" data-units="Metric"><b class="js-two-units-length-value__primary">7.51 m</b> <span class="js-two-units-length-value__secondary tide-day-tides__secondary">(24.64 ft)</span></td></tr><tr><td>Low Tide</td><td><b> 7:46 PM</b><span class="tide-day-tides__secondary">(Fri 15 July)</span></td><td class="js-two-units-length-value" data-units="Metric"><b class="js-two-units-length-value__primary">0.22 m</b> <span class="js-two-units-length-value__secondary tide-day-tides__secondary">(0.72 ft)</span></td></tr></tbody></table>';
    //const testHtml = await getHtml('https://www.tide-forecast.com/locations/Whitehaven/tides/latest');
    const results = extractFirstHighTideHeight(testHtml);
    expect(results).toBe('7.79 m');
  });

  it('should extract the first low tide time from the html', async () => {
    const testHtml = '<table class="tide-day-tides"><tbody><tr itemscope="itemscope" itemtype="http://schema.org/Event"><th class="tide-day-tides__header">Tide<img alt="tide state" class="tide-day-tides__icon" src="/images/table__icon--tide.svg" width="20px"></th><th class="tide-day-tides__header">Time (BST)<span class="tide-day-tides__sub-header">&amp; Date</span></th><th class="tide-day-tides__header">Height</th></tr><tr><td>High Tide</td><td><b> 1:10 AM</b><span class="tide-day-tides__secondary">(Fri 15 July)</span></td><td class="js-two-units-length-value" data-units="Metric"><b class="js-two-units-length-value__primary">7.79 m</b> <span class="js-two-units-length-value__secondary tide-day-tides__secondary">(25.54 ft)</span></td></tr><tr><td>Low Tide</td><td><b> 7:28 AM</b><span class="tide-day-tides__secondary">(Fri 15 July)</span></td><td class="js-two-units-length-value" data-units="Metric"><b class="js-two-units-length-value__primary">-0.16 m</b> <span class="js-two-units-length-value__secondary tide-day-tides__secondary">(-0.52 ft)</span></td></tr><tr><td>High Tide</td><td><b> 1:40 PM</b><span class="tide-day-tides__secondary">(Fri 15 July)</span></td><td class="js-two-units-length-value" data-units="Metric"><b class="js-two-units-length-value__primary">7.51 m</b> <span class="js-two-units-length-value__secondary tide-day-tides__secondary">(24.64 ft)</span></td></tr><tr><td>Low Tide</td><td><b> 7:46 PM</b><span class="tide-day-tides__secondary">(Fri 15 July)</span></td><td class="js-two-units-length-value" data-units="Metric"><b class="js-two-units-length-value__primary">0.22 m</b> <span class="js-two-units-length-value__secondary tide-day-tides__secondary">(0.72 ft)</span></td></tr></tbody></table>';
    //const testHtml = await getHtml('https://www.tide-forecast.com/locations/Whitehaven/tides/latest');
    const results = extractFirstLowTideTime(testHtml);
    expect(results).toBe(' 7:28 AM');
  });

  it('should extract the first low tide height from the html', async () => {
    const testHtml = '<table class="tide-day-tides"><tbody><tr itemscope="itemscope" itemtype="http://schema.org/Event"><th class="tide-day-tides__header">Tide<img alt="tide state" class="tide-day-tides__icon" src="/images/table__icon--tide.svg" width="20px"></th><th class="tide-day-tides__header">Time (BST)<span class="tide-day-tides__sub-header">&amp; Date</span></th><th class="tide-day-tides__header">Height</th></tr><tr><td>High Tide</td><td><b> 1:10 AM</b><span class="tide-day-tides__secondary">(Fri 15 July)</span></td><td class="js-two-units-length-value" data-units="Metric"><b class="js-two-units-length-value__primary">7.79 m</b> <span class="js-two-units-length-value__secondary tide-day-tides__secondary">(25.54 ft)</span></td></tr><tr><td>Low Tide</td><td><b> 7:28 AM</b><span class="tide-day-tides__secondary">(Fri 15 July)</span></td><td class="js-two-units-length-value" data-units="Metric"><b class="js-two-units-length-value__primary">-0.16 m</b> <span class="js-two-units-length-value__secondary tide-day-tides__secondary">(-0.52 ft)</span></td></tr><tr><td>High Tide</td><td><b> 1:40 PM</b><span class="tide-day-tides__secondary">(Fri 15 July)</span></td><td class="js-two-units-length-value" data-units="Metric"><b class="js-two-units-length-value__primary">7.51 m</b> <span class="js-two-units-length-value__secondary tide-day-tides__secondary">(24.64 ft)</span></td></tr><tr><td>Low Tide</td><td><b> 7:46 PM</b><span class="tide-day-tides__secondary">(Fri 15 July)</span></td><td class="js-two-units-length-value" data-units="Metric"><b class="js-two-units-length-value__primary">0.22 m</b> <span class="js-two-units-length-value__secondary tide-day-tides__secondary">(0.72 ft)</span></td></tr></tbody></table>';
    //const testHtml = await getHtml('https://www.tide-forecast.com/locations/Whitehaven/tides/latest');
    const results = extractFirstLowTideHeight(testHtml);
    expect(results).toBe('-0.16 m');
  });

  it('should extract the second high tide time from the html', async () => {
    const testHtml = '<table class="tide-day-tides"><tbody><tr itemscope="itemscope" itemtype="http://schema.org/Event"><th class="tide-day-tides__header">Tide<img alt="tide state" class="tide-day-tides__icon" src="/images/table__icon--tide.svg" width="20px"></th><th class="tide-day-tides__header">Time (BST)<span class="tide-day-tides__sub-header">&amp; Date</span></th><th class="tide-day-tides__header">Height</th></tr><tr><td>High Tide</td><td><b> 1:10 AM</b><span class="tide-day-tides__secondary">(Fri 15 July)</span></td><td class="js-two-units-length-value" data-units="Metric"><b class="js-two-units-length-value__primary">7.79 m</b> <span class="js-two-units-length-value__secondary tide-day-tides__secondary">(25.54 ft)</span></td></tr><tr><td>Low Tide</td><td><b> 7:28 AM</b><span class="tide-day-tides__secondary">(Fri 15 July)</span></td><td class="js-two-units-length-value" data-units="Metric"><b class="js-two-units-length-value__primary">-0.16 m</b> <span class="js-two-units-length-value__secondary tide-day-tides__secondary">(-0.52 ft)</span></td></tr><tr><td>High Tide</td><td><b> 1:40 PM</b><span class="tide-day-tides__secondary">(Fri 15 July)</span></td><td class="js-two-units-length-value" data-units="Metric"><b class="js-two-units-length-value__primary">7.51 m</b> <span class="js-two-units-length-value__secondary tide-day-tides__secondary">(24.64 ft)</span></td></tr><tr><td>Low Tide</td><td><b> 7:46 PM</b><span class="tide-day-tides__secondary">(Fri 15 July)</span></td><td class="js-two-units-length-value" data-units="Metric"><b class="js-two-units-length-value__primary">0.22 m</b> <span class="js-two-units-length-value__secondary tide-day-tides__secondary">(0.72 ft)</span></td></tr></tbody></table>';
    //const testHtml = await getHtml('https://www.tide-forecast.com/locations/Whitehaven/tides/latest');
    const results = extractSecondHighTideTime(testHtml);
    expect(results).toBe(' 1:40 PM');
  });

  it('should extract the second high tide height from the html', async () => {
    const testHtml = '<table class="tide-day-tides"><tbody><tr itemscope="itemscope" itemtype="http://schema.org/Event"><th class="tide-day-tides__header">Tide<img alt="tide state" class="tide-day-tides__icon" src="/images/table__icon--tide.svg" width="20px"></th><th class="tide-day-tides__header">Time (BST)<span class="tide-day-tides__sub-header">&amp; Date</span></th><th class="tide-day-tides__header">Height</th></tr><tr><td>High Tide</td><td><b> 1:10 AM</b><span class="tide-day-tides__secondary">(Fri 15 July)</span></td><td class="js-two-units-length-value" data-units="Metric"><b class="js-two-units-length-value__primary">7.79 m</b> <span class="js-two-units-length-value__secondary tide-day-tides__secondary">(25.54 ft)</span></td></tr><tr><td>Low Tide</td><td><b> 7:28 AM</b><span class="tide-day-tides__secondary">(Fri 15 July)</span></td><td class="js-two-units-length-value" data-units="Metric"><b class="js-two-units-length-value__primary">-0.16 m</b> <span class="js-two-units-length-value__secondary tide-day-tides__secondary">(-0.52 ft)</span></td></tr><tr><td>High Tide</td><td><b> 1:40 PM</b><span class="tide-day-tides__secondary">(Fri 15 July)</span></td><td class="js-two-units-length-value" data-units="Metric"><b class="js-two-units-length-value__primary">7.51 m</b> <span class="js-two-units-length-value__secondary tide-day-tides__secondary">(24.64 ft)</span></td></tr><tr><td>Low Tide</td><td><b> 7:46 PM</b><span class="tide-day-tides__secondary">(Fri 15 July)</span></td><td class="js-two-units-length-value" data-units="Metric"><b class="js-two-units-length-value__primary">0.22 m</b> <span class="js-two-units-length-value__secondary tide-day-tides__secondary">(0.72 ft)</span></td></tr></tbody></table>';
    //const testHtml = await getHtml('https://www.tide-forecast.com/locations/Whitehaven/tides/latest');
    const results = extractSecondHighTideHeight(testHtml);
    expect(results).toBe('7.51 m');
  });

  it('should extract the second low tide time from the html', async () => {
    const testHtml = '<table class="tide-day-tides"><tbody><tr itemscope="itemscope" itemtype="http://schema.org/Event"><th class="tide-day-tides__header">Tide<img alt="tide state" class="tide-day-tides__icon" src="/images/table__icon--tide.svg" width="20px"></th><th class="tide-day-tides__header">Time (BST)<span class="tide-day-tides__sub-header">&amp; Date</span></th><th class="tide-day-tides__header">Height</th></tr><tr><td>High Tide</td><td><b> 1:10 AM</b><span class="tide-day-tides__secondary">(Fri 15 July)</span></td><td class="js-two-units-length-value" data-units="Metric"><b class="js-two-units-length-value__primary">7.79 m</b> <span class="js-two-units-length-value__secondary tide-day-tides__secondary">(25.54 ft)</span></td></tr><tr><td>Low Tide</td><td><b> 7:28 AM</b><span class="tide-day-tides__secondary">(Fri 15 July)</span></td><td class="js-two-units-length-value" data-units="Metric"><b class="js-two-units-length-value__primary">-0.16 m</b> <span class="js-two-units-length-value__secondary tide-day-tides__secondary">(-0.52 ft)</span></td></tr><tr><td>High Tide</td><td><b> 1:40 PM</b><span class="tide-day-tides__secondary">(Fri 15 July)</span></td><td class="js-two-units-length-value" data-units="Metric"><b class="js-two-units-length-value__primary">7.51 m</b> <span class="js-two-units-length-value__secondary tide-day-tides__secondary">(24.64 ft)</span></td></tr><tr><td>Low Tide</td><td><b> 7:46 PM</b><span class="tide-day-tides__secondary">(Fri 15 July)</span></td><td class="js-two-units-length-value" data-units="Metric"><b class="js-two-units-length-value__primary">0.22 m</b> <span class="js-two-units-length-value__secondary tide-day-tides__secondary">(0.72 ft)</span></td></tr></tbody></table>';
    //const testHtml = await getHtml('https://www.tide-forecast.com/locations/Whitehaven/tides/latest');
    const results = extractSecondLowTideTime(testHtml);
    expect(results).toBe(' 7:46 PM');
  });

  it('should extract the second low tide height from the html', async () => {
    const testHtml = '<table class="tide-day-tides"><tbody><tr itemscope="itemscope" itemtype="http://schema.org/Event"><th class="tide-day-tides__header">Tide<img alt="tide state" class="tide-day-tides__icon" src="/images/table__icon--tide.svg" width="20px"></th><th class="tide-day-tides__header">Time (BST)<span class="tide-day-tides__sub-header">&amp; Date</span></th><th class="tide-day-tides__header">Height</th></tr><tr><td>High Tide</td><td><b> 1:10 AM</b><span class="tide-day-tides__secondary">(Fri 15 July)</span></td><td class="js-two-units-length-value" data-units="Metric"><b class="js-two-units-length-value__primary">7.79 m</b> <span class="js-two-units-length-value__secondary tide-day-tides__secondary">(25.54 ft)</span></td></tr><tr><td>Low Tide</td><td><b> 7:28 AM</b><span class="tide-day-tides__secondary">(Fri 15 July)</span></td><td class="js-two-units-length-value" data-units="Metric"><b class="js-two-units-length-value__primary">-0.16 m</b> <span class="js-two-units-length-value__secondary tide-day-tides__secondary">(-0.52 ft)</span></td></tr><tr><td>High Tide</td><td><b> 1:40 PM</b><span class="tide-day-tides__secondary">(Fri 15 July)</span></td><td class="js-two-units-length-value" data-units="Metric"><b class="js-two-units-length-value__primary">7.51 m</b> <span class="js-two-units-length-value__secondary tide-day-tides__secondary">(24.64 ft)</span></td></tr><tr><td>Low Tide</td><td><b> 7:46 PM</b><span class="tide-day-tides__secondary">(Fri 15 July)</span></td><td class="js-two-units-length-value" data-units="Metric"><b class="js-two-units-length-value__primary">0.22 m</b> <span class="js-two-units-length-value__secondary tide-day-tides__secondary">(0.72 ft)</span></td></tr></tbody></table>';
    //const testHtml = await getHtml('https://www.tide-forecast.com/locations/Whitehaven/tides/latest');
    const results = extractSecondLowTideHeight(testHtml);
    expect(results).toBe('0.22 m');
  });

  it('should convert text to time correctly for single-digit AM times', () => {
    const text = " 7:28 AM";
    const time = convertTextToTime(text);
    expect(time.getHours()).toBe(7);
    expect(time.getMinutes()).toBe(28);
  });

  it('should convert text to time correctly for double-digit AM times', () => {
    const text = " 10:35 AM";
    const time = convertTextToTime(text);
    expect(time.getHours()).toBe(10);
    expect(time.getMinutes()).toBe(35);
  });

  it('should convert text to time correctly for single-digit PM times', () => {
    const text = " 1:35 PM";
    const time = convertTextToTime(text);
    expect(time.getHours()).toBe(13);
    expect(time.getMinutes()).toBe(35);
  });

  it('should convert text to time correctly for single-digit PM times', () => {
    const text = "11:35 PM";
    const time = convertTextToTime(text);
    expect(time.getHours()).toBe(23);
    expect(time.getMinutes()).toBe(35);
  });

});