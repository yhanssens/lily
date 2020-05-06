const path = require('path');
const mix = require('laravel-mix');
const StylelintPlugin = require('stylelint-webpack-plugin');

Mix.paths.setRootPath(process.cwd());

mix
    .setPublicPath('dist')
    .js('resources/js/app.js', 'dist/js')
    .sass('resources/scss/app.scss', 'dist/css')
    .extract()
    .browserSync({
        proxy: 'http://lily.test',
        host: 'lily.test',
        open: false,
    })
    /* .options({
        extractVueStyles: true,
        globalVueStyles: 'scss/global.scss',
    }) */
    .webpackConfig({
        devtool: mix.inProduction() ? 'source-map' : 'eval-source-map',
        module: {
            rules: [
                {
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    enforce: 'pre',
                    exclude: /node_modules/,
                    options: {
                        formatter: require('eslint-friendly-formatter'),
                    },
                },
            ],
        },
        plugins: [
            new StylelintPlugin({
                files: ['**/*.?(vue|scss)'],
            }),
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'resources/js'),
            },
            extensions: ['.js', '.vue'],
        },
    });

if (mix.inProduction()) {
    mix.version();
}
