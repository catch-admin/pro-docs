# 安装

## 环境要求

| #   | 环境  | 版本    |
| :-- | :---- | :------ |
| 1   | PHP   | >= 8.2+ |
| 2   | Nginx | latest  |
| 3   | Mysql | >= 5.7  |

## 准备

在安装这个软件之前，您需要准备一些必要的工具，包括：

| #   | 必须                  | 官网                              |
| :-- | :-------------------- | :-------------------------------- |
| 1   | composer PHP 包管理器 | https://getcomposer.org/download/ |
| 2   | nodejs                | https://nodejs.org/zh-cn/         |
| 3   | yarn 前端包管理器     | https://yarn.bootcss.com/         |
| 4   | vite                  | https://cn.vitejs.dev/            |

## 下载源码

请首先在[授权网站](https://catchadmin.com/signup)进行注册，注册完成之后登录授权站点，在[授权页面](https://catchadmin.com/pro/user/license)购买授权。在购买完成之后
根据页面要求，在购买授权之后，将会拉你进入专业版仓库，然后在进行下面的操作

:::warning
注意一定要保存好授权网站的账户，因为需要进行身份认证，所以必须保存好
:::

## 下载代码

进入专业版仓库，复制仓库链接，使用 git clone 下载代码
请注意，该项目不提供 Web 安装方式，因此您需要使用命令行方式进行安装。在安装之前，请确保已经安装了 `composer` 包管理器。如果您使用的是 Mac OS 或者 Linux，可以在终端输入以下命令安装 composer：

```shell
// mac os
brew install composer

// linux
sudo apt-get install composer
```

如果您使用的是 Windows 系统，可以从 [composer](https://docs.phpcomposer.com/) 的官方网站下载 exe 安装文件进行安装。一旦您已经安装了 `composer`，接下来您可以进入 `CatchAdmin` 项目所在的目录，并运行以下命令进行安装：

### 密码认证

```shell
composer install
// 使用 composer install 会进行身份认证, 弹出让输入用户密码, 直接输入授权网站账户密码即可
```

这个命令会自动下载并安装`CatchAdmin`项目所需要的 PHP 包。

### 自动认证

如果使用 composer 命令安装不成功的话。可以使用这种办法。在根目录创建 `auth.json` 文件，然后编辑 `auth.json`，输入以下内容

```json
{
  "http-basic": {
    "satis.catchadmin.com": {
      "username": "邮箱", // https://catchadmin.com/pro 授权账户邮箱
      "password": "密码" // https://catchadmin.com/pro 授权账户密码
    }
  }
}
```

或者直接使用下面的命令创建

```sh
echo '{
        "http-basic": {
            "satis.catchadmin.com": {
                "username": "邮箱",
                "password": "密码"
            }
        }
}' > auth.json
```

创建成功之后，就不需要每次输入密码了。直接使用 `composer install` 方法即可

:::warning
系统会对每个账户下载来源统计，会对出现异常账户会进行一些限制，如果有误，请联系管理员
:::

除了 PHP 包之外，该项目还需要一些前端包。您可以使用以下命令安装这些包：

前端项目在根目录的 `web` 目录下

```shell
cd web

// 安装完 nodejs 之后, 再安装 yarn
npm install --global yarn

// 安装完成之后, 使用
yarn install
```

:::tip
如果遇到网络问题，或者安装过慢的情况，需要加上前端镜像，使用这个命令即可 `yarn config set registry https://registry.npmmirror.com`
:::

这样就可以安装所有需要的依赖包了。依赖安装完成之后，还需要安装项目的基本信息，如下

```shell
// 安装后台, 按照提示输入对应信息即可
php artisan catch:install

// 启动后台
php artisan serve
```

:::tip
如果到正式环境需要初始化项目，请使用 php artisan catch:install --prod
:::

## 前端项目

进入到 `web` 目录，然后配置一个 `.env` 文件, 内容如下

```shell
// 接口地址, 根据项目自己配置
VITE_BASE_URL=http://127.0.0.1:8000/api/
// 项目的主标题
VITE_APP_NAME=xxx管理后台
```

## 启动前端项目

```shell
yarn dev
```

::: warning
注意不能直接访问 PHP 项目，导致 Exception，前后端分离，需要通过 API 接口形式访问，所以你需要安装 VUE 项目后台，看到数据的展示

如果你是第一次使用 Vue，建议先去看看 [Vue](https://cn.vuejs.org/) 文档，了解一下
vue 后台使用了是 [element Plus 文档地址](https://element-plus.org)
:::

## 打包前端项目

打包前请先配置正是环境 API 地址。在项目的`web`目录下的`.env.production`文件配置

```php
# base api
VITE_BASE_URL = '正式环境的 API 地址'
```

然后进行打包

```php
yarn run build
```

:::tip
打包后开发工具，演示组件等页面将会被删除。需要注意 ⚠️
:::

::: warning
前端项目配置最好开启 `Gzip` 可以加速前端项目访问速度。
:::

## 推荐配置

```sh
http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip 配置
    gzip  on;
    gzip_min_length 1k;
    gzip_comp_level 4;
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript ;
    gzip_static on;
    gzip_vary on;
    gzip_buffers 8 16k;


    include /etc/nginx/conf.d/*.conf;
}
```

## 部署配置

```sh
server
{
    listen  443  ssl http2;
    server_name catchadmin.com;
    index admin.html index.html index.php index.htm default.php default.htm default.html;
    root root_path;

    ssl_certificate     pem_path;  # pem文件的路径
    ssl_certificate_key  key_path; # key文件的路径
    ssl_session_timeout  5m;    #缓存有效期
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;

    location /api {
       if (!-e $request_filename) {
        rewrite  ^(.*)$  /index.php?s=/$1  last;
        break;
      }
    }

    # 静态文件访问
    location ~ /uploads {
        root base/storage/;
        autoindex on;
    }

    location / {
        root admin_root_path; // 自定义 admin_root_path, 默认打包在 ./public/admin 目录下
        try_files $uri $uri/ /admin.html;
    }

    # PHP 支持
    location ~ \.php$ {
        try_files $uri /index.php =404;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass v3:9000;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}

```
