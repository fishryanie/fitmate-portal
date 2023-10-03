module.exports = {
  apps: [
    {
      name: 'fitmate',
      script: './dist/src/main.js',
      watch: '.',
      instances: 2,
      exec_mode: 'cluster',
      wait_ready: true,
      listen_timeout: 20000,
      kill_timeout: 5000,
    },
  ],
};
