const loadTime = (timestamp1) => {
	let timestamp2 = new Date().getTime();
	let d = parseInt((timestamp2 - timestamp1) / 1000);
	if (d === 0) {
		setTimeout(function() {
			uni.hideLoading();
		}, 500);
	} else {
		uni.hideLoading();
	}
}
export default loadTime;