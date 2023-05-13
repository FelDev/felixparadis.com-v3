---
title: "Localization of Shopify's Buy Buttons"
date: 2021-07-24T10:14:01-05:00
lastmod: 2023-05-13T10:14:01-05:00
slug: "localization-of-shopifys-buy-buttons"
tags: ["tutorial", "e-commerce"]
description: "Learn to integrate Shopify buy buttons with i18n in mind."
images: ["/posts/localization-of-shopifys-buy-buttons/banner.png"]
previewImage: "banner.png"
previewImageFallback: "banner.png"
---

{{< image_bundle_auto
    src="banner.png"
    alt="Shopify's logo with the standard language icon on it."
>}}

{{< emphasis >}}
  🚨 IMPORTANT UPDATE 🚨

  Shopify moved things around and the solution outlined in this tutorial is no longer working.
  If you happen to find a new solution, please let me know!
{{< /emphasis >}}

I had to setup Shopify Buy Buttons on a **multilingual** website and quickly
started wondering if [Snipcart](https://snipcart.com/) would've been a better 
option after all...

But the solution came to me at last. It was [deeply buried in a Shopify forum](https://community.shopify.com/c/Shopify-APIs-SDKs/Pass-Locale-parameter-using-Buy-Button/td-p/313228). 
Here's a more detailed explanation with code snippets. Hopefully I'll save you, 
dear stranger, some precious time with this post I wish I had had.

## How to make Shopify Buy Buttons redirect to checkout in a specific language?

When Shopify redirects your clients to the checkout page, the URL looks like this:
https://slacklinemtl.myshopify.com/56842879150/checkouts/7295a6fdaa87b3ecfa8bd6e58a96c2b4
(This URL won't work, but you get the idea.)

If you simply append `&locale=en` to those URLs, the checkout will be English.
`&locale=fr` and the checkout will be in French. Go ahead and try it out!

Now, how can you append that `&locale=` parameter to the URL automatically?
Easy peasy, once you know what to modify.

The code for your Shopify Buy Button most probably starts with something like this:
```html
<div id='product-component-1627130549176'></div>
<script type="text/javascript">
/*<![CDATA[*/
(function () {
  var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
<!-- etc... -->
```
The part you need to modify is in the `options` object.
The options object looks like this:
```js
options: {
  "product": {
      // Skipping lots of code for brevity ...
    },
    "productSet": {
    // Skipping lots of code for brevity ...
  },
  "modalProduct": {
    // Skipping lots of code for brevity ...
  },
  "option": {},
  "cart": {
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // * ❗️THIS IS WHERE YOU'LL MAKE MAGIC HAPPEN❗️
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    "styles": {
      // Skipping lots of code for brevity ...
    },
    "text": {
      // Skipping lots of code for brevity ...
    },
    "popup": false
  },
  "toggle": {
    // Skipping lots of code for brevity ...
  }
}
```

Under that `"cart"` key, you need to add a mere 8 lines of code. 
And you only need to modify two letters in those 8 lines.
```js
"events": {
  afterInit: (cart) => {
    cart.onCheckout = () => {
      const checkoutUrl = cart.model.webUrl + '&locale=en';
      cart.checkout.open(checkoutUrl);
    };
  },
},
```
Notice the `&locale=en` part? Change it to `&locale=fr` and you'll redirect to
the checkout page in French. It's that easy.

To make all this more obvious, here's how your options object will look like 
after you add the code that specifies a language for the checkout page:

```js
// Skipping lots of code for brevity ...
ShopifyBuy.UI.onReady(client).then(function (ui) {
  ui.createComponent('product', {
    id: '6750224449710',
    node: document.getElementById('product-component-1627130549176'),
    moneyFormat: '%24%7B%7Bamount%7D%7D',
    options: {
      "product": {
        // Skipping lots of code for brevity ...
      },
      "productSet": {
        // Skipping lots of code for brevity ...
      },
      "modalProduct": {
        // Skipping lots of code for brevity ...
      },
      "option": {},
      "cart": {
        // * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
        // * 👇THIS IS WHERE MAGIC HAPPENS👇
        // * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
        "events": {
          afterInit: (cart) => {
            cart.onCheckout = () => {
              const checkoutUrl = cart.model.webUrl + '&locale=fr';
              cart.checkout.open(checkoutUrl);
            };
          },
        },
        // * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
        // * 👆THIS IS WHERE MAGIC HAPPENS👆
        // * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
        "styles": {
          // Skipping lots of code for brevity ...
        },
        "text": {
          // Skipping lots of code for brevity ...
        },
        "popup": false
      },
      "toggle": {
        // Skipping lots of code for brevity ...
      }
    }
  })
})
// Skipping lots of code for brevity ...
```

Make the 2 letter language code a variable that changes according to the current
language of your website and you're golden.

## Bonus: Removing unnecessary code (when you have multiple products)

You'll notice that every time you create a Buy Button, a lot of the code is 
exactly the same as other Buy Buttons. And you probably want all buttons to look the same anyway.

Here are ideas you can adapt to your current tech stack.

Instead of copy/pasting the whole options object for every Buy Button, create it
once and store it in a variable.

```js
const shopifyOptions = {
    "product": {
    // etc..
```

Then define another variable which will contain the IDs of all the products you're selling.
I added `"name"` properties for clarity, but you could do it with just an array of IDs.

```js
const products = [
  {
    "name": "pro30",
    "id": 6750224449710
  },
  {
    "name": "prim25",
    "id": 6698345988270
  },
  {
    "name": "trick15",
    "id": 6921340027054
  }
  // etc...
]
```

{{< emphasis >}}
  ### How to find a Shopify product's ID?
  To find a product's ID, click on that specific product in your Shopify admin 
  panel and you'll find the ID in the URL.

  For instance, in https://slacklinemtl.myshopify.com/admin/products/6750224449710,
  the ID is 6750224449710
{{< /emphasis >}}

Modify Shopify's initialization code so that it loops over your products array. 
Again, the idea is to **not** copy/paste the whole thing for every product.

```js
ShopifyBuy.UI.onReady(client).then(function (ui) {
  products.forEach(product => { // This is the loop we are adding
    let node = document.getElementById('product-component-'+ product.name)
    if (node) {
      ui.createComponent('product', {
        id: product.id,
        node: node,
        moneyFormat: '%24%7B%7Bamount%7D%7D',
        options: shopifyOptions, // the options object defined earlier
      });
    }
  });
});
```

Finally, create the `<div>` with the correct ID wherever you want your button to 
appear.
```html
<div id='product-component-pro30'></div>
```

With that setup, inserting a new Buy Button is done by just getting the product
ID, adding it to your product array and creating the `<div>` for that button.

No need to go through Shopify's "Create a Buy Button" flow.

## Conclusion
I hope this was helpful! The localization part is pretty straightforward.

For an example of this whole thing in the wild, you can take a look at 
[Slackline MTL's source code](https://github.com/FelDev/slackmtl/tree/a0c62ecea142144099178e76198666f46c71d52a) (this link points to 
a specific commit as the codebase might change).

If you need help with your implementation of Buy Buttons... I charge money 😅

And if you happen to be looking for a great slackline, I highly recommend 
[Slackline MTL](https://www.slacklinemtl.com/en/)!

