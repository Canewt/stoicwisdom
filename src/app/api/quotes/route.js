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

let dailyQuote = null;
let lastUpdated = null;

function getNewQuote() {
  const authors = Object.keys(allAuthors);
  const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
  const authorQuotes = allAuthors[randomAuthor];
  const randomQuote = authorQuotes[Math.floor(Math.random() * authorQuotes.length)];
  return { text: randomQuote, author: randomAuthor };
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all');

    if (all === 'true') {
      return NextResponse.json(allAuthors);
    }

    const now = new Date();
    const today = now.toDateString();

    if (!dailyQuote || !lastUpdated || lastUpdated !== today) {
      dailyQuote = getNewQuote();
      lastUpdated = today;
    }

    return NextResponse.json(dailyQuote);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}