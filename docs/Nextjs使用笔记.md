文章主要摘自：https://juejin.im/post/5b83e1776fb9a01a2022879b

- github 地址：https://github.com/guopingxiao/next-ssr

## Next.js 服务端渲染

先来说一下服务端渲染吧，目前做的项目确实是服务端渲染的，但是不是我搭的，我个人写的一些东西都不是服务端渲染的，所以自己动动手试试官方的`Next.js`，知识这东西就是拿来分享学习的嘛，学会了就是我的~哈哈

### 1.1 客户端渲染

最原始的前端，页面在浏览器获取到 JavaScript 和 CSS 等文件之后开始渲染，完全在客户端（也就是浏览器），路由是客户端路由，也就是现在大部分的 SPA 单页应用。

### 1.2 服务端渲染

页面由服务端渲染过后直接返回 html 页面给前端，url 的变更会刷新整个页面，也就是以前的 php 和 jsp 模式

### 1.3 同构

高端点的词 Universal APP，为什么要同构，因为客户端渲染存在一个缺点，就是首屏加载过大文件或过多文件会变得特别慢，因此可以把首屏放在客户端来渲染来提升首屏速度，首屏加载过后路又开始交给客户端控制，又变成了 SPA 应用，整个代码都是用 JavaScript 来编写，服务端采用 nodejs。

## 2 开始一个 Nextjs 应用

学习编程的我们都知道，入门系列是 hello world，这里我觉得 next.js 还是挺友好的，因为它真的免除了我们平时所理解的服务端渲染的各种繁杂配置，只需要简单的几步就可以新建一个 Universal App。

### 2.1 安装依赖

好吧，你只需要新建一个文件夹，然后运行下面一段命令

```js
// 初始化应用
yarn init
// 安装三个依赖
yarn add react react-dom next
// package.json配置启动
{
    ...
    // 新增启动方式，选择使用next启动
    "script": {
        "dev": "next"
    }
    ...
}
```

OK，你已经完成了基于 next 的服务端搭建，是不是真的很简单。

接下来我们运行一下 yarn dev。

what?居然报错了，好吧，原来 Next.js 默认从 pages 目录下取页面进行渲染返回给前端展示，并默认取 pages/index.js 作为系统的首页进行展示。因此，我们需要新建一个 pages 目录。接下在再重新启动一下试试。

### 2.2 新建 pages 文件夹以及文件

因为 3000 经常被另一个项目使用，所以我把启动端口改成 3006 了，修改 script 的启动方式即可：

```json
"script": {
    "dev": "next -p 3006"
}
```

然后我们访问 http://localhost:3006：

ok,得到了一个非常简洁的一个页面，讲道理，我很喜欢这种简洁的页面。为啥 404 了呢，原来我们只新建了 pages 目录，刚刚也说了，它默认根路由页面是 pages 下的 index.js，所以我们新建一个 index.js。

```js
const Home = () => <h1>我是Next的首页</h1>;
export default Home;
```

ok,现在就没啥问题了。因为 next.js 默认开启服务端渲染，也就无需我们进行任何的配置，因此现在这个极其简单的应用就是一个 Universal React APP。从页面元素我们也可以看出来：

### 2.3 Next 路由

看到这里，新手小伙伴应该跟我一样感叹 Next.js 强大的同时也会有一个疑问，等一下，怎么就渲染了?路由你都没配置凭啥就出首页了，一般的 SPA 至少也会配置路由才能进行页面跳转，这里没配置路由首页出来了我还有其他页面呢，怎么办？

这些东西还都是 Next 给我们配置好的，刚才说了 Next.js 默认匹配 pages 目录的 index.js 作为根路径/，其他的路径也是这样按文件名匹配的。

而我们的各种路由跳转依赖的不再是 react-router 而是 next.js 给我们封装好的路由（其实 redux 也是，后面会说到）。

```js
// /pages/index.js页面 ----> /
import React, { Fragment } from 'react';
import Link from 'next/link';
const Home = () => (
  <Fragment>
    <h1>我是Next的首页</h1>
    <Link href="/userList">
      <a>用户列表页</a>
    </Link>
  </Fragment>
);
export default Home;
```

```js
// -- /pages/userList.js ----> /userList
const UserList = () => <h2>我是用户列表页</h2>;
export default UserList;
```

厉害了我的哥，不仅跳转成功，而且对应的 history 也都帮我们封装好了，后退也都正常，而且可以看到，我们无需在前端或者 node 端配置任何路由相关，只需要按照它的模板去写就可以了。并且前端页面的跳转也是无刷新的~

> 不过萝卜白菜各有所爱，虽然个人觉得很强大但是看不到路由还是感觉怪怪的，而且写法也有变化，也就是路由必须在 pages 路径下才可以，这样工程大了以后岂不是会很混乱，而且页面和路由融合在一起 redux 怎么办，感觉很臃肿啊，作为一个刚从纯前端 SPA 过度过来的肯定很别扭，我觉得不可能这么 low 吧，肯定不会吧，稍后再探索吧。

## 3. 接入 AntDesign

个人对于脚手架的 UI 有一种执念，如果搭建出来就是一个首页＋ a 标签跳转，实在不是我这个处女座的风格，因此第二步我就想引用 UI 框架 —— `ant-design`，相信很多使用 react 的开发者用的也都是这个 UI 框架吧。因为以前自己在配制的时候也经常采坑，所以还是在这里记录一下~

### 3.1 安装依赖

既然是安装 ant-design，那么这两个东西肯定是不能少的，一个是 antd 另一个就是 antd 官方的按需加载 babel 插件`babel-plugin-import`。

```shell
// 安装依赖
yarn add antd babel-plugin-import
```

因为现在开发环境大部分过渡到 ES6/ES7 语法了，因此还需要安装一个 babel 的装饰器转化插件`babel-plugin-transform-decorators-legacy`，说实话这个插件具体是干啥的我还真没太仔细看，不过装上它在 babel 里配置就可以使用 antd 了。

当然还有其他方法，我这里只是使用了这一种方法~

```json
// 根目录新建.babelrc文件
{
  "presets": ["next/babel"],
  "plugins": [
    "transform-decorators-legacy",
    [
      "import",
      {
        "libraryName": "antd",
        "style": "css"
      }
    ]
  ]
}
```

