import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
