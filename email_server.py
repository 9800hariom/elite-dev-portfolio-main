"""
=========================================================
  📧 Portfolio Contact Form — Python Email Server
=========================================================
  This server receives form data from your portfolio's
  "Get In Touch" section and sends real emails via Gmail.

  HOW TO RUN:
    1. pip install flask flask-cors
    2. Configure your Gmail credentials below
    3. python email_server.py
    4. Server starts at http://localhost:5000

  GMAIL APP PASSWORD SETUP:
    1. Go to https://myaccount.google.com
    2. Security → 2-Step Verification → Enable
    3. Security → App Passwords → Create new
    4. Select: App = Mail, Device = Windows
    5. Copy the 16-char password and paste below
=========================================================
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

app = Flask(__name__)

# ✅ Allow requests from your React dev server (localhost:5173)
# Add your deployed portfolio URL here when you go live:
CORS(app, origins=["http://localhost:5173", "http://localhost:3000", "https://your-portfolio-domain.com"])


# =============================================
# 🔧 CONFIGURE YOUR EMAIL SETTINGS HERE
# =============================================
SENDER_EMAIL    = "your_gmail@gmail.com"   # ← Your Gmail address
SENDER_PASSWORD = "service_d7btni5"    # ← Gmail App Password (16 chars, spaces OK)
RECEIVER_EMAIL  = "980hariom@gmail.com"   # ← Where you want to receive messages
# =============================================


def build_html_email(name: str, email: str, subject: str, message: str, timestamp: str) -> str:
    """Build a beautiful HTML email body."""
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
    </head>
    <body style="margin:0;padding:0;background-color:#0f172a;font-family:'Segoe UI',Arial,sans-serif;">
      <div style="max-width:600px;margin:40px auto;background:#1e293b;border-radius:20px;overflow:hidden;border:1px solid #334155;">
        
        <!-- Header -->
        <div style="background:linear-gradient(135deg,#0891b2,#1d4ed8);padding:32px;text-align:center;">
          <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:-0.5px;">
            📩 New Contact Form Message
          </h1>
          <p style="margin:8px 0 0;color:#bae6fd;font-size:14px;">
            Received from your portfolio website
          </p>
        </div>

        <!-- Contact Details -->
        <div style="padding:32px;">
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            <tr>
              <td style="padding:12px 16px;background:#0f172a;border-radius:8px 8px 0 0;border-bottom:1px solid #1e293b;">
                <span style="color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:1px;">From</span>
                <br>
                <strong style="color:#f1f5f9;font-size:16px;">{name}</strong>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 16px;background:#0f172a;border-bottom:1px solid #1e293b;">
                <span style="color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Reply-To Email</span>
                <br>
                <a href="mailto:{email}" style="color:#06b6d4;font-size:16px;text-decoration:none;">{email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 16px;background:#0f172a;border-radius:0 0 8px 8px;">
                <span style="color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Subject</span>
                <br>
                <strong style="color:#f1f5f9;font-size:16px;">{subject or "(No Subject)"}</strong>
              </td>
            </tr>
          </table>

          <!-- Message Body -->
          <div style="background:#0f172a;border-radius:12px;padding:24px;margin-bottom:24px;">
            <p style="color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px;">
              Message
            </p>
            <p style="color:#e2e8f0;font-size:15px;line-height:1.8;margin:0;white-space:pre-wrap;">{message}</p>
          </div>

          <!-- Quick Reply Button -->
          <div style="text-align:center;margin-bottom:24px;">
            <a href="mailto:{email}?subject=Re: {subject}"
               style="display:inline-block;background:linear-gradient(135deg,#0891b2,#1d4ed8);color:#fff;font-weight:700;font-size:15px;padding:14px 32px;border-radius:12px;text-decoration:none;letter-spacing:0.3px;">
              ↩ Reply to {name}
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background:#0f172a;padding:20px 32px;border-top:1px solid #1e293b;text-align:center;">
          <p style="color:#475569;font-size:12px;margin:0;">
            Sent via your Portfolio Contact Form &bull; {timestamp}
          </p>
        </div>
      </div>
    </body>
    </html>
    """


@app.route("/send-email", methods=["POST"])
def send_email():
    """
    POST /send-email
    Accepts JSON body: { name, email, subject, message, timestamp }
    """
    try:
        data = request.get_json()
        if not data:
            return jsonify({"success": False, "message": "No data received."}), 400

        name      = data.get("name", "").strip()
        email     = data.get("email", "").strip()
        subject   = data.get("subject", "").strip()
        message   = data.get("message", "").strip()
        timestamp = data.get("timestamp", datetime.now().strftime("%Y-%m-%d %H:%M:%S"))

        # Basic server-side validation
        if not name or not email or not message:
            return jsonify({"success": False, "message": "Name, email, and message are required."}), 400

        # Build email
        msg = MIMEMultipart("alternative")
        msg["Subject"]  = f"[Portfolio] {subject or 'New message'} — from {name}"
        msg["From"]     = f"Portfolio Contact <{SENDER_EMAIL}>"
        msg["To"]       = RECEIVER_EMAIL
        msg["Reply-To"] = email  # ← Clicking "Reply" goes straight to the visitor

        html_content = build_html_email(name, email, subject, message, timestamp)
        msg.attach(MIMEText(html_content, "html"))

        # Send via Gmail SMTP over SSL
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            server.sendmail(SENDER_EMAIL, RECEIVER_EMAIL, msg.as_string())

        print(f"✅ [{timestamp}] Email sent | From: {name} ({email}) | Subject: {subject}")
        return jsonify({"success": True, "message": "Email sent successfully!"})

    except smtplib.SMTPAuthenticationError:
        print("❌ SMTP Authentication failed. Check your Gmail App Password.")
        return jsonify({
            "success": False,
            "message": "Email server authentication failed. Please check server configuration."
        }), 500
    except Exception as e:
        print(f"❌ Error sending email: {e}")
        return jsonify({"success": False, "message": f"Server error: {str(e)}"}), 500


@app.route("/health", methods=["GET"])
def health():
    """Health check endpoint."""
    return jsonify({"status": "ok", "server": "Portfolio Email Server", "time": datetime.now().isoformat()})


if __name__ == "__main__":
    print("=" * 55)
    print("  📧 Portfolio Email Server")
    print("=" * 55)
    print(f"  Sender  : {SENDER_EMAIL}")
    print(f"  Receiver: {RECEIVER_EMAIL}")
    print("  Running at: http://localhost:5000")
    print("  Health:     http://localhost:5000/health")
    print("=" * 55)
    app.run(debug=True, port=5000, host="0.0.0.0")
