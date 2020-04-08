let url_config = ""

if (process.env.NODE_ENV === 'development') {
	// 开发环境
	// url_config = 'http://120.78.70.56:8588'
	url_config = 'http://192.168.1.121:8022'
} else {
	// 生产环境
	// url_config = 'http://120.78.70.56:8588'
	url_config = 'http://192.168.1.121:8022'
}

export default url_config
