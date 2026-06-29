import React, { useState } from 'react';
import { MessageSquare, CalendarRange, HeartHandshake, BellRing, Sparkles, Check } from 'lucide-react';

interface Step {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  mockType: 'inbox' | 'pricing' | 'calendar' | 'sms';
  accentTitle: string;
}

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps: Step[] = [
    {
      number: "Bước 1",
      title: "Khách Nhắn Tin – SOLI AI Tiếp Nhận Tức Thì",
      description: "Phản hồi tự động trong vài giây, hoạt động liên tục 24/7/365 trên cả Zalo OA và Messenger. Đảm bảo không bỏ sót bất kỳ một khách hàng tiềm năng nào.",
      icon: <MessageSquare className="w-5 h-5" />,
      mockType: 'inbox',
      accentTitle: "Phản hồi tức thì 24/7"
    },
    {
      number: "Bước 2",
      title: "SOLI AI Tư Vấn & Xác Nhận Nhu Cầu",
      description: "SOLI AI tự động thấu hiểu nhu cầu khách hàng, tra cứu bảng giá, tư vấn dịch vụ và dẫn dắt cuộc hội thoại tự nhiên để chốt lịch hẹn như một lễ tân chuyên nghiệp. Đồng thời, SOLI AI còn gợi ý kịch bản tư vấn và đề xuất bước tiếp theo phù hợp để nhân viên dễ dàng tiếp nhận và chăm sóc khách hàng.",
      icon: <HeartHandshake className="w-5 h-5" />,
      mockType: 'pricing',
      accentTitle: "Đọc hiểu nhu cầu & Tư vấn"
    },
    {
      number: "Bước 3",
      title: "Tự Động Đặt Lịch & Điều Phối Thông Minh",
      description: "Lịch hẹn được tạo lập và đồng bộ trực tiếp về hệ thống máy chủ trung tâm. Hệ thống tự động kiểm tra chuyên viên, sắp xếp phòng trống và phân loại khách mới, khách cũ, khách VIP cực kỳ chính xác.",
      icon: <CalendarRange className="w-5 h-5" />,
      mockType: 'calendar',
      accentTitle: "Đồng bộ xếp phòng tránh trùng lịch"
    },
    {
      number: "Bước 4",
      title: "Nhắc Lịch Tự Động & Xác Nhận Check-in",
      description: "Hệ thống tự động gửi tin nhắn ZNS/SMS nhắc nhở trước giờ hẹn 2 tiếng. Giúp giảm thiểu đến hơn 85% tỷ lệ khách quên lịch và kích thích tỷ lệ đến sử dụng dịch vụ tại tiệm của bạn.",
      icon: <BellRing className="w-5 h-5" />,
      mockType: 'sms',
      accentTitle: "Nhắc hẹn tự động tăng 99% đến hẹn"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-24 bg-bg-custom border-b border-border-custom relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 gradient-hero-mask pointer-events-none" />
      
      {/* Background blobs */}
      <div className="absolute top-[40%] right-[-10%] w-[350px] h-[350px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[250px] h-[250px] rounded-full bg-primary/3 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-accent-coral font-mono text-xs font-semibold tracking-wider uppercase bg-accent-coral/10 border border-accent-coral/20 rounded-full px-3 py-1 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-accent-coral" /> QUY TRÌNH HOẠT ĐỘNG
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-neutral-main tracking-tight leading-tight">
            SOLI AI Hoạt Động Như Thế Nào?
          </h2>
          <p className="text-neutral-sub text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-light">
            Quy trình khép kín tự động từ khâu tiếp nhận tin nhắn đầu tiên đến khi khách bước chân vào cửa hàng của bạn.
          </p>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Step selectors and timelines */}
          <div className="lg:col-span-12 xl:col-span-7 space-y-4">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  id={`step-selector-${idx}`}
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`p-5 rounded-2xl cursor-pointer border transition-all flex gap-4 ${
                    isActive 
                      ? 'bg-primary-light border-primary shadow-xs transform translate-x-2' 
                      : 'bg-white border-border-custom hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  {/* Step bubble icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isActive ? 'bg-primary text-neutral-main font-bold' : 'bg-bg-custom text-neutral-sub border border-border-custom'
                  }`}>
                    {step.icon}
                  </div>

                  {/* Step texts */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-wider font-extrabold uppercase text-secondary-teal">
                      {step.number}
                    </span>
                    <h3 className="font-display font-bold text-base text-neutral-main tracking-tight">
                      {step.title}
                    </h3>
                    {isActive ? (
                      <p className="text-xs text-neutral-sub leading-relaxed pt-1.5 animate-fade-in font-light">
                        {step.description}
                      </p>
                    ) : (
                      <p className="text-xs text-slate-400 line-clamp-1 leading-relaxed pt-0.5">
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Mock Screens displaying state corresponding to step */}
          <div className="lg:col-span-12 xl:col-span-5 relative w-full max-w-sm mx-auto">
            
            {/* Tablet/Phone Frame Container */}
            <div className="bg-white rounded-3xl p-3 shadow-xl border-4 border-border-custom flex flex-col h-[420px] justify-between text-xs text-neutral-main glow-emerald">
              
              {/* Internal Display Screen */}
              <div className="bg-[#f0f4f8] rounded-2xl flex-1 flex flex-col overflow-hidden relative border border-border-custom">
                
                {/* Mock header info bar */}
                <div className="bg-white px-3 py-2 border-b border-border-custom flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-dark animate-pulse" />
                    <span className="text-[10px] font-mono font-semibold uppercase text-neutral-sub">
                      Soli Screen: {steps[activeStep].accentTitle}
                    </span>
                  </div>
                  <span className="text-[8px] font-mono text-neutral-sub">Live</span>
                </div>

                {/* Simulated Content based on State */}
                <div className="flex-1 p-3.5 space-y-4 overflow-y-auto bg-gradient-to-b from-white to-[#f0f4f8] h-[250px]">
                  
                  {/* Step 1 Mockup */}
                  {steps[activeStep].mockType === 'inbox' && (
                    <div className="space-y-3.5 animate-fade-in">
                      <div className="bg-white text-neutral-main rounded-2xl rounded-tr-none p-3 max-w-[85%] self-end ml-auto text-[11px] border border-border-custom">
                        Hi Serene Spa! Bảng giá triệt lông nách hôm nay có khuyến mãi gì không ạ? Em rảnh lúc 17h nha.
                      </div>
                      <div className="bg-primary text-neutral-main rounded-2xl rounded-tl-none p-3 max-w-[85%] text-[11px] border border-primary/20 shadow-xs relative">
                        <span className="absolute -top-1.5 -left-1.5 bg-secondary-teal text-white text-[8px] px-1.5 py-0.2 rounded font-bold uppercase">SOLI AI • 1s</span>
                        Chào chị! Chương trình triệt lông nách tại Serene đang áp dụng ưu đãi trải nghiệm buổi đầu tiên chỉ <strong className="text-neutral-main font-extrabold underline">49k</strong> (giá gốc 150k) và được bảo hành trọn gói trong 5 năm.
                      </div>
                      <div className="text-center font-mono text-[9px] text-neutral-sub bg-white py-1.5 rounded-lg border border-border-custom">
                        ⚡ AI tự động phản hồi trong 0.5s trên Zalo OA
                      </div>
                    </div>
                  )}

                  {/* Step 2 Mockup */}
                  {steps[activeStep].mockType === 'pricing' && (
                    <div className="space-y-3 animate-fade-in">
                      <div className="bg-white rounded-2xl border border-border-custom p-3 shadow-xs space-y-2">
                        <h4 className="font-bold text-[11px] text-neutral-main border-b border-border-custom pb-1.5 flex items-center justify-between">
                          <span>📋 Tra Cứu Dịch Vụ: Triệt Lông</span>
                          <span className="text-[9px] text-secondary-teal bg-primary-light px-1.5 py-0.5 border border-primary/20 rounded">Khớp 100%</span>
                        </h4>
                        <div className="space-y-1.5 text-[10px]">
                          <div className="flex justify-between">
                            <span className="text-neutral-sub">• Trải nghiệm buổi đầu:</span>
                            <span className="font-bold text-neutral-main">49,000 đ</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-sub">• Trọn gói 5 buổi bảo hành:</span>
                            <span className="font-bold text-neutral-main">650,000 đ</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-sub">• Trọn gói triệt mặt & nách:</span>
                            <span className="font-bold text-secondary-teal">999,000 đ</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white text-neutral-main rounded-2xl rounded-tl-none p-3 max-w-[90%] text-[11px] border border-border-custom">
                        AI tư vấn: &ldquo;Trọn gói triệt lông được bảo hành 5 năm không giới hạn số lần, chị Linh có muốn em giữ suất ưu đãi 49k cho chị vào tối nay không nhé?&rdquo;
                      </div>
                    </div>
                  )}

                  {/* Step 3 Mockup */}
                  {steps[activeStep].mockType === 'calendar' && (
                    <div className="space-y-3 animate-fade-in">
                      
                      {/* Booking card */}
                      <div className="bg-white rounded-xl border border-border-custom p-2.5 shadow-xs">
                        <div className="flex items-center justify-between border-b border-border-custom pb-1 mb-1.5">
                          <span className="font-bold text-[10px] text-neutral-main">📅 Lịch Sắp Xếp Tự Động</span>
                          <span className="text-[8px] bg-primary-light text-secondary-teal px-1.5 rounded font-mono border border-primary/20">Soli Synced</span>
                        </div>
                        
                        <div className="space-y-1 text-[9px] text-neutral-sub">
                          <div className="flex justify-between"><span>Khách hàng:</span> <strong className="text-neutral-main">Chị Khánh Linh</strong></div>
                          <div className="flex justify-between"><span>Dịch vụ:</span> <strong className="text-neutral-main">Massage Trị Liệu + Triệt lông</strong></div>
                          <div className="flex justify-between"><span>Khung giờ:</span> <strong className="text-neutral-main">17:00 (Hôm nay)</strong></div>
                          <div className="flex justify-between"><span>Phòng trống:</span> <strong className="text-secondary-teal">Phòng massage 03 (Đã xếp)</strong></div>
                          <div className="flex justify-between"><span>Phân loại:</span> <span className="bg-purple-50 text-purple-600 font-bold px-1.5 py-0.5 rounded-sm text-[8px] border border-purple-200">Khách VIP</span></div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 bg-primary-light text-secondary-teal border border-primary/20 rounded-lg p-2 text-[9px]">
                        <Check className="w-3.5 h-3.5 text-primary-dark shrink-0" />
                        <span>Hệ thống tự động đồng bộ danh bạ & phân bổ phòng tránh lịch trùng.</span>
                      </div>

                    </div>
                  )}

                  {/* Step 4 Mockup */}
                  {steps[activeStep].mockType === 'sms' && (
                    <div className="space-y-3.5 animate-fade-in text-[10px]">
                      
                      <div className="bg-white text-neutral-main rounded-xl p-3 shadow-xs space-y-1.5 border border-border-custom">
                        <div className="flex justify-between items-center text-[9px] text-neutral-sub border-b border-border-custom pb-1 font-mono">
                          <span>Tin Nhắn ZNS (Zalo Brand)</span>
                          <span>15:00</span>
                        </div>
                        <p className="leading-relaxed font-light">
                          Chào chị Khánh Linh! Serene Spa hân hạnh đón tiếp chị vào lúc <strong>17:00 hôm nay</strong> cho liệu trình Triệt lông & Massage.
                        </p>
                        <p className="text-neutral-sub font-light font-sans">
                          Địa chỉ: 142 Nguyễn Thị Minh Khai, Q.03. Nếu có thay đổi xin liên hệ Hotline. Hẹn sớm gặp chị! ❤️
                        </p>
                      </div>

                      <div className="bg-white rounded-xl p-2.5 border border-border-custom text-center text-neutral-sub text-[9px]">
                        📉 Giảm tỷ lệ quên hẹn từ <strong className="text-accent-coral">28%</strong> xuống còn <strong className="text-secondary-teal font-extrabold">dưới 3%</strong>
                      </div>

                    </div>
                  )}

                </div>

                {/* Footer simulation log details */}
                <div className="bg-white border-t border-border-custom p-2 text-center text-[9px] text-neutral-sub font-mono">
                  SOLI AI Engine v2.4.0 • Real-time CRM Sync
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
