import { footerCols } from '../../data/store'
import './Footer.css'

export default function Footer() {
  return (
    <footer>
      <div className="fgrid">
        <div>
          <img className="flogo" src="/assets/logo.png" alt="Last Surprise" />
          <p>More than shoes.<br />A step ahead of the ordinary.</p>
        </div>
        {footerCols.map((c) => (
          <div key={c.title}>
            <b>{c.title}</b>
            {c.links.map((l) => <a key={l} href="#">{l}</a>)}
          </div>
        ))}
        <div>
          <b>NEWSLETTER</b>
          <p>Get the latest drops, exclusive offers, and more.</p>
          <form onSubmit={(e) => e.preventDefault()}>
            <input placeholder="Enter your email" />
            <button aria-label="Subscribe">→</button>
          </form>
        </div>
      </div>
      <div className="fbottom">
        <span>© 2024 Last Surprise. All Rights Reserved.</span>
        <span><a href="#">Terms & Conditions</a> | <a href="#">Privacy Policy</a></span>
      </div>
    </footer>
  )
}
