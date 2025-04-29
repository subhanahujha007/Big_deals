import {create} from 'zustand';
type SortOption = 'price-asc' | 'price-desc' | 'rating-desc' | null;

type FilterStore = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  inStockOnly: boolean;
  setInStockOnly: (inStock: boolean) => void;
  sortBy: SortOption;
  setSortBy: (sortOption: SortOption) => void;
};
export const useFilterStore = create<FilterStore>((set) => ({
  selectedCategory: 'All',
  setSelectedCategory: (category:string) => set({ selectedCategory: category }),
  maxPrice: 1000,
  setMaxPrice: (price:number) => set({ maxPrice: price }),
  minRating: 0,
  setMinRating: (rating:number) => set({ minRating: rating }),
  inStockOnly: false,
  setInStockOnly: (inStock:boolean) => set({ inStockOnly: inStock }),
  sortBy: null,
  setSortBy: (sortOption:SortOption) => set({ sortBy: sortOption }),
}));
