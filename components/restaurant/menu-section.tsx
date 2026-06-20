// components/restaurant/menu-section.tsx
import { useState } from "react";
import { Filter, X } from "lucide-react";
import type { MenuCategory, MenuItem } from "@/types/restaurant";
import { Button } from "@/components/ui/button";
import MenuItemCard from "./menu-item-card";
import type { CartItem } from "@/types/order";

interface MenuSectionProps {
  menuCategories: MenuCategory[];
cart: Map<string, CartItem>;
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
}

export default function MenuSection({ menuCategories, cart, addToCart, removeFromCart }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(menuCategories[0]?.name || "");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    vegOnly: false,
    nonVegOnly: false,
    popularOnly: false,
    priceRange: "all"
  });

  const getCurrentCategoryItems = () => {
    const category = menuCategories.find(c => c.name === selectedCategory);
    if (!category) return [];
    
    let items = category.items;
    
    if (filters.vegOnly) items = items.filter(item => item.isVegetarian);
    if (filters.nonVegOnly) items = items.filter(item => !item.isVegetarian);
    if (filters.popularOnly) items = items.filter(item => item.isPopular);
    if (filters.priceRange !== "all") {
      items = items.filter(item => {
        if (filters.priceRange === "under-10") return item.price < 10;
        if (filters.priceRange === "10-20") return item.price >= 10 && item.price < 20;
        if (filters.priceRange === "20-30") return item.price >= 20 && item.price < 30;
        if (filters.priceRange === "above-30") return item.price >= 30;
        return true;
      });
    }
    return items;
  };

  const clearFilter = (filter: string) => {
    if (filter === "vegOnly") setFilters({ ...filters, vegOnly: false });
    if (filter === "nonVegOnly") setFilters({ ...filters, nonVegOnly: false });
    if (filter === "popularOnly") setFilters({ ...filters, popularOnly: false });
  };

  const currentItems = getCurrentCategoryItems();

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex gap-4 border-b mb-6 overflow-x-auto">
        {menuCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.name)}
            className={`pb-3 px-2 whitespace-nowrap font-medium transition-colors ${
              selectedCategory === category.name
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
          <Filter className="w-4 h-4" /> Filters
        </Button>
        
        <div className="flex gap-2">
          {filters.vegOnly && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
              Vegetarian <X className="w-3 h-3 cursor-pointer" onClick={() => clearFilter("vegOnly")} />
            </span>
          )}
          {filters.nonVegOnly && (
            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full flex items-center gap-1">
              Non-Veg <X className="w-3 h-3 cursor-pointer" onClick={() => clearFilter("nonVegOnly")} />
            </span>
          )}
          {filters.popularOnly && (
            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full flex items-center gap-1">
              Popular <X className="w-3 h-3 cursor-pointer" onClick={() => clearFilter("popularOnly")} />
            </span>
          )}
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-secondary/20 rounded-xl p-4 mb-6 space-y-4">
          <div>
            <p className="font-medium mb-2">Dietary</p>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={filters.vegOnly} onChange={(e) => setFilters({ ...filters, vegOnly: e.target.checked, nonVegOnly: false })} />
                <span className="text-sm">Vegetarian Only</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={filters.nonVegOnly} onChange={(e) => setFilters({ ...filters, nonVegOnly: e.target.checked, vegOnly: false })} />
                <span className="text-sm">Non-Veg Only</span>
              </label>
            </div>
          </div>
          <div>
            <p className="font-medium mb-2">Other Filters</p>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={filters.popularOnly} onChange={(e) => setFilters({ ...filters, popularOnly: e.target.checked })} />
              <span className="text-sm">Popular Items Only</span>
            </label>
          </div>
          <div>
            <p className="font-medium mb-2">Price Range</p>
            <select value={filters.priceRange} onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })} className="px-3 py-1.5 rounded-lg border bg-background">
              <option value="all">All</option>
              <option value="under-10">Under $10</option>
              <option value="10-20">$10 - $20</option>
              <option value="20-30">$20 - $30</option>
              <option value="above-30">Above $30</option>
            </select>
          </div>
        </div>
      )}

      {/* Menu Items */}
      <div className="space-y-4">
        {currentItems.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            quantity={cart.get(item.id)?.quantity || 0}
            addToCart={() => addToCart(item)}
            removeFromCart={() => removeFromCart(item.id)}
          />
        ))}
      </div>
    </div>
  );
}