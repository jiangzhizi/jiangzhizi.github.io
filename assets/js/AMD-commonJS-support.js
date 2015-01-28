//添加SeaJS、AMD、CommomJS支持
var FastClick = {
	//body...
};

if (typeof define !== 'undefined' && (define.amd || define.cmd)) {
	// AMD. Register as an anonymous module.
	define(function() {
		'use strict';
		return FastClick;
	});
} else if (typeof module !== 'undefined' && module.exports) {
	module.exports = FastClick;
} else {
	window.FastClick = FastClick;
}