配置好了，我们来试一试，`yarn dev`启动项目，额，一大堆报错，为啥呢？因为原本在其他脚手架配置的时候需要在 webpack 里配置一些东西嘛，这个怎么可能没有配置文件呢？
当然有了，只不过改名了，叫做`next.config.js`了，我们在服务端跑正常的 css 是不可以的。我们可以引入一下 next-css 这个包，然后`require.extensions['.css']`，还是那句话，我不理解，以后再深入研究一下，目前目的是可用~但是配置方案查到了就在这里写一下。

```shell
// 安装依赖
yarn add @zeit/next-css
```

```js
// 根目录下创建next.config.js，内容如下
/* eslint-disable */
const withCss = require('@zeit/next-css');
// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {};
}

module.exports = withCss();
```

好了，现在我们在启动，就没有报错了，毕竟是官方解决方案，还是好使~把首页的 a 标签换成 antd 的 button 试试效果,效果是下面这样：

额，果然没这么简单，这又咋的了，也没有任何报错，也没有任何提示，显而易见就是样式没加载进来吧。。。继续查，OK，明白了，其实 antd 的样式已经有了，只不过在页面上没被引进来。为什么这么说呢？

- 第一个就是渲染出来的页面 head 标签里没有任何的 CSS 样式，
- 第二个就是 antd 的样式文件已经被打包放进.next 文件夹的 static 文件夹里面了。
  原因找到了，接下来就是解决问题了

### 3.2 Next.js Head 组件

解决问题就是我们需要把那个 style.css 放到页面里，但是我翻遍了整个工程目录，都没有找到正常 React SPA 的那个 index.html，尴尬了，有问题还是得找官方文档啊，查完过后发现了这个东西，Head，想看具体的可以点进去看官网，写的挺详细的~，就是我们可以使用这个 head 组件来为我们的页面添加 head 信息。

```js
// /pages/index.js
import React, { Fragment } from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import Head from 'next/head';
const Home = () => (
  <Fragment>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <title>Next-Antd-Demo</title>
      <link rel="stylesheet" href="/_next/static/style.css" />
    </Head>
    <Fragment>
      <h1>我是Next的首页</h1>
      <Link href="/userList">
        <Button type="primary">用户列表页</Button>
      </Link>
    </Fragment>
  </Fragment>
);
export default Home;
```

OK,到现在而言是不是有点 NB 了，O(∩_∩)O 哈哈~，真的是采坑系列啊，配置一个 UI 组件就这么麻烦。估计接下来有坑可踩啦！

### 3.3 抽离 Head 为 Layout

一般的应用都会有个菜单 Menu 导航条之类的嘛，所以页面就做页面的事情，head 放里面感觉怪怪的，还是按照习惯把 Head 抽离出来当成一个高级父组件吧。个人习惯，就新建了一个 components 文件夹，里面新建 Layout.js。

```js
// /components/Layout.js
import Head from 'next/head';
export default ({ children }) => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <title>Next-SSR-Demo</title>
      <link rel="stylesheet" href="/_next/static/style.css" />
    </Head>
    <style jsx global>{`
      body {
      }
    `}</style>
    {children}
  </div>
);
```

```js
// /pages/index.js
import React, { Fragment } from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import Layout from '../components/Layout';
const Home = () => (
  <Layout>
    <Fragment>
      <h1>Hello Next.js</h1>
      <Link href="/userList">
        <Button type="primary">用户列表页</Button>
      </Link>
    </Fragment>
  </Layout>
);
export default Home;
```

讲到这里，整个 Antd 的配置基本就完成了吧，哈哈，没想到讲个 antd 配置能写这么多，真实厉害了~既然 UI 框架嘛，顺便我就把 CSS 也写了吧。看 Next 官网可以很明确了解到它推崇的是`css-in-js`，具体链接大家请点这里`Next Css-in-Js`，说白了，可以把它理解成用类 Vue 的形式写 React，组件内部使用下面这种形式来修改样式

```js
 <style jsx>{`
      p {
        color: blue;
      }
      div {
        background: red;
      }
      @media (max-width: 600px) {
        div {
          background: blue;
        }
      }
    `}</style>
    <style global jsx>{`
      body {
        background: black;
      }
    `}</style>
```

这里需要注意的是，组件内部的 css 并不是子组件继承父组件，就是组件内部使用，如果想要子组件继承父组件样式，需要将`style jsx`改成`style global jsx`这种形式，说实话，越看越像 Vue，
除了上面那种官方推荐的方法以外，还有其他很多种 Css-in-Js 的样例，其中个人还是比较推荐 styled-components 的，大家感兴趣可以去看官方文档，写的真的很不错。

> 以前我在用 antd 的时候，都会根据重置一下自带配色以及一些其他的默认属性，这里我才用了以前的方式结果出错了，以前的方式是依赖 babel-plugin-import，在 babelrc 文件里将"style": "css"改成"style": true，这样，babel-plugin-import 会加载.less 文件，然后在 webpack 里面配置 less-loader 的 modifyVars 变量进行覆盖：

```json
config.module.rules.push({
  "test": /\.less$/,
  "use": [
    {
      "loader": "style-loader"
    },
    {
      "loader": "css-loader"
    },
    {
      "loader": "less-loader",
      "options": {
        "sourceMap": true,
        "modifyVars": AntdTheme
      }
    }
  ]
})
```

但是在 next 框架里如果使用 less 方式引入服务端渲染会过不去，这算是一个坑？用下面这种方式就好了，无关痛痒~

```js
<style jsx global>{`
  .ant-btn-primary {
    background-color: #ec6a00;
  }
`}</style>
```

你看，也可以改，不过个人觉得 antd 的配色还是挺不错的，哈哈，就别改了。我认为官方后续会增强的吧！

可能官方早就有解决方案了吧，只不过我还是不太会用？因为我看除了`next-css`包以外还提供了`next-less`包，这个包应该就是用来加载 less 文件的吧我看了一下这个包还支持`css-modules`，不过我配置了一下还是不太对，并且我对目前这种写法还觉得挺舒服的，就不多浪费时间了，大家感兴趣的可以攻克一下，解决了可以留言个地址给我，万分感谢~

## 4 目录重构

来说一说为什么要目录重构吧，Next.js 很强大，为我们封装了路由，只需要在 pages 下面新建 js 文件，里面写上我们熟悉的页面也就是 react 组件，就会渲染出来！
其实对于开发来说没区别，但是项目庞大以后，一个路由对应一个 js 文件，但是如果页面很复杂其实不是这个 React 组件也会很复杂，不是很符合组件化理念，后期也不好维护啊。而且，肯定要加 redux 的，这样的话就更加混乱了。所以现在趁着还清醒，赶快重新构建一下~

