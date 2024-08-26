'use client';

import React from 'react';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data: dailyQuote, error } = useSWR('/api/quotes', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 24 * 60 * 60 * 1000, // 24 hours
  });

  // We'll fetch all quotes from the API instead of importing them directly
  const { data: allQuotes } = useSWR('/api/quotes?all=true', fetcher);

  if (error) return <div>Failed to load</div>
  if (!dailyQuote || !allQuotes) return <div>Loading...</div>

  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto bg-secondary">
      {/* Daily Quote Card */}
      <div className="card-with-shadow">
        <h1 className="text-3xl font-bold mb-6 text-primary text-shadow">Daily Stoic Wisdom</h1>
        <div>
          <p className="text-xl mb-4 leading-relaxed text-[#4A5568]">&ldquo;{dailyQuote.text}&rdquo;</p>
          <p className="text-right italic text-[#718096]">- {dailyQuote.author}</p>
        </div>
      </div>

      {/* Author Quote Lists */}
      {Object.entries(allQuotes).map(([author, quotes]) => (
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