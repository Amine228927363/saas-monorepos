import nodemailer from 'nodemailer';
import { env } from 'process';
import { Customer } from 'src/types/customers.js';
import { shareEmail } from 'src/types/email.js';
import { User } from 'src/types/users.js';

async function sendEmail(user: shareEmail): Promise<void> {
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    secure: false,
    port: 587,
    auth: {
      user: 'mouhamedaminebensaleh57@gmail.com',
      pass: 'zzph lwio idnx oetc',
    },
  });

  const info = await transporter.sendMail({
    from: '"Amine" <aminesaleh944@gmail.com>',
    to: user.email,
    subject: 'Collaborate on Tasks: Invitation to Amine Platform!',
    html: `
      <p>Hello ,</p>
      <p>We'd like to invite you to collaborate on tasks with us on the Amine Platform!</p>
      <p>To access the shared tasks and start collaborating, click the following link:</p>
      <p><a href="${user.link}">${user.link}</a></p>
      <p>**This link will give you access to the specific tasks we want to collaborate on.**</p>
      <p>If you haven't already, you can create a free account on the Amine Platform to manage your tasks and collaborate effectively.</p>
      <p>We're excited to work with you!</p>
      <p>Sincerely,</p>
      <p>The Amine Platform Team</p>
    `,
  });

  console.log('Message sent: %s', info.messageId);
}

export { sendEmail };
