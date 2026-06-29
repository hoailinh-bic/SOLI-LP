import React, { useState, useEffect } from 'react';
import { Sparkles, MessageCircle, ArrowRight, Zap, CheckCircle2, User, Phone, Check } from 'lucide-react';
import { ChatMessage } from '../types';

interface HeroProps {
  onOpenDemo: () => void;
  onLeadCreate: (name: string, phone: string, bizName: string, branches: '1' | '2-3' | 'over-3') => void;
}

const PRESET_MESSAGES: { prompt: string; response: string; options?: string[]; slots?: string[]; type?: 'text' | 'pricing' | 'slots' | 'success' }[] = [
  {
    prompt: "🌸 Mình xin bảng giá chăm sóc da với dịch vụ triệt lông ạ",
    response: "SOLI AI xin gửi chị bảng giá dịch vụ Chăm sóc da & Triệt lông ưu đãi trong tháng này tại Serene Spa. Chị tham khảo qua nhé: 👇",
    type: "pricing",
    options: ["Đặt lịch ngay", "Tập tiếp theo", "Tư vấn thêm"]
  },
  {
    prompt: "📅 Chiều nay lúc 15:30 dịch vụ Gội đầu dưỡng sinh còn trống lịch không?",
    response: "Chi nhánh Quận 1 vào lúc 15:30 chiều nay hiện đã kín lịch. Hệ thống ghi nhận còn trống một số khung giờ sau, chị có thể tham khảo và lựa chọn thời gian phù hợp: ✨",
    type: "slots",
    slots: ["16:00 (Hôm nay)", "17:00 (Hôm nay)", "09:30 (Sáng mai)", "10:30 (Sáng mai)"]
  },
  {
    prompt: "💅 Đặt lịch làm Nail cho 2 người lúc 18:00 tối nay nhé",
    response: "Yêu cầu đặt lịch làm Combo Nail Mi cho 2 người vào lúc 18:00 tối nay đã được ghi nhận thành công. Lịch hẹn này đã tự động đồng bộ lên hệ thống của lễ tân. Chị vui lòng kiểm tra tin nhắn xác nhận lịch hẹn (ZNS) gửi tới số điện thoại của mình trong giây lát nhé. 🎉✅",
    type: "success"
  },
  {
    prompt: "❤️ Tư vấn thêm về liệu trình trị mụn y khoa",
    response: "Liệu trình Trị mụn Y khoa 12 bước tại Clinic được bác sĩ chuyên khoa da liễu trực tiếp thăm khám và thực hiện. Chương trình trải nghiệm lần đầu đang ưu đãi còn 399k (giá gốc 800k). Chị có muốn đăng ký lịch hẹn khám da miễn phí với bác sĩ vào ngày mai không?",
    type: "text",
    options: ["Đăng ký khám 399k", "Hỏi địa chỉ"]
  }
];

