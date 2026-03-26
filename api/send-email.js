export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, address, garageSize, message, attachments } = req.body;

  // Validate required fields
  if (!name || !email || !phone || !address || !garageSize) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured.');
    return res.status(500).json({ error: 'Email service is not configured.' });
  }

  // Build styled HTML email body
  const htmlBody = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; border: 1px solid #27272a; border-radius: 0;">
      <div style="background: #dc2626; padding: 24px 32px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px;">
          New Estimate Request
        </h1>
      </div>
      <div style="padding: 32px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #a1a1aa; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; width: 140px; vertical-align: top;">Name</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #ffffff; font-size: 15px;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #a1a1aa; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; vertical-align: top;">Email</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #ffffff; font-size: 15px;">
              <a href="mailto:${email}" style="color: #ef4444; text-decoration: none;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #a1a1aa; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; vertical-align: top;">Phone</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #ffffff; font-size: 15px;">
              <a href="tel:${phone}" style="color: #ef4444; text-decoration: none;">${phone}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #a1a1aa; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; vertical-align: top;">Address</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #ffffff; font-size: 15px;">${address}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #a1a1aa; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; vertical-align: top;">Garage Size</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #ffffff; font-size: 15px;">${garageSize}</td>
          </tr>
          ${message ? `
          <tr>
            <td style="padding: 12px 0; color: #a1a1aa; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; vertical-align: top;">Message</td>
            <td style="padding: 12px 0; color: #ffffff; font-size: 15px;">${message}</td>
          </tr>
          ` : ''}
        </table>
      </div>
      <div style="padding: 20px 32px; border-top: 1px solid #27272a;">
        <p style="color: #52525b; font-size: 12px; margin: 0; text-transform: uppercase; letter-spacing: 1px;">
          Garage Recovery Solutions &mdash; Automated Notification
        </p>
      </div>
    </div>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Garage Recovery Solutions <hello@garagerecoverysolutions.com>',
        to: ['garagerecoverysolutions@gmail.com'],
        reply_to: email,
        subject: `New Estimate Request from ${name}`,
        html: htmlBody,
        ...(attachments && attachments.length > 0 && {
          attachments: attachments.map(a => ({
            filename: a.filename,
            content: a.content,
          })),
        }),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend API error:', data);
      return res.status(response.status).json({ error: data.message || 'Failed to send email.' });
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ error: 'An unexpected error occurred while sending the email.' });
  }
}
