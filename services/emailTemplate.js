module.exports = ({ emailFrom, downloadLink, size, expires }) => {
    return `
  <!doctype html>
  <html>
  <head>
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Secure-Share | File Shared With You</title>
  
    <style>
      body {
        background-color: #f4f7fb;
        font-family: Arial, Helvetica, sans-serif;
        margin: 0;
        padding: 0;
      }
  
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
  
      .card {
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        overflow: hidden;
      }
  
      .header {
        background: linear-gradient(135deg, #1e3c72, #2a5298);
        padding: 20px;
        text-align: center;
        color: #ffffff;
      }
  
      .header h1 {
        margin: 0;
        font-size: 22px;
        letter-spacing: 0.5px;
      }
  
      .content {
        padding: 30px;
        color: #333333;
        font-size: 14px;
        line-height: 1.6;
      }
  
      .file-info {
        background: #f1f5ff;
        padding: 15px;
        border-radius: 6px;
        margin: 20px 0;
        font-size: 14px;
      }
  
      .btn-wrapper {
        text-align: center;
        margin: 30px 0;
      }
  
      .btn {
        background: #2563eb;
        color: #ffffff;
        padding: 14px 28px;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
        display: inline-block;
      }
  
      .btn:hover {
        background: #1d4ed8;
      }
  
      .footer {
        text-align: center;
        padding: 20px;
        font-size: 12px;
        color: #777777;
      }
  
      .footer a {
        color: #2563eb;
        text-decoration: none;
      }
  
      @media only screen and (max-width: 600px) {
        .content {
          padding: 20px;
        }
      }
    </style>
  </head>
  
  <body>
    <div class="container">
      <div class="card">
  
        <!-- Header -->
        <div class="header">
          <h1>Secure-Share</h1>
          <p>Secure File Sharing Made Simple</p>
        </div>
  
        <!-- Content -->
        <div class="content">
          <p>Hello,</p>
  
          <p>
            <strong>${emailFrom}</strong> has securely shared a file with you using
            <strong>Secure-Share</strong>.
          </p>
  
          <div class="file-info">
            <strong>File size:</strong> ${size}<br>
            <strong>Link expires in:</strong> ${expires}
          </div>
  
          <div class="btn-wrapper">
            <a href="${downloadLink}" class="btn" target="_blank">
              Download File
            </a>
          </div>
  
          <p>
            For your security, this link will expire automatically.
            If you were not expecting this file, you can safely ignore this email.
          </p>
  
          <p>
            Regards,<br>
            <strong>Secure-Share Team</strong>
          </p>
        </div>
  
      </div>
  
      <!-- Footer -->
      <div class="footer">
        <p>
          © ${new Date().getFullYear()} Secure-Share. All rights reserved.
        </p>
        <p>
          Want to share files securely?
          <a href="${process.env.APP_BASE_URL}">Visit Secure-Share</a>
        </p>
      </div>
    </div>
  </body>
  </html>
  `;
};

