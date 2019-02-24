module.exports = {
  apps: [
    {
      name: 'next-ssr',
      script: './server.js',
      cwd: './', // 当前工作路径
      watch: [
        '.next' // 监控变化的目录，一旦变化，自动重启
      ],
      ignore_watch: [
        // 从监控目录中排除
        'node_modules',
        'logs',
        'static'
      ],
      instances: 2,  // 启动2个实例
      node_args: '--harmony',
      env: {
        NODE_ENV: 'development',
        PORT: 3006
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      out_file: './logs/out.log', // 普通日志路径
      error_file: './logs/err.log', // 错误日志路径
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm Z' // 设置日志的日期格式
    }
  ]
};
