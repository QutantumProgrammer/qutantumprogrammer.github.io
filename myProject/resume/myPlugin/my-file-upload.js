/**
 * Created by Zhaochen on 2016/4/6.
 */
define(["app"], function (app) {
    return app.factory('myupload', function ($http) {

        var myupload = {};

        myupload.getFileList = function ($scope) {
            return $scope.faoList;
        }

        myupload.remove = function ($scope, index) {
            $scope.faoList.splice(index, 1);
        }

        myupload.all = function ($scope) {
            $scope.faoList = [];
        }

        myupload.upLoadFileAndObject = function ($scope, info, url) {
            var fd = new FormData();
            for (var i = 0; i < $scope.faoList.length; i++) {
                fd.append('files', $scope.faoList[i]);
            }
            fd.append('obj', JSON.stringify(info));
            return $http.post(url, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(function (e) {
                return e.data;
            });
        };

        myupload.upLoadFileListAndObject = function (list, info, url) {
            var fd = new FormData();
            for (var i = 0; i < list.length; i++) {
                fd.append('files', list[i]);
            }
            fd.append('obj', JSON.stringify(info));
            return $http.post(url, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(function (e) {
                console.log(e);
                return e.data;
            }, function () {

            });
        };

        /**
         *info 只能为基本数据类型组成的Map 或者List {String:String,int:int} or [int,int]
         * */
        myupload.singleUpload = function (file, info, url) {
            var fd = new FormData();
            fd.append('file', file);
            angular.forEach(info, function (value, key) {
                fd.append(key, value);
            });
            console.log("preSend", {url: url, httpMethod: "POST", data: info})
            return $http.post(url, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(function (e) {
                return e.data;
            });
        };

        /**
         *info 可以复杂对象 {String:{String:String,String:String},String:Object,String:List}
         * */
        myupload.singleUploadWithJson = function (file, info, url) {
            var fd = new FormData();
            fd.append('file', file);
            fd.append('obj', JSON.stringify(info));
            return $http.post(url, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(function (e) {
                return e.data;
            });
        };
        return myupload;
    }).directive('fileModelMutiple', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModelMutiple);
                var modelSetter = model.assign;
                scope.faoList = [];
                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                        scope.faoList.push(element[0].files[0]);
                    });
                });
            }
        };
    }]).directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;
                element.bind('change', function () {
                    scope.$apply(function () {
                        /**
                         *生成内存中图片在内存中的地址，通过Jquery将地址复制给指定ID的IMG元素
                         * */
                        var imgUrl = '';
                        if (!element[0].files[0]) {
                            imgUrl = '';
                            document.getElementById(attrs.fileModel).src = imgUrl;
                        } else if (window.FileReader) {
                            var fr = new FileReader();
                            fr.readAsDataURL(element[0].files[0]);
                            fr.onload = function (e) {
                                imgUrl = e.target.result;
                                document.getElementById(attrs.fileModel).src = imgUrl;
                            }
                        } else {
                            imgUrl = window.URL.createObjectURL(element[0].files[0]);
                            document.getElementById(attrs.fileModel).src = imgUrl;
                        }
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);
});

