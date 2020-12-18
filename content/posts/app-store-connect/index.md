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
<!-- {{< gist feldev 50d969fe7249da949ed966538929310b >}} -->
```js
console.log("🏃 appStoreConnectAPIFromNode.js running 🏃‍")

const fs   = require('fs');
const jwt  = require('jsonwebtoken'); // npm i jsonwebtoken
// You get privateKey, apiKeyId and issuerId from your Apple App Store Connect account
const privateKey = fs.readFileSync("./AuthKey_123456789Z.p8") // this is the file you can only download once and should treat like a real, very precious key.
const apiKeyId = "123456789Z"
const issuerId = "12345678-CLAP-FORR-THIS-GIBBERISHLOLz"
let now = Math.round((new Date()).getTime() / 1000); // Notice the /1000 
let nowPlus20 = now + 1199 // 1200 === 20 minutes

let payload = {
    "iss": issuerId,
    "exp": nowPlus20,
    "aud": "appstoreconnect-v1"
}

let signOptions = {
    "algorithm": "ES256", // you must use this algorythm, not jsonwebtoken's default
    header : {
        "alg": "ES256",
        "kid": apiKeyId,
        "typ": "JWT"
    }
};

let token = jwt.sign(payload, privateKey, signOptions);
console.log('@token: ', token);

// Congrats! the token printed can now be tested with the curl command below
// curl -v https://api.appstoreconnect.apple.com/v1/apps --Header "Authorization: Bearer <YOUR TOKEN>"
// (no '<>' in the curl command)
```


Of course, you’ll want to use something else than curl once you authenticate successfully. You’ll probably want to avoid hosting your secret key (the .p8 file) on your server nor commit it as well, but those are considerations for when you can use the API!

Hope this was helpful, cheers !🍻
