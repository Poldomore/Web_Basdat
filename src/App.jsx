import { useState } from 'react'
import './styles/base.css'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import BrandStrip from './components/BrandStrip/BrandStrip'
import CategorySection from './components/CategorySection/CategorySection'
import BestSellers from './components/BestSellers/BestSellers'
import SaleBanner from './components/SaleBanner/SaleBanner'
import Features from './components/Features/Features'
import Footer from './components/Footer/Footer'
import Shop from './components/Shop/Shop'

// ponytail: CSS co-located per component; switch to *.module.css when class names start colliding
export default function App() {
  const [tab, setTab] = useState('Home')
  return (
    <>
      <Header active={tab} onNav={setTab} />
      {tab === 'Home' ? (
        <>
          <Hero />
          <main className="wrap">
            <BrandStrip />
            <CategorySection />
            <BestSellers />
            <SaleBanner />
            <Features />
          </main>
        </>
      ) : (
        <Shop />
      )}
      <Footer />
    </>
  )
}
