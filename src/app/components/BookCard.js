'use client';

import React, { useState, useEffect } from 'react';

const amazonDomains = {
  US: 'amazon.com',
  IN: 'amazon.in',
};

const getAmazonLink = (baseAsin, countryCode) => {
  const domain = amazonDomains[countryCode] || amazonDomains.US;
  return `https://www.${domain}/dp/${baseAsin}?tag=youraffiliateid-20`;
};

const BookCard = ({ title, author, description, baseAsin }) => {
  const [amazonLink, setAmazonLink] = useState('');
  const [userCountry, setUserCountry] = useState(null);

  useEffect(() => {
    // This is a mock geolocation. In a real scenario, you'd use an actual geolocation service.
    const mockGeolocation = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Randomly return 'US' or 'IN'
          resolve(Math.random() < 0.5 ? 'US' : 'IN');
        }, 1000); // Simulate a delay
      });
    };

    const cachedCountry = localStorage.getItem('userCountry');
    if (cachedCountry) {
      setAmazonLink(getAmazonLink(baseAsin, cachedCountry));
    } else {
      mockGeolocation().then((countryCode) => {
        setAmazonLink(getAmazonLink(baseAsin, countryCode));
      });
    }
  }, [baseAsin]);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base mb-2">by {author}</p>
        <p className="text-gray-700 text-sm mb-4">{description}</p>
        {amazonLink ? (
          <a 
            href={amazonLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded inline-block"
          >
            Buy on Amazon
          </a>
        ) : (
          <p>Loading Amazon link...</p>
        )}
      </div>
    </div>
  );
};

export default BookCard;