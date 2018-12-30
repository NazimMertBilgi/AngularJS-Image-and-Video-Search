angular.module('ngController', [])

    .controller('mainCtrl', ['$scope', 'nmbFactory', function ($scope, nmbFactory) {
        $scope.search = {
            type: 'images',
            term: 'tree'
        };

        $scope.makeSearch = function() {
            $('html, body').animate({ scrollTop: 0 }, 400);
            $scope.search.searched_type = $scope.search.type;

            nmbFactory.getSearchResult($scope.search.term, $scope.search.type).then(function(result) {
                $scope.search.result = result.data;

                if ($scope.search.type === 'images') {
                    
                }
            });
        };

        $scope.generateBgImage = function(image) {
            return {
                'background-image': 'url({0})'.format(image)
            };
        };
    }]);