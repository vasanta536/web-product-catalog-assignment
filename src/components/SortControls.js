import React from 'react';

export default function SortControls({ sortMode, onChange }){
  return (
    <div className="controls">
      <h4>Sort</h4>
      <select value={sortMode} onChange={e=>onChange(e.target.value)}>
        <option value="">None</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="discount">Discount</option>
      </select>
      {/* <div className="small">Note: Discount sorting only applies when "all" categories selected.</div> */}
    </div>
  );
}
