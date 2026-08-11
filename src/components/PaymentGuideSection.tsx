import { useState } from 'react';

/**
 * Section "Hướng dẫn thanh toán" — nội dung được chuyển từ file
 * huong-dan-thanh-toan-standalone (2).html thành một section riêng của landing page.
 *
 * - Toàn bộ CSS được scope dưới `.spg-root` với biến `--spg-*` và class prefix `spg-`
 *   nên KHÔNG ảnh hưởng tới bất kỳ section nào khác của trang.
 * - Nút "Sao chép" hoạt động bằng React state (thay cho script querySelectorAll gốc).
 * - FAQ dùng <details>/<summary> gốc nên vẫn đóng/mở như cũ.
 * - QR dùng đúng ảnh nhúng trong file gốc (byte-identical với public/qr-vietqr.png).
 */

const ACCOUNT_NO = '18819193939';
const CK_MEMO = 'SOLIXXXXXX';

const CopyIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

export default function PaymentGuideSection() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (key: string, value: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
    setCopied(key);
    window.setTimeout(() => setCopied((c) => (c === key ? null : c)), 1600);
  };

  return (
    <section id="payment-guide" className="spg-root">
      <style>{SPG_CSS}</style>

      <div className="spg-wrap">
        {/* ══════ TIÊU ĐỀ ══════ */}
        <div className="spg-page-head">
          <span className="spg-eyebrow">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
            Hướng dẫn thanh toán
          </span>
          <h2 className="spg-h1">Hoàn tất thanh toán để kích hoạt gói</h2>
          <p>Chỉ mất 2 phút. Chuyển khoản theo thông tin bên dưới, ghi đúng nội dung chuyển khoản và báo cho SOLI khi đã thanh toán.</p>
        </div>

        {/* ══════ ① CÁC BƯỚC ══════ */}
        <div className="spg-panel">
          <div className="spg-panel-pad">
            <div className="spg-section-title">
              <span className="spg-st-num">i</span>
              <h3>3 bước thanh toán</h3>
            </div>
            <div className="spg-steps">
              <div className="spg-step">
                <span className="spg-step-ico">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                </span>
                <div>
                  <h4>Bước 1 — Chuyển khoản</h4>
                  <p>Mở app ngân hàng, quét mã QR hoặc nhập thông tin tài khoản SOLI AI bên dưới. Chuyển đúng số tiền của gói bạn đã chọn.</p>
                </div>
              </div>
              <div className="spg-step">
                <span className="spg-step-ico">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" />
                  </svg>
                </span>
                <div>
                  <h4>Bước 2 — Ghi nội dung chuyển khoản</h4>
                  <p>Nhập mã tham chiếu <code className="spg-code">SOLIXXXXXX</code> (hiển thị trên màn hình "Chờ xác nhận thanh toán" trong app) vào nội dung chuyển khoản. Mã này giúp SOLI xác nhận đúng thanh toán của bạn.</p>
                </div>
              </div>
              <div className="spg-step">
                <span className="spg-step-ico">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <path d="M22 4 12 14.01l-3-3" />
                  </svg>
                </span>
                <div>
                  <h4>Bước 3 — Báo thanh toán &amp; gửi thông tin hóa đơn</h4>
                  <p>Sau khi chuyển khoản, gửi mã <code className="spg-code">SOLIXXXXXX</code>, ảnh biên lai, tên khách hàng/công ty, địa chỉ, mã số thuế và email nhận hóa đơn qua Zalo OA hoặc email. SOLI sẽ kiểm tra và xử lý trong giờ làm việc.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════ ② THÔNG TIN CHUYỂN KHOẢN ══════ */}
        <div className="spg-panel">
          <div className="spg-pay-strip">
            <span className="spg-ps-ico">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <path d="M2 10h20M6 15h4" />
              </svg>
            </span>
            <div>
              <h3>Thông tin chuyển khoản</h3>
              <p>Quét mã QR để điền tự động, hoặc nhập thông tin tài khoản bên dưới.</p>
            </div>
          </div>

          <div className="spg-pay-grid">
            {/* QR */}
            <div className="spg-qr-box">
              <div className="spg-qr-frame">
                <img src="/qr-vietqr.png" alt="Mã QR VietQR chuyển khoản SOLI AI - VPBank" loading="lazy" decoding="async" />
              </div>
              <div className="spg-qr-hint">Quét bằng app ngân hàng bất kỳ</div>
              <div className="spg-qr-apps">VietQR · Napas 247</div>
            </div>

            {/* Thông tin ngân hàng */}
            <div className="spg-bank-list">
              <div className="spg-bank-row">
                <span className="spg-br-label">Ngân hàng</span>
                <span className="spg-br-value">VPBank</span>
              </div>
              <div className="spg-bank-row">
                <span className="spg-br-label">Số tài khoản</span>
                <span className="spg-br-value-wrap">
                  <span className="spg-br-value spg-mono spg-accent">{ACCOUNT_NO}</span>
                  <button className="spg-copy-btn" type="button" onClick={() => handleCopy('acctNo', ACCOUNT_NO)}>
                    {copied === 'acctNo' ? 'Đã sao chép ✓' : (<><CopyIcon />Sao chép</>)}
                  </button>
                </span>
              </div>
              <div className="spg-bank-row">
                <span className="spg-br-label">Chủ tài khoản</span>
                <span className="spg-br-value">CÔNG TY CỔ PHẦN CÔNG NGHỆ EVOL</span>
              </div>
              <div className="spg-bank-row">
                <span className="spg-br-label">Nội dung CK</span>
                <span className="spg-br-value-wrap">
                  <span className="spg-br-value spg-mono">{CK_MEMO}</span>
                  <button className="spg-copy-btn" type="button" onClick={() => handleCopy('ckMemo', CK_MEMO)}>
                    {copied === 'ckMemo' ? 'Đã sao chép ✓' : (<><CopyIcon />Sao chép</>)}
                  </button>
                </span>
              </div>
            </div>
          </div>

          {/* Nhấn nội dung CK */}
          <div className="spg-ck-highlight">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 9v4M12 17h.01M10.29 3.86l-8.18 14.14A2 2 0 0 0 3.82 21h16.36a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            </svg>
            <div>
              <b>Đừng quên ghi mã chuyển khoản.</b><br />
              Nhập mã <span className="spg-ck-sample">SOLIXXXXXX</span> lấy từ màn hình "Chờ xác nhận thanh toán" trong app vào nội dung chuyển khoản. Mã này giúp SOLI xác nhận thanh toán nhanh và chính xác hơn.
            </div>
          </div>
        </div>

        {/* ══════ ③ BẢNG GIÁ (recap) ══════ */}
        <div className="spg-panel">
          <div className="spg-panel-pad">
            <div className="spg-section-title">
              <span className="spg-st-num">₫</span>
              <h3>Số tiền theo gói</h3>
            </div>
            <div className="spg-plan-recap">
              <div className="spg-plan-cell">
                <div className="spg-pc-name">Khởi Động</div>
                <div className="spg-pc-price">249.000đ<small>/ tháng</small></div>
              </div>
              <div className="spg-plan-cell">
                <div className="spg-pc-name">Tăng Trưởng</div>
                <div className="spg-pc-price">990.000đ<small>/ tháng</small></div>
              </div>
              <div className="spg-plan-cell spg-featured">
                <div className="spg-pc-name">Chuyên Nghiệp</div>
                <div className="spg-pc-price">1.390.000đ<small>/ tháng</small></div>
              </div>
            </div>
            <p className="spg-vat-note">Tất cả mức giá trên đã bao gồm VAT.</p>
            <p className="spg-t-sm spg-text-muted spg-mt2">Hãy đảm bảo chuyển đúng số tiền theo gói bạn đã chọn. Trong trường hợp có sai sót, vui lòng liên hệ SOLI để được hỗ trợ thêm.</p>
          </div>
        </div>

        {/* ══════ ④ LƯU Ý ══════ */}
        <div className="spg-panel">
          <div className="spg-panel-pad">
            <div className="spg-section-title">
              <span className="spg-st-num">!</span>
              <h3>Lưu ý trước khi chuyển khoản</h3>
            </div>
            <div className="spg-note-list">
              <div className="spg-note-item spg-ok">
                <span className="spg-ni-ico"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M20 6 9 17l-5-5" /></svg></span>
                <span><b>Ghi đúng nội dung chuyển khoản</b> (mã <code className="spg-code">SOLIXXXXXX</code>) để SOLI dễ dàng xác nhận thanh toán.</span>
              </div>
              <div className="spg-note-item spg-ok">
                <span className="spg-ni-ico"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M20 6 9 17l-5-5" /></svg></span>
                <span><b>Chuyển đúng số tiền</b> của gói bạn đã chọn. Nếu chuyển thiếu hoặc thừa, thời gian xử lý có thể lâu hơn.</span>
              </div>
              <div className="spg-note-item spg-ok">
                <span className="spg-ni-ico"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M20 6 9 17l-5-5" /></svg></span>
                <span><b>Giữ lại biên lai/ảnh chụp</b> giao dịch để gửi cho SOLI khi báo đã chuyển khoản.</span>
              </div>
              <div className="spg-note-item spg-warn">
                <span className="spg-ni-ico"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg></span>
                <span><b>Thời gian xác nhận:</b> Trong giờ làm việc (T2–T7, 8h30–18h). Nếu chuyển ngoài giờ, SOLI sẽ kiểm tra vào đầu buổi làm việc tiếp theo.</span>
              </div>
              <div className="spg-note-item spg-warn">
                <span className="spg-ni-ico"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" /></svg></span>
                <span><b>Chưa cần thanh toán ngay?</b> Bạn có thể quay lại trang này bất cứ lúc nào để hoàn tất thanh toán.</span>
              </div>
            </div>
          </div>
        </div>

        {/* ══════ ⑤ ĐÃ CHUYỂN KHOẢN — KÊNH LIÊN HỆ ══════ */}
        <div className="spg-panel">
          <div className="spg-panel-pad">
            <div className="spg-section-title">
              <span className="spg-st-num">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M20 6 9 17l-5-5" /></svg>
              </span>
              <h3>Đã chuyển khoản? Gửi thông tin cho SOLI</h3>
            </div>
            <p className="spg-t-sm spg-text-muted spg-mb4">Gửi mã <b className="spg-accent-b">SOLIXXXXXX</b>, ảnh biên lai và thông tin xuất hóa đơn qua một trong các kênh dưới đây. SOLI sẽ kiểm tra và xử lý trong giờ làm việc.</p>
            <div className="spg-invoice-note"><b>Thông tin xuất hóa đơn:</b> Tên khách hàng/công ty · Địa chỉ · Mã số thuế · Email nhận hóa đơn</div>
            <div className="spg-contact-grid">
              <a className="spg-contact-card" href="https://zalo.me/1132204857628413550" target="_blank" rel="noopener">
                <span className="spg-cc-ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg></span>
                <span className="spg-cc-title">Zalo OA</span>
                <span className="spg-cc-sub">Phản hồi nhanh nhất</span>
              </a>
              <a className="spg-contact-card" href="mailto:hotro@soliai.vn">
                <span className="spg-cc-ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 5L2 7" /></svg></span>
                <span className="spg-cc-title">Email</span>
                <span className="spg-cc-sub">hotro@soliai.vn</span>
              </a>
            </div>
          </div>
        </div>

        {/* ══════ ⑥ FAQ ══════ */}
        <div className="spg-panel">
          <div className="spg-panel-pad">
            <div className="spg-section-title">
              <span className="spg-st-num">?</span>
              <h3>Câu hỏi thường gặp</h3>
            </div>
            <details className="spg-faq-item">
              <summary><span>Tôi tìm mã <code className="spg-code">SOLIXXXXXX</code> ở đâu?</span><svg className="spg-chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg></summary>
              <div className="spg-faq-body">Mã tham chiếu hiển thị trên màn hình <b>"Chờ xác nhận thanh toán"</b> trong app, ngay sau khi bạn chọn gói trả phí lúc đăng ký. Bạn có thể bấm "Sao chép" ở màn đó rồi dán vào nội dung chuyển khoản.</div>
            </details>
            <details className="spg-faq-item">
              <summary><span>Bao lâu thì tài khoản được kích hoạt?</span><svg className="spg-chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg></summary>
              <div className="spg-faq-body">Trong giờ làm việc, SOLI thường xác nhận và kích hoạt trong vòng vài giờ sau khi nhận được chuyển khoản. Nếu thanh toán ngoài giờ, SOLI sẽ kiểm tra vào đầu buổi làm việc tiếp theo.</div>
            </details>
            <details className="spg-faq-item">
              <summary><span>Tôi lỡ quên ghi nội dung chuyển khoản thì sao?</span><svg className="spg-chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg></summary>
              <div className="spg-faq-body">Không sao — bạn chỉ cần nhắn cho SOLI qua Zalo OA hoặc email, kèm <b>ảnh biên lai</b> và <b>số điện thoại/email đăng ký</b>. SOLI sẽ kiểm tra và hỗ trợ bạn.</div>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   CSS scoped cho riêng section này — mọi selector nằm dưới `.spg-root`,
   biến dùng prefix `--spg-`, class dùng prefix `spg-`. Không rò rỉ ra ngoài.
   ========================================================================== */
