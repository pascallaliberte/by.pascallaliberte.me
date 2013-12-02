(function($){
  jQuery.extend( jQuery.easing, // from http://gsgd.co.uk/sandbox/jquery/easing/
  {
		easeOutQuart: function (x, t, b, c, d) {
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		}
  });
  
  $(document).ready(function(){
    $("body").eq(0).addClass('js');
    
    $(".intro-more,.to-top").smoothScroll({
      easing: 'easeOutQuart',
      speed: 600
    });

    topGutterHeight = parseInt($("body").eq(0).css("padding-top"))

    $(".site").eq(0).css("min-height",$( window ).height());

    $(window).scrollTop(topGutterHeight);
    
    $(window).resize(function(){
      $(".site").eq(0).css("min-height",$( window ).height());
    });
    
    $(window).scroll(function(){
      scrollPos = $(window).scrollTop();

      if (0 >= scrollPos) {
        $("body").eq(0).addClass('is-top');
        $("body").eq(0).removeClass('is-not-top');
      } else {
        $("body").eq(0).removeClass('is-top');
        $("body").eq(0).addClass('is-not-top');
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
    });
    
    $(window).scrollTop(parseInt($("body").eq(0).css("padding-top")));
    
  });
})(jQuery);