### 4.1 抽离 Layout

首先，我们在跟目录下新建一个 components 文件夹，专门用来放我们的组件，新写一个 Header.js：

```js
// /components/Header.js
import React, { Component } from 'react';
import Link from 'next/link';
import { color_youdao, color_youdao_border } from '../constants/CustomTheme';

class Header extends Component {
  constructor(props) {
    super(props);
    const { title } = props;
    this.state = { title };
  }

  render() {
    const { title } = this.state;
    return (
      <div className="header-container">
        <Link href="/">
          <div className="logo-container">
            <img className="logo" alt="logo" src="/static/logo.png" />
            <span className="sys-name">XXX系统</span>
          </div>
        </Link>
        <h2>{title}</h2>
        <style jsx>{`
          .header-container {
            height: 60px;
            background-color: ${color_youdao};
            border: 1px solid ${color_youdao_border};
            margin-bottom: 10px;
          }
          h2 {
            text-align: center;
            line-height: 60px;
            font-size: 1.6rem;
            font-weight: 500;
            color: #fff;
          }
          .logo-container {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            top: 15px;
            left: 20px;
            cursor: pointer;
          }
          .sys-name {
            display: inline-block;
            margin-left: 10px;
            font-size: 20px;
            color: #fff;
            font-weight: 600;
          }
          .logo {
            width: 30px;
            height: 30px;
          }
        `}</style>
      </div>
    );
  }
}

export default Header;
```

然后，把`Layout.js`里面加上 Header，然后我们每个组件都使用 Layout 嵌套，就完成了整个骨架的搭建~真的很简单！

