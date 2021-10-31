---
title: "My Recipe for a 0$/month e-commerce Website"
date: 2020-05-19T11:05:39-04:00
slug: "my-Recipe-for-a-0-dollar-per-month-e-commerce-website"
tags: ["e-commerce", "jamstack"]
images: ["https://res.cloudinary.com/felixparadis-com/image/upload/v1589901361/felixparadis.com/ecommerce_xjpn8n.jpg"]
description:  "Where’s the catch? Stripe will charge you 2,9 % + 0,30$ on every transaction, but only if you make sales. Fine by me!"
previewImage: "https://res.cloudinary.com/felixparadis-com/image/upload/q_auto,f_auto,w_0.7/v1589901361/felixparadis.com/ecommerce_xjpn8n.jpg"
previewImageFallback: "https://res.cloudinary.com/felixparadis-com/image/upload/q_auto,f_auto,w_0.7/v1589901361/felixparadis.com/ecommerce_xjpn8n.jpg"
---

{{< figure 
    src="https://res.cloudinary.com/felixparadis-com/image/upload/v1589901361/felixparadis.com/ecommerce_xjpn8n.jpg" 
    alt="picture of someone buying something online"
    caption="Photo by [rupixen.com](https://unsplash.com/@rupixen?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/ecommerce?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)"
    width="640"
    height="427"
>}}

## The Ingredients:

* Netlify as a hosting solution (I heard Vercel is just as tasty.)

* Stripe as a payment platform

* FaunaDB as a database (Only needed to keep track of an inventory)

* Svelte and Sapper to build the front-end (Could be replaced with any decent front-end tools that exports to static)

* SendGrid to send email confirmations

* Cloudinary to host images (Optional)

## Wanna Taste?

{{< emphasis >}}
  Live demo: [https://free-ecommerce.netlify.app/](https://free-ecommerce.netlify.app/)

  (Use card `4242 4242 4242 4242` with an expiration date somewhere in the future to go through the whole checkout process.)

  Source code: [https://github.com/FelDev/free-ecom](https://github.com/FelDev/free-ecom)
{{< /emphasis >}}

## Where’s the catch?

Stripe will charge you 2,9 % + 0,30$ on every transaction, but only if you make sales. Fine by me!

For all the other service providers, you’ll notice that they all have a pricing page. But if you look at those pricing pages, you’ll also notice that they all have a very generous free tier. For instance, SendGrid allows you to send 100 emails/day and FaunaDB lets you store up to 5GB, all without a credit card. 

More than enough to test your market.

## Is this good though?

This is more a proof of concept than a battle-tested solution like Shopify and the likes. The major downsides are:

* You’ll definitely need a developer 

* No automatically calculated shipping costs (If you have a solution for this, let me know!)

* Slight possibility of double selling items (matters if every item is unique, or you’re running low on stocks.)

Apart from that, you’ll get excellent loading times, it’s very secure and highly customizable. 

## Ever tested in production?

I used it to sell my paintings over at [boutique.felixparadis.com](https://boutique.felixparadis.com/) and it got through the challenge with only two problems: 

### One item was sold twice

I thought the chances of that happening were so low that I could afford the risk. And then someone got to the checkout form before another person got to the end of the process... Luckily it’s easy to issue a refund on Stripe, but this recipe definitely needs modifications if you’re going to use it for unique items.

### Emails failed twice

One thing I learned with this experiment is that Hotmail users are harder to reach. [Apparently](https://www.reddit.com/r/webdev/comments/amzfhg/outlookhotmail_blocking_my_sendgrid_emails/), SendGrid uses a separate IP range for emails sent from the free tier. Sometimes, email providers will block the free plan range as spammers are more likely to use it. You get what you pay for!

## Conclusion

I tried to come up with the cheapest possible e-commerce solution and I’d say it’s half a success. 

While it’s certainly hard to beat in terms of pricing, you kinda get what you paid for. Considering that something like a [SnipCart](https://snipcart.com/) integration would solve all the problems of this recipe while adding more features for an extra 2% /transaction, you may wonder if this is worth all the trouble.

For some use-cases though, this recipe might be great. If you’re selling something that doesn’t need to be shipped and that you won’t run out of, for instance. It can also be a good first iteration if you just want to test if anyone would ever click the “checkout” button for your product.