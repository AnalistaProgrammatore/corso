module.exports = {
  apps: [
    {
      name: 'load-balancer',
      watch: true,
      script: 'load-balancer.js'
    },
    {
      name: 'process-1',
      watch: true,
      script: './cluster.js',
      env: {
        NODE_ENV: 'development',
        PORT: '8081'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: '3001'
      }
    },
    {
      name: 'process-2',
      watch: true,
      script: './cluster.js',
      env: {
        NODE_ENV: 'development',
        PORT: '8082'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: '3002'
      }
    }
  ]
}