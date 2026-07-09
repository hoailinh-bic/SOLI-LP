export default function Terms() {
  return (
    <div className="min-h-screen bg-bg-custom text-neutral-main font-sans antialiased">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-20">

        {/* H1 · Document title */}
        <h1 className="font-display text-3xl md:text-4xl font-extrabold leading-tight text-neutral-main">
          ĐIỀU KHOẢN SỬ DỤNG DỊCH VỤ (TERMS OF SERVICE)
        </h1>

        {/* Version / effective date */}
        <p className="mt-4 text-sm font-mono text-neutral-sub">
          Phiên bản: 1.0 Hiệu lực từ: {'{{Ngày}}'}
        </p>

        {/* Intro */}
        <p className="mt-8 text-[15px] leading-relaxed text-neutral-sub">
          Điều khoản này quy định các điều kiện chung khi sử dụng dịch vụ SOLI AI (“Dịch vụ”). Điều khoản này đồng thời là một phần không tách rời của Hợp đồng dịch vụ hoặc Bản xác nhận đăng ký dịch vụ giữa SOLI AI và Khách hàng.
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-neutral-sub">
          Việc đăng ký, thanh toán hoặc sử dụng Dịch vụ đồng nghĩa với việc Khách hàng đã đọc, hiểu và đồng ý với Điều khoản này.
        </p>

        {/* 1. Định nghĩa */}
        <h2 className="font-display text-xl md:text-2xl font-bold text-secondary-teal mt-12">
          1. Định nghĩa
        </h2>
        <ul className="mt-4 space-y-3 list-disc pl-6 text-[15px] leading-relaxed text-neutral-sub marker:text-primary">
          <li>
            <span className="font-semibold text-neutral-main">SOLI AI:</span> nền tảng AI Front Desk hỗ trợ trả lời khách hàng, tư vấn, đặt lịch và hỗ trợ vận hành qua các kênh nhắn tin.
          </li>
          <li>
            <span className="font-semibold text-neutral-main">Khách hàng:</span> tổ chức hoặc cá nhân đăng ký sử dụng Dịch vụ.
          </li>
          <li>
            <span className="font-semibold text-neutral-main">Người dùng cuối:</span> khách hàng của Khách hàng.
          </li>
          <li>
            <span className="font-semibold text-neutral-main">Dữ liệu Khách hàng:</span> dữ liệu do Khách hàng hoặc Người dùng cuối cung cấp trong quá trình sử dụng Dịch vụ.
          </li>
        </ul>

        {/* 2. Quyền sử dụng */}
        <h2 className="font-display text-xl md:text-2xl font-bold text-secondary-teal mt-12">
          2. Quyền sử dụng
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-neutral-sub">
          SOLI AI cấp cho Khách hàng quyền sử dụng Dịch vụ theo hình thức không độc quyền và không được chuyển nhượng trong phạm vi gói dịch vụ đã đăng ký.
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-neutral-sub">
          Khách hàng không được sao chép, sửa đổi, bán lại, cho thuê, dịch ngược hoặc sử dụng Dịch vụ vào mục đích trái pháp luật hoặc gây ảnh hưởng đến tính ổn định, an toàn của hệ thống.
        </p>

        {/* 3. Tài khoản và thanh toán */}
        <h2 className="font-display text-xl md:text-2xl font-bold text-secondary-teal mt-12">
          3. Tài khoản và thanh toán
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-neutral-sub">
          Khách hàng chịu trách nhiệm bảo mật tài khoản của mình và mọi hoạt động phát sinh từ tài khoản đó.
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-neutral-sub">
          Phí sử dụng Dịch vụ được thực hiện theo Hợp đồng, Báo giá hoặc Bảng giá hiện hành. Việc chậm thanh toán có thể dẫn đến việc tạm ngừng hoặc chấm dứt cung cấp Dịch vụ theo các điều khoản đã thỏa thuận.
        </p>

        {/* 4. Dữ liệu Khách hàng */}
        <h2 className="font-display text-xl md:text-2xl font-bold text-secondary-teal mt-12">
          4. Dữ liệu Khách hàng
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-neutral-sub">
          Khách hàng chịu trách nhiệm về tính hợp pháp, đầy đủ và chính xác của dữ liệu cung cấp cho SOLI AI.
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-neutral-sub">
          Quyền sở hữu đối với Dữ liệu Khách hàng vẫn thuộc về Khách hàng. SOLI AI chỉ xử lý dữ liệu nhằm mục đích cung cấp Dịch vụ theo Chính sách quyền riêng tư và các thỏa thuận giữa hai bên.
        </p>

        {/* 5. Giới hạn của AI */}
        <h2 className="font-display text-xl md:text-2xl font-bold text-secondary-teal mt-12">
          5. Giới hạn của AI
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-neutral-sub">
          SOLI AI sử dụng công nghệ trí tuệ nhân tạo để hỗ trợ tự động hóa. Các phản hồi do AI tạo ra có thể không hoàn toàn chính xác trong mọi trường hợp.
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-neutral-sub">
          Khách hàng có trách nhiệm rà soát các nội dung quan trọng trước khi sử dụng cho mục đích kinh doanh hoặc ra quyết định.
        </p>

        {/* 6. Dịch vụ của bên thứ ba */}
        <h2 className="font-display text-xl md:text-2xl font-bold text-secondary-teal mt-12">
          6. Dịch vụ của bên thứ ba
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-neutral-sub">
          Dịch vụ có thể tích hợp với các nền tảng hoặc nhà cung cấp bên thứ ba như Zalo, Meta hoặc các nhà cung cấp mô hình AI.
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-neutral-sub">
          SOLI AI không chịu trách nhiệm đối với các gián đoạn, thay đổi chính sách hoặc ngừng cung cấp dịch vụ từ các bên thứ ba ngoài khả năng kiểm soát hợp lý của mình.
        </p>

        {/* 7. Quyền sở hữu trí tuệ */}
        <h2 className="font-display text-xl md:text-2xl font-bold text-secondary-teal mt-12">
          7. Quyền sở hữu trí tuệ
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-neutral-sub">
          Toàn bộ phần mềm, mã nguồn, giao diện, thương hiệu, tài liệu và các quyền sở hữu trí tuệ liên quan đến SOLI AI thuộc sở hữu của SOLI AI hoặc các bên cấp phép.
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-neutral-sub">
          Không điều khoản nào trong văn bản này được hiểu là chuyển giao quyền sở hữu trí tuệ cho Khách hàng.
        </p>

        {/* 8. Tạm ngừng và chấm dứt */}
        <h2 className="font-display text-xl md:text-2xl font-bold text-secondary-teal mt-12">
          8. Tạm ngừng và chấm dứt
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-neutral-sub">
          SOLI AI có quyền tạm ngừng hoặc chấm dứt Dịch vụ khi Khách hàng vi phạm Điều khoản này, vi phạm Hợp đồng hoặc sử dụng Dịch vụ trái pháp luật.
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-neutral-sub">
          Khi Dịch vụ chấm dứt, Khách hàng có quyền yêu cầu xuất dữ liệu của mình trong thời hạn theo quy định của Hợp đồng hoặc Chính sách quyền riêng tư.
        </p>

        {/* 9. Giới hạn trách nhiệm */}
        <h2 className="font-display text-xl md:text-2xl font-bold text-secondary-teal mt-12">
          9. Giới hạn trách nhiệm
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-neutral-sub">
          Trong phạm vi pháp luật cho phép, tổng trách nhiệm của SOLI AI phát sinh từ hoặc liên quan đến Dịch vụ sẽ không vượt quá tổng phí dịch vụ mà Khách hàng đã thanh toán trong sáu (06) tháng liền trước thời điểm phát sinh sự kiện.
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-neutral-sub">
          SOLI AI không chịu trách nhiệm đối với các thiệt hại gián tiếp, mất doanh thu, mất lợi nhuận hoặc các tổn thất phát sinh từ việc sử dụng Dịch vụ, trừ khi pháp luật quy định khác.
        </p>

        {/* 10. Luật áp dụng */}
        <h2 className="font-display text-xl md:text-2xl font-bold text-secondary-teal mt-12">
          10. Luật áp dụng
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-neutral-sub">
          Điều khoản này được điều chỉnh bởi pháp luật Việt Nam.
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-neutral-sub">
          Mọi tranh chấp phát sinh trước hết sẽ được các bên ưu tiên giải quyết thông qua thương lượng. Trường hợp không đạt được thỏa thuận, tranh chấp sẽ được giải quyết theo cơ quan có thẩm quyền hoặc phương thức giải quyết tranh chấp đã được các bên thống nhất trong Hợp đồng dịch vụ.
        </p>

      </div>
    </div>
  );
}
