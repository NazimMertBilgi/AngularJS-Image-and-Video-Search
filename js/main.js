/* ===================================================================
 * Stellar - Main JS
 *
 * ------------------------------------------------------------------- */


var cfg = {
    scrollDuration: 800, // smoothscroll duration
    mailChimpURL: 'https://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e6957d85dc'   // mailchimp url
},

    $WIN = $(window);

// Add the User Agent to the <html>
// will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
var doc = document.documentElement;
doc.setAttribute('data-useragent', navigator.userAgent);


// svg fallback
if (!Modernizr.svg) {
    $(".header-logo img").attr("src", "images/logo.png");
}


/* Preloader
 * -------------------------------------------------- */
var clPreloader = function () {

    $("html").addClass('cl-preload');

    $WIN.on('load', function () {

        //force page scroll position to top at page refresh
        $('html, body').animate({ scrollTop: 0 }, 'normal');

        // will first fade out the loading animation 
        $("#loader").fadeOut("slow", function () {
            // will fade out the whole DIV that covers the website.
            $("#preloader").delay(300).fadeOut("slow");
        });

        // for hero content animations 
        $("html").removeClass('cl-preload');
        $("html").addClass('cl-loaded');

    });
};


/* Move header
 * -------------------------------------------------- */
var clMoveHeader = function () {

    var hero = $('.page-hero'),
        hdr = $('header'),
        triggerHeight = hero.outerHeight() - 170;


    $WIN.on('scroll', function () {

        var loc = $WIN.scrollTop();

        if (loc > triggerHeight) {
            hdr.addClass('sticky');
        } else {
            hdr.removeClass('sticky');
        }

        if (loc > triggerHeight + 20) {
            hdr.addClass('offset');
        } else {
            hdr.removeClass('offset');
        }

        if (loc > triggerHeight + 150) {
            hdr.addClass('scrolling');
        } else {
            hdr.removeClass('scrolling');
        }

    });

    // $WIN.on('resize', function() {
    //     if ($WIN.width() <= 768) {
    //             hdr.removeClass('sticky offset scrolling');
    //     }
    // });

};


/* Mobile Menu
 * ---------------------------------------------------- */
var clMobileMenu = function () {

    var toggleButton = $('.header-menu-toggle'),
        nav = $('.header-nav-wrap');

    toggleButton.on('click', function (event) {
        event.preventDefault();

        toggleButton.toggleClass('is-clicked');
        nav.slideToggle();
    });

    if (toggleButton.is(':visible')) nav.addClass('mobile');

    $WIN.on('resize', function () {
        if (toggleButton.is(':visible')) nav.addClass('mobile');
        else nav.removeClass('mobile');
    });

    nav.find('a').on("click", function () {

        if (nav.hasClass('mobile')) {
            toggleButton.toggleClass('is-clicked');
            nav.slideToggle();
        }
    });

};


/* Highlight the current section in the navigation bar
 * ------------------------------------------------------ */
var clWaypoints = function () {

    var sections = $(".target-section"),
        navigation_links = $(".header-nav li a");

    sections.waypoint({

        handler: function (direction) {

            var active_section;

            active_section = $('section#' + this.element.id);

            if (direction === "up") active_section = active_section.prevAll(".target-section").first();

            var active_link = $('.header-nav li a[href="#' + active_section.attr("id") + '"]');

            navigation_links.parent().removeClass("current");
            active_link.parent().addClass("current");

        },

        offset: '25%'

    });

};


/* photoswipe
 * ----------------------------------------------------- */
var clPhotoswipe = function () {
    var items = [],
        $pswp = $('.pswp')[0],
        $folioItems = $('.item-folio');

    // get items
    $folioItems.each(function (i) {

        var $folio = $(this),
            $thumbLink = $folio.find('.thumb-link'),
            $title = $folio.find('.item-folio__title'),
            $caption = $folio.find('.item-folio__caption'),
            $titleText = '<h4>' + $.trim($title.html()) + '</h4>',
            $captionText = $.trim($caption.html()),
            $href = $thumbLink.attr('href'),
            $size = $thumbLink.data('size').split('x'),
            $width = $size[0],
            $height = $size[1];

        var item = {
            src: $href,
            w: $width,
            h: $height
        }

        if ($caption.length > 0) {
            item.title = $.trim($titleText + $captionText);
        }

        items.push(item);
    });

    // bind click event
    $folioItems.each(function (i) {

        $(this).on('click', function (e) {
            e.preventDefault();
            var options = {
                index: i,
                showHideOpacity: true
            }

            // initialize PhotoSwipe
            var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
            lightBox.init();
        });

    });
};


