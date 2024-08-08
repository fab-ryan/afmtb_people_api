module.exports = {
  apps: [
    {
      name: 'afmtp-api',
      script: 'npm',
      args: 'run start',
      env: {
        NODE_ENV: 'production',
      },
      watch_options: {
        usePolling: true,
      },
      before_restart: 'npm run build',
    },
  ],
};