export default function Hero({ onOpenDemo, onLeadCreate }: HeroProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'soli-ai',
      text: 'Xin chào anh/chị chủ tiệm! Em là SOLI AI - Trợ lý tiếp đón tự động thông minh. Hãy bấm chọn một câu hỏi của khách hàng bên dưới để xem cách em trả lời trong vòng 10 giây và tự động xếp lịch hẹn nhé! 👇',
      timestamp: 'Vừa xong'
    }
  ]);
  const [activePresetIndex, setActivePresetIndex] = useState<number | null>(null);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [sysLog, setSysLog] = useState<string>('Trạng thái: Trợ lý SOLI AI sẵn sàng tiếp nhận...');

  // Quick form state in hero
  const [quickName, setQuickName] = useState('');
  const [quickPhone, setQuickPhone] = useState('');
  const [quickBiz, setQuickBiz] = useState('');
  const [quickSubmitted, setQuickSubmitted] = useState(false);

  const handleSelectPreset = (index: number) => {
    if (isTyping) return;
    const preset = PRESET_MESSAGES[index];
    setActivePresetIndex(index);
    setSysLog(`Khách hàng gửi tin nhắn: "${preset.prompt.substring(2)}"`);

    // Add user message
    const userMsgId = 'user-' + Date.now();
    const newMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: preset.prompt,
      timestamp: 'Vừa xong'
    };

    setMessages((prev) => [...prev, newMsg]);
    setIsTyping(true);

    // Simulate AI thinking & responding within 1.2s
    setTimeout(() => {
      setIsTyping(false);
      const aiMsgId = 'ai-' + Date.now();
      const aiMsg: ChatMessage = {
        id: aiMsgId,
        sender: 'soli-ai',
        text: preset.response,
        timestamp: 'Vừa xong',
        type: preset.type,
        options: preset.options,
        slots: preset.slots
      };
      setMessages((prev) => [...prev, aiMsg]);
      setSysLog(`⚡ SOLI AI phản hồi thành công sau 0.8 giây! Đồng bộ dữ liệu lịch hẹn về CRM...`);

      // If it is a success flow, register a quick lead mock
      if (preset.type === 'success') {
        setTimeout(() => {
          onLeadCreate("Khách đặt demo Live-Chat", "090xxxx999", "Spa Trải Nghiệm", "1");
          setSysLog(`⚡ [Hệ Thống] Đồng bộ và tạo Lead mới vào Dashboard quản lý thành công!`);
        }, 1200);
      }
    }, 1200);
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName || !quickPhone) return;
    onLeadCreate(quickName, quickPhone, quickBiz || 'Tiệm Trải Nghiệm', '1');
    setQuickSubmitted(true);
  };

  return (
    <section className="relative pt-24 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-bg-custom">
      {/* Background patterns */}
      <div className="absolute inset-0 gradient-hero-mask pointer-events-none" />
      <div className="absolute top-[20%] left-[-10%] w-[300px] h-[300px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-1.5 bg-primary-light border border-primary/25 rounded-full px-3.5 py-1.5 text-xs font-semibold text-secondary-teal tracking-wide uppercase">
              <Zap className="w-3.5 h-3.5 text-secondary-teal" />
              SOLI - AI Tiếp Đón Khách Hàng Đầu Vào Cho Chuỗi Dịch Vụ
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[45px] leading-tight text-neutral-main tracking-tight">
              Phản hồi trong <span className="text-secondary-teal relative inline-block">10s</span>-
              <br />
              Chốt lịch <span className="text-secondary-teal relative inline-block">24/7</span>
              <br />
              <span className="bg-gradient-to-r from-secondary-teal via-primary-dark to-secondary-teal bg-clip-text text-transparent">Bứt phá doanh thu</span>
            </h1>

            {/* Description Paragraph */}
            <p className="text-neutral-sub text-base md:text-lg leading-relaxed max-w-2xl font-light">
              <strong className="text-neutral-main font-medium">SOLI AI</strong> là trợ lý tiếp đón tự động thông minh trên Zalo OA & Messenger, được thiết kế chuyên biệt cho các tiệm và chuỗi dịch vụ có lượng khách lớn.
            </p>

            {/* Value Checkmarks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 py-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-secondary-teal shrink-0 mt-0.5" />
                <span className="text-sm text-neutral-sub"><strong className="text-neutral-main font-semibold">Chấm dứt tình trạng mất khách</strong> do phản hồi chậm vào giờ cao điểm hoặc ngoài giờ.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-secondary-teal shrink-0 mt-0.5" />
                <span className="text-sm text-neutral-sub"><strong className="text-neutral-main font-semibold">Tự động đồng bộ lịch hẹn</strong> về một hệ thống dữ liệu tập trung duy nhất.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-secondary-teal shrink-0 mt-0.5" />
                <span className="text-sm text-neutral-sub"><strong className="text-neutral-main font-semibold">Trợ lý ảo đắc lực đồng hành cùng nhân sự</strong> tối ưu hiệu suất vận hành tại quầy.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-secondary-teal shrink-0 mt-0.5" />
                <span className="text-sm text-neutral-sub"><strong className="text-neutral-main font-semibold">Phản hồi cá nhân hóa chuẩn xác</strong> theo bảng giá và cơ sở dữ liệu dịch vụ riêng.</span>
              </div>
            </div>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                id="hero-primary-cta"
                onClick={onOpenDemo}
                className="w-full sm:w-auto bg-secondary-teal hover:bg-secondary-teal/90 text-white font-display font-bold uppercase py-4 px-8 rounded-full shadow-lg hover:shadow-secondary-teal/20 cursor-pointer transition-all flex items-center justify-center gap-2 group"
              >
                Trải nghiệm ngay
                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

          {/* Right Column - Zalo / Messenger Live Simulator Frame */}
          <div className="lg:col-span-5 relative w-full max-w-md mx-auto">
            
            {/* Phone Display Shell */}
            <div className="bg-white text-neutral-main rounded-3xl p-3 shadow-2xl border-4 border-border-custom glow-emerald relative">
              
              {/* Phone notch element */}
              <div className="w-32 h-5 bg-bg-custom absolute top-0 left-1/2 transform -translate-x-1/2 rounded-b-xl z-20 flex items-center justify-center">
                <div className="w-12 h-1 bg-border-custom rounded-full" />
              </div>

              {/* Chat Container Mockup */}
              <div className="bg-[#f0f4f8] rounded-2xl overflow-hidden h-[480px] flex flex-col relative text-neutral-main pt-4">
                
                {/* Header chat room */}
                <div className="bg-white px-3 py-2.5 flex items-center justify-between border-b border-border-custom shadow-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-bg-custom flex items-center justify-center relative border border-border-custom">
                      <Sparkles className="w-4 h-4 text-secondary-teal shrink-0" />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xs text-neutral-main flex items-center gap-1">
                        SOLI AI - Lễ Tân 5★
                      </h4>
                      <p className="text-[10px] text-neutral-sub font-mono font-medium">Zalo OA & Messenger</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-secondary-teal bg-primary-light px-2.5 py-0.5 rounded-full border border-primary/20">
                    Phản hồi 10s
                  </span>
                </div>

                {/* Sub title log */}
                <div className="bg-white/90 text-neutral-sub px-3 py-1.5 text-[9px] font-mono flex items-center justify-between shadow-inner border-b border-border-custom">
                  <span className="truncate">{sysLog}</span>
                  {isTyping && <span className="animate-pulse text-secondary-teal">Typing...</span>}
                </div>

                {/* Messages Panel area */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3.5 flex flex-col scroll-smooth">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
                    >
                      <div className={`p-3 rounded-2xl text-xs leading-relaxed shadow-xs ${
                        msg.sender === 'user'
                          ? 'bg-[#c6f6d5] text-[#2C4A34] font-semibold rounded-tr-none border border-[#a1e7bf]/40'
                          : 'bg-white text-neutral-main rounded-tl-none border border-border-custom'
                      }`}>
                        <p>{msg.text}</p>

                        {/* Interactive Pricing Card style inside chatbot */}
                        {msg.type === 'pricing' && (
                          <div className="mt-3 bg-bg-custom border border-border-custom rounded-xl p-2.5 text-neutral-main space-y-1 text-[11px]">
                            <div className="font-bold text-neutral-main border-b border-border-custom pb-1 flex justify-between">
                              <span className="text-secondary-teal">🎁 Ưu Đãi Spa Hot</span>
                              <span className="text-secondary-teal">-30%</span>
                            </div>
                            <div className="flex justify-between pt-1">
                              <span>1. Triệt lông vĩnh viễn:</span>
                              <span className="font-semibold text-secondary-teal">199k</span>
                            </div>
                            <div className="flex justify-between">
                              <span>2. Gội dưỡng sinh 9 bước:</span>
                              <span className="font-semibold text-secondary-teal">89k</span>
                            </div>
                            <div className="flex justify-between text-[10px] text-neutral-sub font-mono mt-1">
                              <span>* Đặt qua Zalo để giữ suất</span>
                            </div>
                          </div>
                        )}

                        {/* Interactive Scheduler Slots inside bot */}
                        {msg.type === 'slots' && (
                          <div className="mt-2.5 grid grid-cols-2 gap-1.5 w-full">
                            {msg.slots?.map((slot) => (
                              <button
                                key={slot}
                                onClick={() => handleSelectPreset(2)}
                                className="bg-primary-light hover:bg-secondary-teal hover:text-white text-secondary-teal font-semibold py-1.5 px-2 rounded-lg text-[10px] text-center border border-primary/25 transition-colors cursor-pointer"
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Booking Success Confirmation check inside chat */}
                        {msg.type === 'success' && (
                          <div className="mt-2 bg-primary-light text-secondary-teal rounded-xl p-2.5 text-[10px] flex items-start gap-2 border border-primary/10 animate-pulse">
                            <Check className="w-4 h-4 text-secondary-teal shrink-0 mt-0.5" />
                            <div>
                              <p className="font-bold text-secondary-teal">ĐÃ XÁC NHẬN LỊCH HẸN</p>
                              <p className="font-mono text-[9px] text-neutral-sub">Mã ID: BK-74E9 | Khách: Chị Linh</p>
                              <p className="text-[9px] text-neutral-sub">Lịch: 18:00 Tối Nay. Nhân viên: Anna</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <span className="text-[9px] text-neutral-sub mt-1 font-mono">{msg.timestamp}</span>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="self-start max-w-[80%] bg-white p-3 rounded-2xl rounded-tl-none border border-border-custom flex items-center gap-1.5 shadow-xs">
                      <span className="w-1.5 h-1.5 bg-primary-dark rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-primary-dark rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-primary-dark rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  )}
                </div>

                {/* Preset Options to click */}
                <div className="bg-white border-t border-border-custom p-2 space-y-1.5 z-10">
                  <p className="text-[10px] text-neutral-sub font-medium px-1 flex items-center gap-1 uppercase font-mono">
                    <MessageCircle className="w-3.5 h-3.5 text-secondary-teal" /> Thử nghiệm câu hỏi từ khách:
                  </p>
                  <div className="flex gap-1.5 overflow-x-auto pb-1 max-w-full">
                    {PRESET_MESSAGES.map((preset, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelectPreset(i)}
                        disabled={isTyping}
                        className={`text-[11px] font-medium py-1.5 px-3 rounded-full border shrink-0 transition-all cursor-pointer ${
                          activePresetIndex === i
                            ? 'bg-[#c6f6d5] text-[#2C4A34] border-[#8fa89b] font-bold shadow-xs'
                            : 'bg-bg-custom text-neutral-sub border-border-custom hover:bg-primary-light hover:text-secondary-teal'
                        }`}
                      >
                        {preset.prompt.split(' ')[0]} {preset.prompt.substring(preset.prompt.indexOf(' ') + 1)}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Extra floating badge highlighting real action */}
            <div className="absolute -bottom-6 -right-3 bg-white border border-border-custom rounded-2xl p-3 shadow-lg max-w-[180px] hidden sm:block animate-bounce [animation-duration:4s]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary-light flex items-center justify-center text-secondary-teal font-bold text-xs shrink-0 border border-primary/25">
                  10s
                </div>
                <p className="text-[10px] leading-tight font-medium text-neutral-sub">
                  Phản hồi trung bình, <span className="text-secondary-teal font-bold">không chậm</span> một giây.
                </p>
              </div>
            </div>

          </div>

        </div>



      </div>
    </section>
  );
}
