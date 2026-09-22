import { useI18n } from './i18n/i18n'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Menu from './components/Menu'
import Culture from './components/Culture'
import History from './components/History'
import Team from './components/Team'
import Location from './components/Location'
import Contact from './components/Contact'
import Footer from './components/Footer'
import MobileOrderBar from './components/MobileOrderBar'
import Announcement from './components/Announcement'
import ConsentBanner from './components/ConsentBanner'

export default function App() {
  const { t } = useI18n()
  return (
    <>
      <a className="skip" href="#main">{t('skip')}</a>
      <Announcement />
      <Nav />
      <main id="main">
        <a id="top" />
        <Hero />
        <About />
        <Menu />
        <Culture />
        <History />
        <Team />
        <Location />
        <Contact />
      </main>
      <Footer />
      <MobileOrderBar />
      <ConsentBanner />
    </>
  )
}
