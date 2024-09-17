import { NextResponse } from 'next/server';
import { WebClient } from '@slack/web-api';
import { checkAndNotifyHolidays } from '@/lib/slack';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const result = await checkAndNotifyHolidays();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
