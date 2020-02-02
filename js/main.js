/* ===================================================================
 * Main JS
 *
 * ------------------------------------------------------------------- */
(function($) {

    "use strict";


    /* Preloader
    * -------------------------------------------------- */
    var preloader = function() {

        $("html").addClass('cl-preload');

        $(window).on('load', function() {

            // will first fade out the loading animation
            $("#loader").fadeOut("slow", function() {
                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(300).fadeOut("slow");
            });

            // for hero content animations
            $("html").removeClass('cl-preload');
            $("html").addClass('cl-loaded');

            $('#scroll-down').css('display', 'block');
            $('#scroll-down').css('position', 'fixed');

            if ($(contactSection).isInViewport()) {
                $('#scroll-down').hide();
            }
        });
    };


    /* Scroll down icon
    * ------------------------------------------------------ */

    $.fn.isInViewport = function() {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();

        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    var homeSection = $('#home').get(0);
    var servicesSection = $('#services').get(0);
    var studioSection = $('#studio').get(0);
    var worksSection = $('#works').get(0);
    var crewSection = $('#crew').get(0);
    var contactSection = $('#contact').get(0);

    $(window).on('resize scroll', function() {
        if ($(homeSection).isInViewport()) {
            $('#scroll-down').show();
            $('#scroll-down').attr("href", '#services');
            $('.header-nav a').removeClass('active');
        }
        if ($(studioSection).isInViewport()) {
            $('#scroll-down').show();
            $('#scroll-down').prop('href', '#works')
            $('.header-nav a').removeClass('active');
            $('.header-nav a.studio').addClass('active');
        }
        if ($(servicesSection).isInViewport()) {
            $('#scroll-down').show();
            $('#scroll-down').attr("href", '#studio');
            $('.header-nav a').removeClass('active');
            $('.header-nav a.services').addClass('active');
        }
        if ($(worksSection).isInViewport()) {
            $('#scroll-down').show();
            $('#scroll-down').prop('href', '#crew')
            $('.header-nav a').removeClass('active');
            $('.header-nav a.works').addClass('active');
        }
        if ($(crewSection).isInViewport()) {
            $('#scroll-down').show();
            $('#scroll-down').prop('href', '#contact');
            $('.header-nav a').removeClass('active');
            $('.header-nav a.crew').addClass('active');
        }
        if ($(contactSection).isInViewport()) {
            $('#scroll-down').hide();
            $('.header-nav a').removeClass('active');
            $('.header-nav a.contact').addClass('active');
        }
    });


   /* Menu on Scrolldown
    * ------------------------------------------------------ */
    var menuOnScrolldown = function() {

        var menuTrigger = $('.hamburger-header .header-menu-toggle');

        $(window).on('scroll', function() {

            if ($(window).scrollTop() > 150) {
                menuTrigger.addClass('opaque');
            }
            else {
                menuTrigger.removeClass('opaque');
            }

        });
    };


   /* OffCanvas Menu
    * ------------------------------------------------------ */
    var offCanvas = function() {

        var menuTrigger     = $('.header-menu-toggle'),
            nav             = $('.header-nav'),
            closeButton     = nav.find('.header-nav__close'),
            siteBody        = $('body'),
            mainContents    = $('section, footer');

        // open-close menu by clicking on the menu icon
        menuTrigger.on('click', function(e){
            e.preventDefault();
            siteBody.toggleClass('menu-is-open');
        });

        // close menu by clicking the close button
        closeButton.on('click', function(e){
            e.preventDefault();
            menuTrigger.trigger('click');
        });

        // close menu clicking outside the menu itself
        siteBody.on('click', function(e){
            if( !$(e.target).is('.header-nav, .header-nav__content, .header-menu-toggle, .header-menu-toggle span') ) {
                siteBody.removeClass('menu-is-open');
            }
        });

    };


   /* Photoswipe
    * ----------------------------------------------------- */
    var photoswipe = function() {
        var items = [],
            $pswp = $('.pswp')[0],
            $folioItems = $('.item-folio');

        // get items
        $folioItems.each( function(i) {

            var $folio = $(this),
                $thumbLink =  $folio.find('.thumb-link'),
                $title = $folio.find('.item-folio__title'),
                $caption = $folio.find('.item-folio__caption'),
                $titleText = '<h4>' + $.trim($title.html()) + '</h4>',
                $captionText = $.trim($caption.html()),
                $href = $thumbLink.attr('href'),
                $size = $thumbLink.data('size').split('x'),
                $width  = $size[0],
                $height = $size[1];

            var item = {
                src  : $href,
                w    : $width,
                h    : $height
            }

            if ($caption.length > 0) {
                item.title = $.trim($titleText + $captionText);
            }

            items.push(item);
        });

        // bind click event
        $folioItems.each(function(i) {

            $(this).on('click', function(e) {
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


    /* Studio slider
     * ------------------------------------------------------ */
    var studioSlider = function() {

        $('.studio__slider').slick({
            dots: false,
            centerMode: true,
            centerPadding: '0px',
            adaptiveHeight: true,
			infinite: true,
			speed: 1000,
			nextArrow: '<span class="nextArrow"><i class="fas fa-chevron-right"></i></span>',
  		    prevArrow: '<span class="prevArrow"><i class="fas fa-chevron-left"></i></span>',
            slidesToShow: 3,
            slidesToScroll: 1,
            pauseOnFocus: false,
            autoplaySpeed: 5000,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });

        // style about-text according to s-studio slider middle slide width
        var middleImageWidth = $('.s-studio .slick-center .thumb-link').outerWidth();
        var aboutTextWidth = middleImageWidth - 20;
        var aboutTextMarginLeft = middleImageWidth + 10;

        if ($(window).outerWidth() > 1200) {
            $('.about-text').css('width', aboutTextWidth + 'px');
            $('.about-text').css('margin-left', aboutTextMarginLeft + 'px');
        }
    };


    /* Showcase slider
     * ------------------------------------------------------ */
    var showcaseSlider = function() {

        $('.showcase__slider').slick({
            dots: true,
            infinite: true,
            speed: 1000,
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
        });

        $('.yesp .yesp-playlist').css('width', '90px !important');
    };


   /* Go to specific slide
    * ------------------------------------------------------ */
    var goToSlide = function() {

        $('.s-services .dropdown a').click(function() {
            var classesStr = $(this).attr("class");
            var classesArr = classesStr.split(' ');
            var goToIndexArr = classesArr[1].split('-').reverse();
            var goToIndex = goToIndexArr[0];

            setTimeout(function () {
                $('.showcase__slider').slick('slickGoTo', goToIndex);
            }, 1000);
        });
    };


   /* Smooth Scrolling
    * ------------------------------------------------------ */
    var smoothScroll = function() {

        var scrollDuration = 800;

        $('.smoothscroll').on('click', function (e) {
            var target = this.hash,
            $target    = $(target);

                e.preventDefault();
                e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, scrollDuration, 'swing').promise().done(function () {

                // only on hamburger-header check if menu is open
                if ($('body').hasClass('menu-is-open')) {
                    $('.hamburger-header .header-menu-toggle').trigger('click');
                }

                window.location.hash = target;
            });
        });

    };


   /* Animate On Scroll
    * ------------------------------------------------------ */
    var aos = function() {

        AOS.init( {
            offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            delay: 300,
            once: true,
            disable: 'mobile'
        });

    };


    /* Contact form
    * ------------------------------------------------------ */

    var emailjs = function() {
        $("#contact-form").on("submit", function(event) {
            event.preventDefault();

            var formData = new FormData(this);
            formData.append('service_id', 'gmail');
            formData.append('template_id', 'template_EIxy7YQS');
            formData.append('user_id', emailJsUserId);

            $.ajax(apiKeys.emailjsApi, {
                type: 'POST',
                data: formData,
                contentType: false,
                processData: false
            }).done(function() {
                console.log('Your mail is sent.');
                $('.message-success').show();
            }).fail(function(error) {
                $('.message-warning').show();
            });

            $("#contact-form")[0].reset()
        });
    };


    /* Header wide or hamburger
    * ------------------------------------------------------ */

    var switchHeaders = function() {
        if ($(window).outerWidth() >= 1000) {
            $('.s-header').addClass('wide-header');
            $('.s-header').removeClass('hamburger-header');
            $("html").addClass('menu-is-open');
        }
        else {
            $('.s-header').addClass('hamburger-header');
            $('.s-header').removeClass('wide-header');
        }
    };


    /* Header wide or hamburger
    * ------------------------------------------------------ */

    var appendSmallAvatar = function() {

        $(window).on('resize load', function() {
            if ($(window).outerWidth() < 420) {
                $('.avatar-background').css('background-image', 'none');
                $('.avatar-small').show();
            }
        });

    };


    /* Open and close services dropdowns
    * ------------------------------------------------------ */

   var openServicesDropdowns = function() {

       // left dropdown logic
        $('.s-services .wrapper-left').on({
            click: function() {
                $('.s-services .dropdown-left').toggleClass('opened');
                $('.s-services .wrapper-left .fa-chevron-down').toggleClass('opened');
            },
        });

        // right dropdown logic
        $('.s-services .wrapper-right').on({
            click: function() {
                $('.s-services .dropdown-right').toggleClass('opened');
                $('.s-services .wrapper-right .fa-chevron-down').toggleClass('opened');
            },
        });

    };


    /* Detect if mobile device and attach href
    * ------------------------------------------------------ */
    var detectMobileDevice = function() {
        if( screen.width <= 480 ) {
            $('.contact-info .phone a').attr('href', 'tel:+359897808715');
        }
    };


    /* Initialize
    * ------------------------------------------------------ */
    (function clInit() {

        preloader();
        menuOnScrolldown();
        offCanvas();
        photoswipe();
        showcaseSlider();
        studioSlider();
        goToSlide();
        smoothScroll();
        aos();
        emailjs();
        switchHeaders();
        // appendSmallAvatar();
        openServicesDropdowns();
        detectMobileDevice();

    })();

})(jQuery);

