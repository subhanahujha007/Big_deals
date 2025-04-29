'use client';
import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';

type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
};

export default function ProductDetail({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
    const [error,seterror]=useState(false)
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) seterror(true);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="w-64 h-64 bg-gray-300 rounded mb-4 mx-auto"></div>
          <div className="h-8 bg-gray-300 w-3/4 mb-4 mx-auto"></div>
          <div className="h-6 bg-gray-300 w-1/2 mb-2 mx-auto"></div>
          <div className="h-6 bg-gray-300 w-3/4 mb-2 mx-auto"></div>
          <div className="h-4 bg-gray-300 w-1/2 mb-2 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!product) return notFound();
  if(error){
   return <center className='w-full h-full'>
    <h1> NO Product Found</h1>
   </center>
  }
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <img
        src={product.image}
        alt={product.title}
        className="w-64 h-64 object-contain mb-4 mx-auto"
      />
      <p className="text-xl font-semibold text-green-600">${product.price}</p>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <p className="text-sm mt-2">
        <strong>Category:</strong> {product.category}
      </p>
      <p className="mt-1 text-yellow-600">
        ⭐ {product.rating.rate} ({product.rating.count})
      </p>
    </div>
  );
}
