---
title: "Piratepx Review: Analytics Without JS, Cookies or Legal Headache"
date: 2021-01-26T11:30:49-04:00
slug: "piratepx-review-analytics-without-js-cookies-or-legal-headache"
tags: ["product review"]
description: "I've had Google Analytics running on this website alongside piratepx for almost 2 months, so we can compare the results."
images: ["/posts/piratepx-review-analytics-without-js-cookies-or-legal-headache/banner.jpg?twitcachetest"]
previewImage: "banner.webp"
previewImageFallback: "banner.jpg"
draft: false
---
{{< image_bundle
    webpSrc="banner.webp" 
    fallbackSrc="banner.jpg"
    alt="Piratepx's logo"
>}}

I've noticed 3 big trends in 2020:
- Face masks
- Conspiracy theories
- Ditching Google Analytics

If you're here, you certainly know why people are doing the latter, so I won't get into the whole "privacy is important and Google is evil" thing. 
Let's just talk about one of the many alternatives: [Piratepx](https://www.piratepx.com/).

If you want to start by looking at a real piratepx dashboard, here's mine: https://app.piratepx.com/shared/6PEV7Kwbkm3HZvaPVMVI5sHrFuJ06nUL4hb0vsdVj8_0dL9X7eZk1AyM-xEn8wW-
(Cool feature, isn't it? You can share your dashboard with a public URL.)

## Who's behind piratepx and why does it exist?
Good ol' [Justin](https://twitter.com/kidjustino) ([github.com/jstayton](https://github.com/jstayton)) is behind it. 
Yep. A single dev. But maybe more in the future since [the repo for piratepx is open source](https://github.com/piratepx/app). 
You'll probably see yourself in Justin. 
He's a developer who wanted "a little analytics insight into my own personal and indie projects (like [Lateral.run](https://www.lateral.run/)) without having to resort to Google Analytics." ...or even JavaScript.

You see, while most privacy-respecting GA alternatives compete on **features**, piratepx competes on **simplicity**.
Here is the cost of piratepx for your...

- **Users**: one extra request of 37 bytes.
- **Developers**: between 1 and 10 lines of code.
- **Legal team**: nothing.
- **Finance team**: nothing.

## Piratepx vs Google Analytics

I've had Google Analytics running on this website alongside piratepx for almost 2 months, so we can compare the results. Yay!

GA and piratepx constantly agree on which pages are the most popular. 
(My [Dygma Raise vs Ergodox EZ article](/posts/quest-for-the-perfect-keyboard-ergodox-ez-vs-dygma-raise) is constantly the most popular.)
GA tends to report about 0.5 to 0.75 as much traffic as piratepx for any given page. 
This is not surprising since my target audience is nerds, geeks and my mom.

Nerds and geeks aggressively blocking GA and third party cookies in general is very likely.

## Can piratepx replace Google Analytics?
It depends what you do with GA. 
If you do use the vast possibilities of tracking and insights GA can provide, or even 5% of them, then no.
Piratepx is not even a close match. 
But if, like me, you only pop it open every now and then, scroll down the homepage to see which pages are the most popular and leave, then yes.
Piratepx can compete.

## Tracking specific events with piratepx

Sometimes you want to know more than what pages have been seen. 
You want to know what buttons have been clicked. 
While it might be tedious to do that for every possible interaction on a big website, piratepx's pixel can be tweaked to do that. 
I tested this idea with the theme toggler on this website.
Inside my `switchTheme()` function, I added this simple one-liner:
```js
fetch("https://app.piratepx.com/ship?p=0myLong-ugly-ID-randomn3ss&i=darkmode")
```
Noticed the `&i=darkmode` part? I now have a new row in my dashboard for the /darkmode page. Every "page view" is equal to a button click.
(And yes, people do click it.) 

## Using piratepx WITH Google Analytics?
Here is another fun use-case for the pirate pixel, doing what GA can't!
GA needs JS, what if there's no JS? This:
```html
<noscript>
  <img src="https://app.piratepx.com/ship?p=0myLong-ugly-ID-randomn3ss" alt="" style="display:none"/>
</noscript>
```
GA might also need some kind of permission from the user, you could fetch your mighty pixel in case you don't have that... Just an idea.

## Tip to avoid counting localhost views

Whatever your stack, there surely is a way to detect whether you're on localhost or not. 
Hopefully without client-side JS.

Since this site is built with Hugo, it looks like this:
```html
{{ if not .Site.IsServer }}
  <img src="https://app.piratepx.com/ship?p=0myLong-ugly-ID-randomn3ss&i={{ .Page.RelPermalink }}" alt="" style="display:none"/>
{{ end }}
```

You could also use something like Netlify's snippet injection feature.

## Conclusion - did I ditch Google Analytics?
Yes. I did. Making me almost as brave and cool as Julian Asange and Edward Snowden 🙂

GA has served me well over the past few years, but I don't need a big fancy analytics solution and I don't want to worry about cookie-consent or other legal issues.
Pretty much all the insight that GA got me, I could've gotten from Search Console alone.

However, there is one thing I'd miss by going all-in on piratepx: stats about countries.
So I'll give a shot to another, more complex but still privacy-focused GA alternative: [Your Analytics](https://www.your-analytics.org).
Another cookie-less analytics solution I might try is [GoatCounter](https://www.goatcounter.com/).

The takeaway here is that piratepx does exactly what it claims to do.
I don't see it becoming a major player in the world of analytics anytime soon, but it has its use cases.