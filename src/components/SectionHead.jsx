export default function SectionHead({ title }) {
  return (
    <div className="row">
      <h2>{title}</h2>
      <a className="view" href="#">View all <span>→</span></a>
    </div>
  )
}
