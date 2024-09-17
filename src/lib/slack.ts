import { WebClient } from '@slack/web-api';
import {
  client as nagerClient,
  publicHolidayNextPublicHolidays,
} from './nager-client';

const slackToken = process.env.SLACK_BOT_TOKEN;
const slackChannel = process.env.SLACK_CHANNEL_ID;
const slack = new WebClient(slackToken);

nagerClient.setConfig({
  // set default base url for requests
  baseUrl: 'https://date.nager.at',
});

export async function checkAndNotifyHolidays() {
  const today = new Date();
  const numDays = 30;
  const nextMonth = new Date(today.getTime() + numDays * 24 * 60 * 60 * 1000);
  const { data: holidays } = await publicHolidayNextPublicHolidays({
    path: { countryCode: 'US' },
  });
  if (!holidays || holidays.length === 0)
    return { message: 'No upcoming holidays in the next ${numDays} days' };

  const upcomingHolidays = holidays.filter((holiday) => {
    const holidayDate = new Date(holiday.date!);
    return holidayDate >= today && holidayDate <= nextMonth;
  });

  // Prepare message
  const message = upcomingHolidays
    .map((holiday) => {
      return `• ${holiday.date}: ${holiday.name}`;
    })
    .join('\n');

  // Send message to Slack
  await slack.chat.postMessage({
    channel: slackChannel,
    text: `Upcoming holidays in the next ${numDays} days:\n${message}`,
  });

  return { message: 'Holidays checked and notification sent' };
}
