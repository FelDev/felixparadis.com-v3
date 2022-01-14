---
title: "Weird Error Messages in Gatsby"
date: 2022-01-14T10:14:01-05:00
# lastmod: 2021-07-20T10:14:01-05:00
slug: "weird-unhelpful-error-messages-in-gatsby"
tags: ["gatsby"]
description: "A collection of weird, unhelpful errors from Gatsby and solutions to some of them."
images: ["/posts/weird-unhelpful-error-messages-in-gatsby/banner.png"]
previewImage: "banner.png"
previewImageFallback: "banner.png"
---

{{< image_bundle_auto
  src="banner.png"
  alt="Gatsby's logo saying \"idk lol\""
>}}

Gatsby is great! 
But every now and then it throws a weird, unhelpful error
message my way.

So, here is a collection of weird errors and the solutions I found (collection of one, to start 🙄).
For future-me and, perhaps, present-you.

## The result of this StaticQuery could not be fetched. This is likely a bug in Gatsby and if refreshing the page does not fix it, please open an issue in https://github.com/gatsbyjs/gatsby/issues

There are many possible reasons for this error to pop.
One of them, which has nothing to do with the error message, is
having multiple static queries in a single file.

As stated [in the Gatsby docs](https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/#known-limitations)

> Because of how queries currently work in Gatsby, we support only a single instance of useStaticQuery in a file

<!-- ## L'erreur weird de graphql si y manque une curly bracket -->