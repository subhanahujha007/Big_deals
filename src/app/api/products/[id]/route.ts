import { NextResponse } from "next/server";


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
  
  
export async function GET(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    const id = Number((await params).id); 
  
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }
  
    try {
      console.log('Fetching product ID:', id);
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  
      if (!res.ok) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }
  
      const data: Product = await res.json();
      return NextResponse.json(data);
    } catch (error) {
      console.error('Error fetching product:', error);
      return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
    }
  }
  