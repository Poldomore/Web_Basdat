import './SaleBanner.css'

export default function SaleBanner() {
  return (
    <section className="sale-banner">
      <img src="/assets/summer-sale.png" alt="Summer Sale up to 40% off" />
      <a className="btn-white" href="#">Shop the Sale <span>→</span></a>
    </section>
  )
}
