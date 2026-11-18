import { useMemo, useState } from 'react'
import Icon from '../Icon'
import { shopProducts } from '../../data/shop'
import ProductPopup from './ProductPopup'
import '../BestSellers/BestSellers.css'
import './Shop.css'

const PAGE_SIZE = 16

export default function Shop() {
  const [sort, setSort] = useState('featured')
  const [liked, setLiked] = useState({})
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState(null)
  const toggle = (img) => setLiked((p) => ({ ...p, [img]: !p[img] }))
  const open = (p) => setSelected(p)
  const close = () => setSelected(null)

  const sorted = useMemo(() => {
    const arr = [...shopProducts]
    if (sort === 'price-asc') arr.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') arr.sort((a, b) => b.price - a.price)
    if (sort === 'rating') arr.sort((a, b) => b.rating - a.rating)
    return arr
  }, [sort])

  const pages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE))
  const visible = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <>
      <div className="shop-banner">
        <img src="/assets/shop-all-banner.png" alt="Shop All — Sneakers for every style" />
      </div>
      <main className="wrap">
        <div className="shop-head">
          <div>
            <h1>All Sneakers</h1>
            <small>{sorted.length} products</small>
          </div>
          <label className="sort">
            Sort By
            <select value={sort} onChange={(e) => { setSort(e.target.value); setPage(1) }}>
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </label>
        </div>
        <div className="shop-grid">
          {visible.map((p) => (
            <div key={p.model} className="product">
              <div className="pimg pimg-click" onClick={() => open(p)}>
                <img src={p.img} alt={`${p.brand} ${p.model}`} loading="lazy" />
                <button aria-label="wishlist" className={liked[p.img] ? 'heart on' : 'heart'} onClick={(e) => { e.stopPropagation(); toggle(p.img) }}>
                  <Icon><path d="M12 20s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.5-7 10-7 10z" /></Icon>
                </button>
              </div>
              <b>{p.brand}</b>
              <span>{p.model}</span>
              <small>{p.cat}</small>
              <span className="price">${p.price}</span>
              <span className="stars">★★★★★ <em>{p.rating} ({p.reviews})</em></span>
            </div>
          ))}
        </div>
        <div className="pager">
          <button disabled={page <= 1} onClick={() => setPage(page - 1)} aria-label="Previous">←</button>
          {Array.from({ length: pages }, (_, i) => (
            <button key={i + 1} className={page === i + 1 ? 'on' : ''} onClick={() => setPage(i + 1)}>{i + 1}</button>
          ))}
          <button disabled={page >= pages} onClick={() => setPage(page + 1)} aria-label="Next">→</button>
        </div>
      </main>
      {selected && <ProductPopup product={selected} onClose={close} onSelect={setSelected} />}
    </>
  )
}
