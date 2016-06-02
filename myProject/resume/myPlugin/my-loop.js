/**
 * Created by Zhao on 2016/4/26.
 */
define(["app"], function (app) {
    return app.service('loop', function () {

        /**
         *createWatch1与loop为beta版
         * createWatch2与loop2为使用版
         * */

        /**
         *定义变量
         * */
        var loopObject = {};
        var loopThread = 0;//当前计时器编号
        var timeList = [];//setTimeout的集合
        var count = 0;//未使用
        var tempDateStart = 0;//输入时时间
        var tempDateEnd = 0;//发送请求时时间
        var currentList = [];//最后一次服务器请求的查询结果
        var paramInUse = '';//最后一次服务器请求的查询参数


        /**
         *保存最后一次服务器请求的查询结果
         * */
        loopObject.setList = function (value) {
            currentList = value;
        }

        /**
         *计时器
         * */
        function loop($scope, timeCount, thisThread, method, delayTime) {
            if (thisThread == loopThread) {
                if (timeCount <= delayTime / 10) {
                    timeCount++;
                    setTimeout(function () {
                        loop($scope, timeCount, thisThread, method, delayTime);
                    }, 10);

                } else if (timeCount > delayTime / 10) {
                    tempDateEnd = new Date();
                    console.log(tempDateEnd - tempDateStart, "timing");
                    method();
                }

            }

        }

        loopObject.createWatch1 = function (modelName, $scope, method, delayTime) {
            var watch = $scope.$watch(modelName, function (value) {
                tempDateStart = new Date();
                console.log(tempDateStart, "tempDateStart");
                loopThread++;
                if (value != null && value != '') {
                    var timeCount = 0;
                    var thisThread = loopThread;
                    loop($scope, timeCount, thisThread, method, delayTime);
                }
            }, true);
        };


        /**
         * 计时器方法
         * method       延时执行方法
         * count        无意义
         * delayTime    延迟时间
         */
        function loop2(method, count, delayTime) {
            var timeOut = setTimeout(function () {
                tempDateEnd = new Date();
                console.log(tempDateEnd - tempDateStart, "timing");
                paramInUse = method();
            }, delayTime);
            timeList.push(timeOut);
        }

        /**
         * 初始化方法创建模型的变化监听
         * modelName   String   监听模型的名字（不带$scope）
         * $scope      Object   控制器作用域
         * method      Object   执行的方法
         * delayTime   int      延迟时间
         * repeateList list     ng-repeat显示用集合
         */
        loopObject.createWatch2 = function (modelName, $scope, method, delayTime, repeateList) {
            var watch = $scope.$watch(modelName, function (newValue, oldValue) {


                /**
                 * 判断当前input（model）是否为空
                 */
                if (newValue == '' || newValue == null) {
                    clearTimeout(timeList[0]);
                    timeList = [];
                    return false;
                }

                /**
                 * 判断最新model的值是否包含上次的查询结果
                 * paramInUse=='',还未查询服务器。
                 * 如有包含关系去，查询最后一次查询的集合
                 */
                if (newValue.indexOf(paramInUse) != -1&&paramInUse!='') {
                    var tempList = [];
                    angular.forEach(currentList, function (object, key) {
                        if ((object.CRID + "").indexOf(newValue + "") != -1) {
                            tempList.push(object);
                        }
                    })

                    angular.copy(tempList, repeateList);

                    return false;
                }


                tempDateStart = new Date();
                count++;

                /**
                 * 判断当前是否有计时器，
                 * 有，清空计时器，新建计时器
                 * 无，新建计时器
                 */
                if (timeList.length == 0) {
                    loop2(method, count, delayTime);
                } else {
                    clearTimeout(timeList[0]);
                    timeList = [];
                    loop2(method, count, delayTime);
                }


            }, true);
        };
        return loopObject;
    });
})
;
