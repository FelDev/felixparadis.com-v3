---
title: "Automatic Current Year in Footer with a Github Action, a Build Hook and no JS"
date: 2021-10-31T10:14:01-05:00
# lastmod: 2021-10-16T10:14:01-05:00
slug: "automatic-current-year-in-footer-year-with-a-github-action-a-build-hook-and-no-js"
tags: ["tutorial", "jamstack"]
description: ""
images: ["/posts/up-to-date-footer-year-with-a-github-action-a-build-hook-and-no-js/banner.jpg"]
previewImage: "banner.jpg"
previewImageFallback: "banner.jpg"
---

{{< image_bundle_auto
  src="banner.jpg"
  alt="New year fireworks"
  caption=`Photo by <a href="https://unsplash.com/@rovenimages_com?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Roven Images</a> on <a href="https://unsplash.com/s/photos/new-year?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  `
>}}

The classic way of getting an always up to date year in a `<footer>` is to 
generate it every time someone visits your website. 

Either with a bit of JS:
```js
<script type="text/javascript">
  document.write(new Date().getFullYear());
</script>
```

Or something similar server side:

```php
<?php echo date("Y"); ?>
```

But what about static sites without server rendering and a deep desire to 
minimize client-side JS?
How about triggering a build with a cron job every new year, while you sip
on some champagne?

With modern tools like [Github Actions](https://github.com/features/actions) and
[Netlify build hooks](https://docs.netlify.com/configure-builds/build-hooks/) we
can get this done within an hour.

Note that Github Actions could be replaced by any other cron job runner and 
Netlify by most modern static hosting platform.

## But first... make sure the year in your footer in generated by your SSG

Take a minute to make sure the date in your footer in dynamically generated by
your SSG. 
I'm using [Hugo](https://gohugo.io/), so getting the current year is as simple 
as calling
```html
{{ now.Year }} 
```
in my footer template. 

Since there is a gazillion SSGs, just search for 
`{your SSG} generate year in footer` and I'm sure you'll find something like 
[this quick tutorial for Eleventy](https://piccalil.li/quick-tip/dynamic-footer-copyright-date-in-eleventy/).

## Generating a build hook
I'm using Netlify, but the process is almost the same with other hosting platforms.
[Vercel has Deploy hooks](https://vercel.com/docs/concepts/git/deploy-hooks),
so does [Cloudflare](https://developers.cloudflare.com/pages/platform/deploy-hooks),
[Render](https://render.com/docs/deploy-hooks)
and most probably `{your host here}`.

### Generating a build hook with Netlify
In your "Site settings", go to "Build & deploy", "Build hooks" and add a build 
hook for your production branch.

{{< image_bundle_auto
  src="netlify_ui.png"
  alt=""
>}}

Your hook is a unique URL and it probably looks like this: 
https://api.netlify.com/build_hooks/SomeRand0mn3ss

You can try it right away by sending a POST request with [curl](https://curl.se/)
and making sure it triggered a new deploy.
```bash
curl -X POST -d {} YOUR_UNIQUE_URL
```

## Setting a Github action to run every new year

Thanks to [Jinksi's open-source repo](https://github.com/Jinksi/netlify-build-github-actions),
this was easy to figure out.

Create `.github/workflows/main.yml` at the root of your repo, and use this as a 
starter:
```yaml
name: Trigger Netlify Build
on:
  schedule:
    - cron: "*/10 * * * *" # every 10 mins
jobs:
  build:
    name: Request Netlify Webhook
    runs-on: ubuntu-latest
    steps:
      - name: Curl request
        run: curl -X POST -d {} YOUR_UNIQUE_URL
```

This is set to run every 10 minutes and does one simple thing, it runs this
```bash
curl -X POST -d {} YOUR_UNIQUE_URL
```
on the latest version of ubuntu.

🚨**BUT**, before you commit and push this file, you might want to turn
YOUR_UNIQUE_URL into a secret.

In the Github repo, navigate to "Settings", "Secrets" and create a "New 
repository secret".

{{< image_bundle_auto
  src="gh_ui.png"
  alt=""
>}}

Once you created your secret, you can use it in your Action. 
I called mine 
`NETLIFY_BUILD_HOOK`.
```yaml
run: curl -X POST -d {} ${{ secrets.NETLIFY_BUILD_HOOK }}
```

Once you tested your action and feel confident, change the cron schedule from 
```yaml
schedule:
    - cron: "*/10 * * * *" # every 10 mins
```
to
```yaml
schedule:
    - cron: "1 0 1 1 *" # January 1st, at 00:01
```
and check that everything worked whenever you wake up on January 1st!

## Pitfalls of this technique 

This technique is great for my simple blog, but I can think of at least 2 caveats.

### 1. Check your timezones

Unless you configure them otherwise, both Gihub Actions and the Netlify build
environment use the UTC timezone. 
This means that the year in your footer will only change to the next year when 
the new year hits UTC, not your users' timezones.

I cannot think of a way to set the year correctly according to the end user's
timezone that does not involve client-side javascript, but I can live with up to
24 hours of wrong-year-in-the-footer for some users.

### 2. Make sure your production branch is deployable

I mean, it should be, right?
But if someone made a drunk commit on your production branch and manually rolled
back to a previous deploy in Netlify/Vercel/Whatever... this drunk commit better 
be fixed before new year's eve!

## Conclusion

You might be thinking this is a lot of work to avoid a JS one-liner...
And you might be right. 
But I like to get that extra 1ms of speed when I can and using `document.write`
[yields a warning when running lighthouse tests](https://web.dev/no-document-write/).
So, this is not a total game changer but I'm happy with it! 

You can check 
[the source code of my Github action](https://github.com/FelDev/felixparadis.com-v3/tree/main/.github/workflows) if this post wasn't clear enough 🙂 