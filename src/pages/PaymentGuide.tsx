import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import {
  CreditCard,
  Pencil,
  CheckCircle2,
  Check,
  Copy,
  AlertTriangle,
  QrCode,
  Clock,
  ChevronDown,
  MessageCircle,
  Facebook,
  Phone,
  ArrowLeft,
} from 'lucide-react';

/* ============================================================
   Trang công khai — Hướng dẫn thanh toán (SOLI AI)
   Route: /huong-dan-thanh-toan
   Được chuyển thể từ huong-dan-thanh-toan-standalone.html sang
   React + Tailwind, đồng bộ branding SOLI AI (index.css @theme).

   LƯU Ý CHO DEV: thông tin ngân hàng bên dưới là PLACEHOLDER.
   Thay BANK_INFO + ảnh QR (BANK_INFO.qrSrc) bằng dữ liệu thật.
   Mã CK SOLIXXXXXX do người dùng copy từ màn in-app, không sinh ở đây.
   ============================================================ */

const BANK_INFO = {
  bankName: 'VPBank',
  accountNo: '18819193939',
  accountHolder: 'CÔNG TY CỔ PHẦN CÔNG NGHỆ EVOL',
  memo: 'SOLIXXXXXX',
  // Hotline vẫn là placeholder trong nội dung mới nhất — thay khi có số thật.
  hotline: '[Số hotline]',
  hotlineTel: 'tel:+84000000000',
  // Ảnh QR VietQR thật (VPBank · CÔNG TY CỔ PHẦN CÔNG NGHỆ EVOL) đặt trong public/.
  qrSrc: '/qr-vietqr.png',
};

const CONTACT = {
  zalo: 'https://zalo.me/1132204857628413550',
  fanpage: 'https://www.facebook.com/soliai.vn',
};

