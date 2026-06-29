import React, { useState } from 'react';
import { Mail, Phone, User, Store, ArrowRight, Download, CheckCircle2, FileText, Sparkles, Check } from 'lucide-react';

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyrq8QYXkXZ6UzgdPnDa0lTlJhE6TcHZF4xY-egUMabcHKXk-aX1ZLm4Zhbi1Vi_ukxGg/exec";
const DOWNLOAD_URL = "https://drive.google.com/uc?export=download&id=1Os6dZOPr5DBLdb_FWfsamlm11902VsFB";

interface CTASectionProps {
  onLeadCreate: (name: string, phone: string, bizName: string, branches: '1' | '2-3' | 'over-3', source: 'demo_form' | 'resource_download', email?: string) => Promise<{ success: boolean; message?: string }>;
  formRef: React.RefObject<HTMLDivElement | null>;
}

export default function CTASection({ onLeadCreate, formRef }: CTASectionProps) {
  // Card 1 state: Download resource
  const [downloadEmail, setDownloadEmail] = useState('');
  const [downloadPhone, setDownloadPhone] = useState('');
  const [downloadSubmitted, setDownloadSubmitted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Validation errors
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Card 2 state: Registration Form
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [bizName, setBizName] = useState('');
  const [branches, setBranches] = useState<'1' | '2-3' | 'over-3'>('1');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle resource download submit
  const handleDownloadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let hasError = false;
    setEmailError('');
    setPhoneError('');

    const emailTrimmed = downloadEmail.trim();
    const phoneTrimmed = downloadPhone.trim();

    // Validate email is not empty
    if (!emailTrimmed) {
      setEmailError('Email không được để trống.');
      hasError = true;
    } else {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailTrimmed)) {
        setEmailError('Email không đúng định dạng.');
        hasError = true;
      }
    }

    // Validate phone is not empty
    if (!phoneTrimmed) {
      setPhoneError('Số điện thoại không được để trống.');
      hasError = true;
    }

    if (hasError) return;

    setIsDownloading(true);
    
    const timestamp = new Date().toISOString();
    const payload = {
      email: emailTrimmed,
      phone: phoneTrimmed,
      createdAt: timestamp,
      source: "Landing Page SOLI AI"
    };

    try {
      console.log("Sending download lead to Google Apps Script:", SCRIPT_URL);
      
      // Post to Google Apps Script via fetch (using text/plain content-type to avoid CORS preflight OPTIONS blocking)
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const text = await response.text();
        let success = false;
        try {
          const data = JSON.parse(text);
          if (data.status === "success") {
            success = true;
          }
        } catch (e) {
          // Fallback parsing in case response contains exact string or layout matches
          if (text.includes('"status":"success"') || text.includes('"status": "success"')) {
            success = true;
          }
        }

        if (success) {
          setDownloadSubmitted(true);
          // Automatically open the PDF file in a new tab or start downloading
          window.open(DOWNLOAD_URL, '_blank');
          
          // Reset form input fields
          setDownloadEmail('');
          setDownloadPhone('');
        } else {
          alert("Có lỗi xảy ra. Vui lòng thử lại.");
        }
      } else {
        alert("Có lỗi xảy ra. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Failed to submit lead to Google Sheets:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsDownloading(false);
    }
  };

  // Handle consultation submit
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !bizName) return;

    onLeadCreate(
      fullName,
      phone,
      bizName,
      branches,
      'demo_form'
    );
    setFormSubmitted(true);
  };

  const handleDownloadBook = () => {
    window.open(DOWNLOAD_URL, '_blank');
  };

  return (
    <section id="materials" ref={formRef} className="py-20 md:py-24 bg-bg-custom border-b border-border-custom relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 gradient-hero-mask pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-primary/3 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4 mb-16 animate-fade-in">
          <span className="text-accent-coral font-mono text-xs font-semibold tracking-wider uppercase bg-accent-coral/10 border border-accent-coral/20 rounded-full px-3 py-1 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-accent-coral" /> SẴN SÀNG CHUYỂN ĐỔI
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-neutral-main tracking-tight leading-tight">
            Tối Ưu Tiếp Đón Khách Hàng - <span className="text-secondary-teal">Gia Tăng Doanh Thu Của Bạn!</span>
          </h2>
          <p className="text-neutral-sub text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-light">
            Không còn nỗi lo bỏ lỡ khách hàng hay phản hồi trì trệ. Hãy lựa chọn giải pháp phù hợp nhất với cửa hàng của bạn ngay hôm nay:
          </p>
        </div>

        {/* 2 Grid Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: Download Handbook Playbook */}
          <div className="lg:col-span-12 xl:col-span-5 bg-white border border-border-custom rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm">
            
            <div className="space-y-6">
              
              <div className="bg-bg-custom rounded-2xl p-4 flex items-center justify-between border border-border-custom">
                <div className="space-y-1">
                  <span className="bg-primary-light text-secondary-teal border border-primary/25 font-mono text-[9px] px-2 py-0.5 rounded font-extrabold uppercase">
                    Free Playbook
                  </span>
                  <h3 className="font-display font-bold text-sm text-neutral-main mt-1">
                    Cẩm Nang Vận Hành Tự Động
                  </h3>
                </div>
                <div className="w-12 h-14 bg-bg-custom text-secondary-teal rounded-lg shadow-xs flex items-center justify-center font-display font-extrabold text-[10px] uppercase tracking-tighter border-t-2 border-secondary-teal relative shrink-0">
                  <FileText className="w-6 h-6 text-secondary-teal absolute bottom-1 right-1 opacity-10" />
                  <span className="text-neutral-main">AI</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-extrabold text-base text-neutral-main leading-snug">
                  Tải Tài Liệu "Ứng Dụng AI Cho Ngành Spa: "Cánh Tay Phải" Đắc Lực Giúp Chuỗi Dịch Vụ Bứt Phá Doanh Thu"
                </h4>
                <p className="text-xs text-neutral-sub leading-relaxed font-light">
                  Bộ tài liệu giúp bạn khai thác AI tự động hóa vận hành, tối ưu chăm sóc khách hàng, nâng cao hiệu quả kinh doanh và tạo nền tảng tăng trưởng doanh thu bền vững.
                </p>
              </div>

            </div>

            {/* Form & Actions container */}
            <div className="mt-8 pt-6 border-t border-border-custom">
              {downloadSubmitted ? (
                <div className="bg-primary-light text-secondary-teal p-5 rounded-2xl border border-primary/25 text-center space-y-3 animate-fade-in text-xs">
                  <CheckCircle2 className="w-8 h-8 text-secondary-teal mx-auto" />
                  <div>
                    <h5 className="font-bold uppercase font-sans text-neutral-main text-xs">Cảm ơn bạn đã đăng ký. Tài liệu đang được mở.</h5>
                    <p className="text-[11px] text-neutral-sub leading-relaxed mt-1">
                      Hệ thống đang tự động tải cẩm nang về thiết bị của bạn. Nếu quá trình tải không tự động kích hoạt, vui lòng nhấn nút bên dưới để tải trực tiếp:
                    </p>
                  </div>
                  <button
                    onClick={handleDownloadBook}
                    className="w-full bg-secondary-teal hover:bg-secondary-teal/90 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-4 h-4 text-white" /> [ TẢI TÀI LIỆU MIỄN PHÍ ]
                  </button>
                  <div className="flex flex-col items-center gap-1">
                    <p className="text-[9px] text-slate-400 font-mono">
                      * Định dạng file: PDF. Kiểm tra mục Tải xuống sau khi chọn tải.
                    </p>
                    <button
                      onClick={() => setDownloadSubmitted(false)}
                      className="text-[10px] text-secondary-teal hover:underline font-mono font-bold mt-1 cursor-pointer"
                    >
                      [ Nhập lại thông tin khác ]
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleDownloadSubmit} className="space-y-4">
                  <p className="text-[10px] text-slate-400 font-mono font-medium">
                    * Cung cấp SĐT & Email để hệ thống mở khóa link tải:
                  </p>
                  
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Email nhận các cẩm nang vận hành mới"
                          value={downloadEmail}
                          onChange={(e) => {
                            setDownloadEmail(e.target.value);
                            if (emailError) setEmailError('');
                          }}
                          className={`w-full pl-9 pr-3 py-3 text-xs bg-white border ${emailError ? 'border-red-500 focus:ring-red-500' : 'border-border-custom focus:ring-primary'} rounded-xl focus:outline-none focus:ring-1 text-neutral-main`}
                        />
                      </div>
                      {emailError && <p className="text-[10px] text-red-500 ml-1 text-left font-sans">{emailError}</p>}
                    </div>

                    <div className="space-y-1">
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="tel"
                          placeholder="Số điện thoại nhận thông báo Zalo"
                          value={downloadPhone}
                          onChange={(e) => {
                            setDownloadPhone(e.target.value);
                            if (phoneError) setPhoneError('');
                          }}
                          className={`w-full pl-9 pr-3 py-3 text-xs bg-white border ${phoneError ? 'border-red-500 focus:ring-red-500' : 'border-border-custom focus:ring-primary'} rounded-xl focus:outline-none focus:ring-1 text-neutral-main`}
                        />
                      </div>
                      {phoneError && <p className="text-[10px] text-red-500 ml-1 text-left font-sans">{phoneError}</p>}
                    </div>
                  </div>

                  <button
                    id="download-cta"
                    type="submit"
                    disabled={isDownloading}
                    className="w-full bg-secondary-teal hover:bg-secondary-teal/90 disabled:bg-secondary-teal/60 text-white font-display font-semibold text-xs py-3.5 px-4 rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isDownloading ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Đang xử lý...
                      </>
                    ) : '[ TẢI TÀI LIỆU MIỄN PHÍ ]'}
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Card 2: DEMO CONSULTATION FORM */}
          <div className="lg:col-span-12 xl:col-span-7 bg-white text-neutral-main border border-border-custom rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden glow-emerald">
            
            <div className="absolute top-[10%] right-[-10%] w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-4">
              <span className="text-secondary-teal font-mono text-[10px] font-bold uppercase tracking-wider">
                ✍️ FORM ĐĂNG KÝ TRẢI NGHIỆM DEMO
              </span>
              <h3 className="font-display font-black text-lg md:text-xl text-neutral-main uppercase">
                ĐĂNG KÝ TRẢI NGHIỆM SOLI AI MIỄN PHÍ
              </h3>
              <div className="text-xs text-neutral-sub leading-relaxed font-light space-y-2">
                <p>
                  Mỗi khách hàng nhắn tin đều là một cơ hội doanh thu. Hãy trải nghiệm cách SOLI AI giúp tiếp đón khách tức thì, tăng tỷ lệ đặt lịch và giảm thất thoát booking do phản hồi chậm.
                </p>
                <p>
                  Để lại thông tin liên hệ, đội ngũ SOLI AI sẽ liên hệ tư vấn và thiết lập SOLI AI phù hợp với nhu cầu thực tế của tiệm.
                </p>
              </div>
            </div>

            {/* Core Registration Form */}
            <div className="mt-6 pt-5 border-t border-border-custom flex-1">
              {formSubmitted ? (
                <div className="h-full bg-primary-light border border-primary/25 rounded-2xl p-6 text-center flex flex-col items-center justify-center space-y-4 animate-fade-in">
                  <div className="w-14 h-14 rounded-full bg-primary-light border border-primary/25 flex items-center justify-center text-secondary-teal">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-base text-secondary-teal">
                      Gửi Bản Đăng Ký Thành Công!
                    </h4>
                    <p className="text-xs text-neutral-sub leading-relaxed max-w-md">
                      Thông tin tiệm <strong className="text-neutral-main">{bizName}</strong> quy mô {branches === '1' ? '1 cơ sở' : branches === '2-3' ? '2-3 cơ sở' : 'trên 3 cơ sở'} đã được tiếp nhận bền vững.
                    </p>
                  </div>
                  <div className="p-4 bg-bg-custom rounded-xl border border-border-custom text-[11px] text-neutral-sub text-left w-full max-w-sm font-mono space-y-1.5">
                    <p className="text-neutral-main font-bold uppercase text-[10px] border-b border-border-custom pb-1 mb-1.5 font-sans">📞 CÁC BƯỚC TIẾP THEO:</p>
                    <p className="flex items-start gap-1">
                      <span className="text-secondary-teal font-bold shrink-0">1.</span>
                      <span>Chuyên viên kỹ thuật liên hệ theo số điện thoại <strong className="text-neutral-main">{phone}</strong>.</span>
                    </p>
                    <p className="flex items-start gap-1">
                      <span className="text-secondary-teal font-bold shrink-0">2.</span>
                      <span>Đo lường quy mô và cung cấp bản tài khoản thử nghiệm AI miễn phí.</span>
                    </p>
                  </div>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="text-xs text-secondary-teal hover:text-primary-dark underline font-semibold cursor-pointer"
                  >
                    Đăng ký cho chuỗi cơ sở khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Input name */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono font-medium text-neutral-sub">Tên người đại diện liên hệ *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          placeholder="Họ tên của bạn"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-border-custom rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-neutral-main"
                        />
                      </div>
                    </div>

                    {/* Input phone */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono font-medium text-neutral-sub">Số điện thoại liên hệ *</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="tel"
                          required
                          placeholder="09xx xxx xxx"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-border-custom rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-neutral-main"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Input shop brand */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-medium text-neutral-sub">Tên thương hiệu Tiệm / Spa / Clinic *</label>
                    <div className="relative">
                      <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="Ví dụ: Hana Beauty, Seoul Clinic..."
                        value={bizName}
                        onChange={(e) => setBizName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-border-custom rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-neutral-main"
                      />
                    </div>
                  </div>

                  {/* Radio selector branches */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono font-medium text-neutral-sub block">Số lượng chi nhánh cửa hàng hiện tại *</label>
                    <div className="grid grid-cols-3 gap-3">
                      
                      <label className={`border rounded-xl p-3 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                        branches === '1' 
                          ? 'border-primary bg-primary-light text-neutral-main' 
                          : 'border-border-custom bg-white text-neutral-sub hover:border-slate-300'
                      }`}>
                        <input
                          type="radio"
                          name="branches"
                          checked={branches === '1'}
                          onChange={() => setBranches('1')}
                          className="sr-only"
                        />
                        <span className="text-xs font-semibold">1 Cơ sở</span>
                      </label>

                      <label className={`border rounded-xl p-3 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                        branches === '2-3' 
                          ? 'border-primary bg-primary-light text-neutral-main' 
                          : 'border-border-custom bg-white text-neutral-sub hover:border-slate-300'
                      }`}>
                        <input
                          type="radio"
                          name="branches"
                          checked={branches === '2-3'}
                          onChange={() => setBranches('2-3')}
                          className="sr-only"
                        />
                        <span className="text-xs font-semibold">2-3 Cơ sở</span>
                      </label>

                      <label className={`border rounded-xl p-3 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                        branches === 'over-3' 
                          ? 'border-primary bg-primary-light text-neutral-main' 
                          : 'border-border-custom bg-white text-neutral-sub hover:border-slate-300'
                      }`}>
                        <input
                          type="radio"
                          name="branches"
                          checked={branches === 'over-3'}
                          onChange={() => setBranches('over-3')}
                          className="sr-only"
                        />
                        <span className="text-xs font-semibold">Trên 3 cơ sở</span>
                      </label>

                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      id="consultation-form-submit"
                      type="submit"
                      className="w-full bg-secondary-teal hover:bg-secondary-teal/90 text-white font-display font-medium py-4 px-6 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 group shadow-xs uppercase"
                    >
                      <span>Gửi thông tin đăng ký tư vấn</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-white shrink-0" />
                    </button>
                  </div>

                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