/* Stat Counter
 * ------------------------------------------------------ */
var clStatCount = function () {

    var statSection = $(".s-stats"),
        stats = $(".item-stats__count");

    statSection.waypoint({

        handler: function (direction) {

            if (direction === "down") {

                stats.each(function () {
                    var $this = $(this);

                    $({ Counter: 0 }).animate({ Counter: $this.text() }, {
                        duration: 4000,
                        easing: 'swing',
                        step: function (curValue) {
                            $this.text(Math.ceil(curValue));
                        }
                    });
                });

            }

            // trigger once only
            this.destroy();

        },

        offset: "90%"

    });
};


/* slick slider
 * ------------------------------------------------------ */
var clSlickSlider = function () {

    $('.testimonials__slider').slick({
        arrows: false,
        dots: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        pauseOnFocus: false,
        autoplaySpeed: 1500,
        responsive: [
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
};


/* Smooth Scrolling
 * ------------------------------------------------------ */
var clSmoothScroll = function () {

    $('.smoothscroll').on('click', function (e) {
        var target = this.hash,
            $target = $(target);

        e.preventDefault();
        e.stopPropagation();

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, cfg.scrollDuration, 'swing').promise().done(function () {

            // check if menu is open
            if ($('body').hasClass('menu-is-open')) {
                $('.header-menu-toggle').trigger('click');
            }

            window.location.hash = target;
        });
    });

};


/* Placeholder Plugin Settings
 * ------------------------------------------------------ */
var clPlaceholder = function () {
    $('input, textarea, select').placeholder();
};


/* Alert Boxes
 * ------------------------------------------------------ */
var clAlertBoxes = function () {

    $('.alert-box').on('click', '.alert-box__close', function () {
        $(this).parent().fadeOut(500);
    });

};


/* Animate On Scroll
 * ------------------------------------------------------ */
var clAOS = function () {

    AOS.init({
        offset: 200,
        duration: 600,
        easing: 'ease-in-sine',
        delay: 300,
        once: true,
        disable: 'mobile'
    });

};


/* AjaxChimp
 * ------------------------------------------------------ */
var clAjaxChimp = function () {

    $('#mc-form').ajaxChimp({
        language: 'es',
        url: cfg.mailChimpURL
    });

    // Mailchimp translation
    //
    //  Defaults:
    //	 'submit': 'Submitting...',
    //  0: 'We have sent you a confirmation email',
    //  1: 'Please enter a value',
    //  2: 'An email address must contain a single @',
    //  3: 'The domain portion of the email address is invalid (the portion after the @: )',
    //  4: 'The username portion of the email address is invalid (the portion before the @: )',
    //  5: 'This email address looks fake or invalid. Please enter a real email address'

    $.ajaxChimp.translations.es = {
        'submit': 'Submitting...',
        0: '<i class="fas fa-check"></i> We have sent you a confirmation email',
        1: '<i class="fas fa-exclamation-circle"></i> You must enter a valid e-mail address.',
        2: '<i class="fas fa-exclamation-circle"></i> E-mail address is not valid.',
        3: '<i class="fas fa-exclamation-circle"></i> E-mail address is not valid.',
        4: '<i class="fas fa-exclamation-circle"></i> E-mail address is not valid.',
        5: '<i class="fas fa-exclamation-circle"></i> E-mail address is not valid.'
    }

};


/* Initialize
 * ------------------------------------------------------ */
(function clInit() {

    clPreloader();
    clMoveHeader();
    clMobileMenu();
    clWaypoints();
    clPhotoswipe();
    clStatCount();
    clSlickSlider();
    clSmoothScroll();
    clPlaceholder();
    clAlertBoxes();
    clAOS();
    clAjaxChimp();

    $WIN.on('resize', function () {
        clMoveHeader();
    });

})();
