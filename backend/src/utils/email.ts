import nodemailer from 'nodemailer';

const requiredEnvVariables = [
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASSWORD',
    'MAIL_FROM_EMAIL',
];

for (const variable of requiredEnvVariables) {
    if (!process.env[variable]) {
        throw new Error(`Missing required email environment variable: ${variable}`);
    }
}

export const emailTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    // Port 587 uses STARTTLS, so secure stays false; requireTLS forces the upgrade.
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
    requireTLS: true,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
});

const VERIFIED_FROM_ADDRESS = process.env.MAIL_FROM_EMAIL!;
const DEFAULT_FROM_NAME = process.env.MAIL_FROM_NAME || 'Blitz Paints';

export interface SendEmailOptions {
    to: string | string[];
    subject: string;
    html: string;
    text?: string;
    /** Display name shown as the sender - e.g. the enquiring customer's name. */
    fromName?: string;
    /** Where a reply should actually go - e.g. the customer's own email. */
    replyTo?: string;
    cc?: string | string[];
    bcc?: string | string[];
    attachments?: nodemailer.SendMailOptions['attachments'];
}

export async function sendEmail(options: SendEmailOptions) {
    try {
        const result = await emailTransporter.sendMail({
            from: {
                name: options.fromName || DEFAULT_FROM_NAME,
                address: VERIFIED_FROM_ADDRESS,
            },
            to: options.to,
            subject: options.subject,
            html: options.html,
            text: options.text,
            replyTo: options.replyTo,
            cc: options.cc,
            bcc: options.bcc,
            attachments: options.attachments,
        });

        console.log(`Email sent successfully: ${result.messageId}`);
        return result;
    } catch (error) {
        console.error('Email sending failed:', error);
        throw error;
    }
}

export async function verifyEmailConnection(): Promise<boolean> {
    try {
        await emailTransporter.verify();
        console.log('SMTP email connection verified successfully');
        return true;
    } catch (error) {
        console.error('SMTP email connection failed:', error);
        return false;
    }
}