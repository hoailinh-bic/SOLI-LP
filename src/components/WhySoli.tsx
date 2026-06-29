import { Zap, Heart, Database, LayoutGrid, Sparkles, Star } from 'lucide-react';

export default function WhySoli() {
  const benefits = [
    {
      id: "why-1",
      icon: <Zap className="w-5 h-5 text-secondary-teal shrink-0" />,
      title: "Phản hồi tức thì – Tự động chốt lịch 24/7",
      description: "SOLI AI tiếp nhận và tư vấn khách hàng 24/7 trên Zalo OA và Messenger, đồng thời duy trì cuộc trò chuyện xuyên suốt để giải đáp thắc mắc, tư vấn dịch vụ và chốt lịch hẹn ngay trong hội thoại. Nhờ đó, spa không bỏ lỡ bất kỳ cơ hội đặt lịch nào của khách hàng, kể cả khi lễ tân đang bận phục vụ khách hoặc ngoài giờ làm việc.",
      badge: "Phản hồi <10s",
      percent: "100%"
    },
    {
      id: "why-2",
      icon: <Heart className="w-5 h-5 text-secondary-teal shrink-0" />,
      title: "Giảm tải áp lực – Tối ưu hiệu suất lễ tân",
      description: "Hệ thống tự động xử lý tới 80% các câu hỏi lặp đi lặp lại về bảng giá, dịch vụ và lịch trống. Đặc biệt, SOLI AI còn gợi ý kịch bản tư vấn và đề xuất bước tiếp theo phù hợp để nhân viên dễ dàng tiếp nhận và chăm sóc khách hàng. Nhờ đó, đội ngũ có thêm thời gian tập trung vào việc phục vụ khách trực tiếp, nâng cao trải nghiệm và chất lượng dịch vụ.",
      badge: "Xử lý tự động 80%",
      percent: "80%"
    },
    {
      id: "why-3",
      icon: <Database className="w-5 h-5 text-secondary-teal shrink-0" />,
      title: "Quản lý dữ liệu tập trung – Hạn chế rủi ro sai sót",
      description: "Mọi thông tin khách hàng, lịch hẹn và lịch sử trò chuyện được đồng bộ trên một hệ thống duy nhất, giúp việc theo dõi trở nên dễ dàng và chính xác. Đặc biệt, SOLI AI tích hợp bộ lọc thông minh giúp tự động phân loại lead thật (khách có nhu cầu đặt lịch, tư vấn) và lead rác (spam), hiển thị trực quan trên Dashboard để chủ cơ sở và lễ tân tối ưu thời gian xử lý.",
      badge: "Đồng bộ 1-Hệ Thống",
      percent: "0 Sót"
    },
    {
      id: "why-4",
      icon: <LayoutGrid className="w-5 h-5 text-secondary-teal shrink-0" />,
      title: "Chuẩn hóa quy trình – Sẵn sàng mở rộng chuỗi",
      description: "Khi mở thêm chi nhánh mới, bạn không còn lo ngại việc đào tạo lại quy trình tiếp đón từ đầu. SOLI AI giúp chuẩn hóa kịch bản tư vấn và tự động điều phối lịch về từng cơ sở, giúp doanh nghiệp dễ dàng tăng quy mô vận hành.",
      badge: "Tương thích 100+ Chi nhánh",
      percent: "Auto Scale"
    }
  ];

  return (
    <section id="why-soli" className="py-20 md:py-24 bg-bg-custom border-b border-border-custom relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 gradient-hero-mask pointer-events-none" />
      <div className="absolute top-[30%] left-[-10%] w-[300px] h-[300px] rounded-full bg-primary/3 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-accent-coral font-mono text-xs font-semibold tracking-wider uppercase bg-accent-coral/10 border border-accent-coral/20 rounded-full px-3 py-1 inline-flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-accent-coral fill-accent-coral/20" /> Ưu Điểm Vượt Trội
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-neutral-main tracking-tight leading-tight">
            Vì Sao Bạn Chọn <span className="text-secondary-teal">SOLI AI?</span>
          </h2>
          <p className="text-neutral-sub text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-light">
            Giải pháp thông minh đột phá được nghiên cứu & thiết kế chuyên biệt cho ngành làm đẹp.
          </p>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((b, idx) => (
            <div
              id={`why-card-${idx}`}
              key={b.id}
              className="p-8 rounded-3xl border border-border-custom bg-white shadow-xs hover:shadow-lg hover:border-primary-dark/40 hover:bg-primary-light/50 transition-all flex flex-col justify-between relative overflow-hidden group"
            >
              {/* Subtle visual accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-bg-custom border-l border-b border-border-custom rounded-bl-3xl flex items-center justify-center font-mono font-bold text-[10px] text-neutral-sub group-hover:bg-primary-light group-hover:text-secondary-teal group-hover:border-primary-light transition-all">
                {b.percent}
              </div>

              <div className="space-y-4 pr-10">
                
                <div className="inline-flex items-center gap-1.5 bg-primary-light border border-primary/25 rounded-full px-2.5 py-1 text-[10px] font-mono font-semibold text-secondary-teal uppercase">
                  {b.badge}
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-bg-custom border border-border-custom flex items-center justify-center text-secondary-teal shrink-0 group-hover:bg-primary group-hover:text-neutral-main transition-all">
                    {b.icon}
                  </div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-neutral-main leading-tight">
                    {b.title}
                  </h3>
                </div>

                <p className="text-xs text-neutral-sub leading-relaxed font-light">
                  {b.description}
                </p>

              </div>

              <div className="mt-6 pt-4 border-t border-border-custom flex items-center justify-between text-[11px] text-neutral-sub">
                <span className="flex items-center gap-1.5 font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-secondary-teal animate-pulse" /> Trợ lý tự động hoàn hảo
                </span>
                <span className="text-neutral-sub group-hover:text-secondary-teal transition-colors">Xem kịch bản &rarr;</span>
              </div>

            </div>
          ))}
        </div>


      </div>
    </section>
  );
}
