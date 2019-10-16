import urlConfig from './config';
import store from 'store/index'
/*
@param url 字符串
@param method 请求方法
@param data请求参数
*/
const request = (opt) => {
	// headers['Content-Type']= "application/json;charset=utf-8";
	const headers={
	    'Content-Type': 'application/json',
		'Authorization':store.state.uerInfo.token||''
	}
	return uni.request({
		url: urlConfig + opt.url,
		method:opt.method,
		data: opt.data,
		dataType: 'json',
		header: headers
	}).then(([error, res]) => {
		console.log('res',[error, res]);
		if (res.statusCode === 200  && res.data.code === 200) {
			return res.data;		
		} else {
			throw res.data
		}
	}).catch(error => {
		switch (error.code) {
			case 401:
				uni.clearStorageSync()
				break
			default:
				uni.showToast({
					title: error.message,
					icon: 'none'
				})
				// return Promise.reject()
				break
		}

	});
};

export default {request};
