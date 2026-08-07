import {StrictMode, useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import App from './App.tsx';
import Terms from './pages/Terms.tsx';
import Privacy from './pages/Privacy.tsx';
import PaymentGuide from './pages/PaymentGuide.tsx';
import './index.css';

// Canonical base — hard-coded to the production domain so the canonical URL is
// always https://www.soliai.vn/... regardless of which host actually served the
// page (e.g. a *.vercel.app preview/deploy domain). This keeps Google from
// selecting a non-production canonical.
const CANONICAL_ORIGIN = 'https://www.soliai.vn';

// Keeps <link rel="canonical"> in <head> pointing at the correct per-route
// production URL, updating on every client-side navigation. This is SEO metadata
// only: it renders nothing and does not touch UI, content, GTM/GA4 or forms.
function CanonicalTag() {
  const {pathname} = useLocation();
  useEffect(() => {
    const path = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
    const href = CANONICAL_ORIGIN + path;
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }, [pathname]);
  return null;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CanonicalTag />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/huong-dan-thanh-toan" element={<PaymentGuide />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
