var login = angular.module('center');
login.controller('login', function ($scope,$http,myFn) {
    $scope.loginNum=0;
    $scope.loginTel='';
    $scope.loginPass='';
    $scope.p=false;
    $scope.myLogin=function () {
      $http.post('http://www.mianbaoyun.cn/mobile/app/user/dologin.htm?userName='+$scope.loginTel+'&passWord='+$scope.loginPass).then(function (res) {
          console.log(res);
          if(res.data.header.errorCode!=='200'){
              document.getElementsByClassName('myP')[0].innerHTML=res.data.header.errorMsg;
              $scope.p=true;
          }else{
              document.getElementsByClassName('myP')[0].innerHTML='';
              $scope.p=false;
              alert('登录成功');
              $scope.loginTel='';
              $scope.loginPass='';
          }
      });
    };
});