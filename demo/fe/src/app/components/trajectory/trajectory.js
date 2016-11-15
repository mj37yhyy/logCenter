/**
 * Created by dx.yang on 2016/11/14.
 */




var list = [
    [{
        id: 'c01-01',
        name: 'console-01',
        ip: '10.0.0.1',
        module: ['nginx', 'tomcat'],
        next: [
            'c02-01',
            'c02-02'
        ]
    }, {
        id: 'c01-02',
        name: 'console-02',
        ip: '10.0.0.2',
        module: ['nginx', 'tomcat'],
        next: [
            'c02-01',
        ]
    }],
    [{
        id: 'c02-01',
        name: 'openapi-01',
        ip: '10.0.1.1',
        module: ['tomcat'],
        next: [
            'c03-01'
        ]
    }, {
        id: 'c02-02',
        name: 'openapi-02',
        ip: '10.0.1.2',
        module: ['tomcat'],
        next: [
            'c03-02'
        ]
    }],
    [{
        id: 'c03-01',
        name: 'innerapi-01',
        ip: '10.0.2.1',
        module: ['tomcat'],
    }, {
        id: 'c03-02',
        name: 'innerapi-02',
        ip: '10.0.2.2',
        module: ['tomcat'],
    }]
];


(function () {


    function belzier(start, end) {

        var startX = 250 * start[1] + 150;
        var startY = 200 * start[0] + 150;

        var endX = 250 * end[1] + 150;
        var endY = 200 * end[0] + 50;

        var p1x = startX;
        var p1y = (endY - startY) / 2 + startY

        var p2x = endX;
        var p2y = endY - (endY - startY) / 2;

        return [
            'M' + [startX, startY].join(','),
            'C' + [p1x, p1y].join(','),
            [p2x, p2y].join(','),
            [endX, endY].join(',')
        ].join(' ');
    }


    angular.module('fe').controller('TrajectoryController', TrajectoryController);

    /** @ngInject */
    function TrajectoryController($stateParams, $scope) {
        var vm = this;
        vm.traceId = $stateParams.traceId;

        $(function () {
            var wrap = d3.select('.svg-wrap');
            wrap
                .selectAll('.row')
                .data(list).enter()
                .append('div')
                .attr('class', function (v, i) {
                    return 'row row-' + i;
                });

            var lines = [];
            _.forEach(list, function (rowData, i) {
                wrap.select('.row-' + i)
                    .selectAll('.node')
                    .data(rowData)
                    .enter()
                    .append('div')
                    .attr('class', function (d) {
                        return 'node node-' + d.id;
                    })
                    .html(function (d) {
                        return '<h3>' + d.name + '</h3><p>' + d.ip + '</p>';
                    })
                    .each(function (item, j) {
                        var start = [i, j]
                        _.forEach(item.next, function (n) {
                            var nextNodeIdx = _.findIndex(list[i + 1], ['id', n]);
                            var end = [i + 1, nextNodeIdx]
                            lines.push({
                                start: start,
                                end: end
                            })
                        });
                    });
            });


            var bgWrap = d3.select('.svg-bg-wrap');
            bgWrap.append('svg')
                .attr('width', '100%')
                .attr('height', 200 * list.length + 'px')
                .selectAll('path')
                .data(lines)
                .enter()
                .append('path')
                .attr('d', function (n) {
                    return belzier(n.start, n.end);
                })
                .attr('fill', 'none')
                .attr('stroke', '#428bca')
                .attr('strock-width', '2');

            $(document).on('click', '.node', function() {
                $uibModal.open({
                    templateUrl: 'app/components/trajectory/trajectory-modal.html',
                    controller: 'TrajectoryModalController',
                    controllerAs: '$ctrl',
                    resolve: {
                        items: function() {
                            
                        }
                    }
                })
            })


        });


        $scope.$on('$destroy', function() {
            $(document).off('click', '.node');
        });

    }


    // modal
    angular.module('fe').controller('TrajectoryModalController', TrajectoryModalController);

    /** @ngInject */
    function TrajectoryModalController($uibModalInstance, items) {

    }

})();