import { NextResponse } from 'next/server';
import marcusQuotes from '../../data/marcus_aurelius';
import senecaQuotes from '../../data/seneca';
import epictetusQuotes from '../../data/epictetus';
import zenoQuotes from '../../data/zeno';

const allAuthors = {
  'Marcus Aurelius': marcusQuotes,
  'Seneca': senecaQuotes,
  'Epictetus': epictetusQuotes,
  'Zeno': zenoQuotes
};

function getQuoteForDate(date) {
  const allQuotes = Object.entries(allAuthors).flatMap(([author, quotes]) => 
    quotes.map(quote => ({ text: quote, author }))
  );
  
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  const index = seed % allQuotes.length;
  
  return allQuotes[index];
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all');

    if (all === 'true') {
      return NextResponse.json(allAuthors);
    }

    const now = new Date();
    const dailyQuote = getQuoteForDate(now);

    return NextResponse.json(dailyQuote);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}