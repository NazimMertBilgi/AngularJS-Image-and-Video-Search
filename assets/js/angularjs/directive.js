angular.module('ngDirective', [])

    .directive('scrollToTop', function () {
        return {
            restrict: 'E',
            link: function (scope, element, attrs) {
                //Show/Hide scroll top button when page scrolling
                $(window).on('scroll', function () {
                    var scrollTop = $(window).scrollTop();

                    if (scrollTop > 100) {
                        $(element).fadeIn();
                    } else {
                        $(element).fadeOut();
                    }
                });

                //Scroll top button when clicked
                $(element).on('click', function () {
                    $('html, body').animate({ scrollTop: 0 }, 400);
                });
            }
        };
    });