```js
// /components/Layout.js

import { Fragment } from 'react';
import Head from 'next/head';
import Header from './Header';
export default ({ title, children }) => (
  <Fragment>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <title>Next-Antd-Demo</title>
      <link rel="stylesheet" href="/_next/static/style.css" />
    </Head>
    <style jsx global>{`
      * {
        margin: 0;
        padding: 0;
      }
      body {
        font-family: Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei',
          '微软雅黑', Arial, sans-serif;
      }
      .content-container {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `}</style>
    <Header title={title} />
    <div className="content-container">{children}</div>
  </Fragment>
);
```

OK，现在 Layout 组件就暂时算完成了。

### 4.2 抽离页面组件

上面提到过，pages 作为 next 的路由索引目录，那么我就想让它专心的做路由，就不要做组件的复杂逻辑了，因此，我想把组件的内部实现全部放在 components 文件夹下。然后路由页面只需要直接引用组件就可以啦~

```js
// /components/Home/Home.js 页面组件
import React, { Fragment } from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import Layout from '../Layout';
const Home = () => (
  <Layout title="首页">
    <Fragment>
      <h1>Hello Next.js</h1>
      <Link href="/userList">
        <Button type="primary">用户列表页</Button>
      </Link>
    </Fragment>
  </Layout>
);
export default Home;
```

```js
// /pages/index.js 路由组件
import Home from '../components/Home/Home';

export default Home;
```

其实很简单，但是这么看起来就很清晰嘛，O(∩_∩)O 哈哈~

### 4.3 静态资源引用

静态资源的引用比如图片，你可以使用 CDN 然后 src 直接填写 url，也可以通过工程内部的静态文件引用。Next 同样为我们提供了非常简便的方式，与引用 css 一样，css 是通过 Head 组件来引入页面的，静态文件 next 官网推荐我们在根目录新建一个 static 文件夹，然后静态文件放在 static 文件夹下，引用的时候使用绝对路径的形式，next 就会找到它们~就像下面这样：

```html
<img className="logo" alt="logo" src="/static/logo.png" />
```

### 4.4 抽离静态常量

然后就是抽离静态常量，这个就很简单了，新建一个 constants 文件夹，把我们经常用到的常量在里面定义好，然后就可以使用了，比如 CSS 的配色（从我选择的系统配色不知道小伙伴是不是能猜出来我是哪个公司的），^\_^比如后面引入 Redux 的 Action type。

```js
// /constants/ConstTypes.js
export const RoleType = {
  1: '管理员',
  10: '普通用户',
};

// 使用
import { RoleType } from '../../constants/ConstTypes';
```

现在基本暂时完成了目录重构（将来引入 redux 肯定还得重构一次）。目录结构如下：

```shell
-- root
   | -- components // 组件目录
   | -- constants  // 常量目录
   | -- pages      // 路由目录
   | -- static     // 静态资源目录
   | -- .babelrc
   | -- .eslintrc
   | -- .gitignore
   | -- package.json
   | -- ...其他配置文件
```

### 5 再谈路由

Next.js 的路由刚开始给我的感觉就是，我靠，很 NB 啊。但是慢慢的用起来发现，坑还真不少。前面也提到了，它是以 pages 下面的 js 文件作为路由路径惊醒匹配的，所以也就是说你想用到的页面全要以 js 文件的形式放进 pages，那么层级嵌套关系怎么办？ok，尝试了一下，很容易解决了。

### 5.1 路由层级

> [需求]： 与用户相关的包括用户列表，用户详细信息等等...这两个功能应该是同属于用户子模块，所以应该与首页不是同级关系。
> [解决办法]：pages 下面新建子目录 user 里面包括 userList.js 和 userDetail.js。
> -- pages
> | -- user

     | -- userList.js
     | -- userDetail.js

| -- index.js

可以看到，这样算是解决了一个问题。

### 5.2 路由参数

紧接着，问题又出现了，我们需要查看用户详情，以往来说，很容易想到 /user/userDetail/:username，这种嘛，参数通过 url 的 params 获取，但是，悲剧了。查了一下 Next.js 路由 API，人家没给你提供 params，只提供了 query。

### 5.3 query 形式路由

也就是说，暂时我们需要/user/userDetail?username=XXX 的形式来实现工程，虽然说没什么问题，但是可能每个人习惯不一样吧。当然，对于我这种好说话的人，我可以接受 O(∩_∩)O 哈哈~
// 其实 Next 的 Link 组件的 href 属性可以传入一个对象

```html
 <Link href={{ pathname: '/user/userDetail', query: { username: text } }}>
   <a>{text}</a>
 </Link>
```

ok，实现效果就是这样，反正符合预期，只是使用 query 代替 params 了。

P.S.真实是我不想费事搞这个东西，应该是可以解决的，稍后说我的想法

### 5.4 params 形式路由

下面我来说说我的理解吧：

> 首先，是为什么它不支持 params 形式的路由，前面提到过了，他是根据 pages 下的 js 文件来匹配路由的，那么你用 params 的路由势必`/user/userDetail/:username`，那么解析器会以为我应该寻找的是 pages 目录下面 user 目录下面 UserDetail 目录下面的`${username}`文件，不用想肯定找不到啊，这时候就是 404 页面了。所以这是我的理解，他为什么只使用 query。
> 其次，我认为两者只是形式上的区别，并没有本质上的区别，也就是实现效果是一样的，都能跳转到指定页面嘛，何必纠结呢？
> 最后，就是我看完路有部分的文档，我认为是可以做到 params 形式的跳转的，官方文档里可以自定义 server:

```js
// 官方文档自定义server
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (pathname === '/a') {
      app.render(req, res, '/b', query);
    } else if (pathname === '/b') {
      app.render(req, res, '/a', query);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(3000, err => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
```

从上面可以看出来，我们可以将 a 路由匹配到 b 页面。也就是我们可以把`/user/userDetail/:username`的路由匹配到`/user/userDetail?username=${username}`上面嘛。不就解决问题了 O(∩_∩)O 哈哈，机智如我，不过我没试验过，只是猜测，目前优先想开发一个系统，这里留坑，以后有机会再填~

### 5.5 路由填坑

上面在谈到 params 路由和 query 路由的时候，留了一个坑，在这里还是来解决一下

> 事实证明，就是我想的那样，可以使用 custom server 然后重新匹配路由渲染的页面就可以了。不过这样会出现一个小问题，就是在网速过慢的时候重新匹配的页面没渲染出来之前，控制台会出现报错，重新渲染之后消失。这就类似于 302，刚开始是 404 页面，然后被重定向到另一个，哈哈~

可以看一下控制台，会出现一个报错，但是这样确实会成功使用 params 的路由。而且我发现一个问题，第一次进新页面的时候 Next.js 渲染会特别的慢，不知道是不是一个 bug，还是我哪里写的有问题，再多研究研究~

### 5.6 报错问题

好吧，去官网 github 查了一圈，也有人跟我一样提了相同的 issue，最后我看了一下发现，原来写法出问题了，虽然可以正常执行，但是会在正确页面出现之前 404 以下。处女座的我不能忍受还是改回来吧~

```js
// 路由应该这么写
<Link
  href={`/user/userDetail?username=${text}`}
  as={`/user/userDetail/${text}`}
>
  <a>{text}</a>
</Link>;
// server.js
server.get('/user/userDetail', (req, res) => {
  return app.render(req, res, `/user/userDetail/${req.query.username}`);
});
```

上面那样就可以了，具体代码在下方~

### 5.7 开发模式下首次加载 antd 不出样式

最后，我还是把 antd 的 css 形式换成了 less 形式，一方面是因为确实配置主题色以及其他覆盖样式还是有需求的，另一方面是重点了，在开发模式下，next.js 打开新页面的 pending time 实在过长，这个过长的 pending time 导致第一次 antd 的样式加载不出来。而换成 less 的模式虽然也很慢，但是样式却不会发生改变，所以还是切换到 less 了。

可以看出来，同样是到新页面去渲染一个 table 组件，虽然第一次加载时间都很长，但是 less 的形式是可以加载出来 css 的。哈哈。所以还是使用 less 吧，开发模式下，所有页面的第二次加在都没有问题，速度也很快。

next.js 的生产环境还是比较快的，开发环境打开第一次新页面确实有点慢，基本都要 5s 左右...

### 5.8 生产模式

上面截图也看到了，Next.js 在开发模式下页面第一次的 pending 时间是非常长的，基本都要达到 5s 左右，当然也可能是我写的代码有问题？不过我去官方 demo 下面随便用了一个，也是很慢的。

不禁我就思考了，如果上线项目第一次加载也这么慢，怎么可以呢？正在我考虑要不要半途而废的时候，我尝试了一下用生产模式打包一下，如果打包完生产环境首次加载也特别慢，那么不扯淡呢吗？拜拜了您嘞~

因为我用的`custom-server`，所以 scripts 变成了下面这样:

```json
"scripts": {
    "dev": "node server.js",
    "build": "next build",
    "start": "set NODE_ENV=production && node server.js"
  },
```

打包完之后也是正常访问，下面是打包完以后的访问效果。

可以看到，无论是首次加载页面，还是第一次进入其他页面，速度都是挺快的, 所以我原谅了开发时的慢速度了，还是接着学吧，O(∩_∩)O 哈哈~

## 6 集成 Redux

> 一个程序员为了不长房租答应房东教他孩子学习编程^\_^北漂不易，且行且珍惜~希望每一个北漂程序员都能早日财富自由，如果实在太累了就换个城市吧~

### 6.1 继续填坑

上一讲有关路由的坑还是没填明白，原本 params 路由自认为已经没问题了，不过最近在测试的时候，发现进入系统的时候是没问题的，但是如果在 params 路由页面进行刷新，会 404 页面。所以，继续 fix ～

```js
// server.js
server.get('/user/userDetail', (req, res) => {
  return app.render(req, res, `/user/userDetail/${req.query.username}`);
});

server.get('*', (req, res) => {
  const parsedUrl = parse(req.url, true);
  const { pathname } = parsedUrl;
  if (
    typeof pathname !== 'undefined' &&
    pathname.indexOf('/user/userDetail/') > -1
  ) {
    const query = { username: pathname.split('/')[3] };
    return app.render(req, res, '/user/userDetail', query);
  }
  return handle(req, res);
});
```

上面这样就真的可以了，刷新页面也没有任何问题～

写过 react SPA 的大家应该基本都用过 redux，按照官方教程一顿复制粘贴基本都能用，需要注意的就是 redux 会创建一个全局唯一的 store 包在整个应用的最外层。喏，这个是 redux 官方的示例：

```js
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'

let store = createStore(todoApp)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
```

那么问题来了，我得有个东西让他包起来对不对，在 Next.js 上来就跟我说了，默认是 index，然后在组件里再使用 link 来进行跳转，这跟传统的 router 有点区别啊。怎么办呢？官方给我们的解决办法就是 APP，用它来实现将应用包成一个整体（原谅我这么理解了）。

> 注意了：下面也是约定俗成的
> 我们需要在 pages 文件夹下新建一个\_app.js 文件，不好意思其他名字不可以，然后写上如下代码，就可以啦~

```
// /pages/_app.js
export default class MyApp extends App {
  render () {
    const {Component, pageProps} = this.props
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    )
  }
}
```

ok，这样就可以了。因为我们什么也没干，只是在 pages 文件夹下增加了一个\_app.js，怎么来看是否起作用了呢，我打印了一下 props 的 router（因为稍后重构页面的时候会用到），可以看出来，虽然还是渲染的首页，但是控制台可以打印出 router 信息，所以还是那句话，既然选择了 Next.js 就需要按照它制定的规则来~

### 6.2 重构 Layout

前面文章说了，整个系统的架构大概就是上下布局，顶部导航栏是固定的，所以抽离出来了一个 Layout 组件，这样的话每一次每一个新组建外部都需要包一层 Layout 并且需要手动传 title，才能正确展示，有了 APP 这个组件我们就可以来重构一下 Layout，这样就不需要每个页面都包一层 Layout 了~

````js
// constants.js
// 路由对应页面标题
export const RouterTitle = {
  '/': '首页',
  '/user/userList': '用户列表',
  '/user/userDetail': '用户详情'
};
```// components/Home/Home.js
import { Fragment } from 'react';
import { Button } from 'antd';
import Link from 'next/link';

const Home = () => (
  <Fragment>
    <h1>Hello Next.js</h1>
    <Link href='/user/userList'>
      <Button type='primary'>用户列表页</Button>
    </Link>
  </Fragment>
);
export default Home;
````

```js
// /pages/_app.js

import App, { Container } from 'next/app';
import Layout from '../components/Layout';
import { RouterTitle } from '../constants/ConstTypes';

export default class MyApp extends App {
  constructor(props) {
    super(props);
    const { Component, pageProps, router } = props;
    this.state = { Component, pageProps, router };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.Component !== prevState.Component ||
      nextProps.pageProps !== prevState.pageProps ||
      nextProps.router !== prevState.router
    ) {
      return {
        Component: nextProps.Component,
        pageProps: nextProps.pageProps,
        router: nextProps.router,
      };
    }
    return null;
  }

  render() {
    const { Component, pageProps, router } = this.props;

    return (
      <Container>
        <Layout title={RouterTitle[router.pathname]}>
          <Component {...pageProps} />
        </Layout>
      </Container>
    );
  }
}
```

好啦，现在这样就可以了，内部可能也需要小改一下。总之 Layout 部分就抽离出来了。越来越有规范化的系统样子了~

这里说一点我的感想，因为 Next 帮我们做了很多配置的东西，所以在写起来的时候就是需要按照它的约定俗成的规则，比如路由，APP，静态资源这种。我觉得这样写有好处也有坏处吧，仁者见仁智者见智，至少我是挺喜欢的，因为出问题了看文档很快就会解决，其他的自行配置的 SSR 框架就会因人而异的出现各种莫名 bug，还不知道要怎么去解决~

### 6.3 状态管理 Redux 准备

react 这个框架只专注于 View 层，其他很多东西都需要额外引入，状态管理 redux 就是一个 React 应用必备的东西，所以慢慢的也就变成是 React 全家桶一员,关于状态管理机制不是这里所要讲的，太深奥了，还不太会的应该好好看看 react 相关知识了，这里只是讲在 Next.js 里如何引入 redux 以及`redux-saga`(如果喜欢用`redux-thun`k 可以用`redux-thunk`，不过我觉得 thunk 不需要配置啥，所以就用 saga 写例子了)。还是老样子，引入了新东西，就需要提前安装啊~

```shell
// 安装redux相关依赖
yarn add redux redux-saga react-redux
// 安装next.js对于redux的封装依赖包
yarn add next-redux-wrapper next-redux-saga
```

如果你使用的是单纯的客户端 SPA 应用（类似于 create-react-app 创建的那种），那么只安装 redux 和 redux-saga 就可以了，因为我们是基于 next.js 来搭建的脚手架，所以还是按照人家的标准来的~

了解 redux 的都知道，store，reducer，action 这些合起来共同完成 redux 的状态管理机制, 因为我们选择使用 redux-saga 来处理异步函数，所以还需要一个 saga 文件。因此我们一个一个来：

```js
store;
// /redux/store.js
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer, { exampleInitialState } from './reducer';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    // 开发模式打印redux信息
    const { logger } = require('redux-logger');
    middleware.push(logger);
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

