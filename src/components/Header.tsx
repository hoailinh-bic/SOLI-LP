import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, FileSpreadsheet } from 'lucide-react';

interface HeaderProps {
  onOpenDemo: () => void;
  onOpenSheetsConfig: () => void;
  leadCount: number;
}

const styles = {
  logo: "h-8 md:h-10 lg:h-11 w-auto object-contain block transition-transform duration-300 hover:scale-[1.02]",
};

export default function Header({ onOpenDemo, onOpenSheetsConfig, leadCount }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Thách thức', href: '#pain-points' },
    { label: 'Giải pháp', href: '#how-it-works' },
    { label: 'Tại sao chọn Soli', href: '#why-soli' },
    { label: 'Bảng giá', href: '#pricing' },
    { label: 'Thông tin thêm', href: '#materials' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-50/95 backdrop-blur-md border-b border-slate-200/80 shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between relative">
          {/* Logo */}
          <a href="/" className="flex items-center flex-shrink-0 select-none cursor-pointer">
            <img
              src="/logo.png"
              alt="Logo"
              className={styles.logo}
            />
          </a>

          {/* Desktop Nav - Centered */}
          <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-6 lg:gap-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs uppercase tracking-wider font-semibold text-slate-500 hover:text-teal-600 transition-all duration-150 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-teal-600 after:transition-all after:duration-150 whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              id="header-cta-demo"
              onClick={onOpenDemo}
              className="bg-teal-600 hover:bg-teal-600/90 text-white font-bold text-xs uppercase px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 active:scale-98 cursor-pointer whitespace-nowrap border-none"
            >
              Demo Miễn Phí
              <ArrowRight className="w-3.5 h-3.5 text-white transition-transform duration-150 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            {leadCount > 0 && (
              <span className="bg-teal-600 text-white font-mono font-bold px-2 py-0.5 rounded-full text-[10px] animate-bounce">
                {leadCount}
              </span>
            )}
            <button
              id="header-mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-900 bg-transparent hover:bg-slate-100 border-none cursor-pointer transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`absolute top-full left-0 right-0 bg-slate-50 border-b border-slate-200/80 shadow-lg px-4 pb-6 pt-2 flex flex-col gap-3 transition-all duration-300 origin-top ${isMobileMenuOpen ? 'scale-y-100 opacity-100 visible' : 'scale-y-95 opacity-0 invisible h-0 pointer-events-none p-0'}`}>
        <div className="space-y-1 py-2">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-3 rounded-xl text-base font-medium text-slate-600 hover:bg-slate-100 hover:text-teal-600 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="border-t border-slate-200/80 pt-4 flex flex-col gap-3">
          <div className="flex items-center gap-2 bg-teal-50/50 rounded-xl px-3 py-2 text-xs text-teal-600 font-medium border border-teal-600/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-teal-600 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600"></span>
            </span>
            Đang phục vụ <span className="font-extrabold text-slate-900">142+</span> Salon & Clinic hàng đầu
          </div>
          <button
            id="mobile-header-google-sheet"
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenSheetsConfig();
            }}
            className="hidden"
          >
            <FileSpreadsheet className="w-4.5 h-4.5 text-emerald-500" />
            Cấu hình Google Sheet
          </button>
          <button
            id="mobile-header-cta-demo"
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenDemo();
            }}
            className="w-full bg-teal-600 hover:bg-teal-600/90 text-white font-bold uppercase py-3 px-4 rounded-full text-center shadow-md transition-colors flex items-center justify-center gap-2"
          >
            Đăng Ký Demo Ngay
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
}
