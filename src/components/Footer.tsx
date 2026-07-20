import React from 'react';
import { Link } from 'react-router-dom';

const infoRow: React.CSSProperties = {
  display: 'flex', alignItems: 'flex-start', gap: 11,
  fontSize: 13.5, lineHeight: 1.6, color: 'rgba(214,235,226,0.82)', fontWeight: 500
};

const infoIconWrap: React.CSSProperties = {
  flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  width: 30, height: 30, marginTop: 1, borderRadius: 9,
  background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.22)'
};

export default function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(170deg, #0d2b22 0%, #0a231c 55%, #081d17 100%)',
        borderTop: '1px solid rgba(52,211,153,0.18)'
      }}
    >
      {/* gradient divider glow with the section above */}
      <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 'min(720px, 80%)', height: 1, background: 'linear-gradient(90deg, transparent, rgba(52,211,153,0.55), transparent)' }} />
      <div aria-hidden="true" style={{ position: 'absolute', top: -140, left: '50%', transform: 'translateX(-50%)', width: 560, height: 280, borderRadius: '50%', background: 'radial-gradient(circle at 50% 100%, rgba(16,185,129,0.14), transparent 70%)', filter: 'blur(30px)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', maxWidth: 1160, margin: '0 auto', padding: 'clamp(56px,7vw,90px) clamp(24px,5vw,80px) 0' }}>

        {/* main grid */}
        <div className="soli-footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 'clamp(36px,5vw,72px)', alignItems: 'flex-start' }}>

          {/* left · brand */}
          <div>
            <a href="#" className="soli-lift-sm" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
              <img src="/logo.png" alt="SOLI AI" style={{ height: 40, width: 'auto', objectFit: 'contain', display: 'block' }} />
            </a>
            <p style={{ margin: '18px 0 0', maxWidth: 420, fontSize: 14.5, lineHeight: 1.7, color: 'rgba(214,235,226,0.78)', fontWeight: 500 }}>
              Trợ lý tiếp đón khách hàng tự động thông minh, được thiết kế chuyên biệt cho các chuỗi dịch vụ làm đẹp.
            </p>

            {/* contact block */}
            <div style={{ marginTop: 26, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 13 }}>
              <a
                href="https://www.facebook.com/profile.php?id=61591210365936"
                target="_blank"
                rel="noopener noreferrer"
                className="soli-footer-link"
                style={{ ...infoRow, textDecoration: 'none', cursor: 'pointer' }}
              >
                <span style={infoIconWrap}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </span>
                <span><span style={{ fontWeight: 600 }}>Fanpage:</span> SOLI AI</span>
              </a>
              <a
                href="mailto:hotro@soliai.vn"
                className="soli-footer-link"
                style={{ ...infoRow, textDecoration: 'none', cursor: 'pointer' }}
              >
                <span style={infoIconWrap}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3 7l9 6 9-6" /></svg>
                </span>
                <span><span style={{ fontWeight: 600 }}>Email:</span> hotro@soliai.vn</span>
              </a>
            </div>
          </div>

          {/* right · business info */}
          <div>
            <h4 style={{ margin: 0, fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 13, letterSpacing: '1.2px', color: '#8fe3c6', textTransform: 'uppercase' }}>
              Thông tin doanh nghiệp
            </h4>
            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={infoRow}>
                <span style={infoIconWrap}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h.01M15 9h.01M9 13h.01M15 13h.01M9 17h.01M15 17h.01" /></svg>
                </span>
                <span>Công ty Cổ phần Công nghệ EVOL</span>
              </div>
              <div style={infoRow}>
                <span style={infoIconWrap}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M9 13h6M9 17h6" /></svg>
                </span>
                <span>MST: 0317838062</span>
              </div>
              <div style={infoRow}>
                <span style={infoIconWrap}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                </span>
                <span>Địa chỉ: Căn H5, 208 Bùi Văn Ba, Phường Tân Thuận, TP. Hồ Chí Minh</span>
              </div>
            </div>
          </div>

        </div>

        {/* bottom bar */}
        <div style={{ marginTop: 'clamp(44px,5vw,64px)', borderTop: '1px solid rgba(214,235,226,0.1)' }}>
          <div className="soli-footer-bottom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', padding: '22px 0 26px' }}>
            <p style={{ margin: 0, fontSize: 12.5, color: 'rgba(214,235,226,0.55)', fontWeight: 500 }}>
              © 2026 SOLI AI. All rights reserved.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
              <Link to="/huong-dan-thanh-toan" className="soli-footer-link" style={{ margin: 0, fontSize: 12.5, color: 'rgba(214,235,226,0.55)', fontWeight: 500, textDecoration: 'none' }}>
                Hướng dẫn thanh toán
              </Link>
              <Link to="/terms" className="soli-footer-link" style={{ margin: 0, fontSize: 12.5, color: 'rgba(214,235,226,0.55)', fontWeight: 500, textDecoration: 'none' }}>
                Điều khoản sử dụng
              </Link>
              <Link to="/privacy" className="soli-footer-link" style={{ margin: 0, fontSize: 12.5, color: 'rgba(214,235,226,0.55)', fontWeight: 500, textDecoration: 'none' }}>
                Chính sách bảo mật
              </Link>
            </div>
            <p style={{ margin: 0, fontSize: 12.5, color: 'rgba(214,235,226,0.55)', fontWeight: 500 }}>
              Made with <span style={{ color: '#34d399' }}>❤</span> in Vietnam
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
