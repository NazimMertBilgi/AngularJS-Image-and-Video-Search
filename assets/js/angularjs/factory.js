angular.module('ngFactory', [])

    .factory('nmbFactory', ['$http', function ($http) {
        var factories = {};

        factories.getSearchResult = function (term, type, page) {
            page = page === undefined || page === null || page === '' ? 1 : page;
            type = type === 'videos' ? '{0}/'.format(type) : '';
            var url = '{0}/{1}?key={2}&q={3}&per_page={4}&page={5}'.format(pixabayConstants.api_url, type, pixabayConstants.api_key, term, pixabayConstants.item_count_per_page, page);

            var options = {
                method: 'GET',
                url: url
            };

            return $http(options);
        };

        return factories;
    }]);