(function($){

  jQuery.extend( jQuery.easing, // from http://gsgd.co.uk/sandbox/jquery/easing/
  {
    easeOutQuart: function (x, t, b, c, d) {
      return -c * ((t=t/d-1)*t*t*t - 1) + b;
    }
  });

  is_touch_device = function() {
    return 'ontouchstart' in window // works on most browsers
        || 'onmsgesturechange' in window; // works on ie10
  };

  update_page_properties = function(){
    scrollPos = $(window).scrollTop();
    topGutterHeight = parseInt($("body").eq(0).css("padding-top"))

    if (0 >= scrollPos) {
      $("body").eq(0).addClass('is-top');
      $("body").eq(0).removeClass('is-not-top');
    } else {
      $("body").eq(0).removeClass('is-top');
      $("body").eq(0).addClass('is-not-top');
    }

    if (window.innerHeight > topGutterHeight * 1.4) {
      $("body").eq(0).addClass('is-fits-blog-nav-simple');
    } else {
      $("body").eq(0).removeClass('is-fits-blog-nav-simple');
    }

    if (window.innerHeight > topGutterHeight * 1.75) {
      $("body").eq(0).addClass('is-fits-blog-nav');
    } else {
      $("body").eq(0).removeClass('is-fits-blog-nav');
    }

    if (window.innerHeight > topGutterHeight * 2) {
      $("body").eq(0).addClass('is-fits-blog-nav-large');
    } else {
      $("body").eq(0).removeClass('is-fits-blog-nav-large');
    }

    if (is_touch_device()) {
      $("body").eq(0).addClass('is-touch');
    } else {
      $("body").eq(0).addClass('is-not-touch');
    }

    setTimeout(function(){
      scrollPos = $(window).scrollTop();

      if (scrollPos < (topGutterHeight - 31)) {
        $("body").eq(0).addClass('is-top-gutter-shown');
        $("body").eq(0).removeClass('is-not-top-gutter-shown');
      } else {
        $("body").eq(0).removeClass('is-top-gutter-shown');
        $("body").eq(0).addClass('is-not-top-gutter-shown');
      }
    }, 500);
  }

  init_gallery = function() {
    $(".gallery-2-3 li").each(function(i){
      if (i < 2) {
        $(this).addClass("gallery-1of2");
        if (i == 1) {
          $(this).addClass("gallery-last");
        }
      }
      if (i >= 2) {
        $(this).addClass("gallery-1of3");
        if ((i + 2) % 3 == 0) {
          $(this).addClass("gallery-last");
        }
      }
    });

    $(".gallery").each(function(){
      $(this).addClass("gallery-enhanced");
    });

    // initialize the lightbox

    $('<link>')
      .appendTo($('head'))
      .attr({type : 'text/css', rel : 'stylesheet'})
      .attr('href', '/a/bower_components/swipebox/source/swipebox.css')

      $.getScript('/a/bower_components/swipebox/source/jquery.swipebox.js')
        .done(function(script, textStatus) {
          $(".gallery a").swipebox();
        });
  }

  init_arrow_down = function() {
    if ($("body").eq(0).hasClass("is-not-home")) return;

    $( ".blog-nav-pagination-summary hr.post-separator" ).replaceWith( '<div class="post-separator-arrow post-separator-arrow-bottom"><div class="post-separator-arrow-left-angle"></div><div class="post-separator-arrow-right-angle"></div></div>' );
  }

  $(document).ready(function(){
    $("body").eq(0).addClass('js');

    $(".intro-more,.to-top").smoothScroll({
      easing: 'easeOutQuart',
      speed: 600
    });

    topGutterHeight = parseInt($("body").eq(0).css("padding-top"))

    $(".site").eq(0).css("min-height",$( window ).height());

    $("body").continueReading();

    if (0 == $(window).scrollTop() && $("body").eq(0).hasClass("is-not-home")) {
      $(window).scrollTop(topGutterHeight);
    }

    $(window).scroll(update_page_properties);

    $(window).resize(function(){
      $(".site").eq(0).css("min-height",$( window ).height());
      update_page_properties()
    });

    init_arrow_down();
    init_gallery();
  });
})(jQuery);
