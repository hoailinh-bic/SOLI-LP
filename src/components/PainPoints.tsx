import React from 'react';

// SOLI redesign — "Thách thức vận hành" section
const SectionBg = () => (
  <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: '-12%', background: 'radial-gradient(38% 38% at 22% 28%, rgba(52,211,153,0.17), transparent 70%), radial-gradient(36% 36% at 82% 20%, rgba(45,212,191,0.15), transparent 70%), radial-gradient(44% 44% at 62% 82%, rgba(110,231,183,0.15), transparent 70%)', animation: 'soli-mesh 34s ease-in-out infinite' }} />
    <div style={{ position: 'absolute', top: '50%', left: '50%', width: '150vmax', height: '150vmax', marginLeft: '-75vmax', marginTop: '-75vmax', transformOrigin: 'center', background: 'conic-gradient(from 0deg, rgba(52,211,153,0.06), rgba(45,212,191,0) 22%, rgba(110,231,183,0.06) 48%, rgba(52,211,153,0) 72%, rgba(52,211,153,0.06))', animation: 'soli-sheen 100s linear infinite' }} />
    <div style={{ position: 'absolute', top: '18%', left: '14%', width: 130, height: 130, borderRadius: '50%', background: 'radial-gradient(circle at 42% 40%, rgba(52,211,153,0.32), transparent 70%)', filter: 'blur(16px)', animation: 'soli-orb-a 26s ease-in-out infinite' }} />
    <div style={{ position: 'absolute', top: '64%', left: '56%', width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle at 50% 50%, rgba(45,212,191,0.3), transparent 70%)', filter: 'blur(14px)', animation: 'soli-orb-b 32s ease-in-out infinite' }} />
    <div style={{ position: 'absolute', top: '32%', left: '80%', width: 76, height: 76, borderRadius: '50%', background: 'radial-gradient(circle at 50% 50%, rgba(110,231,183,0.28), transparent 70%)', filter: 'blur(12px)', animation: 'soli-orb-c 29s ease-in-out infinite' }} />
    <div style={{ position: 'absolute', top: -140, right: -120, width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle at 50% 50%, rgba(52,211,153,0.4), rgba(52,211,153,0) 68%)', filter: 'blur(34px)', animation: 'soli-aurora-a 16s ease-in-out infinite' }} />
    <div style={{ position: 'absolute', bottom: -180, left: -100, width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle at 50% 50%, rgba(222,110,75,0.22), rgba(222,110,75,0) 66%)', filter: 'blur(40px)', animation: 'soli-aurora-w 20s ease-in-out infinite' }} />
    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(16,120,90,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(16,120,90,0.04) 1px, transparent 1px)', backgroundSize: '52px 52px', maskImage: 'radial-gradient(120% 100% at 50% 0%, #000 30%, transparent 78%)', WebkitMaskImage: 'radial-gradient(120% 100% at 50% 0%, #000 30%, transparent 78%)' }} />
  </div>
);

const XIcon = ({ color }: { color: string }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7l10 10M17 7v10H7" /></svg>
);

const ClockIcon = () => (
  <svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
const MoonIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
);
const CalIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4.5" width="18" height="16" rx="2.5" /><path d="M3 9h18M8 2.5v4M16 2.5v4" /><path d="M8.5 13.5l1.4 1.4 2.6-2.8" /></svg>
);

interface CardCfg {
  index: string;
  accent: string;
  accentSoft: string;
  gradFrom: string;
  gradTo: string;
  glowRgba: string;
  icon: React.ReactNode;
  stat: React.ReactNode;
  title: string;
  points: string[];
}

const cards: CardCfg[] = [
  {
    index: '01', accent: '#c9522f', accentSoft: 'rgba(222,110,75,0.12)', gradFrom: '#f3a583', gradTo: '#de6e4b', glowRgba: 'rgba(222,110,75,0.7)',
    icon: <ClockIcon />,
    stat: (<><span style={{ fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 44, lineHeight: 1, letterSpacing: '-1.4px', color: '#c9522f' }}>5+</span><span style={{ fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 17, letterSpacing: '0.4px', color: '#c9522f' }}>PHÚT</span></>),
    title: 'Chậm phản hồi', points: ['Mất lead', 'Mất doanh thu']
  },
  {
    index: '02', accent: '#3d4a75', accentSoft: 'rgba(61,74,117,0.12)', gradFrom: '#6b7bb0', gradTo: '#3d4a75', glowRgba: 'rgba(61,74,117,0.7)',
    icon: <MoonIcon />,
    stat: (<><span style={{ fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 17, letterSpacing: '0.4px', color: '#3d4a75' }}>Sau</span><span style={{ fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 44, lineHeight: 1, letterSpacing: '-1.4px', color: '#3d4a75' }}>21h</span></>),
    title: 'Không ai trả lời', points: ['Lead ngoài giờ bị bỏ lỡ', 'Giảm tỷ lệ đặt lịch']
  },
  {
    index: '03', accent: '#a9761f', accentSoft: 'rgba(201,143,44,0.14)', gradFrom: '#e6b45a', gradTo: '#c98f2c', glowRgba: 'rgba(201,143,44,0.7)',
    icon: <CalIcon />,
    stat: (<span style={{ fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 27, lineHeight: 1.04, letterSpacing: '-1.1px', color: '#a9761f', whiteSpace: 'nowrap' }}>Lịch hẹn rời rạc</span>),
    title: 'Vận hành thiếu đồng bộ', points: ['Trùng lịch', 'Bỏ sót khách', 'Mất uy tín']
  }
];

export default function PainPoints() {
  return (
    <section id="pain-points" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(64px,8vw,110px) clamp(28px,6vw,110px)', background: 'radial-gradient(130% 120% at 12% 0%, #f4fbf7 0%, #e7f4ec 42%, #dcefe4 100%)' }}>
      <SectionBg />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 'clamp(40px,5vw,60px)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '9px 16px 9px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.72)', border: '1px solid rgba(16,163,127,0.22)', boxShadow: '0 6px 20px -10px rgba(16,120,90,0.4)', backdropFilter: 'blur(8px)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,#10b981,#059669)' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v4M12 17h.01" /><path d="M10.3 3.9 2 18a2 2 0 0 0 1.7 3h16.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /></svg>
            </span>
            <span style={{ fontFamily: "'Zalando Sans'", fontSize: 12, fontWeight: 700, letterSpacing: '1.1px', color: '#0c6b52' }}>THÁCH THỨC VẬN HÀNH</span>
          </div>
          <h2 style={{ margin: '26px 0 0', fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 'clamp(28px,3.5vw,46px)', lineHeight: 1.14, letterSpacing: '-1px', color: '#0d2b22', maxWidth: 880 }}>Nỗ lực marketing nhưng vẫn <span style={{ color: '#059669' }}>thất thoát khách hàng</span>?</h2>
          <p style={{ margin: '22px 0 0', maxWidth: 640, fontSize: 17, lineHeight: 1.68, color: '#4a5f57', fontWeight: 500 }}>Mỗi khách hàng nhắn tin đều là một khoản đầu tư marketing. Khi phản hồi chậm, cơ hội chuyển đổi giảm xuống — doanh thu tiềm năng dễ dàng rơi vào tay đối thủ.</p>
        </div>

        <div className="soli-cards-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'clamp(20px,2.4vw,28px)', alignItems: 'stretch' }}>
          {cards.map((c) => (
            <div key={c.index} className="soli-card" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '34px 32px 30px', borderRadius: 28, background: 'linear-gradient(160deg, rgba(255,255,255,0.9), rgba(255,255,255,0.68))', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 30px 70px -34px rgba(11,74,57,0.5), inset 0 1px 0 rgba(255,255,255,0.9)', backdropFilter: 'blur(18px)' }}>
              <div aria-hidden="true" style={{ position: 'absolute', top: -30, right: -30, width: 180, height: 180, borderRadius: '50%', background: `radial-gradient(circle at 50% 50%, ${c.accentSoft}, transparent 70%)` }} />
              <span aria-hidden="true" style={{ position: 'absolute', top: 22, right: 26, fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 54, lineHeight: 1, color: c.accent, opacity: 0.13 }}>{c.index}</span>

              <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: 16, background: `linear-gradient(135deg,${c.gradFrom},${c.gradTo})`, boxShadow: `0 14px 28px -10px ${c.glowRgba}` }}>{c.icon}</span>

              <div style={{ marginTop: 24, display: 'flex', alignItems: 'baseline', gap: 9 }}>{c.stat}</div>

              <h3 style={{ margin: '14px 0 0', fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 20, letterSpacing: '-0.3px', lineHeight: 1.28, color: '#0d2b22' }}>{c.title}</h3>

              <div style={{ height: 1, margin: '22px 0 18px', background: `linear-gradient(90deg, ${c.accent}47, transparent)` }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 13, marginTop: 'auto' }}>
                {c.points.map((p) => (
                  <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: 8, background: c.accentSoft }}><XIcon color={c.accent} /></span>
                    <span style={{ fontFamily: "'Zalando Sans'", fontWeight: 500, fontSize: 14.5, letterSpacing: '0.1px', color: '#0d2b22' }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
