import { Route, Routes } from 'react-router-dom'
import Chat from './pages/Chat'
import Home from './pages/Home'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  )
}