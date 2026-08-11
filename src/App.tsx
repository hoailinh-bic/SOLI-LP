import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import { Lead } from './types';
import { Sparkles, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { smoothScrollToId } from './lib/smoothScroll';

// Below-the-fold sections are code-split so the initial JS bundle that must
// download + execute before the Hero (which contains the LCP text) renders is as
// small as possible. The Hero fills the viewport (min-height:100vh), so these
// lazy sections mount below the fold — no visible layout shift, and no change to
// UI, content, forms, GTM or GA4.
const PainPoints = lazy(() => import('./components/PainPoints'));
const HowItWorks = lazy(() => import('./components/HowItWorks'));
const WhySoli = lazy(() => import('./components/WhySoli'));
const Pricing = lazy(() => import('./components/Pricing'));
const CTASection = lazy(() => import('./components/CTASection'));
const PaymentGuideSection = lazy(() => import('./components/PaymentGuideSection'));
const Footer = lazy(() => import('./components/Footer'));
const GoogleSheetsConfigModal = lazy(() => import('./components/GoogleSheetsConfigModal'));
const DownloadPopup = lazy(() => import('./components/DownloadPopup'));

// Google Apps Script Web App endpoint (same webhook used by the download form).
// Leads are posted directly from the browser so the static production build
// does not depend on the Express server (/api/submit-lead).
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyN6wftIBhvzbGT8Pzalv07prwMHEXdcuJtlNIUPh7isbLAW1Za7zAC8xR8QjiRbmSgpA/exec";

const INITIAL_LEADS: Lead[] = [
  {
    id: "LD-8302",
    fullName: "Chị Khánh Linh",
    phone: "0962xxx142",
    businessName: "Hana Luxury Spa & Clinic",
    branches: "2-3",
    submittedAt: "2026-06-23 13:42",
    source: "demo_form",
    status: "New"
  },
  {
    id: "LD-2195",
    fullName: "Anh Minh Quân",
    phone: "0905xxx912",
    businessName: "The Gentlemen Barber",
    branches: "1",
    submittedAt: "2026-06-23 10:15",
    source: "resource_download",
    email: "quan.minh@gentlemens.vn",
    status: "Contacted"
  },
  {
    id: "LD-7709",
    fullName: "Chị Thảo Vy",
    phone: "0934xxx882",
    businessName: "VyVy Cosmetics & Nails",
    branches: "over-3",
    submittedAt: "2026-06-23 08:30",
    source: "demo_form",
    status: "VIP"
  }
];

export default function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isSheetsModalOpen, setIsSheetsModalOpen] = useState(false);
  const formRef = useRef<HTMLDivElement | null>(null);

  // Deep-link: after mount/hydration, smooth-scroll to the section named in the URL hash
  // (e.g. https://www.soliai.vn/#pre-register). React renders content after the browser's
  // native hash-jump, so we re-trigger the scroll once the target element exists in the DOM.
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    const scrollToHash = () => {
      smoothScrollToId(id, { duration: 350, offset: 100 });
    };
    const t = window.setTimeout(scrollToHash, 350);
    return () => window.clearTimeout(t);
  }, []);

  // Load leads on mount
  useEffect(() => {
    const cachedLeads = localStorage.getItem('soli_ai_leads');
    if (cachedLeads) {
      try {
        setLeads(JSON.parse(cachedLeads));
      } catch (e) {
        setLeads(INITIAL_LEADS);
      }
    } else {
      setLeads(INITIAL_LEADS);
      localStorage.setItem('soli_ai_leads', JSON.stringify(INITIAL_LEADS));
    }
  }, []);

  // Update localStorage when leads change
  const saveLeadsToStorage = (updated: Lead[]) => {
    setLeads(updated);
    localStorage.setItem('soli_ai_leads', JSON.stringify(updated));
  };

  const handleLeadCreate = async (
    name: string,
    phone: string,
    bizName?: string,
    branches?: '1' | '2-3' | 'over-3',
    source: 'demo_form' | 'resource_download' = 'demo_form',
    email?: string
  ): Promise<{ success: boolean; message?: string }> => {
    // Generate id and format current time
    const timeNow = new Date();
    const formattedMinutes = String(timeNow.getMinutes()).padStart(2, '0');
    const formattedHours = String(timeNow.getHours()).padStart(2, '0');
    const formattedDay = String(timeNow.getDate()).padStart(2, '0');
    const formattedMonth = String(timeNow.getMonth() + 1).padStart(2, '0');
    const timeStr = `${timeNow.getFullYear()}-${formattedMonth}-${formattedDay} ${formattedHours}:${formattedMinutes}`;
    
    const newLead: Lead = {
      id: `LD-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: name,
      phone: phone,
      businessName: bizName || '',
      branches: branches || '1',
      submittedAt: timeStr,
      source: source,
      email: email,
      status: 'New'
    };

    saveLeadsToStorage([newLead, ...leads]);

    // Send directly to Google Apps Script webhook to sync with Google Sheet.
    // Content-Type text/plain avoids the CORS preflight that Apps Script cannot answer.
    try {
      const webhookUrl = localStorage.getItem("google_sheets_webhook_url") || SCRIPT_URL;
      // Map only the fields provided by the submitting form. The demo/registration
      // form now sends just Họ và tên (fullName) + Số điện thoại (phone); optional
      // businessName / branches / email are included only when supplied (e.g. the
      // resource-download form or the Hero quick-demo action).
      const payload: Record<string, string> = {
        fullName: name,
        phone: phone,
        submittedAt: timeStr,
        source: source
      };
      if (bizName) payload.businessName = bizName;
      if (branches) payload.branches = branches;
      if (email) payload.email = email;

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(payload)
      });
      const text = await response.text();
      console.log("Google Sheets sync response:", text);

      let synced = false;
      try {
        const data = JSON.parse(text);
        synced = data.status === "success" || data.result === "success";
      } catch (e) {
        synced =
          text.includes('"status":"success"') || text.includes('"result":"success"') ||
          text.includes('"status": "success"') || text.includes('"result": "success"');
      }

      if (response.ok && synced) {
        return { success: true };
      } else {
        return {
          success: false,
          message: "Gửi dữ liệu lên Google Sheets thất bại."
        };
      }
    } catch (err: any) {
      console.error("Failed to sync lead with Google Sheets:", err);
      return {
        success: false,
        message: err.message || "Lỗi kết nối mạng khi gửi dữ liệu lên Google Sheets."
      };
    }
  };

  const handleDeleteLead = (id: string) => {
    const updated = leads.filter(l => l.id !== id);
    saveLeadsToStorage(updated);
  };

  const handleUpdateStatus = (id: string, nextStatus: Lead['status']) => {
    const updated = leads.map(l => {
      if (l.id === id) {
        return { ...l, status: nextStatus };
      }
      return l;
    });
    saveLeadsToStorage(updated);
  };

  const handleScrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Get active leads count to pass to header
  const newLeadsCount = leads.filter(l => l.status === 'New').length;

  return (
    <div className="min-h-screen bg-bg-custom text-neutral-main flex flex-col justify-between selection:bg-primary/20 selection:text-secondary-teal">
      
      {/* Header section navigation */}
      <Header 
        onOpenDemo={handleScrollToForm} 
        onOpenSheetsConfig={() => setIsSheetsModalOpen(true)} 
        leadCount={newLeadsCount} 
      />

      {/* Main landing sections */}
      <main className="flex-1">
        
        {/* HERO SECTION */}
        <Hero onOpenDemo={handleScrollToForm} onLeadCreate={handleLeadCreate} />

        {/* Below-the-fold sections — code-split (lazy) to shrink the initial JS bundle */}
        <Suspense fallback={null}>
          {/* PAIN POINT SECTION */}
          <PainPoints />

          {/* HOW IT WORKS SECTION */}
          <HowItWorks />

          {/* WHY SOLI AI SECTION */}
          <WhySoli />

          {/* PRICING SECTION */}
          <Pricing onOpenDemo={handleScrollToForm} />

          {/* CTA & TWO CONVERSION FORM CARDS */}
          <CTASection onLeadCreate={handleLeadCreate} formRef={formRef} />

          {/* PAYMENT GUIDE SECTION — Hướng dẫn thanh toán */}
          <PaymentGuideSection />
        </Suspense>

      </main>

      {/* Footer + modals/popup — code-split (lazy) */}
      <Suspense fallback={null}>
        {/* FOOTER */}
        <Footer />

        {/* Google Sheets Config Modal */}
        <GoogleSheetsConfigModal
          isOpen={isSheetsModalOpen}
          onClose={() => setIsSheetsModalOpen(false)}
        />

        {/* Entry popup — free e-book download (mirrors the download section) */}
        <DownloadPopup />
      </Suspense>

    </div>
  );
}
