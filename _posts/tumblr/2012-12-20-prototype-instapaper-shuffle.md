---
layout: post
title: "Prototype: Instapaper Shuffle"
date: '2012-12-20T09:24:00-05:00'
tags:
- prototype
- ux
- instapaper
- mockup
tumblr_url: http://pascallaliberte.me/post/38382914001/instapaper-shuffle
---

* [![Image 1](/d/2013/instapaper-prototype-01.jpg)](/d/2013/instapaper-prototype-01.jpg)
* [![Image 2](/d/2013/instapaper-prototype-02.png)](/d/2013/instapaper-prototype-02.png)
* [![Image 3](/d/2013/instapaper-prototype-03.png)](/d/2013/instapaper-prototype-03.png)
* [![Image 4](/d/2013/instapaper-prototype-04.png)](/d/2013/instapaper-prototype-04.png)
* [![Image 5](/d/2013/instapaper-prototype-05.png)](/d/2013/instapaper-prototype-05.png)
{: .gallery .gallery-2-3}

Lately, when using [Instapaper](http://www.instapaper.com), I've been wishing I could hit a shuffle button and just get the app to suggest a random article out of my pile of unreads.

So this is a prototype of how that experience could turn out on the iPad.

It's a new mode you enter, which serves your article previews in a deck of cards you flip through. 

To get the experience right, there are a bunch of small details to think about:

## The shuffle mode sticks around until you turn it off

This works well in most scenarios:

* When you tap on an article, you read it, you go back, you're back at the same spot in the shuffled deck.
* When you switch folders (upper-right dropdown), you could still be in the Shuffle mode, with a different deck of cards waiting for you.
* When you tap search (for paid subscribers), a popup appears, which keeps the shuffle mode waiting in the background. Find an article in your search results, read it, tap Close, you're back at the search results. Hit Done, you're back at the shuffle mode.
* When you're archiving or deleting an article from the article itself, you just get sent back to the pile with the second-in-line getting pushed to the top. Side note: Swiping on the card, though, won't expose the Move, Delete or Share buttons like when you're swiping an article card in the normal list view. In shuffle, the swipe gesture is used to draw a new card.

In some cases, however, you may not want to have the Shuffle mode follow you around:

* When you tap on Liked or Archive on the left hand side menu, you're looking for history more than to peruse randomly for re-reads. Even if you are on a stroll down memory lane and would like a shuffled deck, you could tap the icon there too, the shuffle mode would just be turned off by default.
* When you tap on Friends or The Feature on the left hand side menu, it gets tricky. Those are great contenders for randomized pickings, but how far back do you go in the history? Your normal reading history may be massive, but it's small in scope compared to Friends and The Features articles, which may be huge collections to draw from. In these two, a server-side randomizer routine would be better, since those views rely on an internet connection anyway. The Read Later, Liked, and Archive are all local, small-ish collections, so they can have shuffle available even when offline.

## The reload button, background downloads and coming back to the app

* When you hit the reload button, new articles are downloaded and you get a new random deck. Works as expected.
* When quitting the app and coming back in, you get the same shuffled deck as you previous had, with the same card on top.
* When background downloads are activated (currently using location detection), new articles are brought into the shuffled pile, but the top card stays the same for when coming back into the app.

## Flipping of the cards has to be just right

This prototype assumes an experience much like the study cards found in the iBooks app:

* You drag the cards to the right until you reach a spot where, when released, the card goes to the back of the deck and sticks out.
* You can tap on the card on the back of the deck, which will bring it back, or swipe right-to-left which will do the same animation as swiping a top card to the back, except backwards.
* There are subtle movements in the deck of cards as you do either swipe gestures, so that the second-in-pile, previously crooked card gets straightened into the top card spot. The third-in-pile takes the rotation and position of the previously second-in-pile, and so on.

## Cards hurry into a pile, go back in their order

Upon pressing the shuffle button, the cards could fly into a pile from the whole length of your reading list, and when turning off Shuffle, you'd see them whiz back to their chronological position. That would likely be an expensive operation and would take too long to fetch the far ones.

One alternative is to animate just a few cards to group into a pile, with the top, randomly-picked card, appearing as though it was just below the fold (or from right in the viewport if that's where it actually is). The animation would be cursory and brief, just enough to appear like the whole deck is cobbled together, and would therefore save on execution time and complexity. Pulling in the cards this way would reveal the light gray background, which is close to the colour of the light-gray border between the cards in the normal view.

Another alternative would be to pull a sheet over the normal view and have a pre-assembled pile of cards slide down from the top of the screen. This would save on complex animations.

I think this shuffle mode would be a nice addition to a great app.