function configureStore(initialState = exampleInitialState) {
  const store = createStore(
    rootReducer,
    initialState,
    bindMiddleware([sagaMiddleware]),
  );
  // saga是系统的常驻进程
  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  };

  store.runSagaTask();
  return store;
}

export default configureStore;
```

为了方便调试，开发时我又引入了`redux-logger`，用于打印 redux 相关信息。
老生常谈，这次我也简单的来用 redux 官方最简单的示例计数器 Counter 来简单地实现了，最后的视线效果如下图：

```js
//actions
// /redux/actions.js
export const actionTypes = {
  FAILURE: 'FAILURE',
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET',
};

export function failure(error) {
  return {
    type: actionTypes.FAILURE,
    error,
  };
}

export function increment() {
  return { type: actionTypes.INCREMENT };
}

export function decrement() {
  return { type: actionTypes.DECREMENT };
}

export function reset() {
  return { type: actionTypes.RESET };
}

export function loadData() {
  return { type: actionTypes.LOAD_DATA };
}
```

```js
// reducer
import { actionTypes } from './actions';

export const exampleInitialState = {
  count: 0,
};

function reducer(state = exampleInitialState, action) {
  switch (action.type) {
    case actionTypes.FAILURE:
      return {
        ...state,
        ...{ error: action.error },
      };

    case actionTypes.INCREMENT:
      return {
        ...state,
        ...{ count: state.count + 1 },
      };

    case actionTypes.DECREMENT:
      return {
        ...state,
        ...{ count: state.count - 1 },
      };

    case actionTypes.RESET:
      return {
        ...state,
        ...{ count: exampleInitialState.count },
      };

    default:
      return state;
  }
}

export default reducer;
```

### 6.4 redux-saga

上面两个内容还没有涉及到 saga 部分，因为简单的 reudx 计数器并没有涉及到异步函数，所以使用 saga 这么高级的功能我们还需要请求一下数据～ 😄。正好有个用户列表页，我们这里使用下面这个 API 获取一个线上可用的用户列表数据用户数据接口

```js
/* global fetch */
import { all, call, put, take, takeLatest } from 'redux-saga/effects';
import { actionTypes, failure, loadDataSuccess } from './actions';

