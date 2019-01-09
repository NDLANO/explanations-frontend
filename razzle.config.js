const { modifyRule } = require('razzle-config-utils');

module.exports = {
    modify: (config, { target }) => {

        const appConfig = {...config};

        modifyRule(appConfig, { test: /\.css$/ }, rule => {
            rule.use.push({ loader: 'postcss-loader' });
        });

        if (target === 'node') {
            appConfig.output.publicPath = `${process.env.PUBLIC_PATH}`
        }
        return appConfig
    },
    plugins: ['scss'],
}