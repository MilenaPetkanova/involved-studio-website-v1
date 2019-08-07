/* ===================================================================
 * Main JS
 *
 * ------------------------------------------------------------------- */

(function($) {

    "use strict";

    var cfg = {
        scrollDuration : 800, // smoothscroll duration
        mailChimpURL   : 'https://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e6957d85dc'   // mailchimp url
    },

    $WIN = $(window);

    // Add the User Agent to the <html>
    // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);


   /* Preloader
    * -------------------------------------------------- */
    var preloader = function() {

        $("html").addClass('cl-preload');

        $WIN.on('load', function() {

            //force page scroll position to top at page refresh
            $('html, body').animate({ scrollTop: 0 }, 'normal');

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
        });
    };


   /* Menu on Scrolldown
    * ------------------------------------------------------ */
    var menuOnScrolldown = function() {

        var menuTrigger = $('.hamburger-header .header-menu-toggle');

        $WIN.on('scroll', function() {

            if ($WIN.scrollTop() > 150) {
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


   /* photoswipe
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


    /* slick slider
     * ------------------------------------------------------ */
    var showcaseSlickSlider = function() {

        $('.slider').slick({
            dots: false,
            centerMode: true,
            centerPadding: '0px',
            adaptiveHeight: true,
			infinite: true,
			speed: 1000,
			nextArrow: '<span class="nextArrow"><i class="fas fa-angle-right"></i></span>',
  		    prevArrow: '<span class="prevArrow"><i class="fas fa-angle-left"></i></span>',
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
    };


   /* Smooth Scrolling
    * ------------------------------------------------------ */
    var smoothScroll = function() {

        $('.smoothscroll').on('click', function (e) {
            var target = this.hash,
            $target    = $(target);

                e.preventDefault();
                e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {

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


   /* Back to Top
    * ------------------------------------------------------ */
    var backToTop = function() {

        var pxShow  = 500,         // height on which the button will show
        fadeInTime  = 400,         // how slow/fast you want the button to show
        fadeOutTime = 400,         // how slow/fast you want the button to hide
        scrollSpeed = 300,         // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
        goTopButton = $(".cl-go-top")

        // Show or hide the sticky footer button
        $(window).on('scroll', function() {
            if ($(window).scrollTop() >= pxShow) {
                goTopButton.fadeIn(fadeInTime);
            } else {
                goTopButton.fadeOut(fadeOutTime);
            }
        });
    };


    /* Embedded video
    * ------------------------------------------------------ */
    var videoOptimizer = function() {
        var youtube = document.querySelectorAll( ".youtube" );

        for (var i = 0; i < youtube.length; i++) {

            var source = 'https://img.youtube.com/vi/'+ youtube[i].dataset.embed +'/sddefault.jpg';

            var image = new Image();
            image.src = source;
            image.addEventListener( "load", function() {
                youtube[ i ].appendChild( image );
            }( i ) );

            youtube[i].addEventListener( "click", function() {
                var iframe = document.createElement( "iframe" );

                iframe.setAttribute( "frameborder", "0" );
                iframe.setAttribute( "allowfullscreen", "" );
                iframe.setAttribute( "src", "https://www.youtube.com/embed/"+ this.dataset.embed +"?rel=0&showinfo=0&autoplay=1" );

                this.innerHTML = "";
                this.appendChild( iframe );
            } );
        };
    };

   /* Scroll icon
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

    if ($(contactSection).isInViewport()) {
        $('#scroll-down').hide();
    }

    $(window).on('resize scroll', function() {
        if ($(homeSection).isInViewport()) {
            $('#scroll-down').show();
            $('#scroll-down').attr("href", '#services');
        }
        if ($(studioSection).isInViewport()) {
            $('#scroll-down').prop('href', '#works')
        }
        if ($(servicesSection).isInViewport()) {
            $('#scroll-down').attr("href", '#studio');
        }
        if ($(worksSection).isInViewport()) {
            $('#scroll-down').prop('href', '#crew')
        }
        if ($(crewSection).isInViewport()) {
            $('#scroll-down').show();
            $('#scroll-down').prop('href', '#contact')
        }
        if ($(contactSection).isInViewport()) {
            $('#scroll-down').hide();
        }
    });


    /* Contact form
    * ------------------------------------------------------ */

    var emailjs = function() {
        $("#contact-form").on("submit", function(event) {
            event.preventDefault();

            var formData = new FormData(this);
            formData.append('service_id', 'gmail');
            formData.append('template_id', 'template_EIxy7YQS');
            formData.append('user_id', 'user_Lt4mdKpoobIxgiHp7l9gB');

            $.ajax('https://api.emailjs.com/api/v1.0/email/send-form', {
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

    var switchHeaders = function() {
        if ($(window).width() >= 1000) {
            $('.s-header').addClass('wide-header');
            $('.s-header').removeClass('hamburger-header');
            $("html").addClass('menu-is-open');
        }
        else {
            $('.s-header').addClass('hamburger-header');
            $('.s-header').removeClass('wide-header');
        }
    };


   /* Initialize
    * ------------------------------------------------------ */
    (function clInit() {

        preloader();
        menuOnScrolldown();
        offCanvas();
        photoswipe();
        showcaseSlickSlider();
        smoothScroll();
        videoOptimizer();
        aos();
        backToTop();
        emailjs();
        switchHeaders();
    })();

})(jQuery);