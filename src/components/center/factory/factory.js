var register = angular.module('center');
register.factory('myFn', function ($http) {
    return {
        addClass:function (obj,cls) {
            //获取 class 内容.
            var objClass = obj.className,
            //判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
            blank = (objClass !== '') ? ' ' : '';
            //组合原来的 class 和需要添加的 class.
            var added = objClass + blank + cls;
            //替换原来的 class.
            obj.className = added;
        },
        removeClass : function ( obj,cls) {
            //获取 class 内容, 并在首尾各加一个空格. ex) 'abc    bcd' -> ' abc    bcd '
            var objClass = ' '+obj.className+' ';
            //将多余的空字符替换成一个空格. ex) ' abc    bcd ' -> ' abc bcd '
            objClass = objClass.replace(/(\s+)/gi, ' ');
            //在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
            var removed = objClass.replace(' '+cls+' ', ' ');
            //去掉首尾空格. ex) 'bcd ' -> 'bcd'
            removed = removed.replace(/(^\s+)|(\s+$)/g, '');
            //替换原来的 class.
            obj.className = removed;
        },
        getImage:function (tel,code) {
            /*
            * 获取API图片
            * param  tel：获取图片时传入的手机号码
            * param  code：获取图片时传入的templateNo值，10216或10217
            * */
            var img = 'http://www.mianbaoyun.cn/mobile/app/message/picCode.htm?mobile='+tel+'&templateNo='+code+'&'+Math.random();
            return img;
        },
        yanZheng:function (yantel,tel) {
            /*
            * 验证<input type='tel'/>的value值是否为空以及是否输入正确
            * param   yantel：判断input手机号的value是否为空的条件。如：$scope.myForm.myTel.$invalid
            * param   tel：input手机号框中的value值，用来匹配正则表达式。如：$scope.user.findTel
            * */
            var tishi='';
            if(yantel){
                tishi='手机号码不能为空';
                return tishi;
            }
            if(!(/^1(3|4|5|7|8)\d{9}$/.test(tel))){
                tishi='请正确填写手机号码';
                return tishi;
            }
            else{
                tishi='';
                return tishi;
            }
        },
        myDjs:function (el) {
            /*
            * 60秒倒计时功能
            * param    el：绑定倒计时的DOM元素节点，如：<div></div>
            * */
            var miao=60;
            var time=setInterval(fun,1000);
            function fun(){
                el.innerHTML=miao+'秒';
                miao--;
                el.disabled=true;
                if(miao<0){
                    clearInterval(time);
                    el.disabled=false;
                    el.innerHTML='获取验证码';
                }
            }
        },
    };
});
