import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero.jsx'
import Projects from './components/Projects/Projects.jsx'
import Skills from './components/Skills/Skills.jsx'
import Contact from './components/Contact/Contact.jsx'
import Footer from './components/Footer/Footer.jsx'
import DetailsProjet from './pages/details_projet.jsx'

const HomePage = () => (
  <>
    <Header />
    <Hero />
    <Projects />
    <Skills />
    <Contact />
    <Footer />
  </>
)

const DetailPage = () => (
  <>
    <Header />
    <DetailsProjet />
    <Footer />
  </>
)

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projets/:id" element={<DetailPage />} />
    </Routes>
  )
}

export default App
