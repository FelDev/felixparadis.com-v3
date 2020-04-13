
module.exports = {
	plugins: {
		autoprefixer: {
			Browserslist: [
				"last 3 versions"
			]
    },
    cssnano: {preset: 'default'},
    
    // '@fullhuman/postcss-purgecss': {
    //   content: [
    //     './themes/hugo-coder/layouts/**/*.html', 
    //     './themes/hugo-coder/assets/js/*.js',
    //     './themes/hugo-coder/static/js/*.js',
    //     './layouts/**/*.html',
    //     './static/js/*.js'
    //   ],
    //   whitelist: [
    //     'highlight',
    //     'pre',
    //     'video',
    //     'code',
    //     'content',
    //     'fa',
    //     'fab',
    //     'fa-2x',
    //     'fa-github',
    //     'fa-medium',
    //     'fa-linkedin',
    //     'fa-twitter',
    //     'fa-codepen',
    //     'fa-stack-exchange',
    //   ]
    // }
	},
}

