import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// ── Event Registration Confirmation ──────────────────────────────────────────

interface EventDetails {
  title: string;
  category: string;
  date: Date;
  endDate?: Date | null;
  venue: string;
  registrationDeadline?: Date | null;
  maxParticipants?: number | null;
  prizeMoney?: string | null;
  teamSize?: string | null;
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const categoryEmoji: Record<string, string> = {
  FORMAL: "🎓",
  INFORMAL: "🎉",
  HACKATHON: "⚡",
  CULTURAL: "🎭",
  SPORTS: "⚽",
  WORKSHOP: "🔧",
  TECHNICAL: "💻",
  LITERARY: "📚",
};

export async function sendEventConfirmationEmail(
  userEmail: string,
  userName: string,
  event: EventDetails
) {
  const emoji = categoryEmoji[event.category] || "📋";
  const eventUrl = `${process.env.NEXTAUTH_URL}/events`;

  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Registration Confirmed</title>
  </head>
  <body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
      <tr><td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr><td style="background:linear-gradient(135deg,#1d4ed8,#2563eb);border-radius:16px 16px 0 0;padding:36px 32px;text-align:center;">
            <div style="display:inline-flex;align-items:center;gap:10px;margin-bottom:16px;">
              <span style="background:white;border-radius:12px;padding:8px 12px;font-size:22px;font-weight:900;color:#1d4ed8;">NOC</span>
              <span style="color:white;font-size:20px;font-weight:700;">NowOnCampus</span>
            </div>
            <div style="font-size:40px;margin:8px 0;">${emoji}</div>
            <h1 style="color:white;font-size:26px;font-weight:800;margin:0 0 8px;">You're Registered!</h1>
            <p style="color:#bfdbfe;font-size:15px;margin:0;">Your spot has been confirmed. Get ready to participate!</p>
          </td></tr>

          <!-- Body -->
          <tr><td style="background:white;padding:32px;">
            <p style="color:#374151;font-size:16px;margin:0 0 24px;">Hi <strong>${userName}</strong>,</p>
            <p style="color:#374151;font-size:15px;margin:0 0 24px;">
              Congratulations! You have successfully registered for the following event on <strong>NowOnCampus</strong>.
            </p>

            <!-- Event Card -->
            <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:24px;margin-bottom:24px;">
              <h2 style="color:#1e40af;font-size:20px;font-weight:800;margin:0 0 16px;">${event.title}</h2>

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #dbeafe;">
                    <span style="color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;">Category</span><br>
                    <span style="color:#1e3a8a;font-size:15px;font-weight:600;">${emoji} ${event.category}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #dbeafe;">
                    <span style="color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;">📅 Date & Time</span><br>
                    <span style="color:#1e3a8a;font-size:15px;font-weight:600;">${formatDate(event.date)}</span>
                    ${event.endDate ? `<br><span style="color:#374151;font-size:13px;">Ends: ${formatDate(event.endDate)}</span>` : ""}
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #dbeafe;">
                    <span style="color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;">📍 Venue</span><br>
                    <span style="color:#1e3a8a;font-size:15px;font-weight:600;">${event.venue}</span>
                  </td>
                </tr>
                ${event.registrationDeadline ? `
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #dbeafe;">
                    <span style="color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;">⏰ Registration Deadline</span><br>
                    <span style="color:#1e3a8a;font-size:15px;font-weight:600;">${formatDate(event.registrationDeadline)}</span>
                  </td>
                </tr>` : ""}
                ${event.maxParticipants ? `
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #dbeafe;">
                    <span style="color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;">👥 Max Participants</span><br>
                    <span style="color:#1e3a8a;font-size:15px;font-weight:600;">${event.maxParticipants}</span>
                  </td>
                </tr>` : ""}
                ${event.prizeMoney ? `
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #dbeafe;">
                    <span style="color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;">🏆 Prize Pool</span><br>
                    <span style="color:#1e3a8a;font-size:15px;font-weight:600;">${event.prizeMoney}</span>
                  </td>
                </tr>` : ""}
                ${event.teamSize ? `
                <tr>
                  <td style="padding:8px 0;">
                    <span style="color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;">👫 Team Size</span><br>
                    <span style="color:#1e3a8a;font-size:15px;font-weight:600;">${event.teamSize}</span>
                  </td>
                </tr>` : ""}
              </table>
            </div>

            <!-- Status Badge -->
            <div style="background:#dcfce7;border-radius:10px;padding:16px;text-align:center;margin-bottom:24px;">
              <span style="color:#166534;font-size:14px;font-weight:700;">✅ Registration Status: CONFIRMED</span>
            </div>

            <!-- CTA -->
            <div style="text-align:center;margin-bottom:24px;">
              <a href="${eventUrl}" style="display:inline-block;background:#2563eb;color:white;font-size:15px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:10px;">
                View All Events →
              </a>
            </div>

            <p style="color:#6b7280;font-size:13px;margin:0;">
              Please arrive on time. Keep this email handy for reference during the event.<br>
              If you have any questions, reach out to the event organizer.
            </p>
          </td></tr>

          <!-- Footer -->
          <tr><td style="background:#f8fafc;border-top:1px solid #e2e8f0;border-radius:0 0 16px 16px;padding:20px 32px;text-align:center;">
            <p style="color:#94a3b8;font-size:12px;margin:0;">
              &copy; 2025 NowOnCampus. All rights reserved.<br>
              This is an automated confirmation. Please do not reply.
            </p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
  </html>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.GMAIL_USER,
    to: userEmail,
    subject: `✅ Registration Confirmed: ${event.title} — NowOnCampus`,
    html,
  });
}

