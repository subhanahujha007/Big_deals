'use client';

import React from 'react';
import { FaStar } from 'react-icons/fa';
import { useFilterStore } from '../store/useFilterStore';

const categories = [
  "All",
  "men's clothing",
  "women's clothing",
  "jewelery",
  "electronics"
];

const FilterBar = () => {
  const { selectedCategory, setSelectedCategory, maxPrice, setMaxPrice, minRating, setMinRating, inStockOnly, setInStockOnly } = useFilterStore();

  const handleStarClick = (index: number) => {
    setMinRating(index + 1);
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setMaxPrice(1000);
    setMinRating(0);
    setInStockOnly(false);
  };

  return (
    <div className="p-4 bg-gray-200 justify-between text-lg font-bold my-auto h-[70vh] shadow rounded-md flex flex-col gap-6 w-full max-w-sm">
      <div className="flex flex-col gap-1">
        <label className="font-semibold">Category</label>
        <select
          className="border rounded px-3 py-2"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold">Maximum Price ($)</label>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Up to: ${maxPrice}</span>
          <input
            type="range"
            min={0}
            max={1000}
            step={10}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-semibold">Minimum Rating</label>
        <div className="flex gap-1">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              size={24}
              className={`cursor-pointer ${index < minRating ? 'text-yellow-400' : 'text-black'}`}
              onClick={() => handleStarClick(index)}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="inStock"
          checked={inStockOnly}
          onChange={() => setInStockOnly(!inStockOnly)}
          className="accent-blue-600"
        />
        <label htmlFor="inStock" className="font-semibold">Out of Stock</label>
      </div>

      <div className="flex flex-col gap-2">
        <button
          className="bg-blue-500 text-white py-2 rounded hover:bg-gray-400 transition"
          onClick={handleResetFilters}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
