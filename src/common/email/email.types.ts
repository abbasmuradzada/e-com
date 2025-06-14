export interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

export interface EmailTemplates {
    welcome: (name: string) => string;
    newLogin: (name: string, deviceInfo: string) => string;
    resetPassword: (name: string, resetLink: string) => string;
}