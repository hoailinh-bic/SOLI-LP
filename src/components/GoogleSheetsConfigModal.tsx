import { useState, useEffect } from "react";
import { X, Copy, Check, FileSpreadsheet, Play, Sparkles, HelpCircle, Loader2, RefreshCw } from "lucide-react";

interface GoogleSheetsConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitTest?: (url: string) => Promise<{ success: boolean; message: string }>;
}

export default function GoogleSheetsConfigModal({ isOpen, onClose, onSubmitTest }: GoogleSheetsConfigModalProps) {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [testStatus, setTestStatus] = useState<{ type: "idle" | "loading" | "success" | "error"; message: string }>({
    type: "idle",
    message: ""
  });
  const [syncLogs, setSyncLogs] = useState<any[]>([]);

  useEffect(() => {
    const savedUrl = localStorage.getItem("google_sheets_webhook_url");
    if (savedUrl) {
      setWebhookUrl(savedUrl);
    }
    loadLogs();
  }, [isOpen]);

  const loadLogs = async () => {
    try {
      const response = await fetch("/api/logs");
      if (response.ok) {
        const data = await response.json();
        setSyncLogs(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (!isOpen) return null;

  const appsScriptCode = `function doPost(e) {
  try {
    // ID của bảng tính Google Sheet của bạn
    var sheetId = "1cXuBx01M4JxPjrfcjcsNwa0LU8CsrRmdE5oL7TOQwdQ";
    var ss = SpreadsheetApp.openById(sheetId);
    var sheet = ss.getSheets()[0];
    
    // Tự động tạo hàng tiêu đề cột nếu Trang tính rỗng
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Họ tên", "Số điện thoại", "Tên thương hiệu", "Số lượng chi nhánh", "Thời gian đăng ký", "Nguồn", "Email"]);
      sheet.getRange(1, 1, 1, 7).setFontWeight("bold").setBackground("#D6FCE7");
    }
    
    // Đọc dữ liệu JSON gửi đến
    var data = JSON.parse(e.postData.contents);
    
    // Thêm một dòng dữ liệu mới
    sheet.appendRow([
      data.fullName || "",
      data.phone || "",
      data.businessName || "",
      data.branches || "1",
      data.submittedAt || new Date().toLocaleString("vi-VN"),
      data.source || "demo_form",
      data.email || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "result": "success", "message": "Lead saved successfully" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(appsScriptCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    localStorage.setItem("google_sheets_webhook_url", webhookUrl.trim());
    setTestStatus({
      type: "success",
      message: "Đã lưu địa chỉ Webhook thành công!"
    });
  };

  const handleTestConnection = async () => {
    if (!webhookUrl) {
      setTestStatus({
        type: "error",
        message: "Vui lòng nhập URL Google Apps Script Web App của bạn trước."
      });
      return;
    }

    setTestStatus({ type: "loading", message: "Đang gửi dữ liệu mẫu để kiểm tra kết nối..." });

    try {
      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fullName: "Khách hàng Thử nghiệm",
          phone: "0912345678",
          businessName: "SOLI AI Test Lab",
          branches: "1",
          submittedAt: new Date().toLocaleString("vi-VN"),
          source: "demo_form",
          email: "test@soliai.vn",
          customWebhookUrl: webhookUrl.trim()
        })
      });

      const data = await response.json();

      if (response.ok && data.success && data.status !== "local_only") {
        setTestStatus({
          type: "success",
          message: "Chúc mừng! Kết nối thành công. Dòng thử nghiệm đã được lưu vào Google Sheets."
        });
        localStorage.setItem("google_sheets_webhook_url", webhookUrl.trim());
        loadLogs();
      } else {
        setTestStatus({
          type: "error",
          message: data.error || data.message || "Không thể kết nối. Vui lòng kiểm tra lại cấu hình Web App của bạn."
        });
      }
    } catch (error: any) {
      setTestStatus({
        type: "error",
        message: `Lỗi kết nối mạng: ${error.message}`
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl border border-border-custom shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-border-custom flex items-center justify-between bg-bg-custom">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-light border border-primary/20 rounded-xl flex items-center justify-center text-secondary-teal">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-black text-base text-neutral-main uppercase">
                Cấu hình tích hợp Google Sheets
              </h3>
              <p className="text-xs text-neutral-sub">Tự động đồng bộ Leads đăng ký vào Google Sheet của bạn</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-neutral-sub hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Link to target spreadsheet */}
          <div className="bg-primary-light/40 border border-primary/20 rounded-2xl p-4 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-secondary-teal shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <p className="font-semibold text-neutral-main">Trang tính mục tiêu đã được liên kết:</p>
              <a
                href="https://docs.google.com/spreadsheets/d/1cXuBx01M4JxPjrfcjcsNwa0LU8CsrRmdE5oL7TOQwdQ/edit?gid=0#gid=0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-teal hover:underline font-mono inline-flex items-center gap-1 font-semibold"
              >
                https://docs.google.com/spreadsheets/.../OQwdQ/edit <span className="text-[10px]">↗</span>
              </a>
            </div>
          </div>

          {/* Guide steps */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-xs text-neutral-main uppercase tracking-wider">
              Hướng dẫn thiết lập kết nối (Chỉ 3 phút)
            </h4>
            
            <div className="space-y-3 font-sans text-xs text-neutral-sub">
              
              <div className="flex gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center font-bold text-neutral-main shrink-0 text-[10px]">1</span>
                <div>
                  <p className="text-neutral-main font-semibold">Mở Google Sheets & Tiện ích mở rộng</p>
                  <p className="mt-0.5 leading-relaxed font-light">
                    Mở Google Sheet của bạn, trên thanh menu nhấp chọn <strong>Tiện ích mở rộng (Extensions)</strong> &gt; <strong>Apps Script</strong>.
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center font-bold text-neutral-main shrink-0 text-[10px]">2</span>
                <div className="flex-1 space-y-2">
                  <p className="text-neutral-main font-semibold">Sao chép & Dán mã lệnh Apps Script</p>
                  <p className="mt-0.5 leading-relaxed font-light">
                    Xóa tất cả mã hiện tại trong trình soạn thảo Apps Script, sao chép mã dưới đây và dán vào:
                  </p>
                  
                  <div className="relative mt-2 border border-border-custom rounded-xl bg-slate-50 overflow-hidden">
                    <div className="flex items-center justify-between px-3 py-1.5 bg-slate-100 border-b border-border-custom">
                      <span className="font-mono text-[10px] text-neutral-sub">Code.gs</span>
                      <button
                        onClick={handleCopyCode}
                        className="flex items-center gap-1 text-[10px] font-semibold text-secondary-teal hover:text-secondary-teal/80"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3 h-3 text-secondary-teal" /> Đã sao chép
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" /> Sao chép mã
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-3 text-[10px] font-mono text-slate-700 overflow-x-auto max-h-40 leading-normal select-all">
                      {appsScriptCode}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center font-bold text-neutral-main shrink-0 text-[10px]">3</span>
                <div>
                  <p className="text-neutral-main font-semibold">Triển khai dưới dạng Ứng dụng Web (Web App)</p>
                  <p className="mt-0.5 leading-relaxed font-light">
                    Nhấp vào <strong>Triển khai (Deploy)</strong> &gt; <strong>Triển khai mới (New deployment)</strong>.<br />
                    - Chọn loại cấu hình: <strong>Ứng dụng web (Web app)</strong>.<br />
                    - Mô tả: Nhập bất kỳ (ví dụ: <code className="bg-slate-100 px-1 py-0.5 rounded text-secondary-teal">Soli AI Sync</code>).<br />
                    - Thực thi dưới danh nghĩa: Chọn <strong>Tôi (Me)</strong>.<br />
                    - Ai có quyền truy cập: Chọn <strong>Bất kỳ ai (Anyone)</strong>.<br />
                    Nhấp <strong>Triển khai</strong> và cấp quyền nếu được Google yêu cầu. Sao chép <strong>URL ứng dụng web</strong> nhận được.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Webhook Input and Testing */}
          <div className="pt-4 border-t border-border-custom space-y-4">
            <h4 className="font-display font-bold text-xs text-neutral-main uppercase tracking-wider">
              Kết nối và Lưu Cấu Hình
            </h4>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold text-neutral-sub block">Google Apps Script Web App URL *</label>
                <input
                  type="url"
                  placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-white border border-border-custom rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-neutral-main font-mono"
                />
              </div>

              {testStatus.type !== "idle" && (
                <div className={`p-3 rounded-xl border text-xs leading-relaxed flex items-start gap-2 ${
                  testStatus.type === "loading"
                    ? "bg-slate-50 border-slate-200 text-slate-600"
                    : testStatus.type === "success"
                    ? "bg-primary-light border-primary/30 text-secondary-teal font-medium"
                    : "bg-red-50 border-red-200 text-red-600"
                }`}>
                  {testStatus.type === "loading" && <Loader2 className="w-4 h-4 text-slate-500 animate-spin shrink-0 mt-0.5" />}
                  {testStatus.type === "success" && <Check className="w-4 h-4 text-secondary-teal shrink-0 mt-0.5" />}
                  {testStatus.type === "error" && <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />}
                  <span>{testStatus.message}</span>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleTestConnection}
                  disabled={testStatus.type === "loading"}
                  className="flex-1 bg-secondary-teal hover:bg-secondary-teal/90 text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {testStatus.type === "loading" ? "Đang gửi dữ liệu..." : "Thử nghiệm kết nối 🚀"}
                </button>
                <button
                  onClick={handleSave}
                  className="bg-slate-100 hover:bg-slate-200 text-neutral-main font-bold py-3 px-5 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Lưu Webhook
                </button>
              </div>
            </div>
          </div>

          {/* Sync history / logs */}
          <div className="pt-4 border-t border-border-custom space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-display font-bold text-xs text-neutral-main uppercase tracking-wider">
                Lịch sử đồng bộ Leads gần đây
              </h4>
              <button
                onClick={loadLogs}
                className="text-[10px] font-mono font-bold text-secondary-teal hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Làm mới logs
              </button>
            </div>

            {syncLogs.length === 0 ? (
              <p className="text-center text-[11px] text-slate-400 py-4 font-light">Chưa có bản ghi đồng bộ nào gần đây.</p>
            ) : (
              <div className="border border-border-custom rounded-xl divide-y divide-border-custom overflow-hidden max-h-48 overflow-y-auto">
                {syncLogs.map((log, i) => (
                  <div key={log.id || i} className="p-3 text-[11px] flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-neutral-main">{log.fullName}</span>
                        <span className="text-[10px] text-slate-400 font-mono">({log.phone})</span>
                      </div>
                      <div className="text-[10px] text-neutral-sub font-light leading-none">
                        {log.businessName} • {log.submittedAt}
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full font-mono text-[9px] font-bold uppercase ${
                      log.status === "Success" || log.status === "synced"
                        ? "bg-primary-light text-secondary-teal border border-primary/20"
                        : log.status === "Pending"
                        ? "bg-slate-100 text-slate-500"
                        : "bg-amber-100 text-amber-700 border border-amber-200"
                    }`}>
                      {log.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border-custom bg-bg-custom text-center text-[10px] text-neutral-sub font-mono">
          SOLI AI © 2026 • Powered by Google Sheets Syncing Integration
        </div>

      </div>
    </div>
  );
}
