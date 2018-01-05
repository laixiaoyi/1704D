var register = angular.module('center');
register.controller('register',function ($scope,$http,$state,myFn) {
    $scope.loginTel='';
    $scope.registerNum=0;
    $scope.imgCode='';
    $scope.iptTu='';
    $scope.oYzm=false;
    $scope.loginPass='';
    $scope.dxYzm='';
    $scope.imgVerifyCode=function () {
        if($scope.loginTel===''){
            return ;
        }else{
            var reg=/^[1][34578][0-9]/;
            if(reg.test($scope.loginTel)){
                $scope.imgCode='http://www.mianbaoyun.cn/mobile/app/message/picCode.htm?mobile='+$scope.loginTel+'&templateNo=10216&'+Math.random();
                $http.post('https://www.mianbaoyun.cn/mobile/app/user/checkUserName.htm?userName='+$scope.loginTel).then(function (res) {
                    if(res.data.body.isRegister!=='Y'){
                        $scope.getCode=function(){
                            $http.post("http://www.mianbaoyun.cn/mobile/app/message/sendMsg.htm?mobile="+$scope.loginTel+"&picCode="+$scope.iptTu+"&templateNo=10216").then(function(res){
                                console.log(res);
                                if(res.data.body.retCode==='200'){
                                    alert('验证码已发送');
                                    var btn=document.getElementsByClassName('verifyCode')[0];
                                    myFn.myDjs(btn);
                                }
                                $scope.oRegister=function () {
                                    if(res.data.body.retCode!=='200'){
                                        $scope.oYzm=true;
                                    }else{
                                        $http.post('https://www.mianbaoyun.cn/mobile/app/user/doRegister.htm?isSubmitCommitment=true&passWord='+$scope.loginPass+'&smsCode='+$scope.dxYzm+'&userName='+$scope.loginTel).then(function (data) {
                                            console.log(data);
                                            if(data.data.header.errorCode==='200'){
                                                alert('注册成功');
                                                $state.go('login');
                                            }
                                        });
                                        $scope.oYzm=false;
                                    }
                                };
                            });
                        };
                    }else{
                        alert('该号码已注册');
                    }
                });
            }
        }
    };
    $scope.reImgCode=function () {
        $scope.imgCode='http://www.mianbaoyun.cn/mobile/app/message/picCode.htm?mobile='+$scope.loginTel+'&templateNo=10216&'+Math.random();
        console.log($scope.imgCode);
    };
    $scope.all=function () {
        $scope.loginTel='';
        $scope.imgCode='';
    };
});