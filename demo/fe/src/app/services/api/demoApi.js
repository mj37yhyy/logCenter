/**
 * Created by dx.yang on 2016/11/16.
 */

(function() {


    angular.module('fe').service('DemoApiService', DemoApiService);

    /** @ngInject */
    function DemoApiService($ajax) {

        var url = '/api/xxxxx';
        this.getSth = function(params) {
            var defaultParams = {
                c: 3
            };
            params = _.assign(defaultParams, params);
            $ajax.get(url, params).done(function() {

            }).fail(function() {

            })
        };

    }

})();