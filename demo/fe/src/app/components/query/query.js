/**
 * Created by dx.yang on 2016/11/14.
 */

// JavaScript Document

(function() {

    angular
        .module('fe')
        .controller('QueryController', QueryController);

    /** @ngInject */
    function QueryController($scope, $state, DemoApiService) {


        DemoApiService.getSth({
            a:1,
            b:2
        }).then(function() {

        }, function() {

        });

        $scope.doQuery = function () {
            $scope.logs = [
                {
                    traceId: "1479094681326_9c8d6c70-97e4-4830-9cde-5704f4cb83ac_3179",
                    time: "2016-11-14 10:38:21.134 - 2016-11-14 10:38:22.074",
                    text: "正常完成"
                },
                {
                    traceId: "1479092198958_e14fa3c3-371b-4c1e-9b9c-66433a4d3aa2_7482",
                    time: "2016-11-14 10:38:21.134 - 2016-11-14 10:38:22.074",
                    error: "list-group-item-danger",
                    text: "失败"
                },
                {
                    traceId: "1479094680610_cdb7e770-33f2-4357-a304-9de86629e512_5141",
                    time: "2016-11-14 10:38:21.134 - 2016-11-14 10:38:22.074",
                    text: "正常完成"
                }
            ];
        };

        $scope.doOpen = function (traceId) {
            var url = $state.href('trajectory', {traceId: traceId});
            window.open(url, '_blank');
        };
    }

})();
