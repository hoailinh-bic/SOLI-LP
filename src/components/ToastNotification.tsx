import { useEffect, useRef, useState } from 'react';

/**
 * Toast / floating notification cho Landing Page SOLI AI.
 *
 * - Vị trí: góc dưới bên trái (fixed), nhỏ gọn, bo góc 12px, bóng đổ nhẹ.
 * - Icon xanh theo bộ nhận diện SOLI AI (gradient #10b981 → #059669).
 * - Xuất hiện sau 8s kể từ khi vào trang; mỗi 15s hiển thị một thông báo khác
 *   (luân phiên 5 nội dung), mỗi toast hiển thị ~5s rồi tự ẩn.
 * - Hiệu ứng slide-up + fade.
 * - Có nút X để đóng; đóng thủ công -> không hiển thị lại trong phiên hiện tại.
 * - Không che form đăng ký (nhỏ, nằm sát góc dưới-trái, tự ẩn sau 5s).
 * - Self-contained: style scoped dưới prefix `.soli-toast-*`, không ảnh hưởng
 *   section/form/popup khác.
 */

const MESSAGES: { emoji: string; text: string }[] = [
  { emoji: '📘', text: 'Có khách đang tải Ebook AI dành cho Spa' },
  { emoji: '🤖', text: 'Một chủ spa đang đăng ký trải nghiệm SOLI AI' },
  { emoji: '💬', text: 'Đội ngũ SOLI AI đang tiếp nhận đăng ký tư vấn' },
  { emoji: '📅', text: 'Chương trình trải nghiệm miễn phí đang mở đăng ký' },
  { emoji: '✨', text: 'Khám phá cách AI giúp tối ưu vận hành spa' },
];

const SESSION_KEY = 'soli_toast_dismissed';
const FIRST_DELAY = 8000;   // xuất hiện lần đầu sau 8s
const CYCLE = 15000;        // mỗi 15s một thông báo khác
const VISIBLE = 5000;       // mỗi toast hiển thị ~5s
const ANIM = 320;           // thời lượng animation ẩn

export default function ToastNotification() {
  const [current, setCurrent] = useState<number | null>(null);
  const [leaving, setLeaving] = useState(false);

  const idxRef = useRef(0);
  const dismissedRef = useRef(false);
  const hideRef = useRef<number | null>(null);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    // Đã đóng thủ công trong phiên này -> không bao giờ hiển thị lại.
    try {
      if (sessionStorage.getItem(SESSION_KEY) === '1') {
        dismissedRef.current = true;
        return;
      }
    } catch (e) { /* ignore */ }

    const showNext = () => {
      if (dismissedRef.current) return;
      if (hideRef.current) window.clearTimeout(hideRef.current);
      setLeaving(false);
      setCurrent(idxRef.current % MESSAGES.length);
      idxRef.current += 1;
      // Tự ẩn sau VISIBLE ms.
      hideRef.current = window.setTimeout(() => {
        setLeaving(true);
        window.setTimeout(() => {
          setCurrent(null);
          setLeaving(false);
        }, ANIM);
      }, VISIBLE);
    };

    const start = window.setTimeout(() => {
      showNext();
      const interval = window.setInterval(showNext, CYCLE);
      timersRef.current.push(interval);
    }, FIRST_DELAY);
    timersRef.current.push(start);

    return () => {
      timersRef.current.forEach((t) => {
        window.clearTimeout(t);
        window.clearInterval(t);
      });
      timersRef.current = [];
      if (hideRef.current) window.clearTimeout(hideRef.current);
    };
  }, []);

  const handleClose = () => {
    dismissedRef.current = true;
    try { sessionStorage.setItem(SESSION_KEY, '1'); } catch (e) { /* ignore */ }
    // Dừng mọi lịch hiển thị trong phiên.
    timersRef.current.forEach((t) => {
      window.clearTimeout(t);
      window.clearInterval(t);
    });
    timersRef.current = [];
    if (hideRef.current) window.clearTimeout(hideRef.current);
    // Chạy animation ẩn rồi tháo khỏi DOM.
    setLeaving(true);
    window.setTimeout(() => {
      setCurrent(null);
      setLeaving(false);
    }, ANIM);
  };

  if (current === null) return null;
  const msg = MESSAGES[current];

  return (
    <div className="soli-toast-root" role="status" aria-live="polite">
      <style>{TOAST_CSS}</style>
      <div className={`soli-toast-card ${leaving ? 'soli-toast-out' : 'soli-toast-in'}`}>
        <span className="soli-toast-badge" aria-hidden="true">
          <span className="soli-toast-emoji">{msg.emoji}</span>
          <span className="soli-toast-dot" />
        </span>
        <div className="soli-toast-body">
          <span className="soli-toast-brand">SOLI AI</span>
          <span className="soli-toast-text">{msg.text}</span>
        </div>
        <button type="button" className="soli-toast-close" aria-label="Đóng thông báo" onClick={handleClose}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
      </div>
    </div>
  );
}

