//预定义requestAnimationFrame，保持兼容
var RAF = 
    window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame || 
    function(callback){
        setTimeout(callback, 1000 / 60);
    };

var CRAF = window.cancelRequestAnimationFrame ||
	window.webkitCancelRequestAnimationFrame ||
	function(handle){
		clearTimeout(handle);
		handle = null;
	};