function* loadDataSaga() {
  try {
    const res = yield fetch('https://jsonplaceholder.typicode.com/users');
    const data = yield res.json();
    yield put(loadDataSuccess(data));
  } catch (err) {
    yield put(failure(err));
  }
}

function* rootSaga() {
  yield all([takeLatest(actionTypes.LOAD_DATA, loadDataSaga)]);
}

export default rootSaga;
```

然后在我们用用户列表页初始化获取数据，代码如下：

```js
import { connect } from 'react-redux';
import UserList from '../../components/User/UserList';
import { loadData } from '../../redux/actions';

UserList.getInitialProps = async props => {
  const { store, isServer } = props.ctx;
  if (!store.getState().userData) {
    store.dispatch(loadData());
  }
  return { isServer };
};

const mapStateToProps = ({ userData }) => ({ userData });

export default connect(mapStateToProps)(UserList);
```

说实话这个地方稀里糊涂弄出来的，next.js 与原本的 react 写法还是有些区别，状态容器和展示容器划分的也不是很分明，我暂时使用路由部分来做状态容器，反正也成功了，下一节来重新划分一下 redux 目录结构，争取让项目更加合理一些～

这次时间拖的比较久，真的抱歉，最近思路也有点断，不在科研状态，哈哈。希望大家不要见怪，开始静下心了！这里还是偏使用，远离还是建议大家去看 redux 相关文档，讲得更清楚，这里只是 next.js 怎么使用`redux-saga`。接下来想了一下，让工程目录更加合理，然后就是把 Next.js 还没涉及到的统一写几个 Demo 给大家示范一下～

## 7 目录再重构

上一节引入了 redux 以及使用`redux-saga`来进行异步函数的处理，而上一节的目录只是简单的引入 redux 而已，redux 可是相当庞大和复杂的，并且也算是个人习惯了吧。action 分离，reducer 分离，状态组件 container 等等。我喜欢把这些东西划分的清清楚楚，这样一个项目维护起来才会方便～这一节就从头到尾来进行目录的划分，因为 Next.js 和原本的 React SPA 项目有一定的区别，主要体现在路由部分，所以我也是按照自己的理解和舒服的方式进行目录重构！

**重构完的目录**

```shell
// ================ 目录结构 ================== //
——————
  | -- asserts         // ant-design全局less变量设置文件夹
  | -- components      // React展示组件(也就是UI组件)文件夹
  | -- constants       // 整个应用的常量文件夹
      | -- ActionsTypes.js   // 存放所有action type的常量文件
      | -- ApiUrlForBE.js    // 存放所有后端数据的apiUrl
      | -- ...
  | -- containers      // React状态组件文件夹
  | -- pages           // Next.js路由文件夹
  | -- redux
      | -- actions     // 处理整个应用所有的action
      | -- middlewares // 中间件，处理各种特殊情况，比如获取失败之后的message提醒
      | -- reducers    // 处理整个应用所有的reducer
      | -- sagas       // 处理整个应用所有的saga
      | -- store.js
  | -- static          // 存放整个应用所有的静态资源(如图片等)
  | -- .babelrc
  | -- .eslintrc
  | -- .gitignore
  | -- next.config.js  // Next.js配置文件
  | -- package.json
  | -- server.js       // 服务端server文件
  | ...
```

原谅我臭不要脸一下，个人认为这个结构还是非常清晰的，只不过可能新手写起来可能会觉得有些繁琐，不过项目大的情况下，state 树很大，这种结构非常的清晰～

### 7.1 重构 actions

其实 actions 完全可以放在一个文件里使用，不过项目庞大了以后维护起来还是有些麻烦的，所以按照组件化思想，每一个组件对应一个 action，或者每一个大功能块对应一个 action 还是比较合理的。

```shell
 -- redux
   | -- actions
       |  -- home.js // 处理首页action
       |  -- user.js // 处理与用户有关action
       |  ...        // 其他action
```

### 7.2 重构 reducers

reducer 部分肯定是要分离的，因为 redux 的官方为我们提供 combineReducer 这个 API 就是合并不同组件的 reducer 的，所以可以理解为 redux 的 reducer 推荐就是根据组件进行划分的～就如同整个应用只有一个状态树一样，每一个 reducer 负责处理树的不同枝叶派发出来的 action。具体 reducer 内容还是去看 redux 官方文档吧。

### 7.3 重构 sagas

```shell
 -- redux
   | -- reducers
       |  -- home    // 首页部分reducer
       |  -- user    // 用户相关reducer
       |  ...        // 其他reducer
       | index.js    // rootReducer，由combineReducer生成
```

### 7.4 抽离 container

这里需要特别说明一下～～～由于 Next.js 的特殊原因，其实已经做到了 UI 组件的分离，其实这一层 container 完全可以由 pages 文件夹代替，也就是可以用路由组件通过 react-redux 的 connect 函数封装一下，这样就变成了一个带状态的路由组件，不知道大家明不明白我说的话。。。下面是两种方法，大家按需自己采取，以 UserList 组件为例：

- 第一种，抽离 container

```js
    // /conatiners/user/UserList.js
    import { connect } from 'react-redux';
    import { fetchUserListData } from '../../redux/actions/user';
    import UserList from '../../components/User/UserList';

    const mapStateToProps = state => ({
      list: state.user.list.list,
    });

    const mapDispatchToProps = dispatch => ({
      fetchUserListData() {
        dispatch(fetchUserListData());
      }
    });

    export default connect(mapStateToProps, mapDispatchToProps)(UserList);

    // pages/user/userList.js
    import UserList from '../../containers/user/UserList';
    import { fetchUserListData } from '../../redux/actions/user';
    // 这部分内容下一章节讲～
    UserList.getInitialProps = async (props) => {
      const { store, isServer } = props.ctx;
      if (store.getState().user.list.list.length === 0) {
        store.dispatch(fetchUserListData());
      }
      return { isServer };
    };

    export default UserList;
```

简单来说其实就是路由组件导入的是状态组建 UserList.js，而状态组建是通过 react-redux 的 connect 方法封装 UI 组件 UserList.js 而得来的。

- 第二种，带状态的路由组件

```js
// /pages/user/userList.js
import { connect } from 'react-redux';
import UserList from '../../containers/user/UserList';
import { fetchUserListData } from '../../redux/actions/user';

