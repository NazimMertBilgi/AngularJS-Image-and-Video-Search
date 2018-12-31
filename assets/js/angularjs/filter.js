angular.module('ngFilter', [])

    .filter('unsafe', function ($sce) {
        return $sce.trustAsHtml;
    });