import SectionHead from '../SectionHead'
import { categories } from '../../data/store'
import './CategorySection.css'

export default function CategorySection() {
  return (
    <section>
      <SectionHead title="SHOP BY CATEGORY" />
      <div className="cat-grid">
        {categories.map((c) => (
          <a key={c.name} className="cat" href="#">
            <img src={c.img} alt={c.name} loading="lazy" />
            <span>{c.name}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
