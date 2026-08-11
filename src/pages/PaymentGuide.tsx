import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';
import PaymentGuideSection from '../components/PaymentGuideSection';

/* ============================================================
   Trang công khai độc lập — Hướng dẫn thanh toán (SOLI AI)
   Route: /huong-dan-thanh-toan

   Nội dung được render lại từ đúng component PaymentGuideSection
   (nguồn duy nhất) nên GIỮ NGUYÊN toàn bộ: layout, CSS scoped (spg-*),
   JavaScript nút Sao chép, mã QR, thông tin ngân hàng và FAQ.
   Trang bọc thêm phần chrome nhẹ: thanh logo + nút "Quay lại trang chủ"
   và Footer dùng chung của site.
   ============================================================ */

export default function PaymentGuide() {
  return (
    <div className="min-h-screen bg-bg-custom text-neutral-main font-sans antialiased flex flex-col">
      {/* Soft brand aura background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            'radial-gradient(1200px 520px at 82% -12%, rgba(16,185,129,0.14), transparent 60%), radial-gradient(900px 480px at 0% 8%, rgba(52,211,153,0.16), transparent 55%)',
        }}
      />

      {/* ══════ Header công khai ══════ */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border-custom bg-white-custom/80 px-5 backdrop-blur-md backdrop-saturate-150">
        <Link to="/" className="soli-lift-sm inline-flex items-center" aria-label="Về trang chủ SOLI AI">
          <img src="/logo.webp" alt="SOLI AI" width={320} height={180} className="h-9 w-auto object-contain" />
        </Link>
        <span className="flex-1" />
        <Link
          to="/"
          className="soli-lift-sm inline-flex items-center gap-2 rounded-xl border border-border-custom bg-white-custom px-4 py-2 text-sm font-bold text-secondary-teal transition-colors hover:border-secondary-teal"
        >
          <ArrowLeft size={16} strokeWidth={2.4} />
          Quay lại trang chủ
        </Link>
      </header>

      {/* ══════ Nội dung — dùng lại đúng section Hướng dẫn thanh toán ══════ */}
      <main className="flex-1">
        <PaymentGuideSection />
      </main>

      <Footer />
    </div>
  );
}
