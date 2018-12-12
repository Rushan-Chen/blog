# blog

简介：含注册、登录功能，可查看，发表，修改，删除文章（增删改有权限限制）。

- 注册、登录
  - JWT 处理用户身份信息
  - bcrypt 加密用户密码
  - nodemailer 发送激活邮件
- 文章增、删、改、查
  - ejs 服务端渲染
  - vue 客户端渲染
  - marked、highlight 支持 Markdown
- 数据库 MongoDB

<video controls muted preload="auto">
  <source src="src/public/vedios/blog-demo.mp4" type="video/mp4">
  <source src="src/public/vedios/blog-demo.webm" type="video/webm">
  <p>Your browser doesn't support HTML5 video. Here is a <a href="src/public/vedios/blog-demo.mp4">link to the video</a> instead.</p>
</video>

## 前期准备

- Node.js v8.x
- MongoDB

安装 MongoDB，推荐使用[Docker](https://www.docker.com)，创建一个 MongoDB 的容器。

MacOS 用户可参考：[MacOS 安装 Docker、MongoDB](https://github.com/Rushan-Chen/JavaScript/blob/master/tutorial/MacOS-install-Docker.md)。

## 拷贝项目

```bash
git clone https://github.com/Rushan-Chen/blog.git
```

## 修改配置文件

复制`/src/config-default.js`到同个文件夹（`/src`）下，并重命名为`config.js`，然后修改`config.js`里的配置。

## 🏃 跑起来

安装依赖包:

```bash
npm install
```

运行开发环境：

```bash
npm run dev
```

build:

```bash
npm run build
```
