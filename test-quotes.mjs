import fetch from 'node-fetch';

async function testQuotes() {
  const baseUrl = 'http://localhost:3000/api/quotes';
  const startDate = new Date('2023-06-14T00:00:00Z');
  const days = 7;
  const hoursPerDay = 24;

  console.log("Testing daily quotes over a week...");

  let previousQuote = null;
  let dayQuote = null;

  for (let day = 0; day < days; day++) {
    console.log(`\nDay ${day + 1}:`);
    for (let hour = 0; hour < hoursPerDay; hour++) {
      const testDate = new Date(startDate);
      testDate.setUTCDate(startDate.getUTCDate() + day);
      testDate.setUTCHours(hour);
      
      const { text, author, nextChange } = await fetchQuote(baseUrl, testDate.toISOString());
      
      if (hour === 0) {
        dayQuote = `${text} - ${author}`;
        if (previousQuote && dayQuote !== previousQuote) {
          console.log(`Quote changed: "${dayQuote}"`);
        } else if (!previousQuote) {
          console.log(`Initial quote: "${dayQuote}"`);
        }
        previousQuote = dayQuote;
      } else if (`${text} - ${author}` !== dayQuote) {
        console.log(`Unexpected change at hour ${hour}: "${text} - ${author}"`);
      }

      if (hour === 0 || hour === 23) {
        console.log(`Hour ${hour}: "${text}" - ${author}`);
        console.log(`Next change: ${nextChange}`);
      }
    }
  }
}

async function fetchQuote(baseUrl, dateTime) {
  const response = await fetch(`${baseUrl}?date=${dateTime}`);
  return await response.json();
}

testQuotes().catch(console.error);