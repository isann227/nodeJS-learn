import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import PreLoader from './components/PreLoader.jsx'

import 'remixicon/fonts/remixicon.css'
import 'animate.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import "semantic-ui-css/semantic.min.css";
AOS.init()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PreLoader />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
