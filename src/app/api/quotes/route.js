import { NextResponse } from 'next/server';
import marcusQuotes from '../../data/marcus_aurelius';
import senecaQuotes from '../../data/seneca';
import epictetusQuotes from '../../data/epictetus';
import zenoQuotes from '../../data/zeno';

let dailyQuote = null;
let lastUpdated = null;

const allAuthors = {
  'Marcus Aurelius': marcusQuotes,
  'Seneca': senecaQuotes,
  'Epictetus': epictetusQuotes,
  'Zeno': zenoQuotes
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get('all');

  if (all === 'true') {
    return NextResponse.json(allAuthors);
  }

  const today = new Date().toDateString();

  if (!dailyQuote || lastUpdated !== today) {
    const authors = Object.keys(allAuthors);
    const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
    const authorQuotes = allAuthors[randomAuthor];
    const randomQuote = authorQuotes[Math.floor(Math.random() * authorQuotes.length)];

    dailyQuote = { text: randomQuote, author: randomAuthor };
    lastUpdated = today;
  }

  return NextResponse.json(dailyQuote);
}