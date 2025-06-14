import { EmailTemplates } from './email.types';

export const emailTemplates: EmailTemplates = {
    welcome: (name: string) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Welcome to Our E-commerce Platform!</h2>
            <p>Hello ${name},</p>
            <p>Thank you for registering with us. We're excited to have you on board!</p>
            <p>Start exploring our products and enjoy a seamless shopping experience.</p>
            <p>Happy Shopping!</p>
            <p>Best regards,<br/>The E-commerce Team</p>
        </div>
    `,

    newLogin: (name: string, deviceInfo: string) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>New Login Detected</h2>
            <p>Hello ${name},</p>
            <p>We noticed a new login to your account from:</p>
            <p><strong>${deviceInfo}</strong></p>
            <p>If this was you, you can safely ignore this email.</p>
            <p>If you don't recognize this activity, please secure your account immediately.</p>
            <p>Best regards,<br/>Security Team</p>
        </div>
    `,

    resetPassword: (name: string, resetLink: string) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Password Reset Request</h2>
            <p>Hello ${name},</p>
            <p>You requested to reset your password. Click the button below to proceed:</p>
            <div style="text-align: center; margin: 25px 0;">
                <a href="${resetLink}" 
                   style="background-color: #4CAF50; color: white; padding: 12px 24px; 
                          text-decoration: none; border-radius: 4px; display: inline-block;">
                    Reset Password
                </a>
            </div>
            <p>If you didn't request this, please ignore this email or contact support if you have questions.</p>
            <p>Best regards,<br/>Support Team</p>
        </div>
    `
};