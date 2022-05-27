---
title: "Regex Mnemonics"
date: 2022-05-27T10:14:01-05:00
# lastmod: 2021-11-12T10:14:01-05:00
slug: "regex-mnemonics"
tags: ["todo"]
description: ""
images: ["/posts/regex-mnemonics/banner.jpg",]
previewImage: "banner.jpg"
previewImageFallback: "banner.jpg"
draft: true
---

When I need a regex, I usually have to lookup the syntax. 
To be fair, there's not much to indicate that `$` means "the end of the string" besides just knowing it.

I'm hoping that writing and publishing the following dumb mnemonic tricks will burry the basics of regex syntax deep inside my brain.

## Start and end of an input
Think of a person.
When you look at someone from head to toe, what do you see first?
A hat.

`^`

When you buy a hat, what is the last step?
You pay for it.

`$`

Hence, `^` matches the beginning of an input and `$` the end of an input.