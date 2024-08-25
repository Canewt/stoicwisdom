import { NextResponse } from 'next/server';
import marcusQuotes from '../../../data/marcus_aurelius';
import senecaQuotes from '../../../data/seneca';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const author = searchParams.get('author');

  try {
    let quotes;
    if (author === 'marcus_aurelius') {
      quotes = marcusQuotes;
    } else if (author === 'seneca') {
      quotes = senecaQuotes;
    } else {
      throw new Error('Invalid author');
    }

    return NextResponse.json(quotes);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return NextResponse.json({ error: 'Unable to fetch quotes' }, { status: 500 });
  }
}