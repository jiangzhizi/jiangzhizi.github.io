/* 
 * 使用链式写法来实现按顺序播放的动画。
 * 也支持嵌套写法。
 * 对于需要按照先后顺序播放的动画，监听 animationEnd 和 transitionEnd，并使用 setTimeout 作为降级方案。
 * zepto必需包含模块： callbacks 和 Deferred 。见文档：http://www.css88.com/doc/zeptojs_api/
 * 
 * 使用示例1，链式写法：
 * $.when(fun)
 *    .then(fun)
 *    .then(function(){
 *         //jump 为 animation 或 transition 动画
 *         return $('.boy').addClass('jump').effectEnd(300, function(){
 *           //body...
 *         });
 *     })
 *     .then(fun);
 *
 * 使用示例2，嵌套写法：
 * $('.boy').addClass('jump').effectEnd(300, function(){
 *     $('.girl').addClass('standup').effectEnd(100, function(){
            //jump 、standup 为 animation 或 transition 动画
 *         //其它嵌套...
 *     });
 * });
 *
 */
(function(window, $, undefined) {
    window.log = function(s){
        try{
            console.log(s);
        }catch(e){}
    };
    var RAF = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function(callback) {
                setTimeout(callback, 1000 / 60);
            };

    /*
     * 参数说明：
     *   duration：当前动画的时长，非必需
     *   callback：动画执行完成后的回调，非必需
     * 返回promise
     */
    $.fn.effectEnd = function(duration, callback){
        var _deferred = $.Deferred && $.Deferred();
        var _this = this[0],
            _duration = parseInt($(_this).css('-webkit-animation-duration')) * 1000,
            // transitionTime = 0,
            isEnd = false;
        // console.log(this); //this数组中dom的顺序是html中Dom的顺序？？？
        // console.log(_this);
        // console.log('-webkit-animation-duration : ' + _duration);
        var end = function(){
            if(isEnd){
                return;
            }
            isEnd = true;
            callback && callback();
            _this.removeEventListener('webkitAnimationEnd', animatend, false);
            _this.removeEventListener('webkitTransitionEnd', transitionend, false);
            _deferred && _deferred.resolve();
        };
        var animatend = function(){
            // console.log('animatend');
            end();
        };
        //一次transition会触发两次webkitTransitionEnd事件
        var transitionend = function(){
            // transitionTime ++;
            // console.log('transitionend times : ' + transitionTime);
            end();
        };
        _this.addEventListener('webkitAnimationEnd', animatend, false);
        _this.addEventListener('webkitTransitionEnd', transitionend, false);
        setTimeout(function(){
            // console.log('setTimeout : ' + ((_duration || duration || 1500) + 300));
            end();
        }, (_duration || duration || 1500) + 300);
        return _deferred && _deferred.promise();
    };
})(window, Zepto);