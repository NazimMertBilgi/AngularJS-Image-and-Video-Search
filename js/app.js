   var timeoutPromise;
        $url = "https://pixabay.com/api/";
        $key = "11112624-06f0eb3bbe7a5b94cf0b551b8"; // your api key, https://pixabay.com/api/docs/#api_key
        $per_page = 100;
        var myApp = angular.module('myApp', []);
        myApp.directive('ngEnter', function ($timeout) {
            return function (scope, element, attrs) {
                element.bind("keydown keypress", function (event) {
                    if (event.which === 13) {
                        scope.$apply(function () {
                            scope.$eval(attrs.ngEnter);
                        });

                        event.preventDefault();
                    }
                    else {
                        $timeout.cancel(timeoutPromise);
                        timeoutPromise = $timeout(function () {
                            scope.SearchImage()
                        }, 500);
                    }
                });
            };
        });

        myApp.controller('myController', function ($scope, $http) {
            $scope.SearchImage = function (sayi) {
                if (sayi !== 200) {
                    sayi = 100;
                }
                $per_page = sayi
                if ($scope.searchTerm !== null && $scope.searchTerm !== undefined) {
                    $scope.loadingEffect = true;
                    $http.get($url + "" + $scope.type + "/?key=" + $key + "&q=" + $scope.searchTerm + "&per_page=" + $per_page, {
                        params: { searchTerm: $scope.searchTerm, type: $scope.type, sayi: sayi }
                    })
                        .then(function (response) {
                            $scope.jsondata = response.data.hits;
                            $scope.loadingEffect = false;
                            setTimeout(function () {
                                clPhotoswipe(); // reload photo swipe
                            }, 1000)
                        }).catch(function (response) {
                        }).finally(function () {
                        });
                }
                else {
                    $scope.jsondata = null;
                }
            }
        });


        // When the user scrolls down 20px from the top of the document, show the button
        window.onscroll = function () { scrollFunction() };

        function scrollFunction() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                document.getElementById("myBtn").style.display = "block";
            } else {
                document.getElementById("myBtn").style.display = "none";
            }
        }

        // When the user clicks on the button, scroll to the top of the document
        function topFunction() {
            $("html, body").animate({ scrollTop: 0 }, 400);
        }
