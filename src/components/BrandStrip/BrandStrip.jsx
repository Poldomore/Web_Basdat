import { brands } from '../../data/store'
import './BrandStrip.css'

export default function BrandStrip() {
  return (
    <section className="strip">
      <b>TOP BRANDS</b>
      <div className="strip-logos">
        {brands.map((b) => <img key={b.name} src={b.img} alt={b.name} />)}
      </div>
      <a className="view" href="#">View all <span>→</span></a>
    </section>
  )
}
