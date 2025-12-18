import React, { useEffect, useState } from 'react';
import { fetchCategories, fetchProducts } from './services/api';
import CategoryList from './components/CategoryList';
import ProductList from './components/ProductList';
import PriceFilter from './components/PriceFilter';
import SortControls from './components/SortControls';
import './App.css';

export default function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortMode, setSortMode] = useState('');

  useEffect(() => {
    async function load() {
      const cats = await fetchCategories();
      setCategories(['all', ...cats]);
      const prods = await fetchProducts();
      setProducts(prods);
      const prices = prods.map(p => p.price);
      const min = Math.floor(Math.min(...prices));
      const max = Math.ceil(Math.max(...prices));
      setPriceRange([min, max]);
    }
    load();
  }, []);

  const discounts = { jewelery: 0.1, "men's clothing": 0.3 };

  function applyFilters() {
    let list = products.slice();
    if (selectedCategory !== 'all') {
      list = list.filter(p => p.category === selectedCategory);
    }
    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (sortMode === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortMode === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortMode === 'discount' && selectedCategory === 'all') {
      // apply discount mapping when 'all' selected
      list.sort((a, b) => {
        const da = discounts[a.category] ? a.price * discounts[a.category] : 0;
        const db = discounts[b.category] ? b.price * discounts[b.category] : 0;
        return db - da; // highest discount first
      });
    }

    return list;
  }

  const filtered = applyFilters();

  return (
    <div className="app">
      <header className="header">
        <h1>Product Catalog</h1>
      </header>
      <main className="main">
        <aside className="sidebar">
          <CategoryList
            categories={categories}
            selected={selectedCategory}
            onSelect={c => setSelectedCategory(c)}
          />
          <PriceFilter
            products={products}
            range={priceRange}
            onChange={r => setPriceRange(r)}
          />
          <SortControls
            sortMode={sortMode}
            onChange={m => setSortMode(m)}
          />
        </aside>
        <section className="content">
          <ProductList products={filtered} discounts={discounts} allSelected={selectedCategory==='all'} />
        </section>
      </main>
    </div>
  );
}
