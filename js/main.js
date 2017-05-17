// function definitions
function slideHamburgerMenuClosed() {
    $(".menu").slideUp("slow", function() {
        $(".cross").hide();
        $(".hamburger").show();
    });
}

// js executed once page has finished loading
$(function() {
    // add smooth scrolling to the header's anchors
    $("header").on('click', 'a', function(event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 1000);
        slideHamburgerMenuClosed();
    });

    // add highlighting menu item when scrolling to each section
    $(window).on("scroll", function() {
        var position = $(this).scrollTop();
        // offset highlights the section before reaching the very top of the page.
        var offset = 5;

        $(".section").each(function() {
            var target = $(this).offset().top;
            var id = $(this).attr("id");
            if (position + offset >= target) {
                $(".navigation > ul > li > a").removeClass("active");
                $(".navigation > ul > li > a[href='#" + id + "']").addClass("active");
            }
        });
    });

    // Initialize the Slick slider carousel
    $(".autoplay").slick({
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 800,
        arrows: true,
        pauseOnDotsHover: true
    });

    // Make equal height slides from different height images
    // Set each '.slick-slide' to have the height of the '.slick-track' on page load
    var slickTrackHeight = $('.slick-track').height();
    $('.slick-slide').css('height', slickTrackHeight + 'px');

    // Set each '.slick-slide' to have the height of the '.slick-track' on slider resizing
    $('.autoplay').on('setPosition', function() {
        $(this).find('.slick-slide').height('auto');
        var slickTrack = $(this).find('.slick-track');
        var slickTrackHeight = $(slickTrack).height();
        $(this).find('.slick-slide').css('height', slickTrackHeight + 'px');
    });

    // Add the click function to the carousel slides to show the lightbox
    $('.slick-slider').on('click', '.slick-slide', function(event) {
        //prevent default action (hyperlink)
        event.preventDefault();
        //get the clicked image src of the image to be displayed
        var imageSrc = $(this).attr("src");

        // Change the img src to to match the src of whatever image was clicked
        // insert img tag with clicked image's src as src value
        $('#content').html('<img src="' + imageSrc + '">');

        // keep the image smaller than the current screen height
        var maxHeight = $('#lightbox').height() - 65;
        $("#lightbox img").css("max-height", maxHeight + "px");

        // show lightbox window to the user
        $('#lightbox').fadeIn(400);
    });

    //Click anywhere on the page to get rid of lightbox window
    $('body').on('click', '#lightbox', function() { //use delegated event listener, as the lightbox element is inserted into the DOM dynamically
        $(this).fadeOut(300);
    });

    // Add the hamburger menu click event to show and hide the menu
    $(".hamburger").on("click", function() {
        $(".menu").slideDown("slow", function() {
            $(".hamburger").hide();
            $(".cross").show();
        });
    });

    $(".cross").on("click", slideHamburgerMenuClosed);

    // Edit the form fields for blank values
    $(".submit").on("click", function(event) {
        event.preventDefault();
        $(".edited-element").each(function() {
            if ($(this).val()) {
                // value is non-blank
                $(this)
                    .removeClass("error")
                    .siblings().hide();
            } else {
                // value is blank
                $(this)
                    .addClass("error")
                    .siblings().fadeIn(1000);
            }
        });
    });

    // Fade in & out text loop - jQuery
    var quotes = $(".quotes");
    var quoteIndex = -1;

    function showNextQuote() {
        ++quoteIndex;
        quotes.eq(quoteIndex % quotes.length)
            .fadeIn(2000)
            .delay(4000)
            .fadeOut(2000, showNextQuote);
    }
    showNextQuote();
});

// Video cover page JavaScript from coverr.co
// jQuery is required to run this code
$(function() {

    scaleVideoContainer();

    initBannerVideoSize('.video-container .poster img');
    initBannerVideoSize('.video-container .filter');
    initBannerVideoSize('.video-container video');

    $(window).on('resize', function() {
        scaleVideoContainer();
        scaleBannerVideoSize('.video-container .poster img');
        scaleBannerVideoSize('.video-container .filter');
        scaleBannerVideoSize('.video-container video');
    });

});

function scaleVideoContainer() {

    var height = $(window).height() + 5;
    var unitHeight = parseInt(height) + 'px';
    $('.homepage-hero-module').css('height', unitHeight);

}

function initBannerVideoSize(element) {

    $(element).each(function() {
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);

}

function scaleBannerVideoSize(element) {

    var windowWidth = $(window).width(),
        windowHeight = $(window).height() + 5,
        videoWidth,
        videoHeight;

    // console.log(windowHeight);

    $(element).each(function() {
        var videoAspectRatio = $(this).data('height') / $(this).data('width');

        $(this).width(windowWidth);

        if (windowWidth < 1000) {
            videoHeight = windowHeight;
            videoWidth = videoHeight / videoAspectRatio;
            $(this).css({ 'margin-top': 0, 'margin-left': -(videoWidth - windowWidth) / 2 + 'px' });

            $(this).width(videoWidth).height(videoHeight);
        }

        $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

    });
}
