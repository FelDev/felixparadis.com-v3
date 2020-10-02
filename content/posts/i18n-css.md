---
title: "Solving design problems caused by i18n with pure CSS"
date: 2019-06-09T13:57:04-04:00
slug: "solving-design-problems-caused-by-i18n-with-pure-css"
tags: ["tutorial"]
images: ["/images/posts/i18n_css.png"]
previewImage: "/images/posts/i18n_css.png"
previewImageFallback: "/images/posts/i18n_css.png"
description: "If you ever managed a multilingual website, you surely ran into issues that were language specific; your site is a responsive heaven in language X, but then you switch to language Y and the design is broken on mobile"
---

{{< figure 
    src="/images/posts/i18n_css.png" 
    alt="A design working well in English but broken in French"
>}}

If you ever managed a multilingual website, you surely ran into issues that were language specific; your site is a responsive heaven in language X, but then you switch to language Y and the design is broken on mobile (😿). Today, I present to you a way of organizing your i18n fixes in a way that is simple and readily available in vanilla CSS.

**BEHOLD!** ⭐️ The `:lang()` Selector ️⭐️
```css
html:lang(fr) #superImportantDiv {
    width: 50%;
}
```

You’ve guessed it! `#superImportantDiv` will have a width of 50%, but that rule only applies if the `lang` attribute of your HTML document is set to French (`<html lang="fr">`).
I personally choose to put all my internationalization exceptions at the end of my .SCSS files, like this.

```scss
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// *  _ __  ___
// * (_)_ |/ _ \
// *  _ | | (_) |_ __
// * | || |> _ <| '_ \
// * | || | (_) | | | |
// * |_||_|\___/|_| |_|
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
html:lang(en) {
    //  All the English exceptions...
}
html:lang(fr) {
    // All the Françaises exceptions...
}
html:lang(de) {
    // All the Deutsch Exception...
}
// So on and so forth...
```

This is much, much cleaner than using something like a `.frException` class you apply only when the page is rendered in French (not that I ever did that…).

# Genesis of this article…

I discovered `:lang()` when I had to use it in a very, very hacky way.

The CRM we use at work is FreshDesk. Probably the weirdest flaw we’ve encountered with this platform is that some fields in the knowledge base didn’t get translated. For instance, in the contact form, “subject” was always “subject”, unless we changed it to something else, but then of course “subject” was wrong in English… Needless to say, the whole company nearly fell apart.

But! Freshdesk gives the possibility to add CSS to the knowledge base. So, to change “subject” to it’s French equivalent “sujet” I got something like this going on:

```scss
html:lang(fr) form label:nth-of-type(2) {
    display:none;
}
html:lang(fr) form label:nth-of-type(2)::before() {
    content:"sujet";
}
```

How hilarious is that?

It’s not exactly good practice to have translations stored in your CSS, but when CSS is all you have access to… You learn about new selectors 😆
