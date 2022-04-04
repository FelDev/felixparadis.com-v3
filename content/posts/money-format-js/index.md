---
title: "Formatting Currencies with Vanilla JS for Multilingual Projects"
date: 2021-10-15T10:14:01-05:00
lastmod: 2021-10-16T10:14:01-05:00
slug: "formatting-currencies-with-vanilla-js-for-multilingual-projects"
tags: ["tutorial", "JavaScript", "e-commerce"]
description: "How to format money amounts based on any language and currency using only pure, vanilla javaScript."
images: ["/posts/formatting-currencies-with-vanilla-js-for-multilingual-projects/banner.jpg"]
previewImage: "banner.jpg"
previewImageFallback: "banner.jpg"
---

{{< image_bundle_auto
  src="banner.jpg"
  alt="JavaScript's logo, but the 'S' is a '$'"
>}}

Here is a simple and flexible technique to format currencies with i18n in mind. 
It can easily be adapted to work with any front-end framework. 
(React, Svelte, Vue, Angular, keyword stuffing...)

## Basics first: work with cents

You should keep your monetary amounts in cents when working with money and JS.
Let's say you want to add 1.03$ and 1.04$.
```js
1.03 + 1.04 // 2.0700000000000003
```
Floating point number precision is a ~~pain in the~~... a challenge you can avoid 
simply by using cents.
```js
103+104 // 207
```

So, cents it is.

## Formatting cents for any language and/or currency

Depending on your framework, you may have a `language` variable handily 
available.
If not, you might be able to get the current language from the URL.

In my case, the main language of the project is French, so French paths are not
prefixed with a language code. But English paths are.

```js
let lang =
  window.location.pathname.startsWith('/en/') ||
  window.location.pathname === '/en'
    ? 'en-CA'
    : 'fr-CA'
```

Or maybe you can get the `lang` attribute from the HTML document itself.
```js
document.documentElement.lang // Thank you Stack Overflow https://stackoverflow.com/a/949578/5941620
```

Once you figured a way to get the current language of your page, feed it to a 
[NumberFormat object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).

```js
const formatter = Intl.NumberFormat(lang, { // notice the lang variable
  style: 'currency',
  currency: 'CAD',
})
```

All that's left to do is use the formatter in a function which takes cents as 
an input and returns nicely formatted strings.
```js
export default function formatMoney(amount) {
  const value = formatter.format(amount / 100)
  let formated = value.replace('CA', '').trim() // optional: get rid of the currency code
  return formated
}
```

Here is the whole thing, exported and ready to be used in other components.

```js
let lang =
    window.location.pathname.startsWith('/en/') ||
    window.location.pathname === '/en'
      ? 'en-CA'
      : 'fr-CA'

const formatter = Intl.NumberFormat(lang, {
  style: 'currency',
  currency: 'CAD',
})

export default function formatMoney(amount) {
  const value = formatter.format(amount / 100)
  let formated = value.replace('CA', '').trim()
  return formated
}
```

If you have more than 2 languages and a single country, an object can be used to
map the currency and the amount of cents to be used.
Let's say `lang` could be any of `en-CA`, `en-US`, `fr-CA` and `es-CL`
```js
const moneyFormattingValues = {
  "en-CA":{
    currency: "CAD", 
    centDivider: 100, 
    subStringToRemove: ""
  },
  "en-US":{
    currency: "USD", 
    centDivider: 100, 
    subStringToRemove: ""
  },
  "fr-CA":{
    currency: "CAD", 
    centDivider: 100, 
    subStringToRemove: "CA"
  },
  "es-CL":{
    currency: "CLP", 
    centDivider: 1, 
    subStringToRemove: ""
  },
}
const { currency, centDivider, subStringToRemove } = moneyFormattingValues[lang]

const formatter = Intl.NumberFormat(lang, {
  style: "currency",
  currency,
})

export default function formatMoney(amount) {
  const value = formatter.format(amount / centDivider)
  let formated = value.replace(subStringToRemove, '').trim()
  return formated
}
```

I hope this inspires you a solution!