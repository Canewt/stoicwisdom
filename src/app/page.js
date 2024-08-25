'use client';

import React, { useState, useEffect } from 'react';
import marcusQuotes from './data/marcus_aurelius';
import senecaQuotes from './data/seneca';
import epictetusQuotes from './data/epictetus';
import zenoQuotes from './data/zeno';

export default function Home() {
  const [dailyQuote, setDailyQuote] = useState(null);
  const [authorQuotes, setAuthorQuotes] = useState({});

  useEffect(() => {
    const allAuthors = {
      'Marcus Aurelius': marcusQuotes,
      'Seneca': senecaQuotes,
      'Epictetus': epictetusQuotes,
      'Zeno': zenoQuotes
    };

    const getOrSetDailyQuote = () => {
      const storedQuote = localStorage.getItem('dailyQuote');
      const storedDate = localStorage.getItem('quoteDate');
      const today = new Date().toDateString();

      if (storedQuote && storedDate === today) {
        return JSON.parse(storedQuote);
      } else {
        const authors = Object.keys(allAuthors);
        const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
        const authorQuotes = allAuthors[randomAuthor];
        const randomQuote = authorQuotes[Math.floor(Math.random() * authorQuotes.length)];

        const newQuote = { text: randomQuote, author: randomAuthor };
        localStorage.setItem('dailyQuote', JSON.stringify(newQuote));
        localStorage.setItem('quoteDate', today);
        return newQuote;
      }
    };

    setDailyQuote(getOrSetDailyQuote());
    setAuthorQuotes(allAuthors);
  }, []);

  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto bg-secondary">
      {/* Daily Quote Card */}
      <div className="card-with-shadow">
        <h1 className="text-3xl font-bold mb-6 text-primary text-shadow">Daily Stoic Wisdom</h1>
        {dailyQuote ? (
          <div>
            <p className="text-xl mb-4 leading-relaxed text-[#4A5568]">&ldquo;{dailyQuote.text}&rdquo;</p>
            <p className="text-right italic text-[#718096]">- {dailyQuote.author}</p>
          </div>
        ) : (
          <p className="text-xl mb-4 leading-relaxed text-[#4A5568]">Loading daily quote...</p>
        )}
      </div>

      {/* Author Quote Lists */}
      {Object.entries(authorQuotes).map(([author, quotes]) => (
        <div key={author} className="mb-8 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-[#2D3748]">{author} Quotes</h2>
          <ul className="space-y-4">
            {quotes.map((quote, index) => (
              <li key={index} className="border-b border-gray-200 pb-4">
                <p className="text-lg mb-2 leading-relaxed text-[#4A5568]">&ldquo;{quote}&rdquo;</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  );
}