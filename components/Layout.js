import { Fragment } from 'react';
import Head from 'next/head';
import Header from './Header';
import '../asserts/styles.less';

export default ({title, children }) => (
  <Fragment>
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta charSet='utf-8' />
      <title>Next-Antd-Demo</title>
      <link rel='shortcut icon' href='/static/favicon.ico' type='image/ico'/>
      <link rel='stylesheet' href='/_next/static/style.css' />
    </Head>
    <style jsx global>{`
      * {
        margin: 0;
        padding: 0;
      }
      body {
        font-family: Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial, sans-serif;
      }
      .content-container {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `}</style>
    <Header title={title} />
    <div className='content-container'>
      {children}
    </div>
  </Fragment>
);


