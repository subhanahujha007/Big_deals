'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CiSearch } from 'react-icons/ci';

type Product = {
  id: number;
  title: string;
}

const Search = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedQuery) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await fetch('/api/products');
        const data: Product[] = await res.json();
        const filtered = data.filter((product) =>
          product.title.toLowerCase().includes(debouncedQuery.toLowerCase())
        );
        setSuggestions(filtered.slice(0, 5)); 
      } catch (error) {
        console.error('Search error:', error);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  const handleSelect = (id: number) => {
    setQuery('');
    setSuggestions([]);
    router.push(`/product/${id}`);
  };

  return (
    <div className="w-full mx-auto flex justify-center">
    <div className="relative w-[40%]">
      <div className="flex">
        <input
          placeholder="Find Exciting items here"
          className="w-full text-gray-900 italic text-md bg-white rounded-l-lg p-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="bg-orange-600  rounded-r-md flex justify-center items-center w-[42px] h-[42px]">
          <CiSearch size={30} />
        </button>
      </div>
  
      {suggestions.length > 0 && (
        <ul className="absolute top-10 left-0 right-0 bg-white text-black mt-1 shadow-md rounded-md z-10">
          {suggestions.map((product) => (
            <li
              key={product.id}
              onClick={() => handleSelect(product.id)}
              className="p-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
            >
              {product.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
  
  );
};

export default Search;
