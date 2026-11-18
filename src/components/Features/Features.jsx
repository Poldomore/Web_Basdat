import Icon from '../Icon'
import { features } from '../../data/store'
import './Features.css'

export default function Features() {
  return (
    <section className="features">
      {features.map((f) => (
        <div key={f.t} className="feat">
          <Icon d={f.icon} />
          <div><b>{f.t}</b><small>{f.s}</small></div>
        </div>
      ))}
    </section>
  )
}
