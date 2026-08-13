import React from 'react';

interface PricingProps {
  onOpenDemo: () => void;
}

interface Feature {
  text: string;
  strong?: boolean;
}

interface Plan {
  id: string;
  segment: string;        // small pill: "Chuỗi spa ..."
  name: string;
  price: string;
  period: string;
  priceNote?: string;     // e.g. "Không cần thẻ · không tự trừ tiền"
  includesNote?: string;  // e.g. "Mọi thứ ở Trải Nghiệm, cộng:"
  messages?: string;      // distinct AI message-count line (plans 1-3)
  contact?: React.ReactNode; // contact block (enterprise plan)
  features: Feature[];
  cta: string;            // button label
  note: string;           // small caption under the button
  topFlag?: string;       // dark pill centered on top edge
  highlighted?: boolean;
  isTrial?: boolean;
}

const plans: Plan[] = [
  {
    id: 'trial',
    segment: 'Chuỗi spa muốn trải nghiệm',
    name: 'Trải Nghiệm',
    price: '0đ',
    period: '/ 7 ngày',
    messages: '200 tin nhắn AI / 7 ngày',
    features: [
      { text: 'SOLI AI tư vấn và chốt lịch 24/7' },
      { text: 'SOLI AI đề xuất kịch bản chốt khách cho tư vấn viên' },
      { text: 'Tích hợp đa nền tảng (Zalo OA & Facebook)' },
      { text: 'Chat đa kênh miễn phí' }
    ],
    cta: 'DÙNG THỬ MIỄN PHÍ NGAY',
    note: '* Hệ thống sẽ tạm khóa khi sử dụng hết 200 tin hoặc hết hạn 7 ngày.',
    isTrial: true
  },
  {
    id: 'starter',
    segment: 'Chuỗi spa mới phát triển',
    name: 'Khởi Động',
    price: '290.000đ',
    period: '/ tháng',
    topFlag: '★ Phổ biến nhất',
    messages: '1.000 tin nhắn AI / tháng',
    features: [
      { text: 'SOLI AI tư vấn và chốt lịch 24/7' },
      { text: 'SOLI AI đề xuất kịch bản chốt khách cho tư vấn viên' },
      { text: 'Tích hợp đa nền tảng (Zalo OA & Facebook)' },
      { text: 'Chat đa kênh miễn phí' }
    ],
    cta: 'KÍCH HOẠT GÓI KHỞI ĐỘNG',
    note: '',
    highlighted: true
  },
  {
    id: 'growth',
    segment: 'Chuỗi spa đang mở rộng',
    name: 'Tăng Trưởng',
    price: '490.000đ',
    period: '/ tháng',
    messages: '3.500 tin nhắn AI / tháng',
    features: [
      { text: 'SOLI AI tư vấn và chốt lịch 24/7' },
      { text: 'SOLI AI đề xuất kịch bản chốt khách cho tư vấn viên' },
      { text: 'Tích hợp đa nền tảng (Zalo OA & Facebook)' },
      { text: 'Chat đa kênh miễn phí' }
    ],
    cta: 'BỨT PHÁ DOANH SỐ NGAY',
    note: ''
  },
  {
    id: 'professional',
    segment: 'Chuỗi spa quy mô lớn',
    name: 'Chuyên Nghiệp',
    price: 'Liên hệ',
    period: '',
    features: [
      { text: 'Nhiều tính năng nâng cao và riêng biệt', strong: true }
    ],
    contact: (
      <>
        Liên hệ đội ngũ SOLI AI tại{' '}
        <a
          href="mailto:hotro@soliai.vn"
          style={{ color: '#059669', fontWeight: 700, textDecoration: 'none' }}
        >
          hotro@soliai.vn
        </a>{' '}
        để được hỗ trợ 1:1.
      </>
    ),
    cta: 'NÂNG CẤP TRẢI NGHIỆM CHUYÊN NGHIỆP',
    note: ''
  }
];

