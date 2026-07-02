import React from 'react';

// SOLI redesign — "Vì sao chọn SOLI AI" section
const SectionBg = () => (
  <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: '-12%', background: 'radial-gradient(38% 38% at 22% 28%, rgba(52,211,153,0.17), transparent 70%), radial-gradient(36% 36% at 82% 20%, rgba(45,212,191,0.15), transparent 70%), radial-gradient(44% 44% at 62% 82%, rgba(110,231,183,0.15), transparent 70%)', animation: 'soli-mesh 34s ease-in-out infinite' }} />
    <div style={{ position: 'absolute', top: '50%', left: '50%', width: '150vmax', height: '150vmax', marginLeft: '-75vmax', marginTop: '-75vmax', transformOrigin: 'center', background: 'conic-gradient(from 0deg, rgba(52,211,153,0.06), rgba(45,212,191,0) 22%, rgba(110,231,183,0.06) 48%, rgba(52,211,153,0) 72%, rgba(52,211,153,0.06))', animation: 'soli-sheen 100s linear infinite' }} />
    <div style={{ position: 'absolute', top: '18%', left: '14%', width: 130, height: 130, borderRadius: '50%', background: 'radial-gradient(circle at 42% 40%, rgba(52,211,153,0.32), transparent 70%)', filter: 'blur(16px)', animation: 'soli-orb-a 26s ease-in-out infinite' }} />
    <div style={{ position: 'absolute', top: '64%', left: '56%', width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle at 50% 50%, rgba(45,212,191,0.3), transparent 70%)', filter: 'blur(14px)', animation: 'soli-orb-b 32s ease-in-out infinite' }} />
    <div style={{ position: 'absolute', top: '32%', left: '80%', width: 76, height: 76, borderRadius: '50%', background: 'radial-gradient(circle at 50% 50%, rgba(110,231,183,0.28), transparent 70%)', filter: 'blur(12px)', animation: 'soli-orb-c 29s ease-in-out infinite' }} />
    <div style={{ position: 'absolute', top: -140, right: -120, width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle at 50% 50%, rgba(52,211,153,0.38), rgba(52,211,153,0) 68%)', filter: 'blur(34px)', animation: 'soli-aurora-a 16s ease-in-out infinite' }} />
    <div style={{ position: 'absolute', bottom: -180, left: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle at 50% 50%, rgba(45,212,191,0.3), rgba(45,212,191,0) 66%)', filter: 'blur(40px)', animation: 'soli-aurora-b 20s ease-in-out infinite' }} />
    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(16,120,90,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(16,120,90,0.04) 1px, transparent 1px)', backgroundSize: '52px 52px', maskImage: 'radial-gradient(120% 100% at 50% 0%, #000 30%, transparent 78%)', WebkitMaskImage: 'radial-gradient(120% 100% at 50% 0%, #000 30%, transparent 78%)' }} />
  </div>
);

const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
);

interface Benefit {
  cornerStat: string;
  badgeIcon: React.ReactNode;
  badge: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  points: string[];
}

const benefits: Benefit[] = [
  {
    cornerStat: '10s',
    badgeIcon: <svg width="13" height="13" viewBox="0 0 24 24" fill="#059669"><path d="M13 2L4 14h6l-1 8 9-12h-6z" /></svg>,
    badge: 'PHẢN HỒI <10 GIÂY',
    icon: <svg width="23" height="23" viewBox="0 0 24 24" fill="#fff"><path d="M13 2L4 14h6l-1 8 9-12h-6z" /></svg>,
    title: 'Phản hồi tức thì — Tự động chốt lịch 24/7',
    desc: 'Khách vừa nhắn tin, AI phản hồi ngay lập tức, tư vấn dịch vụ và đề xuất lịch hẹn phù hợp ngay trong cuộc hội thoại.',
    points: ['Phản hồi 24/7', 'Không bỏ lỡ khách ngoài giờ', 'Tăng tỷ lệ đặt lịch']
  },
  {
    cornerStat: '80%',
    badgeIcon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="7" width="16" height="12" rx="2.5" /><path d="M9 7V5a3 3 0 0 1 6 0v2M9 13h.01M15 13h.01" /></svg>,
    badge: 'AI XỬ LÝ 80%',
    icon: <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    title: 'Giảm tải cho lễ tân — Tăng hiệu suất vận hành',
    desc: 'AI trả lời các câu hỏi lặp lại như bảng giá, dịch vụ, chương trình ưu đãi và lịch trống, đồng thời gợi ý kịch bản tư vấn và đề xuất bước tiếp theo để nhân viên dễ dàng tiếp nhận và chăm sóc khách hàng.',
    points: ['Giảm áp lực CSKH', 'Phục vụ nhiều khách cùng lúc', 'Nâng cao trải nghiệm']
  },
  {
    cornerStat: '1 nền tảng',
    badgeIcon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l3 8 4-16 3 8h4" /></svg>,
    badge: 'ĐỒNG BỘ DỮ LIỆU',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></svg>,
    title: 'Quản lý tập trung — Hạn chế sai sót',
    desc: 'Mọi thông tin khách hàng, lịch hẹn và lịch sử hội thoại được lưu trên một nền tảng duy nhất, giúp quản lý dễ dàng và chính xác.',
    points: ['Không thất lạc dữ liệu', 'Theo dõi lịch hẹn tập trung', 'Quản lý dễ dàng']
  },
  {
    cornerStat: '100+',
    badgeIcon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M6 21V7l6-4 6 4v14M10 9h.01M14 9h.01M10 13h.01M14 13h.01M10 17h.01M14 17h.01" /></svg>,
    badge: 'CHUỖI 100+ CHI NHÁNH',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M15 21V9h2a2 2 0 0 1 2 2v10M9 7h2M9 11h2M9 15h2" /></svg>,
    title: 'Chuẩn hóa quy trình — Sẵn sàng mở rộng',
    desc: 'Khi mở thêm chi nhánh, toàn bộ quy trình tư vấn và đặt lịch được đồng bộ, giúp doanh nghiệp mở rộng nhanh mà vẫn đảm bảo chất lượng dịch vụ.',
    points: ['Đồng bộ toàn hệ thống', 'Dễ đào tạo nhân sự', 'Sẵn sàng mở rộng']
  }
];

export default function WhySoli() {
  return (
    <section id="why-soli" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(64px,8vw,110px) clamp(28px,6vw,110px)', background: 'radial-gradient(130% 120% at 12% 0%, #f4fbf7 0%, #e7f4ec 42%, #dcefe4 100%)' }}>
      <SectionBg />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1160, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 'clamp(40px,5vw,58px)' }}>
          <h2 style={{ margin: 0, fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 'clamp(30px,4vw,50px)', lineHeight: 1.1, letterSpacing: '-1.1px', color: '#0d2b22' }}>Vì sao bạn chọn <span style={{ color: '#059669' }}>SOLI AI</span>?</h2>
          <p style={{ margin: '20px 0 0', maxWidth: 560, fontSize: 17, lineHeight: 1.65, color: '#4a5f57', fontWeight: 500 }}>Giải pháp thông minh được thiết kế chuyên biệt cho ngành làm đẹp.</p>
        </div>

        <div className="soli-why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 'clamp(20px,2.4vw,26px)', alignItems: 'stretch' }}>
          {benefits.map((b) => (
            <div key={b.title} className="soli-card-sm" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '32px 32px 26px', borderRadius: 26, background: 'linear-gradient(160deg, rgba(255,255,255,0.9), rgba(255,255,255,0.66))', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 30px 70px -34px rgba(11,74,57,0.5), inset 0 1px 0 rgba(255,255,255,0.9)', backdropFilter: 'blur(16px)' }}>
              <span aria-hidden="true" style={{ position: 'absolute', top: 22, right: 26, fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 34, lineHeight: 1, color: 'rgba(16,120,90,0.1)' }}>{b.cornerStat}</span>

              <div style={{ display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 7, padding: '7px 13px', borderRadius: 999, background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.28)' }}>
                {b.badgeIcon}
                <span style={{ fontFamily: "'Zalando Sans'", fontWeight: 700, fontSize: 11.5, letterSpacing: '0.8px', color: '#0c6b52' }}>{b.badge}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 22 }}>
                <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(135deg,#10b981,#0d9488)', boxShadow: '0 12px 26px -10px rgba(16,163,127,0.7)' }}>{b.icon}</span>
                <h3 style={{ margin: 0, fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 20, letterSpacing: '-0.3px', lineHeight: 1.28, color: '#0d2b22' }}>{b.title}</h3>
              </div>

              <p style={{ margin: '18px 0 0', fontSize: 14, lineHeight: 1.62, color: '#5c6f68', fontWeight: 500 }}>{b.desc}</p>

              <div style={{ height: 1, margin: '20px 0 18px', background: 'linear-gradient(90deg, rgba(16,120,90,0.16), transparent)' }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                {b.points.map((p) => (
                  <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, borderRadius: 7, background: 'rgba(16,185,129,0.14)' }}><CheckIcon /></span>
                    <span style={{ fontFamily: "'Zalando Sans'", fontWeight: 600, fontSize: 14, color: '#0d2b22' }}>{p}</span>
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
