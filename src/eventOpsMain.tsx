import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import EventOps from './EventOps'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EventOps />
  </StrictMode>,
)
