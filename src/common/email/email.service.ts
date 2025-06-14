import nodemailer from 'nodemailer';
import { emailTemplates } from './email.templates';
import { EmailOptions } from './email.types';

class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
            throw new Error('Email configuration is missing');
        }

        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.EMAIL_PORT || '587'),
            secure: process.env.EMAIL_SECURE === 'true',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    private async sendEmail(options: EmailOptions): Promise<void> {
        const mailOptions = {
            from: `"E-commerce Team" <${process.env.EMAIL_USER}>`,
            to: options.to,
            subject: options.subject,
            html: options.html,
        };

        try {
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Failed to send email:', error);
            throw new Error('Failed to send email');
        }
    }

    public async sendWelcomeEmail(to: string, name: string): Promise<void> {
        await this.sendEmail({
            to,
            subject: 'Welcome to Our E-commerce Platform!',
            html: emailTemplates.welcome(name),
        });
    }

    public async sendNewLoginAlert(to: string, name: string, deviceInfo: string): Promise<void> {
        await this.sendEmail({
            to,
            subject: 'New Login Detected',
            html: emailTemplates.newLogin(name, deviceInfo),
        });
    }

    public async sendPasswordResetEmail(
        to: string,
        name: string,
        resetLink: string,
    ): Promise<void> {
        await this.sendEmail({
            to,
            subject: 'Password Reset Request',
            html: emailTemplates.resetPassword(name, resetLink),
        });
    }
}

const emailService = new EmailService();

export { emailService };
