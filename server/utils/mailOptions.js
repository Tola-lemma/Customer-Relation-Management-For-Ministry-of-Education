
export const resetPasswordMailOptions= (name, email, requestLink) => {
    return {
        from: process.env.SMTP_FROM,
        to: email,
        subject: "Password reset request",
        html: `
        <html>
        <head>
            <title>Password Reset</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    font-size: 16px;
                    line-height: 1.2;
                    margin: 80px auto;
                    padding: 0;
                    color: #333333;
                    background-color: #f6f6f6;
                }
        
                .container {
                    max-width: 580px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
        
                h1 {
                    font-size: 24px;
                    font-weight: 700;
                    margin-top: 0;
                    margin-bottom: 20px;
                    text-align: center;
                }
        
                p {
                    margin-top: 0;
                    margin-bottom: 20px;
                }
                  p.btn{
                      text-align : center;
                  }
        
                a.button {
                    display: inline-block;
                    padding: 10px 20px;
                    border-radius: 5px;
                    background-color: #1e90ff;
                    color: #ffffff;
                    text-decoration: none;
                    font-size: 16px;
                    font-weight: 700;
                    text-align: center;
                    transition: background-color 0.3s ease;
                }
        
                a.button:hover {
                    background-color: #0077ff;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Password Reset</h1>
                <p>Hello ${name},</p>
                <p>We have received a request to reset your password. Please click the button below to proceed:</p>
                <p class="btn"><a href="${requestLink}" class="button" target="_blank" rel="noopener noreferrer">Reset your Password</a></p>
                <p>If you don’t use this link within 1 hour, it will expire. To get a new password reset link, visit :&nbsp; <a href="some-link">https:/www.password-reset.com </a></p>
                <p>If you did not request a password reset, please ignore this email.</p>
                <p>Thank you,</p>
                <p>The Contact Team</p>
            </div>
        </body>
        </html>
            `,
      };
}