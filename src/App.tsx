import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';
import HowItWorks from './components/HowItWorks';
import WhySoli from './components/WhySoli';
import Pricing from './components/Pricing';
import CTASection from './components/CTASection';
import GoogleSheetsConfigModal from './components/GoogleSheetsConfigModal';
import { Lead } from './types';
import { Sparkles, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

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
    bizName: string,
    branches: '1' | '2-3' | 'over-3',
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
      businessName: bizName,
      branches: branches,
      submittedAt: timeStr,
      source: source,
      email: email,
      status: 'New'
    };

    saveLeadsToStorage([newLead, ...leads]);

    // Send to Express backend API to sync with Google Sheet
    try {
      const customWebhookUrl = localStorage.getItem("google_sheets_webhook_url") || "";
      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fullName: name,
          phone: phone,
          businessName: bizName,
          branches: branches,
          submittedAt: timeStr,
          source: source,
          email: email || "",
          customWebhookUrl
        })
      });
      const data = await response.json();
      console.log("Google Sheets sync response:", data);
      
      if (response.ok && data.success) {
        if (data.status === "local_only") {
          return {
            success: false,
            message: "Google Sheets Webhook chưa được thiết lập. Vui lòng cấu hình kết nối Google Sheet."
          };
        }
        return { success: true };
      } else {
        return {
          success: false,
          message: data.error || data.message || "Gửi dữ liệu lên Google Sheets thất bại."
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

      </main>

      {/* Google Sheets Config Modal */}
      <GoogleSheetsConfigModal 
        isOpen={isSheetsModalOpen} 
        onClose={() => setIsSheetsModalOpen(false)} 
      />

    </div>
  );
}
