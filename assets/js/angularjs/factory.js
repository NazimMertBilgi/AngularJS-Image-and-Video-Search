angular.module('ngFactory', [])

    .factory('nmbFactory', ['$http', function ($http) {
        var factories = {};

        factories.getSearchResult = function (term, type) {
            type = type === 'videos' ? '{0}/'.format(type) : '';
            var url = '{0}/{1}?key={2}&q={3}&per_page={4}'.format(pixabayConstants.api_url, type, pixabayConstants.api_key, term, pixabayConstants.item_count_per_page);

            var options = {
                method: 'GET',
                url: url
            };

            return $http(options);
        };

        return factories;
    }]);