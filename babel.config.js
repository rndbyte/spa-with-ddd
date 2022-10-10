module.exports = (api) => {
    // This caches the Babel config
    api.cache.using(() => process.env.NODE_ENV);
    return {
        presets: [
            ['@babel/preset-env', { targets: { browsers: 'last 2 versions' } }],
            '@babel/preset-typescript',
            // Enable development transform of React with new automatic runtime
            ['@babel/preset-react', { development: !api.env('production'), runtime: 'automatic' }],
        ],
        plugins: [
            'babel-plugin-transform-typescript-metadata',
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-proposal-class-properties'],
            // Applies the react-refresh Babel plugin on non-production modes only
            !api.env('production') && 'react-hot-loader/babel',
        ],
    };
};
