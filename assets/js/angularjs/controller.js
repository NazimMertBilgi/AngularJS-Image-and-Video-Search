angular.module('ngController', [])

    .controller('mainCtrl', ['$scope', 'nmbFactory', function ($scope, nmbFactory) {
        //Search default options
        var hits = [];
        var mainInfoText = 'Please type min. 3 chars for make search.';
        $scope.search = {
            type: 'images',
            info_text: mainInfoText,
            page: 1,
            show_loading: false,
            show_more_btn: false
        };

        //Make search
        $scope.makeSearch = function (loadMore) {
            if ($scope.search.term === undefined || $scope.search.term.length < 3) {
                $scope.search.info_text = mainInfoText;
            } else {
                $scope.search.searched_type = $scope.search.type;
                $scope.search.show_loading = true;
                $scope.search.show_more_btn = false;

                if (loadMore) {
                    $scope.search.page = $scope.search.page + 1;
                } else {
                    $('html, body').animate({ scrollTop: 0 }, 400);
                    $scope.search.page = 1;
                    hits = [];
                }

                nmbFactory.getSearchResult($scope.search.term, $scope.search.type, $scope.search.page).then(function (result) {
                    angular.forEach(result.data.hits, function (key, i) {
                        hits.push(key);
                    });

                    $scope.search.result = {
                        totalHits: result.data.totalHits,
                        hits: hits
                    };

                    if (result.data.totalHits === 0) {
                        $scope.search.info_text = 'There is no result. Please change your search term.';
                        $('.search-input').focus().select();
                    } else {
                        $scope.search.info_text = '<b>{0}</b> item{1}found about <b>{2}</b>.'.format(result.data.totalHits, result.data.totalHits > 1 ? 's ' : ' ', $scope.search.term);
                    }

                    $scope.search.show_more_btn = hits.length < result.data.totalHits;

                    if ($scope.search.type === 'images') {

                    }

                    $scope.search.show_loading = false;
                });
            }
        };

        //Generate Background Image From Url
        $scope.generateBgImage = function (image) {
            return {
                'background-image': 'url({0})'.format(image)
            };
        };

        //Generate Background Image From Video Image Id
        $scope.generateBgImageForVideo = function (imageId) {
            return {
                'background-image': 'url(https://i.vimeocdn.com/video/{0}_640x360.jpg)'.format(imageId)
            };
        };
    }]);