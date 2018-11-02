# blog

- Node.js v8.x
- MongoDB

安装MongoDB，推荐使用[Docker](https://www.docker.com)，创建一个MongoDB的容器。

MacOS用户可参考：[MacOS安装Docker、MongoDB](https://github.com/Rushan-Chen/JavaScript/blob/master/tutorial/MacOS-install-Docker.md)。

## 拷贝项目

```
$ git clone https://github.com/Rushan-Chen/blog.git
```

## 修改配置文件

复制`/src/config-default.js`到同个文件夹（`/src`）下，并重命名为`config.js`，然后修改`config.js`里的配置。

## 🏃跑起来

安装依赖包:

```
$ npm install
```

运行开发环境：

```
$ npm run dev
```

build:

```
$ npm run build
```
