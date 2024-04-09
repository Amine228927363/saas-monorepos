import nodemailer from 'nodemailer';
import { Customer } from 'src/types/customers.js';

async function sendWelcomeEmail(customer: Customer): Promise<void> {
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'aminesaleh944@gmail.com',
      pass: 'aminesala72002',
    },
  });

  let info = await transporter.sendMail({
    from: '"Amine" <aminesaleh944@gmail.com>',
    to: customer.email,
    subject: 'Welcome to Our Platform!',
    text: `Hello ${customer.name},\n\nWelcome to our platform! We're excited to have you on board.`,
  });

  console.log('Message sent: %s', info.messageId);
}

export { sendWelcomeEmail };
