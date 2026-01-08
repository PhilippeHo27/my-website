module.exports = {
    apps: [{
        name: 'portfolio-resume',
        script: 'server.js',
        env: {
            NODE_ENV: 'development',
            PORT: 3005
        },
        env_production: {
            NODE_ENV: 'production',
            PORT: 3005
        }
    }]
};