const TOAST_CSS = `
.soli-toast-root{
  position: fixed;
  left: max(16px, env(safe-area-inset-left));
  bottom: max(16px, env(safe-area-inset-bottom));
  z-index: 9998;
  pointer-events: none;
  font-family: 'Zalando Sans','Poppins',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;
}
.soli-toast-card{
  pointer-events: auto;
  position: relative;
  display: flex;
  align-items: center;
  gap: 11px;
  width: min(340px, calc(100vw - 32px));
  padding: 11px 34px 11px 11px;
  border-radius: 12px;
  background: rgba(255,255,255,0.96);
  border: 1px solid rgba(16,120,90,0.14);
  box-shadow: 0 12px 32px -12px rgba(11,74,57,0.30), 0 4px 12px -6px rgba(11,74,57,0.16);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.soli-toast-badge{
  position: relative;
  flex-shrink: 0;
  width: 38px; height: 38px;
  border-radius: 10px;
  display: grid; place-items: center;
  background: linear-gradient(135deg, #10b981, #059669);
  box-shadow: 0 6px 14px -6px rgba(16,163,127,0.7);
}
.soli-toast-emoji{ font-size: 18px; line-height: 1; filter: saturate(1.05); }
.soli-toast-dot{
  position: absolute; top: -3px; right: -3px;
  width: 9px; height: 9px; border-radius: 50%;
  background: #34d399; border: 2px solid #ffffff;
}
.soli-toast-dot::after{
  content: ''; position: absolute; inset: -2px; border-radius: 50%;
  background: rgba(52,211,153,0.55);
  animation: soli-toast-pulse 1.8s ease-out infinite;
}
.soli-toast-body{ display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.soli-toast-brand{
  font-size: 10.5px; font-weight: 800; letter-spacing: 0.6px;
  text-transform: uppercase; color: #0c6b52;
}
.soli-toast-text{
  font-size: 13px; font-weight: 600; line-height: 1.4; color: #0d2b22;
  text-wrap: pretty;
}
.soli-toast-close{
  position: absolute; top: 7px; right: 7px;
  width: 22px; height: 22px; padding: 0;
  display: inline-flex; align-items: center; justify-content: center;
  border: none; border-radius: 7px; cursor: pointer;
  color: #7c8a83; background: transparent;
  transition: background .15s ease, color .15s ease;
}
.soli-toast-close:hover{ background: rgba(16,120,90,0.08); color: #0c6b52; }
.soli-toast-close:focus-visible{ outline: 2px solid rgba(16,185,129,0.6); outline-offset: 1px; }

.soli-toast-in{ animation: soli-toast-in .34s cubic-bezier(.2,.8,.2,1) both; }
.soli-toast-out{ animation: soli-toast-out .30s ease both; }

@keyframes soli-toast-in{
  from{ opacity: 0; transform: translateY(18px); }
  to{ opacity: 1; transform: translateY(0); }
}
@keyframes soli-toast-out{
  from{ opacity: 1; transform: translateY(0); }
  to{ opacity: 0; transform: translateY(14px); }
}
@keyframes soli-toast-pulse{
  0%{ transform: scale(1); opacity: .7; }
  70%{ transform: scale(2.4); opacity: 0; }
  100%{ transform: scale(2.4); opacity: 0; }
}

@media (max-width: 420px){
  .soli-toast-card{ width: calc(100vw - 32px); }
}
@media (prefers-reduced-motion: reduce){
  .soli-toast-in, .soli-toast-out{ animation: none; }
  .soli-toast-dot::after{ animation: none; }
}
`;
