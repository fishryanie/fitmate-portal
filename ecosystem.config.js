module.exports = {
  apps: [
    {
      name: 'Fitate',
      namespace: 'Fitate',
      script: './dist/src/main.js',
      autorestart: true,
      max_restarts: 10,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      exec_mode: 'cluster',
    },
  ],
};
