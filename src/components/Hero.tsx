import React, { useState } from 'react';
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

const SparkIcon = ({ size = 24, color = '#fff' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 2l1.9 5.6L19.5 9l-4.2 3.4L16 18l-4-3.2L8 18l.7-5.6L4.5 9l5.6-1.4z" /></svg>
);

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
  const [sysLog, setSysLog] = useState<string>('Trạng thái: Trợ lý SOLI AI sẵn sàng tiếp nhận…');

  const handleSelectPreset = (index: number) => {
    if (isTyping) return;
    const preset = PRESET_MESSAGES[index];
    setActivePresetIndex(index);
    setSysLog(`Khách hàng gửi tin nhắn: "${preset.prompt.substring(2)}"`);

    const userMsgId = 'user-' + Date.now();
    const newMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: preset.prompt,
      timestamp: 'Vừa xong'
    };

    setMessages((prev) => [...prev, newMsg]);
    setIsTyping(true);

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
      setSysLog(`⚡ SOLI AI phản hồi thành công sau 0.8 giây! Đồng bộ dữ liệu lịch hẹn về CRM…`);

      if (preset.type === 'success') {
        setTimeout(() => {
          onLeadCreate("Khách đặt demo Live-Chat", "090xxxx999", "Spa Trải Nghiệm", "1");
          setSysLog(`⚡ [Hệ Thống] Đồng bộ và tạo Lead mới vào Dashboard quản lý thành công!`);
        }, 1200);
      }
    }, 1200);
  };

  const handleCtaClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const r = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    r.style.cssText = `position:absolute; border-radius:50%; pointer-events:none; width:${size}px; height:${size}px; left:${e.clientX - rect.left - size / 2}px; top:${e.clientY - rect.top - size / 2}px; background:rgba(255,255,255,0.45); transform:scale(0); animation:soli-ripple .6s ease-out forwards;`;
    btn.appendChild(r);
    setTimeout(() => r.remove(), 620);
    onOpenDemo();
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', alignItems: 'center',
        padding: '96px clamp(28px,6vw,110px) 72px',
        background: 'radial-gradient(130% 120% at 12% 0%, #f4fbf7 0%, #e7f4ec 42%, #dcefe4 100%)'
      }}
    >
      {/* ===== Background layers ===== */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: '-12%', background: 'radial-gradient(38% 38% at 22% 28%, rgba(52,211,153,0.17), transparent 70%), radial-gradient(36% 36% at 82% 20%, rgba(45,212,191,0.15), transparent 70%), radial-gradient(44% 44% at 62% 82%, rgba(110,231,183,0.15), transparent 70%)', animation: 'soli-mesh 34s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: '150vmax', height: '150vmax', marginLeft: '-75vmax', marginTop: '-75vmax', transformOrigin: 'center', background: 'conic-gradient(from 0deg, rgba(52,211,153,0.06), rgba(45,212,191,0) 22%, rgba(110,231,183,0.06) 48%, rgba(52,211,153,0) 72%, rgba(52,211,153,0.06))', animation: 'soli-sheen 100s linear infinite' }} />
        <div style={{ position: 'absolute', top: '18%', left: '14%', width: 130, height: 130, borderRadius: '50%', background: 'radial-gradient(circle at 42% 40%, rgba(52,211,153,0.32), transparent 70%)', filter: 'blur(16px)', animation: 'soli-orb-a 26s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: '64%', left: '56%', width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle at 50% 50%, rgba(45,212,191,0.3), transparent 70%)', filter: 'blur(14px)', animation: 'soli-orb-b 32s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: '32%', left: '80%', width: 76, height: 76, borderRadius: '50%', background: 'radial-gradient(circle at 50% 50%, rgba(110,231,183,0.28), transparent 70%)', filter: 'blur(12px)', animation: 'soli-orb-c 29s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: -160, left: -120, width: 620, height: 620, borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, rgba(52,211,153,0.55), rgba(52,211,153,0) 68%)', filter: 'blur(30px)', animation: 'soli-aurora-a 14s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: -80, right: -140, width: 560, height: 560, borderRadius: '50%', background: 'radial-gradient(circle at 60% 40%, rgba(45,212,191,0.5), rgba(45,212,191,0) 66%)', filter: 'blur(34px)', animation: 'soli-aurora-b 17s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: -220, left: '38%', width: 640, height: 640, borderRadius: '50%', background: 'radial-gradient(circle at 50% 50%, rgba(110,231,183,0.45), rgba(110,231,183,0) 64%)', filter: 'blur(40px)', animation: 'soli-aurora-c 20s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(16,120,90,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(16,120,90,0.045) 1px, transparent 1px)', backgroundSize: '52px 52px', maskImage: 'radial-gradient(120% 100% at 50% 0%, #000 30%, transparent 78%)', WebkitMaskImage: 'radial-gradient(120% 100% at 50% 0%, #000 30%, transparent 78%)' }} />
      </div>

      {/* ===== Content grid ===== */}
      <div className="soli-hero-grid" style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 1360, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.08fr)', gap: 'clamp(40px,5vw,84px)', alignItems: 'center' }}>

        {/* ===== LEFT ===== */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '9px 16px 9px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.72)', border: '1px solid rgba(16,163,127,0.22)', boxShadow: '0 6px 20px -10px rgba(16,120,90,0.4)', backdropFilter: 'blur(8px)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,#10b981,#059669)', boxShadow: '0 4px 10px -3px rgba(16,163,127,0.7)' }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="#fff"><path d="M13 2L4 14h6l-1 8 9-12h-6z" /></svg>
            </span>
            <span style={{ fontFamily: "'Zalando Sans'", fontSize: 12.5, fontWeight: 700, letterSpacing: '1.1px', color: '#0c6b52' }}>SOLI · AI TIẾP ĐÓN KHÁCH HÀNG ĐẦU VÀO</span>
          </div>

          <h1 style={{ margin: '26px 0 0', fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 'clamp(40px,4.6vw,68px)', lineHeight: 1.06, letterSpacing: '-1.4px', color: '#0d2b22' }}>
            Phản hồi trong <span style={{ color: '#10a37f' }}>10s</span><br />
            Chốt lịch <span style={{ color: '#10a37f' }}>24/7</span><br />
            <span style={{ position: 'relative', display: 'inline-block', color: '#059669', background: 'linear-gradient(120deg,#10b981,#059669 55%,#0d9488)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Bứt phá doanh thu
              <svg style={{ position: 'absolute', left: 0, bottom: -14, width: '100%', height: 14 }} viewBox="0 0 320 14" preserveAspectRatio="none" fill="none"><path d="M2 9 C 80 2, 240 2, 318 8" stroke="#34d399" strokeWidth="4" strokeLinecap="round" /></svg>
            </span>
          </h1>

          <p style={{ margin: '38px 0 0', maxWidth: 490, fontSize: 19, lineHeight: 1.68, color: '#4a5f57', fontWeight: 500 }}>
            <span style={{ color: '#0d2b22', fontWeight: 700 }}>SOLI AI</span> là trợ lý tiếp đón khách hàng tự động thông minh, được thiết kế chuyên biệt cho <span style={{ color: '#0d2b22', fontWeight: 700 }}>chuỗi dịch vụ làm đẹp.</span>
          </p>

          {/* CTA cluster */}
          <div style={{ marginTop: 44, display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', padding: 2, borderRadius: 18 }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: 18, overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', width: '220%', height: '320%', transformOrigin: 'center', marginLeft: '-110%', marginTop: '-160%', background: 'conic-gradient(from 0deg,#34d399,#10b981,#0d9488,#34d399)', animation: 'soli-border-spin 4.5s linear infinite' }} />
              </div>
              <button
                id="hero-primary-cta"
                onClick={handleCtaClick}
                className="soli-lift-sm"
                style={{ position: 'relative', overflow: 'hidden', display: 'inline-flex', alignItems: 'center', gap: 14, padding: '22px 38px', border: 'none', borderRadius: 16, cursor: 'pointer', background: 'linear-gradient(135deg,#10b981 0%,#059669 100%)', animation: 'soli-cta-glow 2.8s ease-in-out infinite' }}
              >
                <span style={{ fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 18, letterSpacing: '0.6px', color: '#fff' }}>TRẢI NGHIỆM NGAY</span>
                <span style={{ display: 'inline-flex', animation: 'soli-arrow 1.6s ease-in-out infinite' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
              </button>
            </div>
          </div>

          {/* Trust row */}
          <div style={{ marginTop: 34, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex' }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', border: '2.5px solid #f4fbf7', background: 'linear-gradient(135deg,#a7f3d0,#34d399)' }} />
              <div style={{ width: 38, height: 38, borderRadius: '50%', border: '2.5px solid #f4fbf7', marginLeft: -12, background: 'linear-gradient(135deg,#6ee7b7,#0d9488)' }} />
              <div style={{ width: 38, height: 38, borderRadius: '50%', border: '2.5px solid #f4fbf7', marginLeft: -12, background: 'linear-gradient(135deg,#5eead4,#0891b2)' }} />
              <div style={{ width: 38, height: 38, borderRadius: '50%', border: '2.5px solid #f4fbf7', marginLeft: -12, background: '#0d2b22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Zalando Sans'", fontWeight: 700, fontSize: 11, color: '#fff' }}>+</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <span style={{ color: '#f5b800', fontSize: 14, letterSpacing: '1px' }}>★★★★★</span>
                <span style={{ fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 14, color: '#0d2b22', marginLeft: 4 }}>4.9/5</span>
              </div>
              <span style={{ fontSize: 13.5, color: '#5c6f68', fontWeight: 600 }}>50+ spa đang tin dùng</span>
            </div>
          </div>
        </div>

        {/* ===== RIGHT — interactive AI chat card ===== */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <div aria-hidden="true" style={{ position: 'absolute', inset: '-6% -4% -6% -4%', borderRadius: 44, background: 'radial-gradient(60% 60% at 60% 20%, rgba(52,211,153,0.4), transparent 70%), radial-gradient(50% 50% at 20% 90%, rgba(45,212,191,0.35), transparent 70%)', filter: 'blur(30px)' }} />

          {/* Main glass card */}
          <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 520, borderRadius: 30, padding: '22px 20px 20px', background: 'linear-gradient(160deg, rgba(255,255,255,0.86), rgba(255,255,255,0.66))', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 40px 90px -30px rgba(11,74,57,0.5), 0 12px 30px -18px rgba(11,74,57,0.35), inset 0 1px 0 rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)', display: 'flex', flexDirection: 'column' }}>

            {/* header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
              <div style={{ position: 'relative', width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(135deg,#10b981,#0d9488)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 22px -8px rgba(16,163,127,0.7)' }}>
                <SparkIcon size={24} />
                <span style={{ position: 'absolute', right: -2, bottom: -2, width: 14, height: 14, borderRadius: '50%', background: '#22c55e', border: '2.5px solid #fff' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 16.5, color: '#0d2b22' }}>SOLI AI - Lễ Tân</span>
                  <span style={{ color: '#f5b800', fontSize: 12.5, fontWeight: 700 }}>5★</span>
                </div>
                <span style={{ fontSize: 12.5, color: '#5c6f68', fontWeight: 600 }}>Zalo OA &amp; Messenger</span>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '7px 13px', borderRadius: 999, background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.28)' }}>
                <span style={{ position: 'relative', width: 8, height: 8 }}>
                  <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#10b981', animation: 'soli-live 1.8s ease-out infinite' }} />
                  <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#10b981' }} />
                </span>
                <span style={{ fontFamily: "'Zalando Sans'", fontWeight: 700, fontSize: 12, color: '#0c6b52' }}>Phản hồi 10s</span>
              </div>
            </div>

            <div style={{ height: 1, margin: '16px 0', background: 'linear-gradient(90deg, transparent, rgba(16,120,90,0.18), transparent)' }} />

            {/* status line */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, fontSize: 12, color: '#5c6f68', fontWeight: 600, marginBottom: 12 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#10b981" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="10" /></svg>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{sysLog}</span>
              </span>
              {isTyping && <span style={{ color: '#10b981', flexShrink: 0 }}>Typing…</span>}
            </div>

            {/* messages panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, height: 300, overflowY: 'auto', paddingRight: 4 }}>
              {messages.map((msg) => (
                <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', maxWidth: '90%', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row' }}>
                    {msg.sender === 'soli-ai' && (
                      <div style={{ flexShrink: 0, width: 30, height: 30, borderRadius: 9, background: 'linear-gradient(135deg,#10b981,#0d9488)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <SparkIcon size={15} />
                      </div>
                    )}
                    <div style={msg.sender === 'user'
                      ? { padding: '13px 16px', borderRadius: '20px 6px 20px 20px', background: 'linear-gradient(160deg,#d1fae5,#a7f3d0)', border: '1px solid rgba(16,185,129,0.28)', boxShadow: '0 8px 22px -12px rgba(16,120,90,0.4)' }
                      : { padding: '13px 16px', borderRadius: '6px 20px 20px 20px', background: 'linear-gradient(160deg, rgba(236,253,245,0.95), rgba(209,250,229,0.85))', border: '1px solid rgba(16,185,129,0.2)', boxShadow: '0 8px 22px -12px rgba(16,120,90,0.4)' }}>
                      <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: '#154236', fontWeight: 500 }}>{msg.text}</p>

                      {msg.type === 'pricing' && (
                        <div style={{ marginTop: 10, background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 12, padding: 10, fontSize: 11.5, color: '#154236' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, color: '#0c6b52', borderBottom: '1px solid rgba(16,185,129,0.2)', paddingBottom: 4 }}>
                            <span>🎁 Ưu Đãi Spa Hot</span><span>-30%</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 5 }}><span>1. Triệt lông vĩnh viễn:</span><span style={{ fontWeight: 700, color: '#059669' }}>199k</span></div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>2. Gội dưỡng sinh 9 bước:</span><span style={{ fontWeight: 700, color: '#059669' }}>89k</span></div>
                          <div style={{ marginTop: 4, fontSize: 10, color: '#5c6f68' }}>* Đặt qua Zalo để giữ suất</div>
                        </div>
                      )}

                      {msg.type === 'slots' && (
                        <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                          {msg.slots?.map((slot) => (
                            <button key={slot} onClick={() => handleSelectPreset(2)} style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', color: '#0c6b52', fontWeight: 700, padding: '7px 8px', borderRadius: 9, fontSize: 10.5, cursor: 'pointer' }}>{slot}</button>
                          ))}
                        </div>
                      )}

                      {msg.type === 'success' && (
                        <div style={{ marginTop: 8, background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.28)', color: '#0c6b52', borderRadius: 12, padding: 10, fontSize: 10.5, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}><path d="M20 6L9 17l-5-5" /></svg>
                          <div>
                            <p style={{ margin: 0, fontWeight: 800, color: '#059669' }}>ĐÃ XÁC NHẬN LỊCH HẸN</p>
                            <p style={{ margin: 0, fontSize: 9.5, color: '#5c6f68' }}>Mã ID: BK-74E9 | Khách: Chị Linh</p>
                            <p style={{ margin: 0, fontSize: 9.5, color: '#5c6f68' }}>Lịch: 18:00 Tối Nay. Nhân viên: Anna</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <span style={{ fontSize: 9.5, color: '#9aa8a2', margin: msg.sender === 'user' ? '4px 2px 0 0' : '4px 0 0 40px', fontWeight: 500 }}>{msg.timestamp}</span>
                </div>
              ))}

              {isTyping && (
                <div style={{ alignSelf: 'flex-start', display: 'flex', gap: 6, alignItems: 'center', background: 'rgba(236,253,245,0.9)', border: '1px solid rgba(16,185,129,0.2)', padding: '12px 16px', borderRadius: '6px 20px 20px 20px' }}>
                  <span style={{ width: 6, height: 6, background: '#10b981', borderRadius: '50%', animation: 'soli-typing 1.2s ease-in-out infinite' }} />
                  <span style={{ width: 6, height: 6, background: '#10b981', borderRadius: '50%', animation: 'soli-typing 1.2s ease-in-out 0.2s infinite' }} />
                  <span style={{ width: 6, height: 6, background: '#10b981', borderRadius: '50%', animation: 'soli-typing 1.2s ease-in-out 0.4s infinite' }} />
                </div>
              )}
            </div>

            {/* suggestion chips */}
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(16,120,90,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Zalando Sans'", fontWeight: 700, fontSize: 11.5, letterSpacing: '0.6px', color: '#0c6b52', marginBottom: 12 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.9-.9L3 20l1.4-4.6A8.5 8.5 0 1 1 21 11.5z" /></svg>
                THỬ NGHIỆM CÂU HỎI TỪ KHÁCH:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {PRESET_MESSAGES.map((preset, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectPreset(i)}
                    disabled={isTyping}
                    className="soli-chip"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 15px', borderRadius: 14,
                      border: activePresetIndex === i ? '1px solid rgba(16,185,129,0.6)' : '1px solid rgba(16,185,129,0.28)',
                      background: activePresetIndex === i ? 'rgba(236,253,245,0.95)' : 'rgba(255,255,255,0.85)',
                      cursor: isTyping ? 'default' : 'pointer', fontSize: 13, fontWeight: 600, color: '#154236', textAlign: 'left', lineHeight: 1.35, opacity: isTyping ? 0.7 : 1
                    }}
                  >
                    {preset.prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Floating card: Online */}
          <div style={{ position: 'absolute', zIndex: 3, top: -26, right: -18, padding: '14px 18px', borderRadius: 18, background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 24px 50px -20px rgba(11,74,57,0.55)', backdropFilter: 'blur(14px)', display: 'flex', alignItems: 'center', gap: 12, animation: 'soli-float-a 5s ease-in-out infinite' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg,#34d399,#10b981)', boxShadow: '0 8px 18px -6px rgba(16,163,127,0.7)' }}>
              <span style={{ position: 'relative', width: 12, height: 12 }}>
                <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#fff', opacity: 0.6, animation: 'soli-live 1.8s ease-out infinite' }} />
                <span style={{ position: 'absolute', inset: 2, borderRadius: '50%', background: '#fff' }} />
              </span>
            </span>
            <div>
              <div style={{ fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 14, color: '#0d2b22' }}>Online</div>
              <div style={{ fontSize: 12, color: '#5c6f68', fontWeight: 600 }}>24/7/365</div>
            </div>
          </div>

          {/* Floating card: 10s response */}
          <div style={{ position: 'absolute', zIndex: 3, bottom: -28, left: -24, padding: '15px 18px', borderRadius: 18, background: 'linear-gradient(150deg, rgba(13,43,34,0.95), rgba(12,107,82,0.92))', boxShadow: '0 24px 55px -20px rgba(11,74,57,0.65)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', gap: 13, animation: 'soli-float-b 6s ease-in-out infinite' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 46, height: 46, borderRadius: 14, background: 'linear-gradient(135deg,#34d399,#10b981)' }}>
              <span style={{ fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 16, color: '#fff', lineHeight: 1 }}>10s</span>
            </div>
            <div>
              <div style={{ fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 13.5, color: '#fff' }}>Phản hồi</div>
              <div style={{ fontSize: 12, color: '#8fe3c6', fontWeight: 600 }}>Không chậm một giây</div>
            </div>
          </div>

          {/* Floating mini stat: conversion */}
          <div style={{ position: 'absolute', zIndex: 3, top: '44%', right: -40, padding: '13px 16px', borderRadius: 16, background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 20px 44px -18px rgba(11,74,57,0.5)', backdropFilter: 'blur(12px)', animation: 'soli-float-b 7s ease-in-out 0.6s infinite' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
              <span style={{ fontFamily: "'Zalando Sans'", fontWeight: 800, fontSize: 22, color: '#059669' }}>+90%</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 15l7-7 7 7" /></svg>
            </div>
            <div style={{ fontSize: 11.5, color: '#5c6f68', fontWeight: 600, marginTop: 1 }}>Tỷ lệ chốt lịch</div>
          </div>
        </div>
      </div>
    </section>
  );
}
