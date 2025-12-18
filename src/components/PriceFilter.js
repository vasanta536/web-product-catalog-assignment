import React, { useMemo, useState, useEffect } from 'react';

export default function PriceFilter({ products=[], range=[0,1000], onChange }){
  const [local, setLocal] = useState(range);

  useEffect(()=> setLocal(range),[range]);

  const bounds = useMemo(()=>{
    if(!products.length) return {min:0,max:1000};
    const prices = products.map(p=>p.price);
    return {min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices))};
  },[products]);

  function update(idx, val){
    const next = [...local];
    next[idx]=Number(val);
    if(next[0] > next[1]) return;
    setLocal(next);
    onChange(next);
  }

  return (
    <div className="controls">
      <h4>Price Range</h4>
      <div className="price-range">
        <input type="range" min={bounds.min} max={bounds.max} value={local[0]} onChange={e=>update(0,e.target.value)} />
        <input type="range" min={bounds.min} max={bounds.max} value={local[1]} onChange={e=>update(1,e.target.value)} />
      </div>
      <div className="small">${local[0]} - ${local[1]}</div>
    </div>
  );
}
