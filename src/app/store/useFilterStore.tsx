import {create} from 'zustand';

type FilterState = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  inStockOnly: boolean;
  setInStockOnly: (inStock: boolean) => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  selectedCategory: 'All',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  maxPrice: 1000,
  setMaxPrice: (price) => set({ maxPrice: price }),
  minRating: 0,
  setMinRating: (rating) => set({ minRating: rating }),
  inStockOnly: false,
  setInStockOnly: (inStock) => set({ inStockOnly: inStock }),
}));
