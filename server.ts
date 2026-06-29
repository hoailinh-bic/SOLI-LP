import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(express.static(path.join(process.cwd(), "public")));

  // In-memory cache for checking submission logs
  const submissionLogs: any[] = [];

  // API endpoint to submit leads to Google Sheets
  app.post("/api/submit-lead", async (req, res) => {
    try {
      const { fullName, phone, businessName, branches, submittedAt, source, email, customWebhookUrl } = req.body;

      if (!fullName || !phone) {
        return res.status(400).json({ error: "Họ tên và Số điện thoại là bắt buộc" });
      }

      const payload = {
        fullName,
        phone,
        businessName: businessName || "N/A",
        branches: branches || "1",
        submittedAt: submittedAt || new Date().toLocaleString("vi-VN"),
        source: source || "demo_form",
        email: email || ""
      };

      // Add to in-memory logs for diagnostic purposes
      submissionLogs.unshift({
        id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
        ...payload,
        timestamp: new Date().toISOString(),
        status: "Pending"
      });

      // Fetch webhook URL from request body or environment variables
      const webhookUrl = customWebhookUrl || process.env.GOOGLE_SHEETS_WEBHOOK_URL;
      
      if (!webhookUrl) {
        console.warn("GOOGLE_SHEETS_WEBHOOK_URL is not configured.");
        submissionLogs[0].status = "Config Missing";
        return res.json({
          success: true,
          status: "local_only",
          message: "Lead saved locally. Please configure Google Sheets Webhook URL in Settings to sync with Google Sheets.",
          lead: payload
        });
      }

      console.log(`Forwarding lead to Google Sheets Apps Script Webhook: ${webhookUrl}`);
      
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const responseText = await response.text();
      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        responseData = { text: responseText };
      }

      if (response.ok) {
        submissionLogs[0].status = "Success";
        return res.json({
          success: true,
          status: "synced",
          message: "Successfully synced with Google Sheets",
          data: responseData
        });
      } else {
        submissionLogs[0].status = "Failed";
        submissionLogs[0].error = responseText;
        return res.status(response.status).json({
          success: false,
          error: `Google Sheets API returned error: ${responseText}`
        });
      }
    } catch (error: any) {
      console.error("Error submitting to Google Sheets:", error);
      if (submissionLogs.length > 0) {
        submissionLogs[0].status = "Error";
        submissionLogs[0].error = error.message;
      }
      return res.status(500).json({
        success: false,
        error: error.message || "Internal server error"
      });
    }
  });

  // Get diagnostic logs
  app.get("/api/logs", (req, res) => {
    res.json(submissionLogs);
  });

  // Serve static assets or mount Vite dev server
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
