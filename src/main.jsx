import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// For GitHub Pages: app is served under /workout-tracker/ in prod, / in dev.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

// Handle SPA redirect from 404.html (?p=/deep/path → push that path)
const params = new URLSearchParams(window.location.search);
const redirect = params.get('p');
if (redirect) {
  const clean = redirect.startsWith('/') ? redirect : '/' + redirect;
  window.history.replaceState(null, '', basename + clean);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