// ── Password Reset Email ──────────────────────────────────────────────────────

export async function sendPasswordResetEmail(userEmail: string, userName: string, resetToken: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Password Reset</title>
  </head>
  <body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
      <tr><td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr><td style="background:linear-gradient(135deg,#1d4ed8,#2563eb);border-radius:16px 16px 0 0;padding:36px 32px;text-align:center;">
            <div style="margin-bottom:16px;">
              <span style="background:white;border-radius:12px;padding:8px 12px;font-size:22px;font-weight:900;color:#1d4ed8;">NOC</span>
            </div>
            <div style="font-size:40px;margin:8px 0;">🔐</div>
            <h1 style="color:white;font-size:24px;font-weight:800;margin:0 0 8px;">Password Reset Request</h1>
            <p style="color:#bfdbfe;font-size:15px;margin:0;">We received a request to reset your password</p>
          </td></tr>

          <!-- Body -->
          <tr><td style="background:white;padding:32px;">
            <p style="color:#374151;font-size:16px;margin:0 0 16px;">Hi <strong>${userName || "there"}</strong>,</p>
            <p style="color:#374151;font-size:15px;margin:0 0 24px;">
              We received a request to reset the password for your NowOnCampus account.<br>
              Click the button below to set a new password. This link is valid for <strong>1 hour</strong>.
            </p>

            <div style="text-align:center;margin:32px 0;">
              <a href="${resetUrl}" style="display:inline-block;background:#2563eb;color:white;font-size:16px;font-weight:700;text-decoration:none;padding:16px 40px;border-radius:12px;">
                Reset My Password
              </a>
            </div>

            <p style="color:#6b7280;font-size:13px;margin:0 0 8px;">Or copy and paste this link into your browser:</p>
            <p style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px;word-break:break-all;color:#374151;font-size:12px;margin:0 0 24px;">${resetUrl}</p>

            <div style="background:#fef9c3;border:1px solid #fde047;border-radius:10px;padding:14px;margin-bottom:24px;">
              <p style="color:#713f12;font-size:13px;margin:0;">
                ⚠️ If you did not request a password reset, you can safely ignore this email.
                Your password will not change.
              </p>
            </div>
          </td></tr>

          <!-- Footer -->
          <tr><td style="background:#f8fafc;border-top:1px solid #e2e8f0;border-radius:0 0 16px 16px;padding:20px 32px;text-align:center;">
            <p style="color:#94a3b8;font-size:12px;margin:0;">
              &copy; 2025 NowOnCampus · This link expires in 1 hour.
            </p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
  </html>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.GMAIL_USER,
    to: userEmail,
    subject: "🔐 Reset your NowOnCampus password",
    html,
  });
}

// ── OTP Login Email ───────────────────────────────────────────────────────────

export async function sendOtpEmail(userEmail: string, userName: string, otp: string) {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head><meta charset="UTF-8" /><title>Login OTP</title></head>
  <body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
      <tr><td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr><td style="background:linear-gradient(135deg,#1d4ed8,#2563eb);border-radius:16px 16px 0 0;padding:36px 32px;text-align:center;">
            <div style="margin-bottom:12px;">
              <span style="background:white;border-radius:12px;padding:8px 12px;font-size:22px;font-weight:900;color:#1d4ed8;">NOC</span>
            </div>
            <div style="font-size:40px;margin:8px 0;">🔑</div>
            <h1 style="color:white;font-size:24px;font-weight:800;margin:0 0 8px;">Your Login OTP</h1>
            <p style="color:#bfdbfe;font-size:15px;margin:0;">Use this code to complete your sign-in</p>
          </td></tr>

          <!-- Body -->
          <tr><td style="background:white;padding:32px;">
            <p style="color:#374151;font-size:16px;margin:0 0 20px;">Hi <strong>${userName}</strong>,</p>
            <p style="color:#374151;font-size:15px;margin:0 0 28px;">
              Enter the following 6-digit OTP to complete your login to NowOnCampus.
              This code is valid for <strong>10 minutes</strong>.
            </p>

            <!-- OTP Box -->
            <div style="background:#eff6ff;border:2px dashed #3b82f6;border-radius:16px;padding:28px;text-align:center;margin-bottom:28px;">
              <p style="color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.1em;margin:0 0 12px;">Your One-Time Password</p>
              <p style="font-size:48px;font-weight:900;letter-spacing:12px;color:#1d4ed8;margin:0;font-family:monospace;">${otp}</p>
            </div>

            <div style="background:#fef9c3;border:1px solid #fde047;border-radius:10px;padding:14px;margin-bottom:24px;">
              <p style="color:#713f12;font-size:13px;margin:0;">
                ⚠️ Never share this OTP with anyone. NowOnCampus will never ask for it.<br>
                If you didn't request this, please ignore this email.
              </p>
            </div>
          </td></tr>

          <!-- Footer -->
          <tr><td style="background:#f8fafc;border-top:1px solid #e2e8f0;border-radius:0 0 16px 16px;padding:20px 32px;text-align:center;">
            <p style="color:#94a3b8;font-size:12px;margin:0;">
              &copy; 2025 NowOnCampus · This OTP expires in 10 minutes.
            </p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
  </html>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.GMAIL_USER,
    to: userEmail,
    subject: "🔑 Your NowOnCampus Login OTP",
    html,
  });
}
