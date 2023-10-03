module.exports = {
  apps: [
    {
      name: 'FitMate',
      namespace: 'FitMate',
      script: './dist/src/main.js',
      autorestart: true,
      max_restarts: 10,
      max_memory_restart: 62500000,
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
