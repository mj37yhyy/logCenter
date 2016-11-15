/**
 * Created by dx.yang on 2016/11/15.
 */

(function () {

    angular.module('fe').controller('LogDetailController', LogDetailController);

    /** @ngInject */
    function LogDetailController($uibModal) {
        var vm = this;
        vm.names = [1, 2, 3, 4, 5, 6, 7];
        vm.showModal = function() {
            $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/components/logDetail/modal.html',
                controller: 'LogDetailModalController',
                controllerAs: '$ctrl'
            });
        };
    }

    angular.module('fe').controller('LogDetailModalController', LogDetailModalController);
    /** @ngInject */
    function LogDetailModalController($uibModalInstance) {
        var $ctrl = this;

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }

})()