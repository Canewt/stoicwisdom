'use client';

import React from 'react';
import BookCard from '../components/BookCard';

const books = [
  {
    title: "Meditations",
    author: "Marcus Aurelius",
    description: "A series of personal writings by Marcus Aurelius, Roman Emperor from 161 to 180 AD, recording his private notes to himself and ideas on Stoic philosophy.",
    baseAsin: "0812968255"
  },
  {
    title: "Letters from a Stoic",
    author: "Seneca",
    description: "A collection of moral epistles from Seneca the Younger to his friend Lucilius Junior, focusing on the core tenets of Stoicism.",
    baseAsin: "0140442103"
  },
  // Add more books as needed
];

export default function Books() {
  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto bg-secondary">
      <h1 className="text-3xl font-bold mb-8 text-primary text-shadow">Recommended Stoic Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book, index) => (
          <BookCard key={index} {...book} />
        ))}
      </div>
    </main>
  );
}