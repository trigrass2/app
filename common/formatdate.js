const formateDate = (datetime) => {
	function addDateZero(num) {
		return (num < 10 ? "0" + num : num);
	}
	var d = new Date(datetime);
	var formatdatetime = d.getFullYear() + '-' + addDateZero(d.getMonth() + 1) + '-' + addDateZero(d.getDate()) + ' ' +
		addDateZero(d.getHours()) + ':' + addDateZero(d.getMinutes()) + ':' + addDateZero(d.getSeconds());
	return formatdatetime;

}

export default formateDate;

