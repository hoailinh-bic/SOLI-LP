import React, { useState, useEffect, useRef } from 'react';

// Floating (bottom-right) entry popup that mirrors the "Cẩm nang miễn phí / Tải tài liệu"
// section. Fully self-contained and does NOT touch the original download section:
// same endpoint, same payload, same validation and same post-submit download behaviour.
// It is non-blocking: no dark overlay, page stays scrollable/interactive.

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyrq8QYXkXZ6UzgdPnDa0lTlJhE6TcHZF4xY-egUMabcHKXk-aX1ZLm4Zhbi1Vi_ukxGg/exec";
const DOWNLOAD_URL = "https://drive.google.com/uc?export=download&id=1Os6dZOPr5DBLdb_FWfsamlm11902VsFB";

// Once shown/closed within a browsing session we don't show it again.
// sessionStorage is cleared when the tab is closed, so a brand-new session re-shows it.
const SESSION_KEY = "soli_download_popup_shown";

const inputWrap: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 10, padding: '13px 15px', borderRadius: 13,
  background: 'rgba(255,255,255,0.9)', border: '1.5px solid rgba(16,120,90,0.16)'
};

const inputEl: React.CSSProperties = {
  flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 13.5, color: '#0d2b22', fontWeight: 500
};

export default function DownloadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const closeTimer = useRef<number | null>(null);

  // Auto-open ~1s after the page loads, once per session.
  useEffect(() => {
    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem(SESSION_KEY) === '1';
    } catch (e) {
      alreadyShown = false;
    }
    if (alreadyShown) return;

    const timer = window.setTimeout(() => {
      try { sessionStorage.setItem(SESSION_KEY, '1'); } catch (e) { /* ignore */ }
      setIsOpen(true);
    }, 1000);

    return () => {
      window.clearTimeout(timer);
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  // The ONLY way to close the popup: the explicit "X" button.
  // Play the fade-out animation first, then unmount.
  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    closeTimer.current = window.setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 280);
  };

  const handleDownloadBook = () => {
    window.open(DOWNLOAD_URL, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;
    setEmailError('');
    setPhoneError('');

    const emailTrimmed = email.trim();
    const phoneTrimmed = phone.trim();

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
        } catch (err) {
          if (text.includes('"status":"success"') || text.includes('"status": "success"')) {
            success = true;
          }
        }

        if (success) {
          setSubmitted(true);
          window.open(DOWNLOAD_URL, '_blank');
          setEmail('');
          setPhone('');
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

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Tải tài liệu miễn phí"
      className={`soli-floating-popup ${isClosing ? 'soli-pop-out' : 'soli-pop-in'}`}
      style={{
        borderRadius: 20,
        border: '1px solid rgba(255,255,255,0.9)',
        boxShadow: '0 22px 55px -22px rgba(11,74,57,0.55), inset 0 1px 0 rgba(255,255,255,0.9)',
        background: 'radial-gradient(130% 120% at 12% 0%, #f4fbf7 0%, #e7f4ec 42%, #dcefe4 100%)',
        padding: 'clamp(20px,4vw,26px)'
      }}
    >
      {/* Close button — the only way to dismiss */}
      <button
        type="button"
        onClick={handleClose}
        aria-label="Đóng"
        className="soli-lift-sm"
        style={{
          position: 'absolute', top: 12, right: 12, width: 38, height: 38,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: 12, cursor: 'pointer',
          background: 'rgba(255,255,255,0.92)', border: '1.5px solid rgba(16,120,90,0.18)',
          boxShadow: '0 8px 20px -12px rgba(11,74,57,0.5)'
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d2b22" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
      </button>

      <div style={{ paddingRight: 34 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 13px', borderRadius: 999, background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.28)' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
          <span style={{ fontFamily: "'Zalando Sans'", fontWeight: 700, fontSize: 11, letterSpacing: '0.8px', color: '#0c6b52' }}>CẨM NANG MIỄN PHÍ</span>
        </div>
        <h3 style={{ margin: '16px 0 0', fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 17, letterSpacing: '-0.3px', lineHeight: 1.34, color: '#0d2b22' }}>Tải tài liệu "Ứng dụng AI cho ngành Spa: Cánh tay phải đắc lực giúp chuỗi dịch vụ bứt phá doanh thu"</h3>
        <p style={{ margin: '10px 0 0', fontSize: 13, lineHeight: 1.6, color: '#5c6f68', fontWeight: 500 }}>Bộ tài liệu giúp bạn khai thác AI tự động hóa vận hành, tối ưu chăm sóc khách hàng, nâng cao hiệu quả doanh thu và tạo nền tảng tăng trưởng doanh thu bền vững.</p>
      </div>

      {submitted ? (
        <div className="animate-fade-in" style={{ marginTop: 16, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.28)', borderRadius: 16, padding: 18, textAlign: 'center' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto' }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" /></svg>
          <h5 style={{ margin: '10px 0 0', fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 14, color: '#0d2b22' }}>Cảm ơn bạn đã đăng ký. Tài liệu đang được mở.</h5>
          <p style={{ margin: '8px 0 0', fontSize: 12, lineHeight: 1.6, color: '#5c6f68', fontWeight: 500 }}>Hệ thống đang tự động tải cẩm nang về thiết bị của bạn. Nếu quá trình tải không tự động kích hoạt, vui lòng nhấn nút bên dưới để tải trực tiếp:</p>
          <button onClick={handleDownloadBook} className="soli-lift-sm" style={{ marginTop: 14, width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px 16px', border: 'none', borderRadius: 12, background: 'linear-gradient(135deg,#10b981,#059669)', cursor: 'pointer', fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 13, color: '#fff' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v13M7 11l5 5 5-5M5 21h14" /></svg>
            TẢI TÀI LIỆU MIỄN PHÍ
          </button>
          <button onClick={() => setSubmitted(false)} style={{ marginTop: 12, background: 'none', border: 'none', color: '#0c6b52', fontFamily: "'Zalando Sans'", fontWeight: 700, fontSize: 11, cursor: 'pointer', textDecoration: 'underline' }}>[ Nhập lại thông tin khác ]</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginTop: 16, fontFamily: "'Zalando Sans'", fontWeight: 700, fontSize: 11.5, letterSpacing: '0.4px', color: '#0c6b52' }}>* Cung cấp SĐT &amp; Email để hệ thống mở khóa link tải:</div>

          <label className="soli-input-wrap" style={{ ...inputWrap, marginTop: 12 }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0c6b52" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3 7l9 6 9-6" /></svg>
            <input
              type="text"
              className="soli-input"
              placeholder="Email nhận các cẩm nang vận hành mới"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError(''); }}
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
              value={phone}
              onChange={(e) => { setPhone(e.target.value); if (phoneError) setPhoneError(''); }}
              style={inputEl}
            />
          </label>
          {phoneError && <p style={{ margin: '6px 0 0 4px', fontSize: 11, color: '#e0574a', fontWeight: 600 }}>{phoneError}</p>}

          <button
            type="submit"
            disabled={isDownloading}
            className="soli-lift-sm"
            style={{ marginTop: 18, width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '15px 18px', border: 'none', borderRadius: 14, background: 'linear-gradient(135deg,#0d2b22,#0c6b52)', cursor: isDownloading ? 'default' : 'pointer', fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 13.5, letterSpacing: '0.6px', color: '#fff', boxShadow: '0 16px 34px -16px rgba(11,74,57,0.7)', opacity: isDownloading ? 0.75 : 1 }}
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
  );
}
