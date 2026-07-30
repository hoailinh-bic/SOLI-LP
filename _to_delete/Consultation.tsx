import { useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';

// Same Google Apps Script webhook the landing page (App.tsx) posts leads to,
// so the standalone /consultation page submits to the exact same endpoint.
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyN6wftIBhvzbGT8Pzalv07prwMHEXdcuJtlNIUPh7isbLAW1Za7zAC8xR8QjiRbmSgpA/exec";

export default function Consultation() {
  const formRef = useRef<HTMLDivElement | null>(null);

  // Identical lead-submit logic to App.handleLeadCreate (localStorage cache + webhook POST),
  // so validation, payload, API endpoint and tracking behave exactly as on the landing page.
  const handleLeadCreate = async (
    name: string,
    phone: string,
    bizName: string,
    branches: '1' | '2-3' | 'over-3',
    source: 'demo_form' | 'resource_download' = 'demo_form',
    email?: string
  ): Promise<{ success: boolean; message?: string }> => {
    const timeNow = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    const timeStr = `${timeNow.getFullYear()}-${pad(timeNow.getMonth() + 1)}-${pad(timeNow.getDate())} ${pad(timeNow.getHours())}:${pad(timeNow.getMinutes())}`;

    const newLead = {
      id: `LD-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: name,
      phone,
      businessName: bizName,
      branches,
      submittedAt: timeStr,
      source,
      email,
      status: 'New'
    };

    try {
      const cached = localStorage.getItem('soli_ai_leads');
      const existing = cached ? JSON.parse(cached) : [];
      localStorage.setItem('soli_ai_leads', JSON.stringify([newLead, ...existing]));
    } catch (e) {
      // localStorage may be unavailable; the webhook below is the source of truth.
    }

    try {
      const webhookUrl = localStorage.getItem("google_sheets_webhook_url") || SCRIPT_URL;
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          fullName: name,
          phone,
          businessName: bizName,
          branches,
          submittedAt: timeStr,
          source,
          email: email || ""
        })
      });
      const text = await response.text();
      let synced = false;
      try {
        const data = JSON.parse(text);
        synced = data.status === "success" || data.result === "success";
      } catch (e) {
        synced =
          text.includes('"status":"success"') || text.includes('"result":"success"') ||
          text.includes('"status": "success"') || text.includes('"result": "success"');
      }
      return (response.ok && synced)
        ? { success: true }
        : { success: false, message: "Gửi dữ liệu lên Google Sheets thất bại." };
    } catch (err: any) {
      return { success: false, message: err?.message || "Lỗi kết nối mạng khi gửi dữ liệu lên Google Sheets." };
    }
  };

  return (
    <div className="min-h-screen bg-bg-custom text-neutral-main flex flex-col justify-between selection:bg-primary/20 selection:text-secondary-teal">
      <Header
        onOpenDemo={() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        onOpenSheetsConfig={() => {}}
        leadCount={0}
      />

      <main className="flex-1">
        {/* Consultation page reuses the exact registration form (variant hides the ebook block) */}
        <CTASection onLeadCreate={handleLeadCreate} formRef={formRef} variant="consultation" />
      </main>

      <Footer />
    </div>
  );
}
