
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
                <p>If you don’t use this link within 1 hour, it will expire. To get a new password reset link, visit :&nbsp; <a href="https://moe-crm-4y3a.onrender.com/forget-password">https://moe-crm-4y3a.onrender.com/forget-password </a></p>
                <p>If you did not request a password reset, please ignore this email.</p>
                <p>Thank you,</p>
                <p>The Contact Team</p>
            </div>
        </body>
        </html>
            `,
      };
}

export const requestNotificationMailOptions = (name, email, ticketNumber) => {
    return {
        from: process.env.SMTP_FROM,
        to: email,
        subject: "Issue Submitted - Check Your Ticket Number",
        html: `
        <html>
        <head>
          <meta charset="utf-8">
          
          <style>
            body {
              font-family: Arial, sans-serif;
              font-size: 16px;
              line-height: 1.2;
              margin: 80px auto;
              padding: 0;
              color: #333;
              background-color: #f6f6f6;
            }
        
            .container {
              max-width: 580px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
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
        
            p.btn {
              text-align: center;
            }
        
            .button {
              display: inline-block;
              padding: 10px 20px;
              border-radius: 5px;
              background-color: #1e90ff;
              color: #fff;
              text-decoration: none;
              font-size: 16px;
              font-weight: 700;
              text-align: center;
              transition: background-color 0.3s ease;
            }
        
            .button:hover {
              background-color: #0077ff;
            }
          </style>
        </head>
        <body>
        
        <div class="container">
          <h1>Thank you for submitting your issue!</h1>

          <h5>Dear ${name}, </h5>

          <p>Your issue has been successfully submitted. Here are the details:</p>
        
          <div style="display: flex; align-items: center; margin-bottom: 20px;">
            <span style="font-weight: bold; margin-right: 10px;">Ticket Number:</span>
            <span>${ticketNumber}</span>
          </div>
        
          <p>
            You can track the progress of your issue by visiting our website and entering the provided ticket number.
          </p>
        
          <p class="btn">
            <a class="button" href="https://moe-crm-4y3a.onrender.com/checkticketstatus">Track Issue</a>
          </p>
        
          <p>
            If you have any further questions or need assistance, please don't hesitate to contact us.
          </p>
        
          <p>
            Best regards,<br>
            Your CRM Support Team
          </p>
        </div>
        
        </body>
        </html>
        `
    }
}

export const requestDoneNotificationMailOptions = (name, email, ticketNumber) => {
  return {
      from: process.env.SMTP_FROM,
      to: email,
      subject: "Issue Status Update - Your Issue is Done",
      html: `
      <html>
      <head>
      <meta charset="utf-8">
      
      <style>
        body {
          font-family: Arial, sans-serif;
          font-size: 16px;
          line-height: 1.2;
          margin: 80px auto;
          padding: 0;
          color: #333;
          background-color: #f6f6f6;
        }
    
        .container {
          max-width: 580px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
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
    
        p.btn {
          text-align: center;
        }
    
        .button {
          display: inline-block;
          padding: 10px 20px;
          border-radius: 5px;
          background-color: #1e90ff;
          color: #fff;
          text-decoration: none;
          font-size: 16px;
          font-weight: 700;
          text-align: center;
          transition: background-color 0.3s ease;
        }
    
        .button:hover {
          background-color: #0077ff;
        }
      </style>
    </head>
    <body>
    
    <div class="container">
      <h2>Your Issue is Complete!</h2>

      <h4>Dear ${name}, </h4>

      <p>Your issue with ticket number <strong>${ticketNumber}</strong> has been marked as "done".</p>
    
      <p>
        You can now proceed to our office to finish the necessary verification process or receive the completed work. 
      </p>
    
      <p>
        If you have any further questions or need assistance, please don't hesitate to contact us.
      </p>
    
      <p>
        Best regards,<br>
        Your CRM Support Team
      </p>
    </div>
    
    </body>
    </html>
      `
      }
  }

  export const requestReplayNotificationMailOptions = (name, email, ticketNumber, message) => {
    return {
        from: process.env.SMTP_FROM,
        to: email,
        subject: "Issue Status Update",
        html: `
        <html>
        <head>
        <meta charset="utf-8">
        
        <style>
          body {
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.2;
            margin: 80px auto;
            padding: 0;
            color: #333;
            background-color: #f6f6f6;
          }
      
          .container {
            max-width: 580px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
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
      
          p.btn {
            text-align: center;
          }
      
          .button {
            display: inline-block;
            padding: 10px 20px;
            border-radius: 5px;
            background-color: #1e90ff;
            color: #fff;
            text-decoration: none;
            font-size: 16px;
            font-weight: 700;
            text-align: center;
            transition: background-color 0.3s ease;
          }
      
          .button:hover {
            background-color: #0077ff;
          }
        </style>
      </head>
      <body>
      
      <div class="container">
        <h2>Your Issue is in progress!</h2>
  
        <h4>Dear ${name}, </h4>
  
        <p>It's to give some information about your issue with ticket number <strong>${ticketNumber}</strong></p>
      
        <p>
          ${message}
        </p>
      
        <p>
          If you have any further questions or need assistance, please don't hesitate to contact us.
        </p>
      
        <p>
          Best regards,<br>
          Your CRM Support Team
        </p>
      </div>
      
      </body>
      </html>
        `
        }
    }

  export const contactUsMailOptions = (firstName, lastName, email, subject, message, phoneNumber, companyName = null, country = null) => {
    return {
        from: email,
        to: process.env.SMTP_FROM,
        subject: subject,
        html: `${message}<br>${firstName +" " + lastName}<br>${phoneNumber}<br>${companyName ?? ""},&nbsp;${country ?? ""}`,
        html: `
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Contact Form Submission</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              margin: 0;
              padding: 20px;
            }
        
            h2 {
              color: #333333;
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
            }
        
            p {
              color: #333333;
              font-size: 16px;
              margin-bottom: 10px;
            }
          </style>
        </head>
        <body>
          <h2>Contact Form Submission</h2>
        
          <p><strong>Message:</strong><br>
            ${message}
          </p>
        
          <p><strong>Name:</strong><br>
            ${firstName} ${lastName}
          </p>
        
          <p><strong>Phone Number:</strong><br>
            ${phoneNumber}
          </p>
        
          <p><strong>Company Name:</strong><br>
            ${companyName}
          </p>
        
          <p><strong>Country:</strong><br>
            ${country}
          </p>
        </body>
        </html>
        `
      }}