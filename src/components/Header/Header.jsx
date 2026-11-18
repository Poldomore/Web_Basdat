import Icon from '../Icon'
import { navLinks } from '../../data/store'
import './Header.css'

export default function Header({ active = 'Home', onNav = () => {} }) {
  return (
    <>
      <div className="topbar">&nbsp; Free shipping on all orders over $100 &nbsp;|&nbsp; Easy 30-day returns</div>
      <header className="nav">
        <a className="logo" href="#"><img src="/assets/logo.png" alt="Last Surprise" /></a>
        <nav className="links">
          {navLinks.map((l) => (
            <a key={l} href="#" onClick={(e) => { e.preventDefault(); onNav(l) }} className={l === active ? 'active' : l === 'Sale' ? 'sale' : ''}>{l}</a>
          ))}
        </nav>
        <div className="icons">
          <button aria-label="Search"><Icon><circle cx="11" cy="11" r="6" /><path d="M16 16l4 4" /></Icon></button>
          <button aria-label="Wishlist"><Icon><path d="M12 20s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.5-7 10-7 10z" /></Icon></button>
          <button aria-label="Cart" className="cart"><Icon><path d="M3 4h2l2.5 11h10L20 8H7" /><circle cx="9" cy="19" r="1.5" /><circle cx="17" cy="19" r="1.5" /></Icon><span className="badge">9</span></button>
          <button aria-label="Account"><Icon><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0114 0" /></Icon></button>
        </div>
      </header>
    </>
  )
}
