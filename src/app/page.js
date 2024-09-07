'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import { FaRegCopy } from 'react-icons/fa';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data: dailyQuote, error } = useSWR('/api/quotes', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 24 * 60 * 60 * 1000, // 24 hours
  });

  const [copySuccess, setCopySuccess] = useState(false);

  // We'll fetch all quotes from the API instead of importing them directly
  const { data: allQuotes } = useSWR('/api/quotes?all=true', fetcher);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  if (error) return <div>Failed to load</div>
  if (!dailyQuote || !allQuotes) return <div>Loading...</div>

  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto bg-secondary">
      {/* Daily Quote Card */}
      <div className="card-with-shadow mb-8">
        <h1 className="text-3xl font-bold mb-6 text-primary text-shadow">Daily Stoic Wisdom</h1>
        <div>
          <p className="text-xl mb-4 leading-relaxed text-[#4A5568]">&ldquo;{dailyQuote.text}&rdquo;</p>
          <div className="flex justify-between items-center">
            <p className="italic font-bold text-[#718096]">- {dailyQuote.author}</p>
            <div className="relative">
              <button 
                onClick={() => copyToClipboard(`"${dailyQuote.text}" - ${dailyQuote.author}`)}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                title="Copy quote"
              >
                <FaRegCopy size={20} />
              </button>
              {copySuccess && (
                <span className="absolute top-full right-0 text-green-500 text-sm whitespace-nowrap">Copied!</span>
              )}
            </div>
          </div>
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