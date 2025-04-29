'use server'
import ProductDetail from './ProductDetail';

export default async function ProductPage({ params }: { params:Promise<{ id: number }> }) {
    const id=(await params).id
  return <ProductDetail id={id} />;
}
