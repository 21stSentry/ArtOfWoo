import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Design2 from './designs/Design2'
import MediaPackage from './MediaPackage'
import EventOps from './EventOps'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/event-ops" element={<EventOps />} />
        <Route path="/media-package" element={<MediaPackage />} />
        <Route path="/*" element={<Design2 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
