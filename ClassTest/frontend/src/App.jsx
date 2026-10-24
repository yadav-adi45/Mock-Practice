import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Profile from './pages/Profile'
import Form from './pages/Form'
import Home from './pages/Home'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api/profile" element={<Profile />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
