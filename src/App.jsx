import { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <div className="bg-[#e1f3f2] bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:16px_16px]">
    <Manager/>
    </div>
    <Footer/>
    </>
  )
}

export default App
