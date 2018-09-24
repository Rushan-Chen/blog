import mailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import config from '../config';

const transporter = mailer.createTransport(smtpTransport(config.email));
const SITE_ROOT_URL = `${config.url}`;

function sendMail (data) {
    const from = '<' + config.email.auth.user + '>';
    data.from = from;
    transporter.sendMail(data, err => {
        if (err) {
            console.log(err);
        }
    });
}

export function sendActiveMail(who, token, name) {
    // verify connection
    transporter.verify((err) => {
        if (err) {
            console.log(new Error(err.message));
            return;
        } else {
            console.log('Server is ready to take our messages');
        }
    });

    console.log(token);

    const to = who;
    const subject = `${config.name}社区账号激活`;
    const html = 
        `<p>Hello, ${name}</p>` +
        `<p>我们收到你在${config.name}Blog的注册信息，请点击下面👇的链接来激活账户：</p>` + 
        `<a href="/api/v1/activeAccount?key=${token}&name=${name}">激活链接</a>` +
        `<p>若你没有在${config.name}Blog填写过注册信息，说明有人滥用了你的email，请删除此邮件，造成打扰，我们感到抱歉。</p>` + 
        `<p>${config.name}谨上。</p>`;

    sendMail({
        to,
        subject,
        html
    });
};

