(function ( $ ) {

  var languages = {
    'en': 'continue-reading',
    'fr': 'continuer-lecture'
  };

  var defaultLang = 'en';

  var continueReading, lang;

  $.fn.continueReading = function () {

    lang = getPageLang( defaultLang, languages );

    continueReading = languages[lang];

    if ('#' + continueReading == document.location.hash) {

      continueReadingScrollOffset = -80;
      if (localStorage['continueReadingScrollOffset']) {
        continueReadingScrollOffset = localStorage['continueReadingScrollOffset'];
        localStorage.removeItem('continueReadingScrollOffset');
      }

      // set the width and height of images and other items before they're done
      // loading so that when they're done, they don't push down the
      // continue-reading position
      if (localStorage['stuffToPreSizeAboveContinueReading']) {
        stuffToPresize = JSON.parse(localStorage['stuffToPreSizeAboveContinueReading']);
        localStorage.removeItem('stuffToPreSizeAboveContinueReading');
        for(selector in stuffToPresize) {
          $(selector).innerWidth(stuffToPresize[selector].width).innerHeight(stuffToPresize[selector].height);
        }
      }

      continueReadingScrollPos = 0;
      if (1 <= $('#' + continueReading).size()) {
        continueReadingScrollPos = parseFloat($('#' + continueReading).offset().top);
      }

      // scroll to just above the continue-reading-position
      $(window).scrollTop(parseFloat(continueReadingScrollPos) + parseFloat(continueReadingScrollOffset));

      // remove the hash from the URL, for sharing
      if (window.history.replaceState) {
        window.history.replaceState({},window.title,document.location.pathname);
      }
    }

    return this.each(function() {
      $(this).find("a[href$='#" + continueReading + "']").click(function( event ) {
        event.preventDefault();
        continueReadingScrollOffset = this.getBoundingClientRect().top * -1;
        localStorage['continueReadingScrollOffset'] = continueReadingScrollOffset;
        localStorage['stuffToPreSizeAboveContinueReading'] = JSON.stringify(findStuffToPreSizeAbove(this));
        document.location = this.href;
      });
    });

  }

  function getPageLang(defaultLang, languages) {
    if ('undefined' === typeof $('html').attr('lang') || '' === $('html').attr('lang')) {
      return defaultLang;
    }

    lang = $('html').attr('lang').substr(0,2);

    if (!(lang in languages)) {
      return defaultLang;
    }
    return lang;
  }

  function findStuffToPreSizeAbove(continueReadingLink) {
    offsetTopOfContinueReadingLink = $(continueReadingLink).offset().top;

    // find offsetTop of the previous continue-reading link, zero if we're the first
    offsetTopOfPrevContinueReadingLink = 0;
    $("a[href$='#" + continueReading + "']").each(function(){
      offsetTopOfThis = $(this).offset().top;
      if (offsetTopOfThis < offsetTopOfContinueReadingLink) {
        offsetTopOfPrevContinueReadingLink = offsetTopOfThis;
      }
    });

    // list the stuff (images, videos, whatever) that take space when loaded
    var stuffToPreSize = {};
    $("img, iframe").each(function(){
      offsetTopOfThis = $(this).offset().top;
      if (offsetTopOfThis > offsetTopOfPrevContinueReadingLink && offsetTopOfThis < offsetTopOfContinueReadingLink && $(this).attr('src') && $(this).attr('src') != "") {
        stuffToPreSize["img[src='" + $(this).attr('src') + "']"] = {
          width: $(this).innerWidth(),
          height: $(this).innerHeight()
        };
      }
    });

    return stuffToPreSize;

  }

}( jQuery ));
