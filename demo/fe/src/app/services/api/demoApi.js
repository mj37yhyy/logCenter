/**
 * Created by dx.yang on 2016/11/16.
 */

(function() {


    angular.module('fe').service('DemoApiService', DemoApiService);

    /** @ngInject */
    function DemoApiService($ajax, $q) {

        var url = '/api/xxxxx';
        this.getSth = function(params) {
            return $q(function(resolve, reject) {
                var defaultParams = {
                    c: 3
                };
                params = _.assign(defaultParams, params);

                $ajax.get(url, params).done(function(data) {
                    // 处理data
                    // 最终返回 resolve(data)
                }).fail(function(c, e) {
                    // 处理错误
                    // 最终返回reject(c, e)
                })
            });
        };

    }

})();