import { useEffect, useState } from 'react'
import './Hero.css'
import { heroSlides } from '../../data/store'

// ponytail: fixed 5s autoplay; add pause-on-hover/arrows when a third slide lands
export default function Hero() {
  const [i, setI] = useState(0)
  const [anim, setAnim] = useState(true)
  useEffect(() => {
    const t = setInterval(() => { setAnim(true); setI((p) => p + 1) }, 5000)
    return () => clearInterval(t)
  }, [i])
  const snap = () => { if (i === heroSlides.length) { setAnim(false); setI(0) } }

  return (
    <section className="hero">
      <div className="hero-viewport">
        <div className="hero-track" style={{ transform: `translateX(-${i * 100}%)`, transition: anim ? undefined : 'none' }} onTransitionEnd={snap}>
          {[...heroSlides, heroSlides[0]].map((s, n) => (
            <div key={n} className="hero-slide">
              <img src={s.img} alt={s.alt} />
            </div>
          ))}
        </div>
      </div>
      <div className="hero-actions">
        <a className="btn-red" href="#">Shop Now <span>→</span></a>
        <a className="btn-ghost" href="#">Explore Brands</a>
      </div>
      <a className="hero-card" href="#"><span className="hero-card-text"><span>New Arrivals</span><b>{heroSlides[i % heroSlides.length].card}</b></span><span>→</span></a>
      <div className="hero-dots">
        {heroSlides.map((s, n) => (
          <button key={s.img} aria-label={`Slide ${n + 1}`} className={n === i % heroSlides.length ? 'dot active' : 'dot'} onClick={() => { setAnim(true); setI(n) }} />
        ))}
      </div>
    </section>
  )
}
