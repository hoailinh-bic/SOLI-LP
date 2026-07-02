import React, { useState } from 'react';

/**
 * AI assistant illustration.
 * To use a real image: drop the file into the `public/` folder (e.g. public/ai-assistant.png)
 * and keep AI_IMAGE_SRC pointing at its path (served from the site root, e.g. "/ai-assistant.png").
 * While no image is present, a branded gradient placeholder is shown automatically.
 */
const AI_IMAGE_SRC = '/ai-assistant.png';

const SparkIcon = ({ size = 18, color = '#fff' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 2l1.9 5.6L19.5 9l-4.2 3.4L16 18l-4-3.2L8 18l.7-5.6L4.5 9l5.6-1.4z" /></svg>
);

const SectionBg = () => (
  <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: '-12%', background: 'radial-gradient(38% 38% at 22% 28%, rgba(52,211,153,0.17), transparent 70%), radial-gradient(36% 36% at 82% 20%, rgba(45,212,191,0.15), transparent 70%), radial-gradient(44% 44% at 62% 82%, rgba(110,231,183,0.15), transparent 70%)', animation: 'soli-mesh 34s ease-in-out infinite' }} />
    <div style={{ position: 'absolute', top: '50%', left: '50%', width: '150vmax', height: '150vmax', marginLeft: '-75vmax', marginTop: '-75vmax', transformOrigin: 'center', background: 'conic-gradient(from 0deg, rgba(52,211,153,0.06), rgba(45,212,191,0) 22%, rgba(110,231,183,0.06) 48%, rgba(52,211,153,0) 72%, rgba(52,211,153,0.06))', animation: 'soli-sheen 100s linear infinite' }} />
    <div style={{ position: 'absolute', top: '18%', left: '14%', width: 130, height: 130, borderRadius: '50%', background: 'radial-gradient(circle at 42% 40%, rgba(52,211,153,0.32), transparent 70%)', filter: 'blur(16px)', animation: 'soli-orb-a 26s ease-in-out infinite' }} />
    <div style={{ position: 'absolute', top: '64%', left: '56%', width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle at 50% 50%, rgba(45,212,191,0.3), transparent 70%)', filter: 'blur(14px)', animation: 'soli-orb-b 32s ease-in-out infinite' }} />
    <div style={{ position: 'absolute', top: '32%', left: '80%', width: 76, height: 76, borderRadius: '50%', background: 'radial-gradient(circle at 50% 50%, rgba(110,231,183,0.28), transparent 70%)', filter: 'blur(12px)', animation: 'soli-orb-c 29s ease-in-out infinite' }} />
    <div style={{ position: 'absolute', top: -140, left: -120, width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle at 50% 50%, rgba(52,211,153,0.4), rgba(52,211,153,0) 68%)', filter: 'blur(34px)', animation: 'soli-aurora-a 16s ease-in-out infinite' }} />
    <div style={{ position: 'absolute', bottom: -180, right: -100, width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle at 50% 50%, rgba(45,212,191,0.34), rgba(45,212,191,0) 66%)', filter: 'blur(40px)', animation: 'soli-aurora-b 20s ease-in-out infinite' }} />
    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(16,120,90,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(16,120,90,0.04) 1px, transparent 1px)', backgroundSize: '52px 52px', maskImage: 'radial-gradient(120% 100% at 50% 0%, #000 30%, transparent 78%)', WebkitMaskImage: 'radial-gradient(120% 100% at 50% 0%, #000 30%, transparent 78%)' }} />
  </div>
);

interface Step {
  label: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  highlighted?: boolean;
}

const steps: Step[] = [
  {
    label: 'BƯỚC 1', title: 'Khách nhắn tin — SOLI AI tiếp nhận tức thì',
    desc: 'Phản hồi tự động trong vài giây, hoạt động 24/7/365 trên cả Zalo OA và Messenger.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.9-.9L3 20l1.4-4.6A8.5 8.5 0 1 1 21 11.5z" /></svg>
  },
  {
    label: 'BƯỚC 2', title: 'SOLI AI tư vấn & xác nhận nhu cầu',
    desc: 'Thấu hiểu nhu cầu, tư vấn dịch vụ, dẫn dắt cuộc hội thoại và chốt lịch một cách tự nhiên.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" /></svg>
  },
  {
    label: 'BƯỚC 3', title: 'Tự động đặt lịch & điều phối thông minh',
    desc: 'Lịch hẹn được tạo lập và đồng bộ trực tiếp về hệ thống trung tâm, tránh trùng giờ.',
    icon: <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4.5" width="18" height="16" rx="2.5" /><path d="M3 9h18M8 2.5v4M16 2.5v4" /><path d="M8.5 13.5l1.4 1.4 2.6-2.8" /></svg>
  },
  {
    label: 'BƯỚC 4', title: 'Nhắc lịch tự động & xác nhận check-in',
    desc: 'Tự động gửi ZNS/SMS nhắc trước giờ hẹn, giảm hơn 85% tỷ lệ khách quên lịch.',
    icon: <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></svg>,
    highlighted: true
  }
];

export default function HowItWorks() {
  const [imgOk, setImgOk] = useState(true);

  return (
    <section id="how-it-works" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(64px,8vw,110px) clamp(28px,6vw,110px)', background: 'radial-gradient(130% 120% at 12% 0%, #f4fbf7 0%, #e7f4ec 42%, #dcefe4 100%)' }}>
      <SectionBg />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto' }}>
        {/* header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 'clamp(44px,5vw,64px)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '9px 16px 9px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.72)', border: '1px solid rgba(16,163,127,0.22)', boxShadow: '0 6px 20px -10px rgba(16,120,90,0.4)', backdropFilter: 'blur(8px)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,#10b981,#059669)' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /></svg>
            </span>
            <span style={{ fontFamily: "'Zalando Sans'", fontSize: 12, fontWeight: 700, letterSpacing: '1.1px', color: '#0c6b52' }}>QUY TRÌNH HOẠT ĐỘNG</span>
          </div>
          <h2 style={{ margin: '24px 0 0', fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 'clamp(30px,4vw,50px)', lineHeight: 1.1, letterSpacing: '-1.1px', color: '#0d2b22', maxWidth: 820 }}>SOLI AI hoạt động <span style={{ color: '#059669' }}>như thế nào</span>?</h2>
          <p style={{ margin: '20px 0 0', maxWidth: 600, fontSize: 17, lineHeight: 1.65, color: '#4a5f57', fontWeight: 500 }}>Quy trình khép kín, tự động từ khâu tiếp nhận tin nhắn đầu tiên đến khi khách bước chân vào cửa hàng của bạn.</p>
        </div>

        {/* 2-col: steps + AI illustration */}
        <div className="soli-hw-grid" style={{ display: 'grid', gridTemplateColumns: '1.12fr 0.88fr', gap: 'clamp(36px,5vw,72px)', alignItems: 'center' }}>

          {/* LEFT · timeline steps */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div aria-hidden="true" style={{ position: 'absolute', left: 26, top: 34, bottom: 34, width: 2, background: 'linear-gradient(#10b981, #34d399 60%, rgba(52,211,153,0.15))', zIndex: 0 }} />

            {steps.map((s) => (
              <div key={s.label} style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 54, height: 54, borderRadius: 16, background: s.highlighted ? 'linear-gradient(135deg,#10b981,#059669)' : 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(236,253,245,0.9))', border: s.highlighted ? 'none' : '1px solid rgba(16,185,129,0.28)', boxShadow: s.highlighted ? '0 14px 28px -10px rgba(16,163,127,0.7)' : '0 12px 26px -14px rgba(16,120,90,0.5)' }}>{s.icon}</span>
                <div style={{ flex: 1, padding: '20px 24px', borderRadius: 20, background: s.highlighted ? 'linear-gradient(160deg, rgba(236,253,245,0.95), rgba(209,250,229,0.8))' : 'linear-gradient(160deg, rgba(255,255,255,0.88), rgba(255,255,255,0.66))', border: s.highlighted ? '1px solid rgba(16,185,129,0.4)' : '1px solid rgba(255,255,255,0.9)', boxShadow: s.highlighted ? '0 24px 50px -26px rgba(16,120,90,0.5), inset 0 1px 0 rgba(255,255,255,0.9)' : '0 20px 46px -30px rgba(11,74,57,0.45), inset 0 1px 0 rgba(255,255,255,0.9)', backdropFilter: 'blur(14px)' }}>
                  <div style={{ fontFamily: "'Zalando Sans'", fontWeight: 700, fontSize: 11.5, letterSpacing: '1.2px', color: s.highlighted ? '#059669' : '#10a37f' }}>{s.label}</div>
                  <h3 style={{ margin: '6px 0 0', fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 18, letterSpacing: '-0.3px', lineHeight: 1.3, color: '#0d2b22' }}>{s.title}</h3>
                  <p style={{ margin: '8px 0 0', fontSize: 14, lineHeight: 1.62, color: s.highlighted ? '#39584b' : '#5c6f68', fontWeight: 500 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT · AI illustration (focal point) */}
          <div className="soli-hw-art" style={{ position: 'relative', width: '100%' }}>
            <div aria-hidden="true" style={{ position: 'absolute', inset: '-8% -6% -8% -6%', borderRadius: 40, background: 'radial-gradient(60% 55% at 55% 22%, rgba(52,211,153,0.5), transparent 70%), radial-gradient(55% 55% at 25% 92%, rgba(45,212,191,0.4), transparent 72%)', filter: 'blur(34px)' }} />

            <div style={{ position: 'relative', zIndex: 2, padding: 12, borderRadius: 34, background: 'linear-gradient(160deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6))', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 46px 100px -34px rgba(11,74,57,0.55), inset 0 1px 0 rgba(255,255,255,0.9)', backdropFilter: 'blur(18px)' }}>
              {imgOk ? (
                <img
                  src={AI_IMAGE_SRC}
                  alt="Trợ lý ảo SOLI AI"
                  onError={() => setImgOk(false)}
                  style={{ display: 'block', width: '100%', height: 560, objectFit: 'cover', borderRadius: 24 }}
                />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, width: '100%', height: 560, borderRadius: 24, background: 'radial-gradient(120% 90% at 50% 0%, #34d399 0%, #10b981 45%, #0c6b52 100%)', overflow: 'hidden', position: 'relative' }}>
                  <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                  <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 84, height: 84, borderRadius: 26, background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.35)', backdropFilter: 'blur(6px)' }}>
                    <SparkIcon size={40} />
                  </span>
                  <div style={{ position: 'relative', textAlign: 'center', padding: '0 24px' }}>
                    <div style={{ fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 20, color: '#fff' }}>Ảnh minh hoạ AI · Trợ lý SOLI</div>
                    <div style={{ marginTop: 6, fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>Thả ảnh vào <code style={{ background: 'rgba(255,255,255,0.2)', padding: '1px 6px', borderRadius: 6 }}>public/ai-assistant.png</code></div>
                  </div>
                </div>
              )}
            </div>

            {/* live badge */}
            <div style={{ position: 'absolute', zIndex: 3, top: 26, left: -14, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 15px', borderRadius: 999, background: 'rgba(255,255,255,0.92)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 18px 40px -18px rgba(11,74,57,0.5)', backdropFilter: 'blur(12px)', animation: 'soli-float 6s ease-in-out infinite' }}>
              <span style={{ position: 'relative', width: 9, height: 9 }}>
                <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#10b981', animation: 'soli-live 1.8s ease-out infinite' }} />
                <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#10b981' }} />
              </span>
              <span style={{ fontFamily: "'Zalando Sans'", fontWeight: 700, fontSize: 12.5, color: '#0c6b52' }}>Đang hoạt động</span>
            </div>

            {/* name chip */}
            <div style={{ position: 'absolute', zIndex: 3, bottom: 26, right: -14, display: 'flex', alignItems: 'center', gap: 11, padding: '12px 16px', borderRadius: 18, background: 'linear-gradient(150deg, rgba(13,43,34,0.95), rgba(12,107,82,0.92))', boxShadow: '0 22px 50px -20px rgba(11,74,57,0.6)', backdropFilter: 'blur(12px)', animation: 'soli-float 7s ease-in-out 0.6s infinite' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 11, background: 'linear-gradient(135deg,#34d399,#10b981)' }}>
                <SparkIcon size={18} />
              </span>
              <div>
                <div style={{ fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 13.5, color: '#fff' }}>SOLI AI · Lễ Tân</div>
                <div style={{ fontSize: 11.5, color: '#8fe3c6', fontWeight: 600 }}>Trợ lý ảo tiếp đón</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
