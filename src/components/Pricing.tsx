import React from 'react';

interface PricingProps {
  onOpenDemo: () => void;
}

interface Plan {
  id: string;
  name: string;
  badge: string;
  price: string;
  period: string;
  conversion: string;
  limits: { label: string; value: string }[];
  features?: string[];
  exclusiveFeatures?: string[];
  note: string;
  cta: string;
  highlighted?: boolean;
  isTrial?: boolean;
}

const plans: Plan[] = [
  {
    id: 'trial', name: 'Gói Trải Nghiệm', badge: 'DÙNG THỬ', price: '0đ', period: '/ 7 ngày dùng thử',
    conversion: 'Trải nghiệm hoàn toàn miễn phí trong 7 ngày',
    limits: [
      { label: 'Hạn mức AI', value: '~200 tin (~20 khách)' },
      { label: 'Quy mô', value: 'Kết nối 1 cơ sở' },
      { label: 'Kênh tích hợp', value: '1 Facebook + 1 Zalo OA' }
    ],
    features: [
      'Trợ lý Soli AI tự động Chat & Đặt lịch 24/7.',
      'Hệ thống lịch lưới trực quan & Quản lý khách tự đến.',
      'Báo cáo hiệu quả doanh thu (ROI) bản cơ bản.',
      'Tự động nhắc lịch hẹn khách hàng (Cơ bản).',
      'Hỗ trợ: Qua cộng đồng người dùng Soli AI.'
    ],
    note: '* Hệ thống sẽ tạm khóa khi sử dụng hết 200 tin hoặc hết hạn 7 ngày.',
    cta: 'DÙNG THỬ MIỄN PHÍ NGAY', isTrial: true
  },
  {
    id: 'starter', name: 'Gói Khởi Động', badge: 'KHỞI ĐỘNG', price: '249.000đ', period: '/tháng',
    conversion: 'Tính ra chỉ ~249đ / tin nhắn AI',
    limits: [
      { label: 'Hạn mức AI', value: '~1.000 tin nhắn/tháng' },
      { label: 'Quy mô', value: 'Kết nối 3 cơ sở' },
      { label: 'Kênh tích hợp', value: 'Facebook + Zalo OA' }
    ],
    features: [
      'Trợ lý Soli AI tự động Chat & Đặt lịch 24/7.',
      'Hỗ trợ điều phối đặt lịch đa cơ sở.',
      'Hệ thống lịch lưới trực quan & Quản lý khách tự đến.',
      'Báo cáo hiệu quả doanh thu (ROI) bản cơ bản.',
      'Tự động nhắc lịch hẹn khách hàng (Cơ bản).',
      'Hỗ trợ: Qua Email.'
    ],
    note: '* Chi phí vượt trần: 300đ / tin nhắn AI phát sinh.',
    cta: 'KÍCH HOẠT GÓI KHỞI ĐỘNG'
  },
  {
    id: 'growth', name: 'Gói Tăng Trưởng', badge: 'TĂNG TRƯỞNG', price: '990.000đ', period: '/tháng',
    conversion: 'Tiết kiệm hơn ~198đ / tin nhắn AI',
    limits: [
      { label: 'Hạn mức AI', value: '~5.000 tin nhắn/tháng' },
      { label: 'Quy mô', value: 'Kết nối 5 cơ sở' },
      { label: 'Kênh tích hợp', value: 'Facebook + Zalo OA' }
    ],
    features: [
      'Trợ lý Soli AI tự động Chat & Đặt lịch 24/7.',
      'Dung lượng tin nhắn AI lớn gấp 5 lần gói Khởi Động.',
      'Tối ưu hóa quy trình điều phối khách đặt lịch đa cơ sở.',
      'Hệ thống lịch lưới trực quan & Quản lý khách tự đến.',
      'Hệ thống báo cáo ROI và tự động nhắc lịch chăm sóc khách hàng định kỳ.',
      'Hỗ trợ: Qua Email.'
    ],
    note: '* Chi phí vượt trần: 300đ / tin nhắn AI phát sinh.',
    cta: 'BỨT PHÁ DOANH SỐ NGAY'
  },
  {
    id: 'professional', name: 'Gói Chuyên Nghiệp', badge: 'GÓI CHUYÊN NGHIỆP', price: '1.390.000đ', period: '/tháng',
    conversion: 'Giá rẻ nhất ~174đ / tin nhắn AI',
    limits: [
      { label: 'Hạn mức AI', value: '~8.000 tin nhắn/tháng' },
      { label: 'Quy mô', value: 'Kết nối lên đến 10 cơ sở' },
      { label: 'Kênh tích hợp', value: 'Facebook + Instagram + Zalo OA' }
    ],
    exclusiveFeatures: [
      'Tự động nhận diện, kiểm tra phòng trống và điều hướng khách về cơ sở tối ưu nhất.',
      'Tự động phân loại trạng thái khách hàng và sắp xếp hàng đợi khoa học.',
      'Bảng điều khiển đa cơ sở, báo cáo ROI nâng cao và so sánh chéo hiệu suất giữa các chi nhánh.',
      'Cấu hình kịch bản nhắc lịch chuyên sâu, cá nhân hóa theo từng nhóm khách.',
      'Đội ngũ CSKH chuyên biệt, ưu tiên 24/7.'
    ],
    note: '* Chi phí vượt trần: 300đ / tin nhắn AI phát sinh.',
    cta: 'NÂNG CẤP TRẢI NGHIỆM CHUYÊN NGHIỆP', highlighted: true
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

const ArrowIcon = ({ color = '#fff' }: { color?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

const CheckBox = ({ featured }: { featured?: boolean }) => (
  <span style={{ flexShrink: 0, marginTop: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 19, height: 19, borderRadius: 6, background: featured ? 'linear-gradient(135deg,#10b981,#059669)' : 'rgba(16,185,129,0.14)' }}>
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={featured ? '#fff' : '#059669'} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
  </span>
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
          <h2 style={{ margin: '24px 0 0', fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 'clamp(28px,3.8vw,48px)', lineHeight: 1.1, letterSpacing: '-1.1px', color: '#0d2b22' }}>Đầu tư chi phí nhỏ — <span style={{ color: '#059669' }}>Thu về giá trị lớn</span></h2>
          <p style={{ margin: '20px 0 0', maxWidth: 620, fontSize: 17, lineHeight: 1.65, color: '#4a5f57', fontWeight: 500 }}>Chỉ với một khoản đầu tư hợp lý mỗi tháng, SOLI AI giúp tăng tỷ lệ đặt lịch thành công và tối ưu hiệu quả kinh doanh của bạn.</p>
        </div>

        {/* pricing grid */}
        <div className="soli-price-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20, alignItems: 'stretch' }}>
          {plans.map((plan) => {
            const featured = !!plan.highlighted;
            return (
              <div
                key={plan.id}
                className={featured ? 'soli-price-featured' : undefined}
                style={featured
                  ? { position: 'relative', display: 'flex', flexDirection: 'column', padding: '26px 24px', borderRadius: 24, background: 'linear-gradient(165deg, rgba(236,253,245,0.96), rgba(214,247,232,0.9))', border: '1.5px solid rgba(16,185,129,0.55)', boxShadow: '0 44px 90px -30px rgba(16,120,90,0.55), 0 0 0 4px rgba(16,185,129,0.08), inset 0 1px 0 rgba(255,255,255,0.9)', backdropFilter: 'blur(16px)', transform: 'translateY(-14px)' }
                  : { display: 'flex', flexDirection: 'column', padding: '26px 24px', borderRadius: 24, background: 'linear-gradient(160deg, rgba(255,255,255,0.9), rgba(255,255,255,0.66))', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 30px 66px -34px rgba(11,74,57,0.5), inset 0 1px 0 rgba(255,255,255,0.9)', backdropFilter: 'blur(16px)' }}
              >
                {featured && (
                  <div style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 15px', borderRadius: 999, background: 'linear-gradient(135deg,#0d2b22,#0c6b52)', boxShadow: '0 12px 26px -10px rgba(11,74,57,0.7)', whiteSpace: 'nowrap' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#34d399"><path d="M12 2l2.9 6.3L22 9l-5 4.6L18.2 21 12 17.3 5.8 21 7 13.6 2 9l7.1-.7z" /></svg>
                    <span style={{ fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 11, letterSpacing: '0.8px', color: '#fff' }}>KHUYÊN DÙNG</span>
                  </div>
                )}

                <div style={featured
                  ? { display: 'inline-flex', alignSelf: 'flex-start', marginTop: 6, padding: '6px 12px', borderRadius: 999, background: 'linear-gradient(135deg,#10b981,#059669)', fontFamily: "'Zalando Sans'", fontWeight: 700, fontSize: 11, letterSpacing: '0.8px', color: '#fff' }
                  : { display: 'inline-flex', alignSelf: 'flex-start', padding: '6px 12px', borderRadius: 999, background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.28)', fontFamily: "'Zalando Sans'", fontWeight: 700, fontSize: 11, letterSpacing: '0.8px', color: '#0c6b52' }}>{plan.badge}</div>

                {!featured && <h3 style={{ margin: '16px 0 0', fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 19, letterSpacing: '-0.3px', color: '#0d2b22' }}>{plan.name}</h3>}

                <div style={{ marginTop: featured ? 16 : 14, display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: plan.isTrial ? 38 : 32, lineHeight: 1, letterSpacing: '-1.3px', color: '#0d2b22' }}>{plan.price}</span>
                  <span style={{ fontSize: 13, color: featured ? '#39584b' : '#5c6f68', fontWeight: 500 }}>{plan.period}</span>
                </div>

                <div style={featured
                  ? { marginTop: 12, padding: '8px 12px', borderRadius: 12, background: 'linear-gradient(135deg,#10b981,#059669)', fontSize: 12.5, fontWeight: 700, color: '#fff' }
                  : { marginTop: 12, padding: '8px 12px', borderRadius: 12, background: 'rgba(16,185,129,0.1)', fontSize: 12.5, fontWeight: 600, color: '#0c6b52' }}>{plan.conversion}</div>

                {/* limits */}
                <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10, padding: 16, borderRadius: 16, background: featured ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.7)', border: featured ? '1px solid rgba(16,185,129,0.25)' : '1px solid rgba(16,120,90,0.1)' }}>
                  {plan.limits.map((l) => (
                    <div key={l.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: 12, color: '#5c6f68', fontWeight: 500 }}>{l.label}</span>
                      <span style={{ fontFamily: "'Zalando Sans'", fontWeight: 700, fontSize: 12.5, color: '#0d2b22', textAlign: 'right' }}>{l.value}</span>
                    </div>
                  ))}
                </div>

                {featured ? (
                  <>
                    <div style={{ marginTop: 16, fontSize: 12, lineHeight: 1.5, color: '#39584b', fontWeight: 500 }}>Bao gồm toàn bộ tính năng của 3 gói trước. <b style={{ color: '#0c6b52' }}>Đặc quyền độc quyền chỉ có tại gói này:</b></div>
                    <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {plan.exclusiveFeatures?.map((f) => (
                        <div key={f} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                          <CheckBox featured />
                          <span style={{ fontSize: 13, lineHeight: 1.45, color: '#0d2b22', fontWeight: 600 }}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ marginTop: 18, fontFamily: "'Zalando Sans'", fontWeight: 700, fontSize: 11.5, letterSpacing: '0.6px', color: '#0c6b52' }}>BẠN SẼ NHẬN ĐƯỢC:</div>
                    <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {plan.features?.map((f) => (
                        <div key={f} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                          <CheckBox />
                          <span style={{ fontSize: 13, lineHeight: 1.45, color: '#39584b', fontWeight: 500 }}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <div style={{ flex: 1 }} />

                <button
                  id={`pricing-cta-${plan.id}`}
                  onClick={onOpenDemo}
                  className="soli-lift-sm"
                  style={plan.isTrial
                    ? { marginTop: 22, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, padding: '15px 18px', border: '1.5px solid rgba(16,163,127,0.4)', borderRadius: 14, background: 'rgba(255,255,255,0.85)', cursor: 'pointer', fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 13, letterSpacing: '0.4px', color: '#0c6b52', animation: 'soli-soft-glow 2.8s ease-in-out infinite' }
                    : { marginTop: 22, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, padding: featured ? '16px 18px' : '15px 18px', border: 'none', borderRadius: 14, background: 'linear-gradient(135deg,#10b981,#059669)', cursor: 'pointer', fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 13, letterSpacing: '0.4px', color: '#fff', boxShadow: featured ? undefined : '0 14px 30px -14px rgba(16,163,127,0.7)', animation: featured ? 'soli-cta-glow 2.8s ease-in-out infinite' : undefined }}
                >
                  {plan.cta} <ArrowIcon color={plan.isTrial ? '#0c6b52' : '#fff'} />
                </button>
                <div style={{ marginTop: 12, fontSize: 10.5, lineHeight: 1.5, color: featured ? '#5c8073' : '#9aa8a2', fontStyle: 'italic' }}>{plan.note}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