UserList.getInitialProps = async props => {
  const { store, isServer } = props.ctx;
  if (store.getState().user.list.list.length === 0) {
    store.dispatch(fetchUserListData());
  }
  return { isServer };
};

const mapStateToProps = state => ({
  list: state.user.list.list,
});

const mapDispatchToProps = dispatch => ({
  fetchUserListData() {
    dispatch(fetchUserListData());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserList);
```

简单来说，就是在路由组件内把 UI 组件 UserList.js 通过 connect 变成了状态组件。

个人推荐第一种方法，虽然写起来稍微麻烦了一些，但是第二种方法完全是因为 Next.js 的特殊性才能实现的，当然，对于 Next.js 来说，第二种方式确实更简单一些～

经历了上面几个部分的重构，整个基于 Next.js 的服务端渲染脚手架基本结构也就成型了。在搭建过程中还是遇到了很多坑的，不过也都一点点的踩过去了。希望对大家有些帮助，个人认为这个结构还是值得参考一下的～原本到这里就可以结束文章了，不过我在使用过程又发现了一些坑，顺便的 Next.js 还有一些内容我还没碰过，就帮大家都踩一踩，下一节来一个其他内容的大杂烩～

## 8. Next.js 其他需要了解的知识点

### 8.1 获取数据&&getInitialProps

获取数据，依然是 Next 与普通的 React SPA 应用不同的地方，React 应用基本都有自己的路由组件（当然大部分是`react-router`），我们可以通过路由组件为我们提供的方法，比如`react-router`的`onEnter()`方法或者`universal-router`的`beforeEnter()`方法。

这里给大家推荐一个区别于`react-router`的路由组件`universal-router`

而 Next.js 没有路由组件，所以具体方式肯定不同于路由组件的方式，具体不同就体现在 Next.js 为我们提供了一个区别于 React 的新生命周期——`getIntialProps()`，下面来说说这个 API 的牛 X 之处。

**使用方法**

在 React.Component 使用

```js
import React from 'react';

export default class extends React.Component {
  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
    return { userAgent };
  }

  render() {
    return <div>Hello World {this.props.userAgent}</div>;
  }
}
```

在 stateless 组件内使用

```js
const Page = ({ stars }) => <div>Next stars: {stars}</div>;

Page.getInitialProps = async ({ req }) => {
  const res = await fetch('https://api.github.com/repos/zeit/next.js');
  const json = await res.json();
  return { stars: json.stargazers_count };
};

export default Page;
```

这个生命周期是脱离于 React 的正常生命周期的，不过我们依然可以在组件里正常使用 react 组件的各种生命周期函数。

### 8.2 服务端可用

这真是`getInitialProps`这个生命周期的过人之处了，他可以在服务端运行，这样做有什么好处呢？减少抓取数据的次数

- React 老生命周期内获取数据
  以抓取用户列表为例，我们可以在组件里的`componentDidMount`生命周期内获取

```
 // /components/user/userList.js
 ...
 componentDidMount() {
    this.props.fetchUserList();
 }
```

从上图我们可以看出来，每次进入用户列表页，都会重新抓取用户数据。有人可能会说，这不废话吗，react 不就这样吗，路由都切换了啊。没错，正常就是应该这样，所以才说 Next.js 的这个新生命周期牛逼啊。

- 使用`getInitialProps`生命周期

```js
// /pages/user/userList.js
import UserList from '../../containers/user/UserList';
import { fetchUserListData } from '../../redux/actions/user';

UserList.getInitialProps = async props => {
  const { store, isServer } = props.ctx;
  if (store.getState().user.list.list.length === 0) {
    store.dispatch(fetchUserListData());
  }
  return { isServer };
};

export default UserList;
```

兄弟们发现没，进入系统后只会在第一次进入路由的时候获取数据，之后再进入因为服务端缓存过数据，所以不需要重新获取，减少了获取次数～

具体原因就是因为`static getInitialProps()`这个生命周期是可以在服务端运行的，当页面第一次加载时，服务器收到请求，`getInitialProps()`会执行，`getInitialProps()`返回的数据，会序列化后添加到 `window.__NEXT_DATA__.props`上，写入 HTML 源码里，类似于。这样服务端的`getInitialProps()`就实现了把数据传送给了客户端。当我们通过 Next.js 的路由 Link 来进行页面跳转的时候，客户端就会从`window.__NEXT_DATA__`里获取数据渲染页面，就无需重新获取数据，算是提升性能的话一种方式吧～

## 8.3 存在问题——踩坑

这里其实还真遇到一个坑，可能有很多人遇到过了，也可能没人遇到过。具体问题描述起来大概是这个样子，我们在`getInitialProps`里面预获取数据，以用户列表为例，在首次加载的时候都是没有问题的包括各种客户端跳转。不过当我们在用户列表页面进行刷新的时候，其实他就没有再走`getInitialProps`这个生命周期了，因此页面会没有可以渲染的数据，就会出现空页面，因为他认为这个应该从`window.__Next_DATA__`里面获取，而不是重新获取数据～那么为什么刷新页面之后没有走这个`getIntialProps`，讲道理，我还真没太弄清楚，不过确实刷新页面 next.js 会给我们在`props`里返回一个`isServer:true`，但是控制台并没有获取数据。

我们可以很清楚地看到，页面数据通过`redux-saga`获取，在 pages 的`getIntialProps()`里面，代码如下：

```js
import { fetchUserListData } from '../../redux/actions/user';

UserList.getInitialProps = async props => {
  const { store, isServer } = props.ctx;
  if (store.getState().user.list.list.length === 0) {
    store.dispatch(fetchUserListData());
  }
  return { isServer };
};
```

上面`fetchUserListData()`就是抓取数据的`action`，返回值就会存入 state，渲染数据列表。很明显，在第一次加载的时候是抓取成功的。但是刷新页面后，没有 dispatch 这个 action，也就是表明，刷新页面没有走这个`getIntialProps`这个生命周期！！！

上面才是关键问题所在，不刷新页面的情况下是正常的，刷新页面没有走这个生命周期，而我们很多数据都是需要预获取的，所以说还挺坑的，事实上，很多人遇到这个问题，而且我在 next 官方给出的`reudx-demo`里面也发现这个问题，也就是说他们官方的 demo 刷新也会出现这个问题。

### 8.4 解决办法

既然是踩坑，当然有解决办法啦～而且还是两种：

- 第一种：在组件生命周期里判断 isServer
  刚刚问题描述过了，也就是正常加载和通过路由跳转页面，数据会正常渲染且会从浏览器的`window.__NEXT_DATA__`获取来减少不必要的网络请求～，而在页面进行刷新的时候不会重新请求数据并且`window.__NEXT_DATA__`里也找不到我们想要的数据。不过通过控制台信息我们可以发现问题所在以及解决办法。那就是，第一次启动系统的时候返回的 isServer 是 false，而浏览器刷新页面的时候 isServer 返回的是 true，我们可以在组件里进行这个变量的判断，如果是 true，就重新进行一次数据抓取。

```js
// /components/user/UserList.js
...
componentDidMount() {
  if(this.props.isServer) {
  // 需要重新抓取数据
    this.props.fetchUserListData();
  }
}
...
```

从上图可以看到，刷新页面的时候，我们会重新获取数据渲染页面，如果不刷新就不会重新获取。还是可行的这个方法～

- 第二种：换一种方式预获取数据
  另一种方法就比较高级了，原理我依然不知道，但是就是好用，哈哈，这东西真是邪门，为什么这么说呢，其实本质没改变什么，就是换了种写法就可以。具体就是，上面的写法我在`getInitalProps`里面写了 dispatch 了一个获取数据的 action，从上一节或者代码里你们可以看到，其实这个 action 就是 fetch 一个 api 获取数据返回 state。这就是 redux 一个获取数据的基本过程，这种方法在刷新时行不通，而行得通的方法是：要通过`isomorphic-unfetch`这个来拉取服务端的数据。

```js
// /pages/user/userList
import fetch from 'isomorphic-unfetch';
import UserList from '../../containers/user/UserList';
import { fetchUserListDataSuccess } from '../../redux/actions/user';

UserList.getInitialProps = async props => {
  const { store, isServer } = props.ctx;
  let userData;
  if (store.getState().user.list.list.length === 0) {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    userData = await res.json();
    store.dispatch(fetchUserListDataSuccess(userData));
  }
  return { isServer };
};

export default UserList;
```

### 8.5 Document

这个组件从我使用的角度来看，作用跟我前几章有个地方的目的是一样的，就是我们在 Next.js 里没有类似`create-react-app`里面的 index.html。因此我们没有办法定义最后渲染的 html 的结构，比如 title，meta 等标签。我最开始是通过`next/head`的 Head 组件来实现的，但是 head 组件其实最后生成的就是 html 的 head 标签。而 Document 组件是完全帮助我们构造 html 结构。

```js
// 除去Layout的Head结构
// pages文件夹新增_document.js文件

// ./pages/_document.js
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <title>Next-SSR-Demo</title>
          <link
            rel="shortcut icon"
            href="/static/favicon.ico"
            type="image/ico"
          />
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
```

`document.js`是只在 Next.js 的服务端来进行渲染的，客户端只是拿到服务端渲染过后的 html 字符串渲染前端页面，上面提到的`window.__NEXT_DATA__`就是存放在`NextScript`里的。

### 8.6 Dynamic Import

其实以前在写服务端渲染项目的时候会遇到很多坑，最常见的就是比如我想引入一些外部组件，这些组件里有 window,document 等这种客户端变量，而这些变量在服务端是不存在的，因此在服务端渲染的时候就会报错，所以就很麻烦，需要 webpack 各种配置然后在异步引入。比如：富文本编辑器。而 next 直接为我们封装了动态引入的 import，不出意外用的应该就是 webpack 的 import 方法，管他呢，好用就行。下面就给大家简单是演示一下其中一个功能，就是动态引入一个富文本编辑器，然后空白期 loading 另一个组件～用法非常简单，就是下面这样：

```js
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(import('braft-editor'), {
  loading: () => <p>正在加载组件...</p>
});

render() {
    return (
      <Fragment>
        <h1>用户信息：{this.state.username}</h1>
        <div style={{ width: '50%', height: '400px', }}>
          <DynamicComponent />
        </div>
      </Fragment>
    );
  }
```

详细的 Next 为我们提供了更多的方法，感兴趣的可以去官网看文档，有四种异步引入的方法，其中还包含只在服务端引入～文档地址

### 8.7 error handling

错误处理，目前很多优秀的脚手架都为我们提供了错误处理，比如 404 和 500 的时候的页面渲染，Next.js 同样，内部自动为我们封装了`errorPage`。也就是我们其实什么都不用干，就可以享受这个服务。比如我在系统里随便输入一个网址，会出现下面的结果：

然后你还可以自己定义你的`errorPage`页面，方法非常的简单，就是在 pages 文件夹下面新建一个`_error.js`的文件，里面写上你的`errorPage`代码就可以了，下面就简单写一个，其实就是从官网扒下来的～

```js
// /pages/_error.js
import React from 'react';

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    return (
      <p>
        {this.props.statusCode
          ? `An error ${this.props.statusCode} occurred on server`
          : 'An error occurred on client'}
      </p>
    );
  }
}
```

ok,可以看到，很明显的生效了。虽然效果差不多，但是你如果按照自己的来写，肯定是没问题的。哈哈～

### 8.8 Static HTML export

又一个高级功能，它支持我们把各种路由导出成静态页面，不过你细想其实也没啥大用，毕竟我们项目都是有逻辑的，导出静态页面也不能操作，哈哈。不过既然是挺牛逼的一个功能，就拿来试试。

- 第一步，在 config 文件夹里配置一下页面和路由

```js
exportPathMap: async (defaultPathMap) => {
    return {
      '/home': { page: '/' },
      '/userList': { page: '/user/userList' },
    }
  },
```

- 第二步，package.json 添加 export 命令

```json
"scripts": {
    ...
    // 新增导出命令
    "export": "yarn build && next export"
  },
```

- 第三步，运行`yarn export`命令
  运行完命令之后，根目录下会出现一个 out 文件夹，真的是非常神奇，里面有页面文件夹和必要的静态资源。

然后我们打开`index.html`访问一下应该就是我们的首页了。

emm...这个首页有点奇怪，静态资源和 css 都不太对劲儿，至于为什么我就不去追究了，肯定有办法的。不过我只是试试功能，时间有限准备休息了，哈哈。感兴趣的大家自己研究研究。

## 9 总结

写到这里，Next.js 踩坑入门系列就写完了。非常感谢有很多小伙伴一直在看~~
