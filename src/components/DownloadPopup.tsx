import React, { useState, useEffect, useRef } from 'react';

// Centered modal entry popup that reuses the download logic of the
// "Cẩm nang miễn phí / Tải tài liệu" section. Fully self-contained and does NOT
// touch the original section: same endpoint, same payload, same validation and
// same post-submit download behaviour.

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyrq8QYXkXZ6UzgdPnDa0lTlJhE6TcHZF4xY-egUMabcHKXk-aX1ZLm4Zhbi1Vi_ukxGg/exec";
const DOWNLOAD_URL = "https://drive.google.com/uc?export=download&id=1Os6dZOPr5DBLdb_FWfsamlm11902VsFB";

// Once shown/closed within a browsing session we don't show it again.
// sessionStorage is cleared when the tab is closed, so a brand-new session re-shows it.
const SESSION_KEY = "soli_download_popup_shown";

const inputWrap: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 10, padding: '12px 15px', borderRadius: 13,
  background: 'rgba(255,255,255,0.92)', border: '1.5px solid rgba(16,120,90,0.16)'
};

const inputEl: React.CSSProperties = {
  flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 13.5, color: '#0d2b22', fontWeight: 500
};

const checkLine: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11.5, fontWeight: 600, color: '#0c6b52'
};

// Compact 3D ebook mockup + AI / chat accents (self-contained SVG, floats gently).
const EbookMockup = () => (
  <div className="soli-float" style={{ position: 'relative', display: 'inline-flex' }}>
    <svg width="140" height="118" viewBox="0 0 150 126" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ebook AI cho Spa">
      <defs>
        <linearGradient id="soli-ebook-cover" x1="40" y1="14" x2="104" y2="98" gradientUnits="userSpaceOnUse">
          <stop stopColor="#34d399" />
          <stop offset="0.55" stopColor="#10b981" />
          <stop offset="1" stopColor="#0c6b52" />
        </linearGradient>
        <linearGradient id="soli-ebook-badge" x1="60" y1="30" x2="90" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      {/* floating shadow */}
      <ellipse cx="74" cy="116" rx="44" ry="8" fill="#04160f" opacity="0.35" />

      {/* pages edge */}
      <rect x="48" y="16" width="60" height="88" rx="7" fill="#e9fbf3" />
      <rect x="46" y="14" width="60" height="88" rx="7" fill="#d3f3e6" />

      {/* cover */}
      <rect x="40" y="12" width="62" height="90" rx="8" fill="url(#soli-ebook-cover)" />
      {/* spine highlight */}
      <rect x="40" y="12" width="10" height="90" rx="4" fill="#0a5c46" opacity="0.55" />
      <rect x="52" y="12" width="2" height="90" fill="#ffffff" opacity="0.18" />

      {/* AI badge on cover */}
      <circle cx="76" cy="42" r="15" fill="url(#soli-ebook-badge)" />
      <circle cx="76" cy="42" r="15" stroke="#eafff6" strokeWidth="1.4" />
      <text x="76" y="47" textAnchor="middle" fontFamily="'Zalando Sans', sans-serif" fontWeight="800" fontSize="14" fill="#ffffff">AI</text>

      {/* title lines */}
      <rect x="60" y="66" width="34" height="4.5" rx="2.25" fill="#ffffff" opacity="0.9" />
      <rect x="60" y="75" width="26" height="4.5" rx="2.25" fill="#ffffff" opacity="0.6" />

      {/* floating chat bubble (chatbot) */}
      <g transform="translate(108 24)">
        <rect x="0" y="0" width="34" height="26" rx="9" fill="#ffffff" />
        <path d="M9 26 L9 33 L17 26 Z" fill="#ffffff" />
        <circle cx="10" cy="13" r="2.2" fill="#10b981" />
        <circle cx="17" cy="13" r="2.2" fill="#10b981" />
        <circle cx="24" cy="13" r="2.2" fill="#10b981" />
      </g>

      {/* sparkles (AI) */}
      <path d="M26 34 l2.2 5 5 2.2 -5 2.2 -2.2 5 -2.2 -5 -5 -2.2 5 -2.2 Z" fill="#eafff6" opacity="0.95" />
      <path d="M120 66 l1.5 3.4 3.4 1.5 -3.4 1.5 -1.5 3.4 -1.5 -3.4 -3.4 -1.5 3.4 -1.5 Z" fill="#a7f3d0" opacity="0.9" />
    </svg>
  </div>
);

