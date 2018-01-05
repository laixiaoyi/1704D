var reg = angular.module('center');
reg.directive('myInput', function (myFn) {
    return {
        restrict:'EA',
        replace:false,
        link:function (scope,element,attr) {
            element.bind('focus',function () {
                scope.loginNum++;
                scope.registerNum++;
                scope.findPasswordNum++;
                // console.log("loginNum为:"+scope.loginNum+'\n'+"registerNum为："+scope.registerNum+'\n'+'findPasswordNum为：'+scope.findPasswordNum);
                if(scope.loginNum%2||scope.registerNum%2||scope.findPasswordNum%2){
                    myFn.addClass(this.nextElementSibling,'leftToRight');
                    this.onblur=function () {
                        // console.log(this);
                        myFn.removeClass(this.nextElementSibling,'leftToRight');
                        myFn.addClass(this.nextElementSibling,'rightToRight');
                    };
                }else{
                    myFn.addClass(this.nextElementSibling,'rightToLeft');
                    this.onblur=function () {
                        myFn.removeClass(this.nextElementSibling,'rightToLeft');
                        myFn.addClass(this.nextElementSibling,'leftToLeft');
                    };
                }
            });
        }
    };
});
reg.directive('findVerify',function (myService,myFn) {
    return {
        restrict:'A',
        controller:function ($scope,$state) {
            $scope.telChangeFind=function () {
                /*验证input type=tel中输入的手机号码是否为空，输入是否正确，如果为空或错误，将提示语句返回并赋值给$scope.user.findHint，
                如果手机号码为空的话返回：'手机号码不能为空',如果手机号输入格式不正确返回：'请正确填写手机号码'，如果验证通过
                则返回''。*/
                $scope.user.findHint=myFn.yanZheng($scope.myForm.myTel.$invalid,$scope.user.findTel);
                // 判断调用myFn.yanZheng（）函数的返回值，如果返回''则表示验证通过。返回值不等于''，则终止后续代码执行。
                if($scope.user.findHint!=='') return;
                var tuCan='';
                // 判断当前路由所在路径。如果在findPassword则将ajax请求中的templateNo参数10217赋值给变量tuCan，否则将10216赋值给变量tuCan。
                if($state.current.name==='findPassword'){
                    tuCan='10217';
                }else{
                    tuCan='10216';
                }
                // 调用myFn.getImage函数将返回一个流图片地址，将该图片链接赋值给$scope.user.imgUrl。
                $scope.user.imgUrl=myFn.getImage($scope.user.findTel,tuCan);
                // 点击图片时刷新图片
                $scope.getImgUrl=function () {
                    $scope.user.imgUrl=myFn.getImage($scope.user.findTel,tuCan);
                };
            };
        }
    };
});
reg.directive('findYzm',function (myService,myFn) {
    return {
        restrict:'A',
        controller:function ($scope,$state) {
            $scope.oYzm=function () {
                // 点击获取验证码是先判断input手机号框的值是否为空以及格式是否正确，如果为空或格式不正确，则终止后续代码执行。
                if(!(/^1(3|4|5|7|8)\d{9}$/.test($scope.user.findTel))||$scope.myForm.myTel.$invalid){
                    return;
                }
                var tuCan='';
                // 判断当前路由所在路径。如果在findPassword则将ajax请求中的templateNo参数10217赋值给变量tuCan，否则将10216赋值给变量tuCan。
                if($state.current.name==='findPassword'){
                    tuCan='10217';
                }else{
                    tuCan='10216';
                }
                // 发送ajax请求获取手机号验证码
                myService.getCode('message/sendMsg.htm',{mobile:$scope.user.findTel,picCode:$scope.user.findImg,templateNo:tuCan}).then(function (value) {
                    console.log(value);
                    // 如果获取验证码时提交的图片验证码号不正确，则终止后续代码执行
                    if(value.data.body.retCode!=='200'){
                        $scope.user.findHint=value.data.header.errorMsg;
                        return ;
                    }
                    $scope.user.findHint='验证码已成功发送';
                    var findPassYZM=document.getElementById('findPassYZM');
                    // 调用60秒计时器函数，将该计时器写入findPassYZM元素节点中
                    myFn.myDjs(findPassYZM);
                    // 完成修改按钮点击事件
                    $scope.alterPassword=function () {
                        // 点击完成按钮时先判断input手机号框中的value值是否为空以及格式是否正确，如果不正确则终止后续代码执行
                        if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/.test($scope.user.findPassword))){
                            $scope.user.findHint='密码需由6-18位字母和数字组合';
                            return ;
                        }
                        // 发送修改密码请求
                        myService.getCode('user/forgetPSW.htm',{userName:$scope.user.findTel,smsCode:$scope.user.findYzm,passWord:$scope.user.findPassword}).then(function (value) {
                            console.log(value);
                            // 如果发送请求时输入的手机验证码不正确，则终止后续代码执行
                            if(value.data.header.errorCode!=='200'){
                                $scope.user.findHint=value.data.header.errorMsg;
                                return ;
                            }
                            $scope.user.findHint='修改成功';
                            alert('修改成功');
                            // 密码修改完成后跳转至登录页面
                            $state.go('login');
                        });
                    };
                });
            };
        }
    };
});

