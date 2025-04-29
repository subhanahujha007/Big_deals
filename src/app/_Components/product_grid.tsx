'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useFilterStore } from '../store/useFilterStore';

type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  category: string;
  inStock: boolean;
};

const ProductGrid = () => {
  const { selectedCategory, maxPrice, minRating, inStockOnly, sortBy } = useFilterStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const isCategoryMatch =
        selectedCategory === 'All' || product.category === selectedCategory;
      const isPriceMatch = product.price <= maxPrice;
      const isRatingMatch = product.rating.rate >= minRating;
      const isInStockMatch = !inStockOnly || product.inStock;

      return isCategoryMatch && isPriceMatch && isRatingMatch && isInStockMatch;
    });
  }, [products, selectedCategory, maxPrice, minRating, inStockOnly]);

  const sortedProducts = useMemo(() => {
    let sorted = [...filteredProducts];
    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        sorted.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      default:
        break;
    }
    return sorted;
  }, [filteredProducts, sortBy]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="border p-4 rounded shadow animate-pulse bg-gray-200"
          >
            <div className="h-32 bg-gray-300 rounded mx-auto my-2"></div>
            <div className="h-4 bg-gray-300 w-3/4 mx-auto my-2"></div>
            <div className="h-4 bg-gray-300 w-1/2 mx-auto my-2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 font-bold p-4 text-center">
        Error: {error}
      </div>
    );
  }

  if (sortedProducts.length === 0) {
    return (
      <div className="text-center text-lg font-semibold p-4">
        No products found for the current filters.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {sortedProducts.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.id}`}
          className="border p-4 rounded shadow hover:shadow-lg transition-all"
        >
          <h3 className="text-center font-semibold">{product.title}</h3>
          <img
            src={product.image}
            alt={product.title}
            className="w-32 h-32 object-contain mx-auto my-2"
          />
          <p className="text-center font-bold">${product.price}</p>
          <p className="text-center text-sm text-yellow-600">
            ⭐ {product.rating.rate} ({product.rating.count})
          </p>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
