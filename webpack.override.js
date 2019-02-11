/**
 * Rename this file to webpack.override.js to use it.
 */

const webpack = require('webpack');
const path = require('path');

/**
 * Passed the current webpack configuration from core
 * @param  {Object} webpackConfig the .core webpack configuration
 * @return {Object} your webpack configuration override
 */
module.exports = webpackConfig => {
    const newWebpackConfig = {
        ...webpackConfig,
    };

    newWebpackConfig.resolveLoader = {
        modules: ['node_modules', path.resolve(__dirname, 'loaders')],
    };

    newWebpackConfig.module.rules.push({
        test: [/\.po$/],
        use: [
            {
                loader: 'po-loader',
            },
        ],
    });

    /**
     * @example
     *
     * newWebpackConfig.entries['entry'] = path.resolve('/path/to/my/entry');
     */

    /**
     * @example
     * newWebpackConfig.plugins.push(new webpack.ContextReplacementPlugin(/^my-context/, context => {
     *     context.request = path.resolve('./src/app/my-context');
     * }));
     */

    return newWebpackConfig;
};
