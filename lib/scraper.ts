import { AxiosError } from "axios";
import * as cheerio from 'cheerio';

const axios = require('axios').default;

export async function getHtml(url: string) {
  const response = await axios.get(url)
  .then( (result: any) => {
    return result.data;
  }).catch( (error: AxiosError) => {
    return error;
  })

  return response;

}

export function extractFirstHighTideTime(htmlData: any) {
  const $ = cheerio.load(htmlData);
  const time = $('.tide-day-tides tr:nth-child(2) td:nth-child(2) b');
  return time.text();
}

export function extractFirstHighTideHeight(htmlData: any) {
  const $ = cheerio.load(htmlData);
  const time = $('.tide-day-tides tr:nth-child(2) td:nth-child(3) b');
  return time.text();
}

export function extractFirstLowTideTime(htmlData: any) {
  const $ = cheerio.load(htmlData);
  const time = $('.tide-day-tides tr:nth-child(3) td:nth-child(2) b');
  return time.text();
}

export function extractFirstLowTideHeight(htmlData: any) {
  const $ = cheerio.load(htmlData);
  const time = $('.tide-day-tides tr:nth-child(3) td:nth-child(3) b');
  return time.text();
}

export function extractSecondHighTideTime(htmlData: any) {
  const $ = cheerio.load(htmlData);
  const time = $('.tide-day-tides tr:nth-child(4) td:nth-child(2) b');
  return time.text();
}

export function extractSecondHighTideHeight(htmlData: any) {
  const $ = cheerio.load(htmlData);
  const time = $('.tide-day-tides tr:nth-child(4) td:nth-child(3) b');
  return time.text();
}

export function extractSecondLowTideTime(htmlData: any) {
  const $ = cheerio.load(htmlData);
  const time = $('.tide-day-tides tr:nth-child(5) td:nth-child(2) b');
  return time.text();
}

export function extractSecondLowTideHeight(htmlData: any) {
  const $ = cheerio.load(htmlData);
  const time = $('.tide-day-tides tr:nth-child(5) td:nth-child(3) b');
  return time.text();
}

export function convertTextToTime(text: string) {

  let trimmed: string; 

  if (text.charAt(0) == " ") {
    trimmed = text.substring(1);
  } else {
    trimmed = text;
  }

  const timePart = trimmed.split(' ')[0];
  const ampm = trimmed.split(' ')[1];
  let hours = Number(timePart.split(':')[0]);
  const mins = Number(timePart.split(':')[1]);

  if (ampm == "PM") {
    hours += 12;
  }

  const time = new Date();
  time.setHours(hours);
  time.setMinutes(mins);
  return time;
}
