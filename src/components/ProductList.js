import React from 'react';

function DiscountBadge({product, discounts, allSelected}){
  const d = discounts[product.category] || 0;
  if(!allSelected || d===0) return null;
  const amount = (product.price * d).toFixed(2);
  return <div className="small">Discount: {d*100}% (Save ${amount})</div>;
}

export default function ProductList({ products=[], discounts={}, allSelected=false }){
  if(!products.length) return <div>No products found</div>;
  return (
    <div>
      <div className="product-grid">
        {products.map(p => (
          <div className="product-card" key={p.id}>
            <img src={p.image} alt={p.title} />
            <h4>{p.title}</h4>
            <div className="small">{p.category}</div>
            <div style={{fontWeight:700}}>${p.price.toFixed(2)}</div>
            <DiscountBadge product={p} discounts={discounts} allSelected={allSelected} />
          </div>
        ))}
      </div>
    </div>
  );
}
