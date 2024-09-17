import { WebClient } from '@slack/web-api';

const slackToken = process.env.SLACK_BOT_TOKEN;
const slackChannel = process.env.SLACK_CHANNEL_ID;
const slack = new WebClient(slackToken);

export async function checkAndNotifyHolidays() {
  const today = new Date();
  const numDays = 30;
  const nextMonth = new Date(today.getTime() + numDays * 24 * 60 * 60 * 1000);
  const response = await fetch(
    `https://date.nager.at/api/v3/NextPublicHolidays/US`
  );
  const holidays = await response.json();

  const upcomingHolidays = holidays.filter((holiday: any) => {
    const holidayDate = new Date(holiday.date);
    return holidayDate >= today && holidayDate <= nextMonth;
  });

  if (upcomingHolidays.length > 0) {
    // Prepare message
    const message = upcomingHolidays
      .map((holiday: any) => {
        return `• ${holiday.date}: ${holiday.name}`;
      })
      .join('\n');

    // Send message to Slack
    await slack.chat.postMessage({
      channel: slackChannel,
      text: `Upcoming holidays in the next ${numDays} days:\n${message}`,
    });

    return { message: 'Holidays checked and notification sent' };
  } else {
    return { message: 'No upcoming holidays in the next ${numDays} days' };
  }
}
