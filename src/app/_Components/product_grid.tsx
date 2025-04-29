'use client';

import React, { useEffect, useState } from 'react';
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
  const { selectedCategory, maxPrice, minRating, inStockOnly } = useFilterStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/products');
        const data: Product[] = await res.json();

        const filteredProducts = data.filter((product) => {
          const isCategoryMatch =
            selectedCategory === 'All' || product.category === selectedCategory;
          const isPriceMatch = product.price <= maxPrice;
          const isRatingMatch = product.rating.rate >= minRating;
          const isInStockMatch = !inStockOnly || product.inStock;

          return isCategoryMatch && isPriceMatch && isRatingMatch && isInStockMatch;
        });

        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory, maxPrice, minRating, inStockOnly]);  

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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
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
