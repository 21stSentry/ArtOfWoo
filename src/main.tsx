import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Design2 from './designs/Design2'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Design2 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
