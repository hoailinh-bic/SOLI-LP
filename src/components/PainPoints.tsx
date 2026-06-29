import React from 'react';
import { AlertCircle, Clock, ShieldAlert, FileX } from 'lucide-react';

export default function PainPoints() {
  const cards = [
    {
      id: "leak-1",
      icon: <Clock className="w-6 h-6 text-accent-coral" />,
      title: "Chậm Phản Hồi – Khách Rời Đi Trong Vài Phút",
      desc: "Khách hàng luôn nhắn nhiều nơi cùng lúc. Ai phản hồi trước, nơi đó chiếm 80% cơ hội chốt lịch! Khi bạn rep chậm quá 5 phút, khách đã làm việc với bên đối thủ."
    },
    {
      id: "leak-2",
      icon: <ShieldAlert className="w-6 h-6 text-accent-coral" />,
      title: "Bỏ Lỡ Khách Trong Giờ Cao Điểm & Ngoài Giờ Làm Việc",
      desc: "Lễ tân không kịp xử lý lượng lớn tin nhắn dồn dập lúc đông khách. Ngoài giờ làm việc (sau 21h, ban đêm), khách có nhu cầu cao nhưng không ai tiếp nhận dẫn tới thất thoát lead quý giá."
    },
    {
      id: "leak-3",
      icon: <FileX className="w-6 h-6 text-accent-coral" />,
      title: "Hệ Thống Lịch Hẹn Rời Rạc, Dễ Sai Sót",
      desc: "Lịch hẹn nằm rải rác trên Zalo, Messenger hay sổ sách giấy tờ dễ dẫn đến tình trạng chồng chéo, bỏ sót, ảnh hưởng xấu đến trải nghiệm và uy tín của salon/clinic."
    }
  ];

  return (
    <section id="pain-points" className="py-20 md:py-24 bg-bg-custom border-b border-border-custom relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 gradient-hero-mask pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[300px] h-[300px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 animate-fade-in">
          <span className="text-accent-coral font-mono text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 bg-accent-coral/10 border border-accent-coral/20 px-3 py-1 rounded-full w-fit mx-auto">
            <AlertCircle className="w-3.5 h-3.5" /> Thách Thức Vận Hành
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-neutral-main tracking-tight leading-tight">
            Nỗ Lực Marketing Nhưng Vẫn <span className="text-secondary-teal">Thất Thoát Khách Hàng?</span>
          </h2>
          <p className="text-neutral-sub text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-light">
            Mỗi khách hàng nhắn tin đều là một khoản đầu tư marketing. Khi phản hồi chậm, cơ hội chuyển đổi giảm xuống, doanh thu tiềm năng dễ dàng rơi vào tay đối thủ.
          </p>
        </div>

        {/* 3 Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {cards.map((card, i) => (
            <div
              id={`pain-card-${i}`}
              key={card.id}
              className="bg-white border border-border-custom rounded-2xl p-6 hover:shadow-md transition-all group hover:border-accent-coral/20 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-accent-coral/10 border border-accent-coral/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <h3 className="font-display font-bold text-base text-neutral-main tracking-tight leading-snug">
                  {card.title}
                </h3>
                <p className="text-xs text-neutral-sub leading-relaxed font-light">
                  {card.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border-custom">
                <span className="text-[10px] uppercase font-mono font-bold text-accent-coral tracking-wider">
                  ⚠️ Lỗ hổng nguy cơ 0{i + 1}
                </span>
              </div>
            </div>
          ))}
        </div>



      </div>
    </section>
  );
}
