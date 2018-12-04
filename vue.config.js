module.exports = {
	baseUrl: '/',
	outputDir: 'dist',
	// Generate sourceMap for production build?
	productionSourceMap: true,

	parallel: require('os').cpus().length > 1,
	devServer: {
		open: process.platform === 'darwin',
		host: '0.0.0.0',
		port: 8080,
		https: false,
		hotOnly: false,
		proxy: null, // String | Object
		before: _ => {
		}
	},
	chainWebpack: config => {
		// 增加sass-reource-loader
		const ofs = ['vue-modules', 'vue', 'normal-modules', 'normal'];
		const cssRules = config.module.rule('css');
		const scssRules = config.module.rule('scss');
		const postRules = config.module.rule('postcss');

		const addSassResourcesLoader = (rules, type) => {
			rules.oneOf(type).use('sass-resoureces-loader').loader('sass-resources-loader').options({
				resources: ['./src/assets/mixin.scss', './src/assets/var.scss']
			});
		};
		ofs.forEach(type => {
			addSassResourcesLoader(cssRules, type);
			addSassResourcesLoader(scssRules, type);
			addSassResourcesLoader(postRules, type);
		});
		return config;
	}
};
