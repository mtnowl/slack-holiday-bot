import { WebClient } from '@slack/web-api';
import {
  client as nagerClient,
  publicHolidayNextPublicHolidays,
} from './nager-client';

const slackToken = process.env.SLACK_BOT_TOKEN;
const slackChannel = process.env.SLACK_CHANNEL_ID;
const slack = new WebClient(slackToken);

const numDays = 30;
const countries = process.env.COUNTRIES?.split(',');

nagerClient.setConfig({
  // set default base url for requests
  baseUrl: 'https://date.nager.at',
});

async function checkHolidaysForCountry(country: string) {
  const { data: holidays } = await publicHolidayNextPublicHolidays({
    path: { countryCode: country },
  });
  console.debug(Array.isArray(holidays));
  if (!holidays || holidays.length === 0)
    return { message: 'No upcoming holidays' };

  const today = new Date();
  const nextMonth = new Date(today.getTime() + numDays * 24 * 60 * 60 * 1000);

  const upcomingHolidays = holidays.filter((holiday) => {
    const holidayDate = new Date(holiday.date!);
    return holidayDate >= today && holidayDate <= nextMonth;
  });
  if (upcomingHolidays.length === 0)
    return { message: 'No upcoming holidays in the next ${numDays} days' };

  // Prepare message
  const message = upcomingHolidays
    .map((holiday) => {
      return `• ${holiday.date}: ${holiday.name}`;
    })
    .join('\n');

  return message;
}

export async function checkAndNotifyHolidays() {
  const message = (
    await Promise.all(
      countries!.map(
        async (country) =>
          `--${country}--\n${await checkHolidaysForCountry(country)}`
      )
    )
  ).join('\n');

  // Send message to Slack
  await slack.chat.postMessage({
    channel: slackChannel,
    text: `Upcoming holidays in the next ${numDays} days:\n${message}`,
  });

  return { message: 'Holidays checked and notification sent' };
}
