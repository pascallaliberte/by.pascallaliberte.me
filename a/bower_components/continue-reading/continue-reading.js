/* $.inlineStyle() credit @james_allardice
 * see http://stackoverflow.com/a/11306872
 */
(function ($) {
  $.fn.inlineStyle = function (prop) {
    return this.prop("style")[$.camelCase(prop)];
  };
}(jQuery));

/*
 * $.continueReading()
 */
(function ( $ ) {

  var languages = {
    'en': 'continue-reading',
    'fr': 'continuer-lecture'
  };

  var exemptFromViewPortHeightOffset = [
    'CriOS' // chrome for iOS
  ];

  var bottomBarHeightsToCancel = {
    '(iPhone|iPod)[^\)]*OS (7|8)': {
      '(orientation: portrait)': 44
    }
  }

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

      // adjust the offset if the viewport height has changed after the click
      // e.g. iOS Safari's URL bar expanded on iPad
      if (localStorage['viewportDimensions']) {
        previousViewportHeight = JSON.parse(localStorage['viewportDimensions']).height;
        localStorage.removeItem('viewportDimensions');
        currentViewportHeight = window.innerHeight;
        deltaViewportHeight = previousViewportHeight - currentViewportHeight;

        if (!isUAExemptFromViewPortHeightOffset(navigator.userAgent, exemptFromViewPortHeightOffset)) {
          // cancel the effect of a bottom bar on the viewport height if changed
          if (0 != deltaViewportHeight) {
            deltaViewportHeight -= getUABottomBarHeightToCancel(navigator.userAgent, bottomBarHeightsToCancel);
          }

          // modify the offset with the difference in viewport height
          continueReadingScrollOffset = parseFloat(continueReadingScrollOffset) + parseFloat(deltaViewportHeight);
        }
      }

      // set the width and height of images and other items before they're done
      // loading so that when they're done, they don't push down the
      // continue-reading position
      preSizeStuffAboveContinueReading();

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
        // save viewport dimensions to detect if a change occured when clicking
        // the link, e.g. iOS Safari's URL bar expanded
        localStorage['viewportDimensions'] = JSON.stringify({
          width: window.innerWidth,
          height: window.innerHeight
        });

        continueReadingScrollOffset = this.getBoundingClientRect().top * -1;
        localStorage['continueReadingScrollOffset'] = continueReadingScrollOffset;

        // detect the dimensions of images and iframes above the
        // continue-reading link that could affect the offset to shoot for
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

  function preSizeStuffAboveContinueReading () {
    if (localStorage['stuffToPreSizeAboveContinueReading']) {
      stuffToPresize = JSON.parse(localStorage['stuffToPreSizeAboveContinueReading']);
      for(selector in stuffToPresize) {
        el = $(selector);
        el.data('original-width', el.inlineStyle('width'));
        el.data('original-height', el.inlineStyle('height'));
        el.css('width', stuffToPresize[selector].width);
        el.css('height', stuffToPresize[selector].height);
      }

      $(window).on('load', cancelPreSizeStuffAboveContinueReading);
      $(window).on('resize', cancelPreSizeStuffAboveContinueReading);
    }
  }

  function cancelPreSizeStuffAboveContinueReading () {
    if (localStorage['stuffToPreSizeAboveContinueReading']) {
      stuffToPresize = JSON.parse(localStorage['stuffToPreSizeAboveContinueReading']);
      for(selector in stuffToPresize) {
        el = $(selector);
        el.css('width', el.data('original-width'));
        el.css('height', el.data('original-height'));
        el.removeData('original-width');
        el.removeData('original-height');

        if (el.attr('style') == '') {
          el.removeAttr('style');
        }
      }

      $(window).off('load', cancelPreSizeStuffAboveContinueReading);
      $(window).off('resize', cancelPreSizeStuffAboveContinueReading);

      localStorage.removeItem('stuffToPreSizeAboveContinueReading');
    }
  }

  function isUAExemptFromViewPortHeightOffset(ua, exemptFromViewPortHeightOffset) {
    for (uaPattern of exemptFromViewPortHeightOffset) {
      return (ua.match(new RegExp(uaPattern, "gi")));
    }
    return false;
  }

  function getUABottomBarHeightToCancel(ua, bottomBarHeightsToCancel) {
    var bottomBarHeight = 0;
    var uaMatched = null;

    for (uaPattern in bottomBarHeightsToCancel) {
      if (ua.match(new RegExp(uaPattern, "gi"))) {
        uaMatched = uaPattern;
      }
    }

    if (uaMatched) {
      for (mediaQuery in bottomBarHeightsToCancel[uaMatched]) {
        var mq = window.matchMedia(mediaQuery);
        if (mq.matches) {
          bottomBarHeight = bottomBarHeightsToCancel[uaMatched][mediaQuery];
        }
      }
    }

    return bottomBarHeight;
  }

}( jQuery ));
