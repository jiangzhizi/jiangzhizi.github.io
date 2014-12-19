//添加SeaJS、AMD、CommomJS支持
var Obj = {
	//body...
};

// 添加 Sea.js 和 AMD 库支持. [ require.js... ]
if (typeof define === 'function') {
	define(function() {
		return {
			Obj: Obj
		};
	});
}

// 添加 CommomJS 库支持.
if (typeof exports !== 'undefined') {
	exports.Obj = Obj;
}

// 不支持 CommonJS 和 AMD/CMD 定义全局变量
if (typeof window !== 'undefined') {
	window.Obj = Obj;
}