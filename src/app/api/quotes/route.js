import { NextResponse } from 'next/server';
import marcusAureliusQuotes from '../../data/marcus_aurelius';
import senecaQuotes from '../../data/seneca';
import epictetusQuotes from '../../data/epictetus';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const author = searchParams.get('author');

  try {
    let quotes;
    if (author === 'marcus_aurelius') {
      quotes = marcusAureliusQuotes;
    } else if (author === 'seneca') {
      quotes = senecaQuotes;
    } else if (author === 'epictetus') {
      quotes = epictetusQuotes;
    } else {
      throw new Error('Invalid author');
    }

    return NextResponse.json(quotes);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return NextResponse.json({ error: 'Unable to fetch quotes' }, { status: 500 });
  }
}