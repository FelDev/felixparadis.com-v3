---
title: "Authenticating to Apple’s App Store Connect API from Node.js using JWT"
date: 2019-02-26T11:46:04-04:00
tags: ["tutorial"]
slug: "Authenticating-to-Apples-App-Store-Connect-API-from-Node.js-using-JWT"
images: ["/posts/app_store_connect.jpeg" ]
previewImage: "banner.avif"
previewImageFallback: "posts/app_store_connect/banner.jpeg"
description: "Without further ado, the snippet you need to get going quickly:"
---

{{< image_bundle
    avifSrc="banner.avif" 
    fallbackSrc="banner.jpeg"
    alt="Node logo with Apple's logo"
>}}

I had to connect to Apple’s new App Store Connect API at work and found exactly 0 tutorial and/or code example on how to achieve this from Node.js, which I use. (I did find [a good one for Ruby](https://shashikantjagtap.net/wwdc18-a-basic-guide-to-app-store-connect-api/), though, if that’s your thing.) 

It’s not very complex, but if you’ve never used JSON Web Tokens before, you might fall in a dumb gotcha like I did. Also, once you do get to generate tokens, if something is wrong with them you will get “401 NOT_AUTHORIZED” as your only clue. So, here I am, saving you some time.

I’m using the [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) npm package, but you could use an alternative.

Without further ado, the snippet you need to get going quickly:

{{< gist feldev 50d969fe7249da949ed966538929310b >}}

Of course, you’ll want to use something else than curl once you authenticate successfully. You’ll probably want to avoid hosting your secret key (the .p8 file) on your server nor commit it as well, but those are considerations for when you can use the API!

Hope this was helpful, cheers !🍻
