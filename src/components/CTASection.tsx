import React, { useState } from 'react';

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyrq8QYXkXZ6UzgdPnDa0lTlJhE6TcHZF4xY-egUMabcHKXk-aX1ZLm4Zhbi1Vi_ukxGg/exec";
const DOWNLOAD_URL = "https://drive.google.com/uc?export=download&id=1Os6dZOPr5DBLdb_FWfsamlm11902VsFB";

interface CTASectionProps {
  onLeadCreate: (name: string, phone: string, bizName: string, branches: '1' | '2-3' | 'over-3', source: 'demo_form' | 'resource_download', email?: string) => Promise<{ success: boolean; message?: string }>;
  formRef: React.RefObject<HTMLDivElement | null>;
}

const BRANCH_OPTIONS: { value: '1' | '2-3' | 'over-3'; label: string }[] = [
  { value: '1', label: '1 Cơ sở' },
  { value: '2-3', label: '2-3 Cơ sở' },
  { value: 'over-3', label: 'Trên 3 cơ sở' }
];

const SectionBg = () => (
  <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: '-12%', background: 'radial-gradient(38% 38% at 22% 28%, rgba(52,211,153,0.17), transparent 70%), radial-gradient(36% 36% at 82% 20%, rgba(45,212,191,0.15), transparent 70%), radial-gradient(44% 44% at 62% 82%, rgba(110,231,183,0.15), transparent 70%)', animation: 'soli-mesh 34s ease-in-out infinite' }} />
    <div style={{ position: 'absolute', top: '50%', left: '50%', width: '150vmax', height: '150vmax', marginLeft: '-75vmax', marginTop: '-75vmax', transformOrigin: 'center', background: 'conic-gradient(from 0deg, rgba(52,211,153,0.06), rgba(45,212,191,0) 22%, rgba(110,231,183,0.06) 48%, rgba(52,211,153,0) 72%, rgba(52,211,153,0.06))', animation: 'soli-sheen 100s linear infinite' }} />
    <div style={{ position: 'absolute', top: '18%', left: '14%', width: 130, height: 130, borderRadius: '50%', background: 'radial-gradient(circle at 42% 40%, rgba(52,211,153,0.32), transparent 70%)', filter: 'blur(16px)', animation: 'soli-orb-a 26s ease-in-out infinite' }} />
    <div style={{ position: 'absolute', top: '64%', left: '56%', width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle at 50% 50%, rgba(45,212,191,0.3), transparent 70%)', filter: 'blur(14px)', animation: 'soli-orb-b 32s ease-in-out infinite' }} />
    <div style={{ position: 'absolute', top: '32%', left: '80%', width: 76, height: 76, borderRadius: '50%', background: 'radial-gradient(circle at 50% 50%, rgba(110,231,183,0.28), transparent 70%)', filter: 'blur(12px)', animation: 'soli-orb-c 29s ease-in-out infinite' }} />
    <div style={{ position: 'absolute', top: -140, right: -120, width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle at 50% 50%, rgba(52,211,153,0.4), rgba(52,211,153,0) 68%)', filter: 'blur(34px)', animation: 'soli-aurora-a 16s ease-in-out infinite' }} />
    <div style={{ position: 'absolute', bottom: -180, left: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle at 50% 50%, rgba(45,212,191,0.32), rgba(45,212,191,0) 66%)', filter: 'blur(40px)', animation: 'soli-aurora-b 20s ease-in-out infinite' }} />
    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(16,120,90,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(16,120,90,0.04) 1px, transparent 1px)', backgroundSize: '52px 52px', maskImage: 'radial-gradient(120% 100% at 50% 0%, #000 30%, transparent 78%)', WebkitMaskImage: 'radial-gradient(120% 100% at 50% 0%, #000 30%, transparent 78%)' }} />
  </div>
);

const cardShell: React.CSSProperties = {
  display: 'flex', flexDirection: 'column', borderRadius: 26,
  background: 'linear-gradient(160deg, rgba(255,255,255,0.92), rgba(255,255,255,0.7))',
  border: '1px solid rgba(255,255,255,0.9)',
  boxShadow: '0 30px 70px -34px rgba(11,74,57,0.5), inset 0 1px 0 rgba(255,255,255,0.9)',
  backdropFilter: 'blur(16px)'
};

const inputWrap: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 10, padding: '13px 15px', borderRadius: 13,
  background: 'rgba(255,255,255,0.9)', border: '1.5px solid rgba(16,120,90,0.16)'
};

const inputEl: React.CSSProperties = {
  flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 13.5, color: '#0d2b22', fontWeight: 500
};

const fieldLabel: React.CSSProperties = {
  fontFamily: "'Zalando Sans'", fontWeight: 600, fontSize: 12, color: '#0c6b52', marginBottom: 8
};

export default function CTASection({ onLeadCreate, formRef }: CTASectionProps) {
  // Card 1: Download resource
  const [downloadEmail, setDownloadEmail] = useState('');
  const [downloadPhone, setDownloadPhone] = useState('');
  const [downloadSubmitted, setDownloadSubmitted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Card 2: Registration Form
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [bizName, setBizName] = useState('');
  const [branches, setBranches] = useState<'1' | '2-3' | 'over-3'>('1');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleDownloadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;
    setEmailError('');
    setPhoneError('');

    const emailTrimmed = downloadEmail.trim();
    const phoneTrimmed = downloadPhone.trim();

    if (!emailTrimmed) {
      setEmailError('Email không được để trống.');
      hasError = true;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailTrimmed)) {
        setEmailError('Email không đúng định dạng.');
        hasError = true;
      }
    }

    if (!phoneTrimmed) {
      setPhoneError('Số điện thoại không được để trống.');
      hasError = true;
    }

    if (hasError) return;

    setIsDownloading(true);

    const timestamp = new Date().toISOString();
    const payload = {
      email: emailTrimmed,
      phone: phoneTrimmed,
      createdAt: timestamp,
      source: "Landing Page SOLI AI"
    };

    try {
      console.log("Sending download lead to Google Apps Script:", SCRIPT_URL);

      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const text = await response.text();
        let success = false;
        try {
          const data = JSON.parse(text);
          if (data.status === "success") {
            success = true;
          }
        } catch (e) {
          if (text.includes('"status":"success"') || text.includes('"status": "success"')) {
            success = true;
          }
        }

        if (success) {
          setDownloadSubmitted(true);
          window.open(DOWNLOAD_URL, '_blank');
          setDownloadEmail('');
          setDownloadPhone('');
        } else {
          alert("Có lỗi xảy ra. Vui lòng thử lại.");
        }
      } else {
        alert("Có lỗi xảy ra. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Failed to submit lead to Google Sheets:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !bizName) return;

    onLeadCreate(fullName, phone, bizName, branches, 'demo_form');
    setFormSubmitted(true);
  };

  const handleDownloadBook = () => {
    window.open(DOWNLOAD_URL, '_blank');
  };

  const branchLabel = branches === '1' ? '1 cơ sở' : branches === '2-3' ? '2-3 cơ sở' : 'trên 3 cơ sở';

  return (
    <section
      id="materials"
      ref={formRef}
      style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(64px,8vw,110px) clamp(24px,5vw,80px)', background: 'radial-gradient(130% 120% at 12% 0%, #f4fbf7 0%, #e7f4ec 42%, #dcefe4 100%)' }}
    >
      <SectionBg />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1160, margin: '0 auto' }}>
        {/* header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 'clamp(40px,5vw,56px)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '9px 16px 9px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.72)', border: '1px solid rgba(16,163,127,0.22)', boxShadow: '0 6px 20px -10px rgba(16,120,90,0.4)', backdropFilter: 'blur(8px)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,#10b981,#059669)' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><path d="M13 2L4 14h6l-1 8 9-12h-6z" /></svg>
            </span>
            <span style={{ fontFamily: "'Zalando Sans'", fontSize: 12, fontWeight: 700, letterSpacing: '1.1px', color: '#0c6b52' }}>SẴN SÀNG CHUYỂN ĐỔI</span>
          </div>
          <h2 style={{ margin: '24px 0 0', fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 'clamp(28px,3.8vw,48px)', lineHeight: 1.1, letterSpacing: '-1.1px', color: '#0d2b22', maxWidth: 860 }}>Tối ưu tiếp đón khách hàng — <span style={{ color: '#059669' }}>Gia tăng doanh thu của bạn!</span></h2>
          <p style={{ margin: '20px 0 0', maxWidth: 620, fontSize: 17, lineHeight: 1.65, color: '#4a5f57', fontWeight: 500 }}>Không còn nỗi lo bỏ lỡ khách hàng hay phản hồi trì trệ.<br />Hãy lựa chọn giải pháp phù hợp nhất với cửa hàng của bạn ngay hôm nay!</p>
        </div>

        {/* 2 cards */}
        <div className="soli-cta-grid" style={{ display: 'grid', gridTemplateColumns: '0.86fr 1.14fr', gap: 24, alignItems: 'stretch' }}>

          {/* LEFT · lead magnet / download */}
          <div style={{ ...cardShell, padding: '30px 28px' }}>
            {/* playbook preview */}
            <div style={{ position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', gap: 16, padding: 20, borderRadius: 18, background: 'linear-gradient(150deg, rgba(13,43,34,0.96), rgba(12,107,82,0.94))', boxShadow: '0 20px 44px -22px rgba(11,74,57,0.6)' }}>
              <div aria-hidden="true" style={{ position: 'absolute', top: -30, right: -20, width: 150, height: 150, borderRadius: '50%', background: 'radial-gradient(circle at 50% 50%, rgba(52,211,153,0.4), transparent 70%)' }} />
              <span style={{ position: 'relative', flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 52, height: 52, borderRadius: 14, background: 'linear-gradient(135deg,#34d399,#10b981)', boxShadow: '0 12px 24px -10px rgba(16,163,127,0.8)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M9 13h6M9 17h6" /></svg>
              </span>
              <div style={{ position: 'relative' }}>
                <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 999, background: 'rgba(52,211,153,0.22)', fontFamily: "'Zalando Sans'", fontWeight: 700, fontSize: 10, letterSpacing: '0.8px', color: '#8fe3c6' }}>FREE PLAYBOOK</span>
                <div style={{ marginTop: 8, fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 16, color: '#fff' }}>Cẩm Nang Vận Hành Tự Động</div>
              </div>
            </div>

            <h3 style={{ margin: '22px 0 0', fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 19, letterSpacing: '-0.3px', lineHeight: 1.34, color: '#0d2b22' }}>Tải tài liệu "Ứng dụng AI cho ngành Spa: Cánh tay phải đắc lực giúp chuỗi dịch vụ bứt phá doanh thu"</h3>
            <p style={{ margin: '12px 0 0', fontSize: 13.5, lineHeight: 1.62, color: '#5c6f68', fontWeight: 500 }}>Bộ tài liệu giúp bạn khai thác AI tự động hóa vận hành, tối ưu chăm sóc khách hàng, nâng cao hiệu quả doanh thu và tạo nền tảng tăng trưởng doanh thu bền vững.</p>

            <div style={{ height: 1, margin: '22px 0 16px', background: 'linear-gradient(90deg, rgba(16,120,90,0.16), transparent)' }} />

            {downloadSubmitted ? (
              <div className="animate-fade-in" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.28)', borderRadius: 16, padding: 20, textAlign: 'center' }}>
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto' }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" /></svg>
                <h5 style={{ margin: '12px 0 0', fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 14, color: '#0d2b22' }}>Cảm ơn bạn đã đăng ký. Tài liệu đang được mở.</h5>
                <p style={{ margin: '8px 0 0', fontSize: 12, lineHeight: 1.6, color: '#5c6f68', fontWeight: 500 }}>Hệ thống đang tự động tải cẩm nang về thiết bị của bạn. Nếu quá trình tải không tự động kích hoạt, vui lòng nhấn nút bên dưới để tải trực tiếp:</p>
                <button onClick={handleDownloadBook} className="soli-lift-sm" style={{ marginTop: 16, width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px 16px', border: 'none', borderRadius: 12, background: 'linear-gradient(135deg,#10b981,#059669)', cursor: 'pointer', fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 13, color: '#fff' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v13M7 11l5 5 5-5M5 21h14" /></svg>
                  TẢI TÀI LIỆU MIỄN PHÍ
                </button>
                <button onClick={() => setDownloadSubmitted(false)} style={{ marginTop: 12, background: 'none', border: 'none', color: '#0c6b52', fontFamily: "'Zalando Sans'", fontWeight: 700, fontSize: 11, cursor: 'pointer', textDecoration: 'underline' }}>[ Nhập lại thông tin khác ]</button>
              </div>
            ) : (
              <form onSubmit={handleDownloadSubmit}>
                <div style={{ fontFamily: "'Zalando Sans'", fontWeight: 700, fontSize: 11.5, letterSpacing: '0.4px', color: '#0c6b52' }}>* Cung cấp SĐT &amp; Email để hệ thống mở khóa link tải:</div>

                <label className="soli-input-wrap" style={{ ...inputWrap, marginTop: 14 }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0c6b52" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3 7l9 6 9-6" /></svg>
                  <input
                    type="text"
                    className="soli-input"
                    placeholder="Email nhận các cẩm nang vận hành mới"
                    value={downloadEmail}
                    onChange={(e) => { setDownloadEmail(e.target.value); if (emailError) setEmailError(''); }}
                    style={inputEl}
                  />
                </label>
                {emailError && <p style={{ margin: '6px 0 0 4px', fontSize: 11, color: '#e0574a', fontWeight: 600 }}>{emailError}</p>}

                <label className="soli-input-wrap" style={{ ...inputWrap, marginTop: 12 }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0c6b52" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.6 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.7 2z" /></svg>
                  <input
                    type="tel"
                    className="soli-input"
                    placeholder="Số điện thoại nhận thông báo Zalo"
                    value={downloadPhone}
                    onChange={(e) => { setDownloadPhone(e.target.value); if (phoneError) setPhoneError(''); }}
                    style={inputEl}
                  />
                </label>
                {phoneError && <p style={{ margin: '6px 0 0 4px', fontSize: 11, color: '#e0574a', fontWeight: 600 }}>{phoneError}</p>}

                <button
                  id="download-cta"
                  type="submit"
                  disabled={isDownloading}
                  className="soli-lift-sm"
                  style={{ marginTop: 22, width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '16px 18px', border: 'none', borderRadius: 14, background: 'linear-gradient(135deg,#0d2b22,#0c6b52)', cursor: isDownloading ? 'default' : 'pointer', fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 13.5, letterSpacing: '0.6px', color: '#fff', boxShadow: '0 16px 34px -16px rgba(11,74,57,0.7)', opacity: isDownloading ? 0.75 : 1 }}
                >
                  {isDownloading ? (
                    <>
                      <span style={{ width: 15, height: 15, border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'soli-border-spin 0.7s linear infinite' }} />
                      ĐANG XỬ LÝ…
                    </>
                  ) : (
                    <>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v13M7 11l5 5 5-5M5 21h14" /></svg>
                      TẢI TÀI LIỆU MIỄN PHÍ
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* RIGHT · demo registration form */}
          <div style={{ ...cardShell, padding: '30px 30px' }}>
            <div style={{ display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 8, padding: '7px 13px', borderRadius: 999, background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.28)' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
              <span style={{ fontFamily: "'Zalando Sans'", fontWeight: 700, fontSize: 11, letterSpacing: '0.8px', color: '#0c6b52' }}>FORM ĐĂNG KÝ TRẢI NGHIỆM DEMO</span>
            </div>
            <h3 style={{ margin: '16px 0 0', fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 'clamp(20px,2.2vw,26px)', letterSpacing: '-0.4px', color: '#0d2b22' }}>Đăng ký trải nghiệm SOLI AI miễn phí</h3>

            {formSubmitted ? (
              <div className="animate-fade-in" style={{ marginTop: 20, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 16, padding: 24, borderRadius: 20, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.28)' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg,#10b981,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                </div>
                <div>
                  <h4 style={{ margin: 0, fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 18, color: '#059669' }}>Gửi Bản Đăng Ký Thành Công!</h4>
                  <p style={{ margin: '8px 0 0', fontSize: 13.5, lineHeight: 1.6, color: '#5c6f68', fontWeight: 500, maxWidth: 420 }}>Thông tin tiệm <strong style={{ color: '#0d2b22' }}>{bizName}</strong> quy mô {branchLabel} đã được tiếp nhận.</p>
                </div>
                <div style={{ width: '100%', maxWidth: 380, textAlign: 'left', padding: 16, borderRadius: 14, background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(16,120,90,0.12)' }}>
                  <p style={{ margin: '0 0 8px', fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 11, letterSpacing: '0.4px', color: '#0c6b52' }}>📞 CÁC BƯỚC TIẾP THEO:</p>
                  <p style={{ margin: '0 0 6px', fontSize: 12.5, lineHeight: 1.55, color: '#39584b' }}><strong style={{ color: '#059669' }}>1.</strong> Chuyên viên kỹ thuật liên hệ theo số điện thoại <strong style={{ color: '#0d2b22' }}>{phone}</strong>.</p>
                  <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.55, color: '#39584b' }}><strong style={{ color: '#059669' }}>2.</strong> Đo lường quy mô và cung cấp bản tài khoản thử nghiệm AI miễn phí.</p>
                </div>
                <button onClick={() => setFormSubmitted(false)} style={{ background: 'none', border: 'none', color: '#0c6b52', fontFamily: "'Zalando Sans'", fontWeight: 700, fontSize: 13, cursor: 'pointer', textDecoration: 'underline' }}>Đăng ký cho chuỗi cơ sở khác</button>
              </div>
            ) : (
              <>
                <p style={{ margin: '12px 0 0', fontSize: 14, lineHeight: 1.6, color: '#5c6f68', fontWeight: 500 }}>Mỗi khách hàng nhắn tin đều là một cơ hội doanh thu. Hãy trải nghiệm cách SOLI giúp tiếp đón khách tức thì, tăng tỷ lệ đặt lịch và giảm thất thoát booking do phản hồi chậm.</p>
                <p style={{ margin: '10px 0 0', fontSize: 14, lineHeight: 1.6, color: '#5c6f68', fontWeight: 500 }}>Để lại thông tin liên hệ, đội ngũ SOLI AI sẽ liên hệ tư vấn và thiết lập SOLI AI phù hợp với nhu cầu thực tế của tiệm.</p>

                <form onSubmit={handleFormSubmit}>
                  <div className="soli-form-row" style={{ marginTop: 22, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <div style={fieldLabel}>Tên người đại diện liên hệ <span style={{ color: '#e0574a' }}>*</span></div>
                      <label className="soli-input-wrap" style={inputWrap}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0c6b52" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                        <input type="text" required className="soli-input" placeholder="Họ tên của bạn" value={fullName} onChange={(e) => setFullName(e.target.value)} style={inputEl} />
                      </label>
                    </div>
                    <div>
                      <div style={fieldLabel}>Số điện thoại liên hệ <span style={{ color: '#e0574a' }}>*</span></div>
                      <label className="soli-input-wrap" style={inputWrap}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0c6b52" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.6 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.7 2z" /></svg>
                        <input type="tel" required className="soli-input" placeholder="09xx xxx xxx" value={phone} onChange={(e) => setPhone(e.target.value)} style={inputEl} />
                      </label>
                    </div>
                  </div>

                  <div style={{ marginTop: 16 }}>
                    <div style={fieldLabel}>Tên thương hiệu Tiệm / Spa / Clinic <span style={{ color: '#e0574a' }}>*</span></div>
                    <label className="soli-input-wrap" style={inputWrap}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0c6b52" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h.01M15 9h.01M9 13h.01M15 13h.01M9 17h.01M15 17h.01" /></svg>
                      <input type="text" required className="soli-input" placeholder="Ví dụ: Hana Beauty, Seoul Clinic..." value={bizName} onChange={(e) => setBizName(e.target.value)} style={inputEl} />
                    </label>
                  </div>

                  <div style={{ marginTop: 16 }}>
                    <div style={fieldLabel}>Số lượng chi nhánh cửa hàng hiện tại <span style={{ color: '#e0574a' }}>*</span></div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
                      {BRANCH_OPTIONS.map((opt) => {
                        const active = branches === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setBranches(opt.value)}
                            style={{ padding: '13px 10px', borderRadius: 13, cursor: 'pointer', fontFamily: "'Zalando Sans'", fontWeight: 700, fontSize: 13, transition: 'all .2s ease', border: active ? '1.5px solid rgba(16,185,129,0.5)' : '1.5px solid rgba(16,120,90,0.18)', background: active ? 'rgba(16,185,129,0.14)' : 'rgba(255,255,255,0.85)', color: active ? '#0c6b52' : '#5c6f68' }}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    id="consultation-form-submit"
                    type="submit"
                    className="soli-lift-sm"
                    style={{ marginTop: 24, width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 11, padding: '17px 18px', border: 'none', borderRadius: 14, background: 'linear-gradient(135deg,#10b981,#059669)', cursor: 'pointer', fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 14, letterSpacing: '0.5px', color: '#fff', animation: 'soli-cta-glow 2.8s ease-in-out infinite' }}
                  >
                    GỬI THÔNG TIN ĐĂNG KÝ TƯ VẤN
                    <span style={{ display: 'inline-flex', animation: 'soli-arrow 1.6s ease-in-out infinite' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </span>
                  </button>
                </form>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
