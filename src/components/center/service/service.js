var myService = angular.module('center');
myService.service('myService', function ($http) {
    this.getCode = function (url,data) {
        /*
        * ajaxPOST请求封装
        * @param  url，请求的url(?)问号前面的地址
        * @param  data  post请求url时的参数
        */
        function jsonStr(data) {
            /*
            * 将getCode函数中的data对象的key和value通过遍历的方式，拼接成字符串返回。
            * 如：{a:1,b:2}==>  a=1&b=2
            * */
            var arr=[];
            for(var name in data){
                arr.push(name+'='+data[name]);
            }
            return arr.join('&');
        }
        // 将$http.post请求时传入的完整url(包括参数)赋值给变量args。
        var args = 'http://www.mianbaoyun.cn/mobile/app/'+url+'?'+jsonStr(data); // 请求的API
        return $http.post(args);
    };
});
