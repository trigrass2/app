let url_config = ""

if (process.env.NODE_ENV === 'development') {
	// 开发环境A
	// url_config = 'http://120.78.70.56:8012'
	url_config = 'http://192.168.16.15:8012'
} else {
	// 生产环境
	// url_config = 'http://120.78.70.56:8012'
	url_config = 'http://192.168.16.15:8012'
}

export default url_config
