(function($){
  $(document).ready(function(){
    $("body").eq(0).addClass('js');

    topGutterHeight = parseInt($("body").eq(0).css("padding-top"))

    $(".site").eq(0).css("min-height",$( window ).height());

    $(window).scrollTop(topGutterHeight);
    
    $(window).resize(function(){
      $(".site").eq(0).css("min-height",$( window ).height());
    });
    
    $(window).scroll(function(){
      tolerance = 20
      setTimeout(function(){
        scrollPos = $(window).scrollTop();
        
        if (scrollPos < (topGutterHeight - 1)) {
          $("body").eq(0).addClass('is-top-gutter-shown');
        } else {
          $("body").eq(0).removeClass('is-top-gutter-shown');
        }
        
        if (topGutterHeight == scrollPos) {
          return;
        }
        if ( (topGutterHeight - tolerance) < scrollPos && (topGutterHeight + tolerance) > scrollPos) {
          $(window).scrollTop(topGutterHeight);
        }
      }, 1000);
    });
    
    $(window).scrollTop(parseInt($("body").eq(0).css("padding-top")));
    
  });
})(jQuery);