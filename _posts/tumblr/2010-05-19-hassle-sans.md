---
layout: post
title: Hassle Sans
date: '2010-05-19T17:13:00-04:00'
tumblr_url: http://pascallaliberte.me/post/614087600/hassle-sans
---

Google [announced today](http://googlecode.blogspot.com/2010/05/introducing-google-font-api-google-font.html) that they're hosting free web fonts for use on modern browsers.

You include fonts by first referencing a style sheet from fonts.googleapis.com, which at first glance handles the font inclusion.  Pretty smart.

~~~~~~ markup
<link href='http://fonts.googleapis.com/css?family=Droid+Sans' rel='stylesheet' type='text/css'>
~~~~~~

The resulting style sheet looks like this:

~~~~~~ css
@font-face {
  font-family: 'Droid Sans';
  font-style: normal;
  font-weight: normal;
  src: local('Droid Sans'), url('http://themes.googleusercontent.com/font?kit=POVDFY-UUf0WFR9DIMCU8g') format('truetype');
}
~~~~~~

But since browsers don't implement font inclusion the same way, I wondered if Google did user-agent detection.  Turns out they do.

IE6 gets this CSS returned:

~~~~~~ css
@font-face {
  font-family: 'Droid Sans';
  src: url('http://themes.googleusercontent.com/font?kit=POVDFY-UUf0WFR9DIMCU8g');
}
~~~~~~

Clever.

## CSS-based (Google Web Fonts) vs. JS-based (TypeKit)

With Google's CSS-based approach with user-agent detection, you've got a solution to use free fonts that -- it turns out -- [works in pretty much all browsers](http://webfonts.info/wiki/index.php?title=%40font-face_browser_support) but its main caveat is the [flash of unstyled text](http://code.google.com/apis/webfonts/faq.html#While_Loading) (FOUT for short):

> Some [browsers] will only display the text after the font file is loaded, others will use the fallback font from the font stack and then refresh the page when the font is available. The latter behavior is generally referred to as the "flash of unstyled text."

That's where javascript-based solutions come in. [Typekit](http://typekit.com/), the pay-per-month, no-licensing-headache professional web font purveyor, deals with the FOUT via a javascript solution. And today they've [announced they're open-sourcing their code](http://www.webmonkey.com/2010/05/google-typekit-join-up-to-improve-web-fonts/), in collaboration with Google, under the new project called [WebFont Loader](http://code.google.com/apis/webfonts/docs/webfont_loader.html):

> You can use WebFont Loader with fonts on your own server, links to the just-announced Google Webfont API, or any Typekit account. We’ve also made sure the code is modular, so other font hosting services can add to it in the future.

**Update:** I initially stated that the src URLs were different between the CSS two code samples, but quickly realized they're the same: `font?kit=POVDFY-UUf0WFR9DIMCU8g`

After a bit of testing, the URLs may be the same, but Google does a second round of user-agent detection. In Firefox, a .ttf is returned, while in IE, an .eot is returned.