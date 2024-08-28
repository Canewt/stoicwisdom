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

// Set the hour when the quote should change (0-23)
const QUOTE_CHANGE_HOUR = 1; // Change this to your desired hour (e.g., 5 for 5 AM)

function getQuoteForDate(date) {
  const allQuotes = Object.entries(allAuthors).flatMap(([author, quotes]) => 
    quotes.map(quote => ({ text: quote, author }))
  );
  
  // Adjust the date to the previous quote change time
  const adjustedDate = new Date(date);
  if (adjustedDate.getHours() < QUOTE_CHANGE_HOUR) {
    adjustedDate.setDate(adjustedDate.getDate() - 1);
  }
  adjustedDate.setHours(QUOTE_CHANGE_HOUR, 0, 0, 0);
  
  // Create a seed based on the adjusted date
  const seed = adjustedDate.getTime();
  
  // Use a simple hash function to create more variability
  const hash = (seed * 1234567) % 2147483647;
  
  // Use the hash to select a quote
  const index = hash % allQuotes.length;
  
  return allQuotes[index];
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all');
    const dateParam = searchParams.get('date');

    if (all === 'true') {
      return NextResponse.json(allAuthors);
    }

    const now = dateParam ? new Date(dateParam) : new Date();
    const dailyQuote = getQuoteForDate(now);

    // Calculate the next quote change time
    const nextChange = new Date(now);
    nextChange.setHours(QUOTE_CHANGE_HOUR, 0, 0, 0);
    if (nextChange <= now) {
      nextChange.setDate(nextChange.getDate() + 1);
    }

    return NextResponse.json({ 
      ...dailyQuote, 
      date: now.toISOString().split('T')[0],
      nextChange: nextChange.toISOString()
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}