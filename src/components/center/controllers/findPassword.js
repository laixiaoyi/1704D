var findPassword = angular.module('center');
findPassword.controller('findPassword',function ($scope,myService,myFn,$state) {
    // 自定义指令中用来判断奇偶数的值，初始为0
    $scope.findPasswordNum=0;
    // html页面双向数据绑定的值
    $scope.user={findTel:'',findImg:'',findYzm:'',findPassword:'',findHint:'',imgUrl:''};
    $scope.all=function () {
        // 点击input框中的X时，清空input手机号、图形码、验证码、密码框中的value以及img图片的src路劲
        $scope.user.findTel='';$scope.user.findImg='';$scope.user.findYzm='';$scope.user.findPassword='';$scope.user.imgUrl='';$scope.user.findHint='';
    };
    $scope.getBack=function () {
      $state.go('login');
    };
});