const SPG_CSS = `
.spg-root{
  --spg-primary:#2CF589;
  --spg-primary-tint:#D6FCE7;
  --spg-secondary:#0F766E;
  --spg-secondary-soft:#5EEAD4;
  --spg-accent-sand:#FDE68A;
  --spg-text:#0F172A;
  --spg-text-muted:#475569;
  --spg-border:#E2E8F0;
  --spg-bg:#F8FAFC;
  --spg-white:#FFFFFF;
  --spg-s1:4px; --spg-s2:8px; --spg-s3:12px; --spg-s4:16px;
  --spg-s5:24px; --spg-s6:32px; --spg-s8:48px;
  --spg-r-sm:6px; --spg-r-md:10px; --spg-r-lg:16px; --spg-r-full:9999px;
  --spg-shadow-sm:0 1px 2px rgba(15,23,42,.06);
  --spg-shadow-md:0 4px 12px rgba(15,23,42,.10);
  --spg-focus:0 0 0 3px var(--spg-primary-tint);

  position:relative;
  padding: clamp(64px,8vw,110px) clamp(24px,5vw,80px);
  background: radial-gradient(130% 120% at 12% 0%, #f4fbf7 0%, #e7f4ec 42%, #dcefe4 100%);
  color: var(--spg-text);
  font-family: 'Zalando Sans','Inter',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;
  font-size:15px; line-height:24px;
  scroll-margin-top:100px;
  -webkit-font-smoothing:antialiased;
}
.spg-root *,.spg-root *::before,.spg-root *::after{ box-sizing:border-box; }

.spg-wrap{ max-width:880px; margin:0 auto; }

.spg-t-sm{ font-size:13px; line-height:22px; font-weight:400; }
.spg-text-muted{ color:var(--spg-text-muted); }
.spg-mt2{ margin:var(--spg-s2) 0 0; }
.spg-mb4{ margin:0 0 var(--spg-s4); }
.spg-code{ font-family:'JetBrains Mono',ui-monospace,'SF Mono',Consolas,monospace; font-weight:700; color:var(--spg-secondary); background:var(--spg-secondary-soft); padding:1px 6px; border-radius:5px; }
.spg-accent-b{ color:var(--spg-secondary); }

.spg-page-head{ text-align:center; margin-bottom:var(--spg-s6); }
.spg-page-head .spg-eyebrow{
  display:inline-flex; align-items:center; gap:6px;
  font-size:12px; font-weight:800; letter-spacing:.05em; text-transform:uppercase;
  color:var(--spg-secondary); background:var(--spg-secondary-soft);
  border:1px solid rgba(15,118,110,.3); border-radius:var(--spg-r-full);
  padding:4px var(--spg-s3); margin-bottom:var(--spg-s3);
}
.spg-page-head .spg-h1{ font-size:30px; line-height:40px; font-weight:800; margin:0 0 var(--spg-s2); letter-spacing:-.01em; text-wrap:balance; color:var(--spg-text); }
.spg-page-head p{ color:var(--spg-text-muted); font-size:15px; max-width:620px; margin:0 auto; }

.spg-panel{
  background:var(--spg-white); border:1px solid var(--spg-border);
  border-radius:var(--spg-r-lg); box-shadow:var(--spg-shadow-md);
  overflow:hidden; margin-bottom:var(--spg-s5);
}
.spg-panel-pad{ padding:var(--spg-s6); }
.spg-section-title{ display:flex; align-items:center; gap:var(--spg-s3); margin:0 0 var(--spg-s4); }
.spg-section-title .spg-st-num{
  width:30px; height:30px; border-radius:var(--spg-r-full); flex-shrink:0;
  background:var(--spg-primary); color:var(--spg-text);
  display:grid; place-items:center; font-size:14px; font-weight:800;
}
.spg-section-title h3{ font-size:19px; line-height:26px; font-weight:800; margin:0; color:var(--spg-text); }

.spg-steps{ display:grid; gap:var(--spg-s4); }
.spg-step{ display:flex; gap:var(--spg-s4); align-items:flex-start; }
.spg-step .spg-step-ico{
  width:44px; height:44px; border-radius:var(--spg-r-md); flex-shrink:0;
  background:var(--spg-primary-tint); color:var(--spg-secondary);
  display:grid; place-items:center;
}
.spg-step h4{ font-size:15px; font-weight:800; margin:0 0 2px; color:var(--spg-text); }
.spg-step p{ font-size:14px; line-height:21px; color:var(--spg-text-muted); margin:0; }

.spg-pay-strip{
  display:flex; align-items:center; gap:var(--spg-s3);
  padding:var(--spg-s5) var(--spg-s6); color:#fff;
  background:linear-gradient(120deg,#0F766E,#14958B 65%,#1FBFA9);
}
.spg-pay-strip .spg-ps-ico{ width:44px; height:44px; border-radius:12px; background:rgba(255,255,255,.2); display:grid; place-items:center; flex-shrink:0; }
.spg-pay-strip h3{ font-size:19px; line-height:26px; font-weight:800; margin:0; color:#fff; }
.spg-pay-strip p{ margin:2px 0 0; font-size:13px; color:rgba(255,255,255,.92); }

.spg-pay-grid{ display:grid; grid-template-columns:260px 1fr; gap:var(--spg-s6); padding:var(--spg-s6); }

.spg-qr-box{ text-align:center; }
.spg-qr-frame{
  width:100%; aspect-ratio:1; border-radius:var(--spg-r-lg);
  border:1px solid var(--spg-border); background:var(--spg-bg);
  display:grid; place-items:center; overflow:hidden; padding:var(--spg-s3);
}
.spg-qr-frame img{ width:100%; height:100%; object-fit:contain; }
.spg-qr-box .spg-qr-hint{ font-size:12px; color:var(--spg-text-muted); margin-top:var(--spg-s3); }
.spg-qr-box .spg-qr-apps{ display:flex; align-items:center; justify-content:center; gap:6px; flex-wrap:wrap; margin-top:4px; font-size:11px; font-weight:700; color:var(--spg-secondary); }

.spg-bank-list{ display:flex; flex-direction:column; }
.spg-bank-row{ display:flex; align-items:center; justify-content:space-between; gap:var(--spg-s3); padding:var(--spg-s3) 0; border-bottom:1px dashed var(--spg-border); }
.spg-bank-row:last-child{ border-bottom:0; }
.spg-bank-row .spg-br-label{ font-size:12px; font-weight:700; color:var(--spg-text-muted); text-transform:uppercase; letter-spacing:.03em; }
.spg-bank-row .spg-br-value{ font-size:16px; font-weight:800; text-align:right; color:var(--spg-text); }
.spg-bank-row .spg-br-value.spg-mono{ font-family:'JetBrains Mono',ui-monospace,'SF Mono',Consolas,monospace; letter-spacing:.02em; font-variant-numeric:tabular-nums; }
.spg-bank-row .spg-br-value.spg-accent{ color:var(--spg-secondary); }
.spg-copy-btn{
  display:inline-flex; align-items:center; gap:5px; margin-left:var(--spg-s2);
  font-size:11px; font-weight:700; color:var(--spg-text-muted);
  background:none; border:1px solid var(--spg-border); border-radius:var(--spg-r-sm);
  padding:3px 8px; cursor:pointer; vertical-align:middle;
  font-family:inherit; transition:border-color .12s,color .12s;
}
.spg-copy-btn:hover{ border-color:var(--spg-secondary); color:var(--spg-secondary); }
.spg-copy-btn:focus-visible{ outline:none; box-shadow:var(--spg-focus); }
.spg-br-value-wrap{ display:inline-flex; align-items:center; gap:4px; flex-wrap:wrap; justify-content:flex-end; }

.spg-ck-highlight{
  display:flex; gap:var(--spg-s3); align-items:flex-start;
  background:var(--spg-accent-sand); border:1px solid #E2B83C; color:#7c5b09;
  border-radius:var(--spg-r-md); padding:var(--spg-s4); margin:0 var(--spg-s6) var(--spg-s6);
}
.spg-ck-highlight svg{ flex-shrink:0; margin-top:2px; }
.spg-ck-highlight b{ color:#6b4e07; }
.spg-ck-highlight .spg-ck-sample{
  display:inline-block; font-family:'JetBrains Mono',ui-monospace,'SF Mono',Consolas,monospace;
  font-weight:800; background:#fff; border:1px solid #E2B83C; border-radius:6px;
  padding:1px 8px; color:#92670A;
}

.spg-plan-recap{ display:grid; grid-template-columns:repeat(3,1fr); gap:var(--spg-s3); }
.spg-plan-cell{ border:1px solid var(--spg-border); border-radius:var(--spg-r-md); padding:var(--spg-s4); text-align:center; background:var(--spg-bg); }
.spg-plan-cell.spg-featured{ border-color:var(--spg-secondary); background:var(--spg-white); box-shadow:var(--spg-shadow-sm); position:relative; }
.spg-plan-cell.spg-featured::after{ content:"Phổ biến"; position:absolute; top:-10px; left:50%; transform:translateX(-50%); font-size:10px; font-weight:800; letter-spacing:.04em; text-transform:uppercase; background:var(--spg-secondary); color:#fff; padding:2px 10px; border-radius:var(--spg-r-full); }
.spg-plan-cell .spg-pc-name{ font-size:13px; font-weight:800; color:var(--spg-secondary); }
.spg-plan-cell .spg-pc-price{ font-size:20px; font-weight:800; margin-top:4px; font-variant-numeric:tabular-nums; color:var(--spg-text); }
.spg-plan-cell .spg-pc-price small{ display:block; font-size:11px; font-weight:500; color:var(--spg-text-muted); }
.spg-vat-note{ margin:var(--spg-s4) 0 0; font-size:15px; font-weight:700; color:var(--spg-secondary); }

.spg-note-list{ display:grid; gap:var(--spg-s3); }
.spg-note-item{ display:flex; gap:var(--spg-s3); align-items:flex-start; font-size:14px; line-height:21px; }
.spg-note-item .spg-ni-ico{ width:22px; height:22px; border-radius:var(--spg-r-full); flex-shrink:0; display:grid; place-items:center; }
.spg-note-item.spg-ok .spg-ni-ico{ background:var(--spg-primary-tint); color:#0B7A45; }
.spg-note-item.spg-warn .spg-ni-ico{ background:#FFE4E4; color:#C2362F; }
.spg-note-item b{ color:var(--spg-text); }

.spg-contact-grid{ display:grid; grid-template-columns:repeat(2,1fr); gap:var(--spg-s3); }
.spg-contact-card{
  display:flex; flex-direction:column; align-items:center; gap:6px; text-align:center;
  border:1px solid var(--spg-border); border-radius:var(--spg-r-md);
  padding:var(--spg-s4) var(--spg-s3); text-decoration:none; color:var(--spg-text);
  transition:border-color .12s,box-shadow .12s,transform .12s;
}
.spg-contact-card:hover{ border-color:var(--spg-secondary); box-shadow:var(--spg-shadow-sm); transform:translateY(-2px); }
.spg-contact-card:focus-visible{ outline:none; box-shadow:var(--spg-focus); }
.spg-contact-card .spg-cc-ico{ width:40px; height:40px; border-radius:var(--spg-r-md); background:var(--spg-secondary-soft); color:var(--spg-secondary); display:grid; place-items:center; }
.spg-contact-card .spg-cc-title{ font-size:14px; font-weight:800; }
.spg-contact-card .spg-cc-sub{ font-size:12px; color:var(--spg-text-muted); }
.spg-invoice-note{ margin:0 0 var(--spg-s4); padding:var(--spg-s3) var(--spg-s4); background:var(--spg-primary-tint); border:1px solid rgba(15,118,110,.2); border-radius:var(--spg-r-md); font-size:13px; line-height:20px; color:var(--spg-text); }
.spg-invoice-note b{ color:var(--spg-secondary); }

.spg-faq-item{ border-bottom:1px solid var(--spg-border); }
.spg-faq-item:last-child{ border-bottom:0; }
.spg-faq-item summary{ cursor:pointer; list-style:none; display:flex; align-items:center; justify-content:space-between; gap:var(--spg-s3); padding:var(--spg-s4) 0; font-size:15px; font-weight:700; color:var(--spg-text); }
.spg-faq-item summary::-webkit-details-marker{ display:none; }
.spg-faq-item summary:focus-visible{ outline:none; box-shadow:var(--spg-focus); border-radius:var(--spg-r-sm); }
.spg-faq-item summary .spg-chev{ transition:transform .18s; color:var(--spg-text-muted); flex-shrink:0; }
.spg-faq-item[open] summary .spg-chev{ transform:rotate(180deg); }
.spg-faq-item .spg-faq-body{ padding:0 0 var(--spg-s4); font-size:14px; line-height:22px; color:var(--spg-text-muted); }
.spg-faq-item .spg-faq-body b{ color:var(--spg-text); }

@media (prefers-reduced-motion: reduce){
  .spg-contact-card{ transition:none; }
  .spg-contact-card:hover{ transform:none; }
}

@media (max-width:720px){
  .spg-page-head .spg-h1{ font-size:26px; line-height:34px; }
  .spg-pay-grid{ grid-template-columns:1fr; }
  .spg-qr-box{ max-width:260px; margin:0 auto; }
  .spg-plan-recap{ grid-template-columns:1fr; }
  .spg-contact-grid{ grid-template-columns:1fr; }
  .spg-ck-highlight{ margin:0 var(--spg-s5) var(--spg-s5); }
  .spg-pay-grid,.spg-panel-pad{ padding:var(--spg-s5); }
}
`;