/* -------- Small reusable copy-to-clipboard button -------- */
function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = value.replace(/\s+/g, ' ').trim();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Sao chép ${label}`}
      className="soli-lift-sm inline-flex items-center gap-1.5 rounded-lg border border-border-custom px-2.5 py-1 text-[11px] font-bold text-neutral-sub transition-colors hover:border-secondary-teal hover:text-secondary-teal"
    >
      {copied ? (
        <>
          <Check size={12} strokeWidth={2.6} /> Đã sao chép
        </>
      ) : (
        <>
          <Copy size={12} strokeWidth={2} /> Sao chép
        </>
      )}
    </button>
  );
}

/* -------- Section wrapper (numbered panel) -------- */
function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 overflow-hidden rounded-2xl border border-border-custom bg-white-custom shadow-[0_10px_30px_-18px_rgba(13,43,34,0.25)]">
      {children}
    </div>
  );
}

function SectionTitle({ num, children }: { num: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-primary text-[14px] font-extrabold text-white-custom">
        {num}
      </span>
      <h2 className="font-display text-[19px] font-extrabold leading-7 text-neutral-main">{children}</h2>
    </div>
  );
}

/* -------- Data -------- */
const STEPS = [
  {
    icon: CreditCard,
    title: 'Bước 1 — Chuyển khoản',
    body: (
      <>Mở app ngân hàng, quét mã QR hoặc nhập thủ công thông tin tài khoản SOLI AI ở phần bên dưới. Chuyển đúng số tiền của gói bạn đã chọn.</>
    ),
  },
  {
    icon: Pencil,
    title: 'Bước 2 — Ghi đúng nội dung chuyển khoản',
    body: (
      <>
        Nhập mã tham chiếu <code className="rounded bg-primary-light px-1.5 py-0.5 font-mono font-bold text-secondary-teal">SOLIXXXXXX</code>{' '}
        (hiển thị trên màn hình “Chờ xác nhận thanh toán” trong app) vào ô nội dung/lời nhắn chuyển khoản. Đây là cách chúng tôi đối chiếu đúng tài khoản của bạn.
      </>
    ),
  },
  {
    icon: CheckCircle2,
    title: 'Bước 3 — Báo đã chuyển khoản',
    body: (
      <>
        Nhắn cho chúng tôi qua Zalo OA, Fanpage hoặc hotline kèm mã{' '}
        <code className="rounded bg-primary-light px-1.5 py-0.5 font-mono font-bold text-secondary-teal">SOLIXXXXXX</code>. Ops sẽ đối soát và kích hoạt tài khoản trong giờ làm việc.
      </>
    ),
  },
];

const PLANS = [
  { name: 'Khởi Động', price: '249.000đ', featured: false },
  { name: 'Tăng Trưởng', price: '990.000đ', featured: false },
  { name: 'Chuyên Nghiệp', price: '1.390.000đ', featured: true },
];

const NOTES = [
  {
    kind: 'ok' as const,
    body: (
      <>
        <b className="text-neutral-main">Ghi đúng nội dung chuyển khoản</b> (mã{' '}
        <code className="font-mono text-secondary-teal">SOLIXXXXXX</code>) để đối soát nhanh và chính xác.
      </>
    ),
  },
  {
    kind: 'ok' as const,
    body: (
      <>
        <b className="text-neutral-main">Chuyển đúng số tiền</b> của gói đã chọn. Chuyển thiếu/thừa có thể làm chậm quá trình kích hoạt.
      </>
    ),
  },
  {
    kind: 'ok' as const,
    body: (
      <>
        <b className="text-neutral-main">Giữ lại biên lai/ảnh chụp</b> giao dịch để gửi kèm khi báo đã chuyển khoản.
      </>
    ),
  },
  {
    kind: 'warn' as const,
    body: (
      <>
        <b className="text-neutral-main">Thời gian xác nhận:</b> trong giờ làm việc (T2–T7, 8h30–18h). Ngoài giờ, giao dịch sẽ được đối soát vào đầu buổi làm việc kế tiếp.
      </>
    ),
  },
  {
    kind: 'warn' as const,
    body: (
      <>
        <b className="text-neutral-main">Chưa cần thanh toán ngay?</b> Bạn vẫn có thể hoàn tất sau — gói sẽ được kích hoạt ngay khi chúng tôi nhận được chuyển khoản.
      </>
    ),
  },
];

const FAQS = [
  {
    q: (
      <>
        Tôi không thấy mã <code className="font-mono text-secondary-teal">SOLIXXXXXX</code> ở đâu?
      </>
    ),
    a: (
      <>
        Mã tham chiếu hiển thị trên màn hình <b className="text-neutral-main">“Chờ xác nhận thanh toán”</b> trong app, ngay sau khi bạn chọn gói trả phí lúc đăng ký. Bạn có thể bấm “Sao chép” ở màn đó rồi dán vào nội dung chuyển khoản.
      </>
    ),
  },
  {
    q: <>Bao lâu thì tài khoản được kích hoạt?</>,
    a: (
      <>Trong giờ làm việc, chúng tôi đối soát và kích hoạt thường trong vòng vài giờ sau khi nhận được chuyển khoản. Ngoài giờ, giao dịch sẽ được xử lý vào đầu buổi làm việc kế tiếp.</>
    ),
  },
  {
    q: <>Tôi lỡ quên ghi nội dung chuyển khoản thì sao?</>,
    a: (
      <>
        Không sao — hãy nhắn cho chúng tôi qua Zalo OA hoặc Fanpage kèm <b className="text-neutral-main">ảnh biên lai</b> và{' '}
        <b className="text-neutral-main">số điện thoại/email đăng ký</b>. Chúng tôi sẽ đối chiếu thủ công giúp bạn.
      </>
    ),
  },
  {
    q: <>Tôi muốn xuất hoá đơn VAT?</>,
    a: (
      <>Vui lòng gửi thông tin xuất hoá đơn (tên công ty, mã số thuế, địa chỉ) qua kênh liên hệ. Chúng tôi sẽ xuất hoá đơn theo quy định.</>
    ),
  },
];

export default function PaymentGuide() {
  return (
    <div className="min-h-screen bg-bg-custom text-neutral-main font-sans antialiased">
      {/* Soft brand aura background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            'radial-gradient(1200px 520px at 82% -12%, rgba(16,185,129,0.14), transparent 60%), radial-gradient(900px 480px at 0% 8%, rgba(52,211,153,0.16), transparent 55%)',
        }}
      />

      {/* ══════ Header công khai ══════ */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border-custom bg-white-custom/80 px-5 backdrop-blur-md backdrop-saturate-150">
        <Link to="/" className="soli-lift-sm inline-flex items-center" aria-label="Về trang chủ SOLI AI">
          <img src="/logo.png" alt="SOLI AI" className="h-9 w-auto object-contain" />
        </Link>
        <span className="flex-1" />
        <Link
          to="/"
          className="soli-lift-sm inline-flex items-center gap-2 rounded-xl border border-border-custom bg-white-custom px-4 py-2 text-sm font-bold text-secondary-teal transition-colors hover:border-secondary-teal"
        >
          <ArrowLeft size={16} strokeWidth={2.4} />
          Quay lại trang chủ
        </Link>
      </header>

      <div className="mx-auto w-full max-w-[880px] px-5 pb-14 pt-10">
        {/* ══════ Tiêu đề ══════ */}
        <div className="mb-8 text-center">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-secondary-teal/30 bg-primary-light px-3 py-1 text-[12px] font-extrabold uppercase tracking-[0.05em] text-secondary-teal">
            <CreditCard size={13} strokeWidth={2.2} />
            Hướng dẫn thanh toán
          </span>
          <h1 className="mx-auto mb-2 font-display text-[30px] font-extrabold leading-[40px] tracking-[-0.01em] text-neutral-main md:text-[32px]">
            Hoàn tất thanh toán để kích hoạt gói
          </h1>
          <p className="mx-auto max-w-[620px] text-[15px] leading-relaxed text-neutral-sub">
            Chỉ mất 2 phút. Chuyển khoản theo thông tin bên dưới, ghi đúng nội dung chuyển khoản, rồi báo cho chúng tôi để đối soát và kích hoạt tài khoản nhanh nhất.
          </p>
        </div>

        {/* ══════ ① Các bước ══════ */}
        <Panel>
          <div className="p-6">
            <SectionTitle num="i">3 bước thanh toán</SectionTitle>
            <div className="grid gap-4">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="flex items-start gap-4">
                    <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-primary-light text-secondary-teal">
                      <Icon size={22} strokeWidth={2} />
                    </span>
                    <div>
                      <h3 className="mb-0.5 text-[15px] font-extrabold text-neutral-main">{s.title}</h3>
                      <p className="text-[14px] leading-[21px] text-neutral-sub">{s.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Panel>

        {/* ══════ ② Thông tin chuyển khoản ══════ */}
        <Panel>
          {/* strip */}
          <div
            className="flex items-center gap-3 px-6 py-5 text-white-custom"
            style={{ background: 'linear-gradient(120deg, #0c6b52, #14958B 65%, #34d399)' }}
          >
            <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-white/20">
              <CreditCard size={22} strokeWidth={2} />
            </span>
            <div>
              <h2 className="font-display text-[19px] font-extrabold leading-7">Thông tin chuyển khoản</h2>
              <p className="mt-0.5 text-[13px] text-white/90">Quét mã QR để điền tự động, hoặc nhập tay thông tin bên phải.</p>
            </div>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-[260px_1fr]">
            {/* QR */}
            <div className="mx-auto w-full max-w-[260px] text-center">
              <div className="grid aspect-square place-items-center overflow-hidden rounded-2xl border border-border-custom bg-bg-custom p-3">
                {BANK_INFO.qrSrc ? (
                  <img
                    src={BANK_INFO.qrSrc}
                    alt="Mã QR chuyển khoản VPBank — CÔNG TY CỔ PHẦN CÔNG NGHỆ EVOL"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="grid place-items-center gap-2 p-4 text-neutral-sub">
                    <QrCode size={56} strokeWidth={1.4} className="opacity-50" />
                    <span className="text-[12px] leading-[17px]">
                      Ảnh QR VietQR
                      <br />
                      (thay bằng QR thật)
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-3 text-[12px] text-neutral-sub">Quét bằng app ngân hàng bất kỳ</div>
              <div className="mt-1 text-[11px] font-bold text-secondary-teal">VietQR · Napas 247</div>
            </div>

            {/* Bank info */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-3 border-b border-dashed border-border-custom py-3">
                <span className="text-[12px] font-bold uppercase tracking-[0.03em] text-neutral-sub">Ngân hàng</span>
                <span className="text-right text-[16px] font-extrabold text-neutral-main">{BANK_INFO.bankName}</span>
              </div>
              <div className="flex items-center justify-between gap-3 border-b border-dashed border-border-custom py-3">
                <span className="text-[12px] font-bold uppercase tracking-[0.03em] text-neutral-sub">Số tài khoản</span>
                <span className="flex flex-wrap items-center justify-end gap-1.5">
                  <span className="font-mono text-[16px] font-extrabold tracking-wide text-secondary-teal">{BANK_INFO.accountNo}</span>
                  <CopyButton value={BANK_INFO.accountNo} label="số tài khoản" />
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 border-b border-dashed border-border-custom py-3">
                <span className="text-[12px] font-bold uppercase tracking-[0.03em] text-neutral-sub">Chủ tài khoản</span>
                <span className="text-right text-[16px] font-extrabold text-neutral-main">{BANK_INFO.accountHolder}</span>
              </div>
              <div className="flex items-center justify-between gap-3 py-3">
                <span className="text-[12px] font-bold uppercase tracking-[0.03em] text-neutral-sub">Nội dung CK</span>
                <span className="flex flex-wrap items-center justify-end gap-1.5">
                  <span className="font-mono text-[16px] font-extrabold text-neutral-main">{BANK_INFO.memo}</span>
                  <CopyButton value={BANK_INFO.memo} label="nội dung chuyển khoản" />
                </span>
              </div>
            </div>
          </div>

          {/* CK highlight */}
          <div
            className="mx-6 mb-6 flex items-start gap-3 rounded-xl p-4"
            style={{ background: '#fbf3dd', border: '1px solid #e6b45a', color: '#7c5b09' }}
          >
            <AlertTriangle size={20} strokeWidth={2} className="mt-0.5 flex-shrink-0" />
            <div className="text-[14px] leading-[21px]">
              <b style={{ color: '#6b4e07' }}>Bắt buộc ghi đúng nội dung chuyển khoản.</b> Nhập mã tham chiếu dạng{' '}
              <span
                className="inline-block rounded-md px-2 py-0.5 font-mono font-extrabold"
                style={{ background: '#fff', border: '1px solid #e6b45a', color: '#92670A' }}
              >
                SOLIXXXXXX
              </span>{' '}
              lấy từ màn hình “Chờ xác nhận thanh toán” trong app. Thiếu mã này, việc đối soát sẽ chậm hơn.
            </div>
          </div>
        </Panel>

        {/* ══════ ③ Bảng giá (recap) ══════ */}
        <Panel>
          <div className="p-6">
            <SectionTitle num="₫">Số tiền theo gói</SectionTitle>
            <div className="grid gap-3 sm:grid-cols-3">
              {PLANS.map((p) => (
                <div
                  key={p.name}
                  className={
                    'relative rounded-xl border p-4 text-center ' +
                    (p.featured
                      ? 'border-secondary-teal bg-white-custom shadow-[0_6px_16px_-10px_rgba(13,43,34,0.3)]'
                      : 'border-border-custom bg-bg-custom')
                  }
                >
                  {p.featured && (
                    <span className="absolute -top-[10px] left-1/2 -translate-x-1/2 rounded-full bg-secondary-teal px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.04em] text-white-custom">
                      Phổ biến
                    </span>
                  )}
                  <div className="text-[13px] font-extrabold text-secondary-teal">{p.name}</div>
                  <div className="mt-1 text-[20px] font-extrabold tabular-nums text-neutral-main">
                    {p.price}
                    <small className="block text-[11px] font-medium text-neutral-sub">/ tháng</small>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-neutral-sub">
              Chuyển đúng số tiền của gói đã chọn trong app. Nếu số tiền khác gói, chúng tôi kích hoạt theo số tiền thực nhận.
            </p>
          </div>
        </Panel>

        {/* ══════ ④ Lưu ý ══════ */}
        <Panel>
          <div className="p-6">
            <SectionTitle num="!">Lưu ý quan trọng</SectionTitle>
            <div className="grid gap-3">
              {NOTES.map((n, i) => (
                <div key={i} className="flex items-start gap-3 text-[14px] leading-[21px] text-neutral-sub">
                  <span
                    className={
                      'grid h-[22px] w-[22px] flex-shrink-0 place-items-center rounded-full ' +
                      (n.kind === 'ok' ? 'bg-primary-light text-[#0B7A45]' : 'bg-[#FFE4E4] text-[#C2362F]')
                    }
                  >
                    {n.kind === 'ok' ? <Check size={13} strokeWidth={2.6} /> : <Clock size={13} strokeWidth={2} />}
                  </span>
                  <span>{n.body}</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        {/* ══════ ⑤ Đã chuyển khoản — kênh liên hệ ══════ */}
        <Panel>
          <div className="p-6">
            <SectionTitle num={<Check size={15} strokeWidth={2.6} />}>Đã chuyển khoản? Báo cho chúng tôi</SectionTitle>
            <p className="mb-4 text-[14px] leading-relaxed text-neutral-sub">
              Gửi kèm mã <b className="text-secondary-teal">SOLIXXXXXX</b> qua một trong các kênh dưới đây để đối soát nhanh hơn.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <a
                href={CONTACT.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="soli-lift flex flex-col items-center gap-1.5 rounded-xl border border-border-custom p-4 text-center text-neutral-main no-underline transition-colors hover:border-secondary-teal"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-light text-secondary-teal">
                  <MessageCircle size={20} strokeWidth={2} />
                </span>
                <span className="text-[14px] font-extrabold">Zalo OA</span>
                <span className="text-[12px] text-neutral-sub">Phản hồi nhanh nhất</span>
              </a>
              <a
                href={CONTACT.fanpage}
                target="_blank"
                rel="noopener noreferrer"
                className="soli-lift flex flex-col items-center gap-1.5 rounded-xl border border-border-custom p-4 text-center text-neutral-main no-underline transition-colors hover:border-secondary-teal"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-light text-secondary-teal">
                  <Facebook size={20} strokeWidth={2} />
                </span>
                <span className="text-[14px] font-extrabold">Fanpage</span>
                <span className="text-[12px] text-neutral-sub">facebook.com/soliai.vn</span>
              </a>
              <a
                href={BANK_INFO.hotlineTel}
                className="soli-lift flex flex-col items-center gap-1.5 rounded-xl border border-border-custom p-4 text-center text-neutral-main no-underline transition-colors hover:border-secondary-teal"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-light text-secondary-teal">
                  <Phone size={20} strokeWidth={2} />
                </span>
                <span className="text-[14px] font-extrabold">Hotline</span>
                <span className="text-[12px] text-neutral-sub">{BANK_INFO.hotline}</span>
              </a>
            </div>
          </div>
        </Panel>

        {/* ══════ ⑥ FAQ ══════ */}
        <Panel>
          <div className="p-6">
            <SectionTitle num="?">Câu hỏi thường gặp</SectionTitle>
            <div>
              {FAQS.map((f, i) => (
                <details
                  key={i}
                  className="group border-b border-border-custom last:border-b-0"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-4 text-[15px] font-bold text-neutral-main [&::-webkit-details-marker]:hidden">
                    <span>{f.q}</span>
                    <ChevronDown
                      size={18}
                      strokeWidth={2}
                      className="flex-shrink-0 text-neutral-sub transition-transform duration-200 group-open:rotate-180"
                    />
                  </summary>
                  <div className="pb-4 text-[14px] leading-[22px] text-neutral-sub">{f.a}</div>
                </details>
              ))}
            </div>
          </div>
        </Panel>
      </div>

      {/* Shared site footer (đồng bộ landing page) */}
      <Footer />
    </div>
  );
}
