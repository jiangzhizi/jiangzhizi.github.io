//禁止系统滚屏
$(document).on('touchmove', function(ev){
	ev.preventDefault();
});
//对于某容器，阻止冒泡即可不受限于上述系统对滚屏的限制策略
$('.content').on('touchmove', function(ev){
	ev.stopPropagation();
});