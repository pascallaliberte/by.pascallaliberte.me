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

}( jQuery ));
