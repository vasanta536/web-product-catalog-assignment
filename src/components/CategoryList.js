import React from 'react';

export default function CategoryList({ categories=[], selected, onSelect }){
  return (
    <div className="category-list">
      <h3>Categories</h3>
      {categories.map(c => (
        <button
          key={c}
          className={c===selected? 'selected' : ''}
          onClick={() => onSelect(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