const SectionBg = () => (
  <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: '-12%', background: 'radial-gradient(38% 38% at 22% 28%, rgba(52,211,153,0.17), transparent 70%), radial-gradient(36% 36% at 82% 20%, rgba(45,212,191,0.15), transparent 70%), radial-gradient(44% 44% at 62% 82%, rgba(110,231,183,0.15), transparent 70%)', animation: 'soli-mesh 34s ease-in-out infinite' }} />
    <div style={{ position: 'absolute', top: '50%', left: '50%', width: '150vmax', height: '150vmax', marginLeft: '-75vmax', marginTop: '-75vmax', transformOrigin: 'center', background: 'conic-gradient(from 0deg, rgba(52,211,153,0.06), rgba(45,212,191,0) 22%, rgba(110,231,183,0.06) 48%, rgba(52,211,153,0) 72%, rgba(52,211,153,0.06))', animation: 'soli-sheen 100s linear infinite' }} />
    <div style={{ position: 'absolute', top: '18%', left: '14%', width: 130, height: 130, borderRadius: '50%', background: 'radial-gradient(circle at 42% 40%, rgba(52,211,153,0.32), transparent 70%)', filter: 'blur(16px)', animation: 'soli-orb-a 26s ease-in-out infinite' }} />
    <div style={{ position: 'absolute', top: '64%', left: '56%', width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle at 50% 50%, rgba(45,212,191,0.3), transparent 70%)', filter: 'blur(14px)', animation: 'soli-orb-b 32s ease-in-out infinite' }} />
    <div style={{ position: 'absolute', top: '32%', left: '80%', width: 76, height: 76, borderRadius: '50%', background: 'radial-gradient(circle at 50% 50%, rgba(110,231,183,0.28), transparent 70%)', filter: 'blur(12px)', animation: 'soli-orb-c 29s ease-in-out infinite' }} />
    <div style={{ position: 'absolute', top: -140, right: -120, width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle at 50% 50%, rgba(52,211,153,0.36), rgba(52,211,153,0) 68%)', filter: 'blur(34px)', animation: 'soli-aurora-a 16s ease-in-out infinite' }} />
    <div style={{ position: 'absolute', bottom: -180, left: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle at 50% 50%, rgba(45,212,191,0.28), rgba(45,212,191,0) 66%)', filter: 'blur(40px)', animation: 'soli-aurora-b 20s ease-in-out infinite' }} />
    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(16,120,90,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(16,120,90,0.04) 1px, transparent 1px)', backgroundSize: '52px 52px', maskImage: 'radial-gradient(120% 100% at 50% 0%, #000 30%, transparent 78%)', WebkitMaskImage: 'radial-gradient(120% 100% at 50% 0%, #000 30%, transparent 78%)' }} />
  </div>
);

const CheckIcon = ({ color = '#10b981' }: { color?: string }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}><path d="M20 6L9 17l-5-5" /></svg>
);

const ArrowIcon = ({ color = '#fff' }: { color?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export default function Pricing({ onOpenDemo }: PricingProps) {
  return (
    <section id="pricing" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(64px,8vw,110px) clamp(24px,5vw,80px)', background: 'radial-gradient(130% 120% at 12% 0%, #f4fbf7 0%, #e7f4ec 42%, #dcefe4 100%)' }}>
      <SectionBg />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1240, margin: '0 auto' }}>
        {/* header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 'clamp(40px,5vw,58px)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '9px 16px 9px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.72)', border: '1px solid rgba(16,163,127,0.22)', boxShadow: '0 6px 20px -10px rgba(16,120,90,0.4)', backdropFilter: 'blur(8px)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,#10b981,#059669)' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M7 12h10M10 18h4" /></svg>
            </span>
            <span style={{ fontFamily: "'Zalando Sans'", fontSize: 12, fontWeight: 700, letterSpacing: '1.1px', color: '#0c6b52' }}>BẢNG GIÁ DỊCH VỤ</span>
          </div>
          <h2 style={{ margin: '24px 0 0', fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 'clamp(28px,3.8vw,48px)', lineHeight: 1.1, letterSpacing: '-1.1px', color: '#0d2b22', textWrap: 'balance' } as React.CSSProperties}>Đầu tư chi phí nhỏ — <span style={{ color: '#059669' }}>Thu về giá trị lớn</span></h2>
          <p style={{ margin: '20px 0 0', maxWidth: 620, fontSize: 17, lineHeight: 1.65, color: '#4a5f57', fontWeight: 500, textWrap: 'pretty' } as React.CSSProperties}>Chọn gói phù hợp với quy mô spa của bạn.<br />Nâng cấp linh hoạt bất cứ lúc nào.</p>
        </div>

        {/* pricing grid */}
        <div className="soli-price-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20, alignItems: 'stretch' }}>
          {plans.map((plan) => {
            const featured = !!plan.highlighted;
            return (
              <div
                key={plan.id}
                className={`soli-price-card${featured ? ' soli-price-featured' : ''}`}
                style={featured
                  ? { position: 'relative', display: 'flex', flexDirection: 'column', padding: '26px 24px 28px', borderRadius: 24, background: 'linear-gradient(165deg, rgba(236,253,245,0.96), rgba(214,247,232,0.9))', border: '1.5px solid rgba(16,185,129,0.55)', boxShadow: '0 44px 90px -30px rgba(16,120,90,0.55), 0 0 0 4px rgba(16,185,129,0.08), inset 0 1px 0 rgba(255,255,255,0.9)', backdropFilter: 'blur(16px)' }
                  : { position: 'relative', display: 'flex', flexDirection: 'column', padding: '26px 24px 28px', borderRadius: 24, background: 'linear-gradient(160deg, rgba(255,255,255,0.9), rgba(255,255,255,0.66))', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 30px 66px -34px rgba(11,74,57,0.5), inset 0 1px 0 rgba(255,255,255,0.9)', backdropFilter: 'blur(16px)' }}
              >
                {plan.topFlag && (
                  <div style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 15px', borderRadius: 999, background: 'linear-gradient(135deg,#0d2b22,#0c6b52)', boxShadow: '0 12px 26px -10px rgba(11,74,57,0.7)', whiteSpace: 'nowrap' }}>
                    <span style={{ fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 11, letterSpacing: '0.6px', color: '#fff' }}>{plan.topFlag}</span>
                  </div>
                )}

                {/* segment pill */}
                <div style={{ display: 'inline-flex', alignSelf: 'flex-start', marginTop: plan.topFlag ? 8 : 2, padding: '6px 12px', borderRadius: 999, background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.28)', fontFamily: "'Zalando Sans'", fontWeight: 700, fontSize: 11, letterSpacing: '0.2px', color: '#0c6b52' }}>{plan.segment}</div>

                {/* name */}
                <h3 style={{ margin: '14px 0 0', fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 20, letterSpacing: '-0.3px', color: '#0d2b22' }}>{plan.name}</h3>

                {/* price */}
                <div style={{ marginTop: 8, display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: plan.isTrial ? 34 : 30, lineHeight: 1, letterSpacing: '-1.3px', color: '#0d2b22' }}>{plan.price}</span>
                  {plan.period && <span style={{ fontSize: 13, color: featured ? '#39584b' : '#5c6f68', fontWeight: 500 }}>{plan.period}</span>}
                </div>

                {/* price note / includes note */}
                {plan.priceNote && (
                  <div style={{ marginTop: 10, fontSize: 12.5, color: '#5c6f68', fontWeight: 500 }}>{plan.priceNote}</div>
                )}
                {plan.includesNote && (
                  <div style={{ marginTop: 12, fontSize: 12.5, color: '#39584b', fontWeight: 600 }}>{plan.includesNote}</div>
                )}

                {/* AI message-count line (visible, but secondary to the price) */}
                {plan.messages && (
                  <div style={{ marginTop: 12, fontFamily: "'Zalando Sans'", fontSize: 15, fontWeight: 700, letterSpacing: '-0.2px', color: '#0c6b52' }}>{plan.messages}</div>
                )}

                {/* features */}
                <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 11 }}>
                  {plan.features.map((f) => (
                    <div key={f.text} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                      <CheckIcon color={featured ? '#059669' : '#10b981'} />
                      <span style={{ fontSize: 13.5, lineHeight: 1.4, color: f.strong ? '#0d2b22' : '#39584b', fontWeight: f.strong ? 700 : 500 }}>{f.text}</span>
                    </div>
                  ))}
                </div>

                {/* contact info (enterprise plan) */}
                {plan.contact && (
                  <div style={{ marginTop: 14, fontSize: 13, lineHeight: 1.55, color: '#39584b', fontWeight: 500 }}>{plan.contact}</div>
                )}

                {/* CTA button (pushed to the bottom so buttons align across cards) */}
                <button
                  id={`pricing-cta-${plan.id}`}
                  onClick={onOpenDemo}
                  className="soli-price-cta soli-lift-sm"
                  style={plan.isTrial
                    ? { marginTop: 'auto', width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, padding: '14px 16px', border: '1.5px solid rgba(16,163,127,0.4)', borderRadius: 14, background: 'rgba(255,255,255,0.9)', cursor: 'pointer', fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 12.5, letterSpacing: '0.4px', textTransform: 'uppercase', color: '#0c6b52', animation: 'soli-soft-glow 2.8s ease-in-out infinite' }
                    : { marginTop: 'auto', width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, padding: '14px 16px', border: 'none', borderRadius: 14, background: 'linear-gradient(135deg,#10b981,#059669)', cursor: 'pointer', fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 12.5, letterSpacing: '0.4px', textTransform: 'uppercase', color: '#fff', boxShadow: featured ? undefined : '0 14px 30px -14px rgba(16,163,127,0.7)', animation: featured ? 'soli-cta-glow 2.8s ease-in-out infinite' : undefined }}
                >
                  {plan.cta} <ArrowIcon color={plan.isTrial ? '#0c6b52' : '#fff'} />
                </button>

                {/* note under the button */}
                <div style={{ marginTop: 12, minHeight: 30, fontSize: 10.5, lineHeight: 1.5, textAlign: 'left', color: featured ? '#5c8073' : '#9aa8a2', fontStyle: 'italic' }}>{plan.note}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