export default function DownloadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
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

  // Lock background scroll while the popup is open (without shifting the layout).
  useEffect(() => {
    if (!isOpen) return;

    const body = document.body;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = 'hidden';
    if (scrollBarWidth > 0) body.style.paddingRight = `${scrollBarWidth}px`;

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
    };
  }, [isOpen]);

  // The ONLY way to close the popup: the explicit "X" button.
  // Play the fade-out animation first, then unmount.
  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    closeTimer.current = window.setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 270);
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
          // Giữ nguyên logic tải/mở Ebook như hiện tại
          window.open(DOWNLOAD_URL, '_blank');
          // Reset state form
          setEmail('');
          setPhone('');
          setEmailError('');
          setPhoneError('');
          // Submit thành công -> tự động đóng toàn bộ popup (không hiển thị màn cảm ơn)
          handleClose();
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
    // Overlay: dimmed backdrop. Intentionally NO onClick handler -> clicking outside does not close.
    <div
      className={isClosing ? 'soli-overlay-out' : 'soli-overlay-in'}
      style={{
        position: 'fixed', inset: 0, zIndex: 100000,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
        background: 'rgba(4,16,11,0.48)',
        backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)'
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Tặng miễn phí Ebook AI dành cho Spa"
        className={isClosing ? 'soli-pop-out' : 'soli-pop-in'}
        style={{
          position: 'relative',
          width: 'min(460px, 90vw)',
          maxHeight: 'min(520px, calc(100vh - 40px))',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          borderRadius: 20,
          border: '1px solid rgba(255,255,255,0.85)',
          boxShadow: '0 30px 70px -22px rgba(11,74,57,0.55), inset 0 1px 0 rgba(255,255,255,0.9)',
          background: '#ffffff'
        }}
      >
        {/* Close button — the only way to dismiss */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Đóng"
          className="soli-lift-sm"
          style={{
            position: 'absolute', top: 12, right: 12, zIndex: 3, width: 36, height: 36,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 11, cursor: 'pointer',
            background: 'rgba(255,255,255,0.18)', border: '1.5px solid rgba(255,255,255,0.4)',
            backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>

        {/* Scroll area (keeps rounded corners intact via parent overflow hidden) */}
        <div style={{ overflowY: 'auto' }}>
          {/* ===== Hero header (~128px) · brand gradient + floating ebook ===== */}
          <div style={{ position: 'relative', height: 128, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden', background: 'linear-gradient(150deg, #0d2b22 0%, #0c6b52 55%, #10b981 120%)' }}>
            <div aria-hidden="true" style={{ position: 'absolute', top: -60, left: -40, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle at 50% 50%, rgba(52,211,153,0.5), transparent 70%)', filter: 'blur(8px)' }} />
            <div aria-hidden="true" style={{ position: 'absolute', bottom: -70, right: -30, width: 170, height: 170, borderRadius: '50%', background: 'radial-gradient(circle at 50% 50%, rgba(110,231,183,0.4), transparent 70%)', filter: 'blur(10px)' }} />
            <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '26px 26px', maskImage: 'radial-gradient(120% 100% at 50% 0%, #000 40%, transparent 85%)', WebkitMaskImage: 'radial-gradient(120% 100% at 50% 0%, #000 40%, transparent 85%)' }} />
            <div style={{ position: 'relative', zIndex: 2, transform: 'translateY(6px)' }}>
              <EbookMockup />
            </div>
          </div>

          {/* ===== Body ===== */}
          <div style={{ position: 'relative', padding: 'clamp(20px,4vw,24px)', background: 'linear-gradient(180deg, #ffffff 0%, #f4fbf7 100%)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '6px 12px', borderRadius: 999, background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.28)' }}>
              <span style={{ fontFamily: "'Zalando Sans'", fontWeight: 700, fontSize: 11, letterSpacing: '0.8px', color: '#0c6b52' }}>📘 CẨM NANG MIỄN PHÍ</span>
            </div>

            <h3 style={{ margin: '13px 0 0', fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 19, letterSpacing: '-0.4px', lineHeight: 1.26, color: '#0d2b22' }}>Tặng miễn phí Ebook AI dành cho Spa</h3>
            <p style={{ margin: '8px 0 0', fontSize: 12.5, lineHeight: 1.55, color: '#5c6f68', fontWeight: 500 }}>Khám phá cách tăng tỷ lệ chốt lịch và tối ưu vận hành với AI.</p>

            <form onSubmit={handleSubmit}>
                <label className="soli-input-wrap" style={{ ...inputWrap, marginTop: 16 }}>
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
                {emailError && <p style={{ margin: '5px 0 0 4px', fontSize: 11, color: '#e0574a', fontWeight: 600 }}>{emailError}</p>}

                <label className="soli-input-wrap" style={{ ...inputWrap, marginTop: 10 }}>
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
                {phoneError && <p style={{ margin: '5px 0 0 4px', fontSize: 11, color: '#e0574a', fontWeight: 600 }}>{phoneError}</p>}

                <button
                  type="submit"
                  disabled={isDownloading}
                  className="soli-lift-sm"
                  style={{ marginTop: 16, width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '15px 18px', border: 'none', borderRadius: 14, background: 'linear-gradient(135deg,#10b981,#059669)', cursor: isDownloading ? 'default' : 'pointer', fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 13.5, letterSpacing: '0.6px', color: '#fff', boxShadow: '0 18px 38px -16px rgba(16,163,127,0.75)', opacity: isDownloading ? 0.75 : 1 }}
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

                {/* Trust reassurance under the CTA */}
                <div style={{ marginTop: 11, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '5px 16px' }}>
                  <span style={checkLine}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                    Nhận tài liệu ngay sau khi đăng ký
                  </span>
                  <span style={checkLine}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                    Hoàn toàn miễn phí
                  </span>
                </div>
              </form>
          </div>
        </div>
      </div>
    </div>
  );
}
