import { useState } from 'react'
import Icon from '../Icon'
import SectionHead from '../SectionHead'
import { bestSellers } from '../../data/store'
import './BestSellers.css'

export default function BestSellers() {
  const [liked, setLiked] = useState({})
  const toggle = (i) => setLiked((p) => ({ ...p, [i]: !p[i] }))

  return (
    <section>
      <SectionHead title="BEST SELLERS" />
      <div className="best-grid">
        {bestSellers.map((p, i) => (
          <div key={p.name} className="product">
            <div className="pimg">
              <img src={p.img} alt={p.name} loading="lazy" />
              <button aria-label="wishlist" className={liked[i] ? 'heart on' : 'heart'} onClick={() => toggle(i)}>
                <Icon><path d="M12 20s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.5-7 10-7 10z" /></Icon>
              </button>
            </div>
            <b>{p.name}</b><small>{p.cat}</small>
            <div className="meta"><span className="price">{p.price}</span><span className="rate">★ {p.rating}</span></div>
          </div>
        ))}
      </div>
    </section>
  )
}
