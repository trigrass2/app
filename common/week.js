let str = "";
const week = new Date().getDay();
if (week == 0) {
	str = "星期日";
} else if (week == 1) {
	str = "星期一";
} else if (week == 2) {
	str = "星期二";
} else if (week == 3) {
	str = "星期三";
} else if (week == 4) {
	str = "星期四";
} else if (week == 5) {
	str = "星期五";
} else if (week == 6) {
	str = "星期六";
}
export default str;