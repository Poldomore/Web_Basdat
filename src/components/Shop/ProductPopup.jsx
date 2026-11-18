import { useEffect, useMemo, useState } from 'react'
import Icon from '../Icon'
import { shopProducts } from '../../data/shop'
import './ProductPopup.css'

const SIZES = ['40', '41', '42', '43', '44']
// ponytail: static demo reviews; ganti API reviews beneran kalau backend sudah ada
const REVIEWS = [
  { name: 'Alex Mathio', date: '13 Oct 2024', stars: 5, text: '“NextGen\u2019s dedication to sustainability and ethical practices resonates strongly with today\u2019s consumers, positioning the brand as a responsible choice in the fashion world.”' },
  { name: 'Sarah Wijaya', date: '28 Sep 2024', stars: 5, text: '“Super comfortable for daily wear. True to size, premium materials, and the quality is beyond expectation.”' },
  { name: 'Daniel Kurnia', date: '02 Sep 2024', stars: 4, text: '“Great design and fast shipping. Runs a bit narrow though — consider going half a size up.”' },
]
const CART = 'M3 4h2l2.5 11h10L20 8H7M9 19a1.5 1.5 0 100 .01M17 19a1.5 1.5 0 100 .01'

const comma = (n) => n.toFixed(1).replace('.', ',')

export default function ProductPopup({ product: p, onClose, onSelect }) {
  const [size, setSize] = useState(null)
  const [added, setAdded] = useState(false)
  const [ri, setRi] = useState(0)
  const [start, setStart] = useState(0)
  const [liked, setLiked] = useState({})

  useEffect(() => { setSize(null); setAdded(false); setRi(0); setStart(0) }, [p.model])
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [onClose])

  const others = useMemo(() => shopProducts.filter((x) => x.model !== p.model), [p.model])
  const cards = [0, 1, 2, 3].map((i) => others[(start + i) % others.length])
  const bars = useMemo(() => {
    const d5 = Math.round(p.reviews * 0.64), d4 = Math.round(p.reviews * 0.24)
    const d3 = Math.round(p.reviews * 0.08), d2 = Math.max(1, Math.round(p.reviews * 0.03))
    return [
      { s: 5, c: d5 }, { s: 4, c: d4 }, { s: 3, c: d3 }, { s: 2, c: d2 },
      { s: 1, c: Math.max(0, p.reviews - d5 - d4 - d3 - d2) },
    ]
  }, [p.reviews])
  const r = REVIEWS[ri % REVIEWS.length]

  return (
    <div className="pdp-overlay" onClick={onClose}>
      <div className="pdp-modal" onClick={(e) => e.stopPropagation()}>
        <button className="pdp-x" onClick={onClose} aria-label="Close">✕</button>

        {/* ATAS: pdp1 + hero produk */}
        <section className="pdp-top">
          <img src="/assets/pdp1.png" alt="" aria-hidden="true" />
          <div className="ov-photo"><img src={p.img} alt={`${p.brand} ${p.model}`} /></div>
          <div className="ov-buy">
            <span className="ov-pill">{p.cat} sneakers</span>
            <h2>{p.model}</h2>
            <small className="ov-brand"><span>★★★★★</span> ({p.reviews})</small>
            <div className="ov-price">${p.price}</div>
            <p className="ov-desc">Timeless design with premium materials and all-day comfort. Built for everyday wear with durable construction and classic style that never goes out of fashion.</p>
            <div className="ov-sizerow"><b>Size</b><span className="ov-guide">✎ Size Guide</span></div>
            <div className="ov-sizes">
              {SIZES.map((s) => (
                <button key={s} className={size === s ? 'on' : ''} onClick={() => { setSize(s); setAdded(false) }}>{s}</button>
              ))}
            </div>
            <button className="ov-cart" disabled={!size} onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 1500) }}>
              {added ? 'Added to Cart ✓' : size ? <>Add to Cart <Icon><path d={CART} /></Icon></> : 'Select a size'}
            </button>
          </div>
        </section>

        {/* BAWAH: pdp2 + rating & rekomendasi */}
        <section className="pdp-frame2">
          <img src="/assets/pdp2.png" alt="" aria-hidden="true" />
          <div className="ov-rate">
            <div>
              <div className="ov-bignum">{comma(p.rating)}<small>/5</small></div>
              <div className="ov-count">({p.reviews} New Reviews)</div>
            </div>
            <div className="ov-bars">
              {bars.map((b) => (
                <div className="ov-barow" key={b.s}>
                  <span className="ov-star">★</span><span>{b.s}</span>
                  <span className="ov-bar"><i style={{ width: `${(b.c / bars[0].c) * 100}%` }} /></span>
                  <span>{b.c}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ov-say">
            <div className="ov-sayhead">
              <span className="ov-ava">{r.name.split(' ').map((w) => w[0]).join('')}</span>
              <span className="ov-who"><b>{r.name}</b><span className="ov-rstars">{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</span></span>
              <span className="ov-date">{r.date}</span>
            </div>
            <p className="ov-quote">{r.text}</p>
            <div className="ov-dots">{REVIEWS.map((_, i) => <i key={i} className={i === ri % REVIEWS.length ? 'on' : ''} />)}</div>
          </div>
          <button className="ov-rnav prev" aria-label="Previous review" onClick={() => setRi((ri + REVIEWS.length - 1) % REVIEWS.length)}>‹</button>
          <button className="ov-rnav next" aria-label="Next review" onClick={() => setRi((ri + 1) % REVIEWS.length)}>›</button>

          <div className="ov-cards">
            {cards.map((c, i) => (
              <div key={c.model} className="ov-card" onClick={() => onSelect(c)}>
                <img src={c.img} alt={`${c.brand} ${c.model}`} loading="lazy" />
                <button aria-label="wishlist" className={liked[c.img] ? 'ov-heart on' : 'ov-heart'} onClick={(e) => { e.stopPropagation(); setLiked((m) => ({ ...m, [c.img]: !m[c.img] })) }}>{liked[c.img] ? '♥' : '♡'}</button>
                <b className="ov-nm">{c.brand} {c.model}</b>
                <span className="ov-st">★★★★★ <em>{c.rating}/5</em></span>
                <span className="ov-pr">${c.price}
                  {i % 2 === 0 && <><span className="ov-old">${Math.round(c.price * 1.25)}</span><span className="ov-off">{i === 0 ? '-20%' : '-18%'}</span></>}
                </span>
              </div>
            ))}
          </div>
          <button className="ov-cnav prev" aria-label="Previous products" onClick={() => setStart((start + others.length - 1) % others.length)}>‹</button>
          <button className="ov-cnav next" aria-label="Next products" onClick={() => setStart((start + 1) % others.length)}>›</button>
          <button className="ov-viewall" aria-label="View all products" onClick={onClose} />
        </section>
      </div>
    </div>
  )
}
