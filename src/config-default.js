export default {
    cookieName: 'set-your-cookie-name', 
    jwtSecret: 'set-your-secret-key', // 务必修改
    mongodbUrl: 'mongodb://192.168.99.100:32769/blog', // 务必修改，你的mogodb URL
    admin: 'admin',
    aessionSecret: 'set-your-secret-key', // 务必修改
    email:{                     // 根据自己的邮箱修改
        host: 'smtp.example.com',
        port: 465,
        secure: true,
        auth: {
            user: 'your_email@example.com', 
            pass: 'pass-key'
        }
    },
    name: 'your-blog-name',
    url: 'localhost:' + '3000' 
};