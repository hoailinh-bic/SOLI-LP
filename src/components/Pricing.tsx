import { Check, Sparkles, Star, Zap, ArrowRight } from 'lucide-react';

interface PricingProps {
  onOpenDemo: () => void;
}

export default function Pricing({ onOpenDemo }: PricingProps) {
  const formatPrice = (price: string) => {
    return price;
  };

  const plans = [
    {
      id: "trial",
      name: "GÓI TRẢI NGHIỆM",
      badge: "DÙNG THỬ",
      price: "0đ",
      period: "/ 7 ngày dùng thử",
      conversion: "Trải nghiệm hoàn toàn miễn phí trong 7 ngày",
      limits: [
        { label: "Hạn mức AI", value: "~200 tin nhắn (Phục vụ ~20 khách)" },
        { label: "Quy mô", value: "Kết nối 1 cơ sở" },
        { label: "Kênh tích hợp", value: "1 Facebook + 1 Zalo OA" }
      ],
      features: [
        "Trợ lý Soli AI tự động Chat & Đặt lịch 24/7.",
        "Hệ thống lịch lưới trực quan & Quản lý khách tự đến.",
        "Báo cáo hiệu quả doanh thu (ROI) bản cơ bản.",
        "Tự động nhắc lịch hẹn khách hàng (Cơ bản).",
        "Hỗ trợ: Qua cộng đồng người dùng Soli AI."
      ],
      note: "* Hệ thống sẽ tạm khóa khi sử dụng hết 200 tin hoặc hết hạn 7 ngày.",
      cta: "Dùng Thử Miễn Phí Ngay",
      highlighted: false,
      isTrial: true
    },
    {
      id: "starter",
      name: "GÓI KHỞI ĐỘNG",
      badge: "KHỞI ĐỘNG",
      price: "249.000đ",
      period: "/ tháng",
      conversion: "Tính ra chỉ ~249đ / tin nhắn AI",
      limits: [
        { label: "Hạn mức AI", value: "~1.000 tin nhắn/tháng" },
        { label: "Quy mô", value: "Kết nối 3 cơ sở" },
        { label: "Kênh tích hợp", value: "Facebook + Zalo OA" }
      ],
      features: [
        "Trợ lý Soli AI tự động Chat & Đặt lịch 24/7.",
        "Hỗ trợ điều phối đặt lịch đa cơ sở.",
        "Hệ thống lịch lưới trực quan & Quản lý khách tự đến.",
        "Báo cáo hiệu quả doanh thu (ROI) bản cơ bản.",
        "Tự động nhắc lịch hẹn khách hàng (Cơ bản).",
        "Hỗ trợ: Qua Email"
      ],
      note: "* Chi phí vượt trần: 300đ / tin nhắn AI phát sinh.",
      cta: "Kích Hoạt Gói Khởi Động",
      highlighted: false
    },
    {
      id: "growth",
      name: "GÓI TĂNG TRƯỞNG",
      badge: "TĂNG TRƯỞNG",
      price: "990.000đ",
      period: "/ tháng",
      conversion: "Tiết kiệm hơn: ~198đ / tin nhắn AI",
      limits: [
        { label: "Hạn mức AI", value: "~5.000 tin nhắn/tháng" },
        { label: "Quy mô", value: "Kết nối 5 cơ sở" },
        { label: "Kênh tích hợp", value: "Facebook + Zalo OA" }
      ],
      features: [
        "Trợ lý Soli AI tự động Chat & Đặt lịch 24/7.",
        "Dung lượng tin nhắn AI lớn gấp 5 lần gói Khởi Động.",
        "Tối ưu hóa quy trình điều phối khách đặt lịch đa cơ sở.",
        "Hệ thống lịch lưới trực quan & Quản lý khách tự đến.",
        "Hệ thống báo cáo ROI và tự động nhắc lịch chăm sóc khách hàng định kỳ.",
        "Hỗ trợ: Qua Email"
      ],
      note: "* Chi phí vượt trần: 300đ / tin nhắn AI phát sinh.",
      cta: "Bứt Phá Doanh Số Ngay",
      highlighted: false
    },
    {
      id: "professional",
      name: "GÓI CHUYÊN NGHIỆP",
      badge: "⭐ Khuyên dùng",
      price: "1.390.000đ",
      period: "/ tháng",
      conversion: "GIÁ RẺ NHẤT: ~174đ / tin nhắn AI",
      limits: [
        { label: "Hạn mức AI", value: "~8.000 tin nhắn/tháng" },
        { label: "Quy mô", value: "Kết nối lên đến 10 cơ sở" },
        { label: "Kênh tích hợp", value: "Facebook + Instagram + Zalo OA" }
      ],
      features: [],
      exclusiveFeatures: [
        "Tự động nhận diện, kiểm tra phòng trống và điều hướng khách về cơ sở tối ưu nhất.",
        "Tự động phân loại trạng thái khách hàng và sắp xếp hàng đợi khoa học.",
        "Bảng điều khiển đa cơ sở, báo cáo ROI nâng cao và so sánh chéo hiệu suất giữa các chi nhánh.",
        "Cấu hình kịch bản nhắc lịch chuyên sâu, cá nhân hóa theo từng nhóm khách.",
        "Đội ngũ CSKH chuyên biệt, ưu tiên 24/7"
      ],
      note: "* Chi phí vượt trần: 300đ / tin nhắn AI phát sinh.",
      cta: "Nâng Cấp Trải Nghiệm Chuyên Nghiệp",
      highlighted: true
    }
  ];

  return (
    <section id="pricing" className="py-20 md:py-24 bg-bg-custom border-b border-border-custom relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 gradient-hero-mask pointer-events-none opacity-65" />
      <div className="absolute top-[15%] left-[-10%] w-[350px] h-[350px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[15%] right-[-10%] w-[350px] h-[350px] rounded-full bg-secondary-teal/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-secondary-teal font-mono text-xs font-semibold tracking-wider uppercase bg-secondary-teal/10 border border-secondary-teal/20 rounded-full px-3 py-1 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-secondary-teal" /> BẢNG GIÁ DỊCH VỤ
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-neutral-main tracking-tight leading-tight">
            Đầu Tư Chi Phí Nhỏ - <span className="text-secondary-teal">Thu Về Giá Trị Lớn</span>
          </h2>
          <p className="text-sm text-neutral-sub max-w-xl mx-auto">
            Chỉ với một khoản đầu tư hợp lý mỗi tháng, SOLI AI giúp tăng tỷ lệ đặt lịch thành công và tối ưu hiệu quả kinh doanh của bạn.
          </p>
        </div>

        {/* Mobile carousel Swipe Hint */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-sub font-semibold mb-6 lg:hidden animate-pulse">
          <span>Vuốt sang trái để so sánh các gói</span>
          <ArrowRight className="w-3.5 h-3.5 text-secondary-teal" />
        </div>

        {/* Pricing Layout Container - Carousel on Mobile, side-by-side on desktop */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 px-4 -mx-4 lg:mx-0 lg:px-0 lg:pb-0 lg:grid lg:grid-cols-4 lg:overflow-visible scrollbar-none scroll-smooth">
          {plans.map((plan) => {
            return (
              <div
                key={plan.id}
                className={`flex-none w-[82vw] sm:w-[310px] lg:w-full snap-center rounded-3xl flex flex-col justify-between transition-all duration-300 relative ${
                  plan.highlighted
                    ? 'bg-white-custom border-2 border-primary shadow-xl shadow-primary/10 lg:scale-[1.03] lg:-translate-y-2 glow-emerald z-10'
                    : 'bg-white-custom/80 border border-border-custom shadow-xs hover:border-secondary-teal/30 hover:shadow-md hover:-translate-y-1'
                }`}
              >
                {/* Highlight Badge */}
                {plan.highlighted && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-neutral-main text-xs font-mono font-black px-5 py-2 rounded-full border border-primary-dark shadow-md uppercase tracking-wider flex items-center gap-1.5 select-none whitespace-nowrap z-20">
                    <Star className="w-3.5 h-3.5 fill-neutral-main text-neutral-main animate-pulse" /> {plan.badge}
                  </div>
                )}

                {/* Card Upper Content */}
                <div className={`p-6 sm:p-7 flex-1 flex flex-col ${plan.highlighted ? 'pt-10 sm:pt-11' : ''}`}>
                  {/* Header Title & Small Label */}
                  <div className="mb-4">
                    {!plan.highlighted && (
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-secondary-teal bg-secondary-teal/5 px-2.5 py-0.5 rounded-full inline-block mb-1.5 border border-secondary-teal/10">
                        {plan.badge}
                      </span>
                    )}
                    <h3 className="font-display font-black text-lg text-neutral-main tracking-tight uppercase">
                      {plan.name}
                    </h3>
                  </div>

                  {/* Pricing Display */}
                  <div className="border-b border-border-custom pb-4 mb-4">
                    <div className="flex items-baseline gap-1">
                      <span className="font-display font-black text-3xl sm:text-4xl text-neutral-main tracking-tight">
                        {formatPrice(plan.price)}
                      </span>
                      <span className="text-xs font-semibold text-neutral-sub font-mono">{plan.period}</span>
                    </div>
                    <p className="text-[11px] font-bold text-secondary-teal mt-1.5 font-mono bg-secondary-teal/5 px-2.5 py-1 rounded-md inline-block">
                      {plan.conversion}
                    </p>
                  </div>

                  {/* Hard Limits Block */}
                  <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-4 mb-5 space-y-2.5">
                    {plan.limits.map((limit, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <span className="text-neutral-sub font-normal">{limit.label}:</span>
                        <span className="text-neutral-main font-bold text-right">{limit.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Divider and Quyền Lợi Header */}
                  <div className="mb-3.5">
                    <p className="text-[11px] font-bold font-mono tracking-wider text-neutral-sub uppercase">
                      Bạn sẽ nhận được:
                    </p>
                  </div>

                  {/* Standard Features list */}
                  <ul className="space-y-3 flex-1">
                    {/* Exclusive Feature segment for professional tier */}
                    {plan.exclusiveFeatures && (
                      <div className="mb-4 bg-primary-light/50 border border-primary/20 rounded-xl p-3.5 space-y-2.5">
                        <p className="text-xs text-neutral-sub leading-relaxed">
                          Bao gồm những tính năng của 3 gói trước, gói Chuyên Nghiệp có
                        </p>
                        <p className="text-[10px] font-bold font-mono tracking-wider text-secondary-teal uppercase flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5 text-secondary-teal fill-secondary-teal" /> ĐẶC QUYỀN ĐỘC QUYỀN CHỈ CÓ TẠI GÓI NÀY:
                        </p>
                        {plan.exclusiveFeatures.map((feat, idx) => (
                          <li key={`exclusive-${idx}`} className="flex items-start gap-2">
                            <div className="w-4 h-4 rounded-full bg-primary text-neutral-main flex items-center justify-center shrink-0 mt-0.5 border border-primary-dark">
                              <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                            </div>
                            <span className="text-xs leading-relaxed text-neutral-main font-semibold">
                              {feat}
                            </span>
                          </li>
                        ))}
                      </div>
                    )}

                    {/* Standard features mapping */}
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="w-4.5 h-4.5 rounded-full bg-secondary-teal/5 text-secondary-teal flex items-center justify-center shrink-0 mt-0.5 border border-secondary-teal/10">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        </div>
                        <span className="text-xs leading-relaxed text-neutral-sub">
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA & Note segment */}
                <div className="p-6 pt-0 mt-auto">
                  <div className="border-t border-border-custom pt-4 mb-4">
                    <button
                      id={`pricing-cta-${plan.id}`}
                      onClick={onOpenDemo}
                      className={`w-full font-display font-extrabold uppercase py-3.5 px-5 rounded-2xl cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 group text-xs ${
                        plan.highlighted
                          ? 'bg-primary hover:bg-primary-dark text-neutral-main hover:shadow-lg shadow-md'
                          : 'bg-secondary-teal hover:bg-secondary-teal/90 text-white shadow-xs hover:shadow-md'
                      }`}
                    >
                      {plan.cta}
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </button>
                  </div>
                  <p className="text-[10px] text-neutral-sub/80 text-center leading-normal italic min-h-[30px] flex items-center justify-center">
                    {plan.note}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
