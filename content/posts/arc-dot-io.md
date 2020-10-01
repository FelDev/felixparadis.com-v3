---
title: "Arc.io Review - A Way to Monetize Any Website"
date: 2020-08-18
lastmod: 2020-09-17
slug: "arc-dot-io-review" 
tags: ["product review"]
description: "Generating money from any kind of website without charging your users or showing them ads is an enticing promise. Arc promises that \"it never impacts the user experience\" and anyone can join the network..."
images: ["/images/posts/arc/banner.png?updateYourCacheTwitter"]
previewImage: "/images/posts/arc/banner.webp"
previewImageFallback: "/images/posts/arc/banner.png"
---

{{< image 
    webpSrc="/images/posts/arc/banner.webp" 
    fallbackSrc="/images/posts/arc/banner.png"
    alt="Arc's logo"
>}}
# What's [Arc.io](https://arc.io/) ?

In their own words, "Arc is a peer-to-peer Content Delivery Network". Basically, a tiny portion of your users' bandwidth and CPU will be used to power Arc's CDN. Arc promises that "it never impacts the user experience" and anyone can join the network, whether you have a single or a million monthly visitors.

Generating money from any kind of website without charging your users or showing them ads is an enticing promise. So I gave it a try!

Note that I'm not using Arc as a way to serve my assets, so this blog post is not about how fast and cheap Arc is as a CDN. It's about: 
- [How easy it is to setup ](#getting-started-with-arc)
- [Whether it really "never impacts the user experience" or not ](#impact-on-the-user-experience)
- [How much money it actually generates ](#is-this-generating-income)
- [The ethical implications of renting out your users' bandwidth.](#is-this-ethical-though)

This website is currently running Arc.

# Getting started with Arc

Setting up Arc was fairly easy. The whole process, from signing up to testing in production, took me less than an hour. It may take you a little longer if you're not comfortable copy/pasting a few lines of code, but I think anyone tech savvy enough to have a website will be able to get around the challenge. 

My website is built with Hugo as a Static Site Generator and hosted on Netlify. So the whole process was this:

1. Add this line of code to my baseof.html file:

```html
<script async src="https://arc.io/widget.js#jf2aUNG1"></script>
```

2. Add this rule to my netlify.toml file:
```toml
[[redirects]]
  from = "/arc-sw.js"
  to = "https://arc.io/arc-sw.js"  
  status = 200
```

Then I provided an email address to receive PayPal payments and that was pretty much it.

# Impact on the user experience

I ran Lighthouse tests before and after implementing Arc. Sadly, it doesn't look like injecting Arc's code is impact-less ☹️

My score before implementing Arc:

{{< image 
    webpSrc="/images/posts/arc/lighthouse_1.webp" 
    fallbackSrc="/images/posts/arc/lighthouse_1.png"
    alt="Lighthouse test showing a score of 100 for Performance, Accessibility, Best Practices and SEO."
    caption="Yeah, I'm that good."
    lazy="true"
>}}

After implementing Arc:

{{< image 
    webpSrc="/images/posts/arc/lighthouse_2.webp" 
    fallbackSrc="/images/posts/arc/lighthouse_2.png"
    alt="Lighthouse test showing a score of 81 for Performance, 96 for Accessibility, 93 for Best Practices and 100 for SEO."
    caption="Yikes!"
    lazy="true"
>}}
Then I noticed errors were being logged in the console...

{{< image 
    webpSrc="/images/posts/arc/console.webp" 
    fallbackSrc="/images/posts/arc/lighthouse_1.png"
    alt="Developer console showing \"Uncaught DOMException: Failed to read the 'localStorage' property from 'Window': Access is denied for this document.\" All errors come from https://static.arc.io/something"
    caption="Yuck!"
    lazy="true"
>}}

I wrote to Arc's team about this, pointing out that some of the issues were easy fixes. They kindly replied that they will be fixing them "shortly".  I'm still eagerly waiting for those fixes in particular:

- [x] \<frame\> or \<iframe\> elements do not have a title - **UPDATE: FIXED**
- [x] A cookie associated with a cross-site resource at http://core.arc.io/ was set without the `SameSite` attribute. - **UPDATE: FIXED**
- [ ] Arc's widget is not accessible to users who only use a keyboard. 

I'll update this blog post when I notice fixes. But Arc's reply included this:
> We're currently experiencing unprecedented, explosive growth and our servers are absolutely melting. We're  hands on deck to resolve that and right the ship.

So I don't know how short "shortly" is going to be.

To be fair, I cannot say that I notice slower performances now that Arc is on my website. When I browse it as an average user, the only noticeable difference is the blue circle with two white lines in the bottom left corner. 

# Is this generating income?

My website is, for the moment, pretty low traffic. Here is a screenshot of my Google Analytics homepage for the past 28 days.

{{< image 
    webpSrc="/images/posts/arc/analytics.webp" 
    fallbackSrc="/images/posts/arc/analytics.png"
    alt="Google Analytics screenshot showing 282 users, 293 sessions, 89.42% bounce rate and 17 seconds as the average session duration"
    lazy="true"
>}}
Yeah, this blog has room for growth. The traffic is so low that I couldn't possibly be accepted by any decent ad network at the moment. And yet... even with such a humble amount of visitors, felixparadis.com is now a source of passive income!

{{< image 
    webpSrc="/images/posts/arc/earnings.webp" 
    fallbackSrc="/images/posts/arc/earnings.png" 
    alt="Graphic of my earnings through Arc.io. Some days are as low as not even a penny, but some are above 0.10$ and one day even got to 0.24$"
    caption="I implemented Arc on the 4th of August."
    lazy="true"
>}}

Ok, it's passive pennies. Just enough to cover the yearly cost of my domain name plus a few cheap beers. But considering how low traffic this website is, I'd say it's not bad at all! Remember, there are no annoying ads  here. No asking for money anywhere, just a slightly bad Lighthouse score 😐

If you run some kind of free web app where many people spend many minutes, you probably could make decent earnings. [I asked for arc.io reviews on Indie Hackers](https://www.indiehackers.com/post/arcdot-io-reviews-rent-your-users-bandwidth-058c1efe42) and [Martin Ratinaud](https://twitter.com/martinratinaud) wrote back that he makes about 8$ per day for 400k views per month with [edityouraudio.com](https://www.edityouraudio.com/). That's a daily not-so-cheap beer!


**Update!** Ralf has something to add:

{{< tweet 1306455670376497152 >}}

# Is this ethical though?

When I entered "arc.io review" in Google Search, the first result was [a post on Hacker News](https://news.ycombinator.com/item?id=20105509) where almost everyone said they wouldn't use it, even though some admitted it's a cool technology. 

Most criticism came from people seeing the idea of renting your users' bandwidth as somewhat sly and potentially not compliant with privacy regulations such as the GDPR, *potentially*.

You definitely should be wary of anyone asking you to inject their code into your users' browsers and Arc could do a better job of making us feel at ease (Maybe by being more transparent about who works there? Having an official Twitter account?). Also, while Arc's widget offers the possibility of opting out, some argue that it should be the other way around. Although, let's be honest, nobody would opt-in.

So, there is room for personal opinions here. But Arc is very legit when it comes to privacy and they only rent out users' bandwidth if they're on wifi. To me, it sounds like a good deal as a user too; I give money to people creating content I enjoy without actually giving them money. It's a win-win, no?

# Conclusion

I think Arc is bringing an innovative solution to a real problem: creators like to get paid but users don't like to pay. There are still some rough edges around their technology, but this should get better... "shortly".

You do need a lot of traffic to generate serious income, but it's probably the easiest way to monetize any web project. As for the user experience, you've read this article on a website running Arc. How did it feel?


