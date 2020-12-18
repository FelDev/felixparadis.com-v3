---
title: "Integrating Netlify CMS with Routify"
date: 2020-12-14T11:30:49-04:00
slug: "integrating-netlify-cms-with-routify"
tags: ["tutorial"]
description: ""
images: ["/posts/integrating-netlify-cms-with-routify/banner.jpg"]
previewImage: "banner.webp"
previewImageFallback: "banner.jpg"
draft: false
---

{{< image_bundle
    webpSrc="banner.webp" 
    fallbackSrc="banner.jpg"
    alt="Netlify CMS' logo with an arrow pointing to Routify's logo"
>}}

I chose Routify for a project and found close to zero doc on CMS integrations. After a bit of tinkering with Strapi, I figured I didn't want to spin up a heroku dyno just for the CMS of a jamstack site and decided to give Netlify CMS a try. The integration process was much smoother. 

I made a repository to demo the final result of this tutorial: [github.com/FelDev/routify-netlifycms](https://github.com/FelDev/routify-netlifycms)

And the live site of that demo repo is available at [routify-netlifycms.netlify.app](https://routify-netlifycms.netlify.app)

## Getting set up

(A lot of the basics are pretty much what you'd find in [Netlify CMS' docs](https://www.netlifycms.org/docs/add-to-your-site/), but here is a quick recap anyway until we get to the [Routify specific stuff](#routify-specific-stuff))

It's quite easy to add Netlify CMS to an already existing Routify project. But, if you're starting from scratch, you'll probably want to get started with Routify's starter repo.

`npx @roxi/routify init` 

At this point, run `npm run dev` to make sure everything is working as expected. 

You can already add the files that will be needed for your CMS. Under the root of your `static` folder, make an `admin` folder containing two files: `index.html` and `config.yml`.

```
static
 └ admin
   ├ index.html
   └ config.yml
```
```html
<!-- /static/index.html -->
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Content Manager</title>
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>
  <body>
  <!-- Include the script that builds the page and powers Netlify CMS -->
  <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
  <script>
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on("init", user => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/admin/";
          });
        }
      });
    }
  </script>
  </body>
</html>
```
```yml
# /static/config.yml
backend:
  name: git-gateway
  branch: master # Branch to update (optional; defaults to master)
media_folder: "static/images/uploads" # Media files will be stored in the repo under static/images/uploads
public_folder: "/images/uploads" # The src attribute for uploaded media will begin with /images/uploads
```

Then link your project to a GitHub repository (you could also use GitLab or Bitbucket, but I'll stick to GitHub here.)

Link your GitHub project to a Netlify site; "New site from Git".

Once your Netlify site is live, enable [Identity](https://docs.netlify.com/visitor-access/identity/#enable-identity-in-the-ui). 
The CMS will use it for authentication, but also to write directly in your Git repository. 
So, head over to "Site settings" -> "Identity" -> "Services" and enable Git Gateway.

While you're there, you'll probably want to set Identity so that it is invite-only; otherwise anyone will have the possibility to sign up as an admin of your website!
Go to "Site settings" -> "Identity" -> "Registration". Then go back to the Identity tab and invite yourself. 

That's all there is to do in Netlify's UI. 

### Accepting your invitation

To accept your invitation, you must have Netlify's Identity Widget running on your site. Find `/static/__index.html` and add the following line of code in the `<head>`. 

```JS
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
```
 
Now, when you click the invitation link you've sent yourself, you should see this popup:

{{< image_bundle
    webpSrc="signup_popup.webp" 
    fallbackSrc="signup_popup.jpg"
    alt="Popup that reads 'Complete your signup' with a password prompt."
    lazy="true"
>}}

Quick note on this Identity widget... 
If you don't plan to invite people as admins frequently, you could remove the widget from the head of your website except for `/admin/index.html`, where it's needed to sign in. But then you'd need to add it again whenever you invite someone, or whenever someone forgets their password.

## Working locally

You'll want to work locally rather than have your every change triggering a new build on Netlify. 

To do so, run `npx netlify-cms-proxy-server` and add `local_backend: true` to your `/admin/config.yml` file.

You should be able to login at http://localhost:5000/admin and see an error message about a missing property 'collections'. Let's create it!

## Routify specific stuff

This is getting Routify specific because your collections property is where you define the location of the content files managed by Netlify CMS.
You could do it in various ways, I'll propose two options.

Again, the [Netlify CMS docs on collections](https://www.netlifycms.org/docs/collection-types/#header) are pretty clear so I won't go in detail. The focus here is where we store our files and how we use them.

### 1st option: a CMS folder for all your content

One way to organize your content is to create a CMS folder for all the content being managed by the CMS.

```yml
# /static/admin/config.yml
# (omitting the beginning of the file for brevity)
collections:
  - name: "homepage"
    label: "Homepage"
    extension: "md"
    folder: "src/pages/cms/homepage"
    create: false # Allow users to create new documents in this collection
    slug: "{{title}}"
    fields:
      - { name: "title", label: "Title (<h1>)", widget: "string" }
      - { name: "text", label: "text", widget: "markdown" }
  - name: "markdown"
    label: "markdown"
    extension: "md"
    folder: "src/pages/cms/markdown"
    create: false # Allow users to create new documents in this collection
    slug: "{{name}}"
    fields:
      - { name: "title", label: "Title (<h1>)", widget: "string" }
      - { name: "text", label: "text", widget: "markdown" }
```
`src/pages/cms/` contains both a `homepage` folder and a `markdown` folder. With this setup, we can already write markdown files to our repo. yay! But how do you get markdown in your svelte files?

With [marked](https://marked.js.org/) and a custom component is how.

Getting marked is the usual `npm i marked` and the custom component goes like this:

```html
<!-- /src/pages/_component/GetCMSData.svelte -->
<script context="module">
  export function getCMSData(layout, path) {
    return layout
      .children.filter(c => c.path === "/cms")[0]
      .children.filter(c => c.path === `/cms/${path}`)[0]
      .children[0].meta.frontmatter
  }
</script>
```

This bad boy is going to be used like this:

```html
<!-- src/pages/homepage.svelte -->
<script>
  import { layout } from "@roxi/routify";
  import { getCMSData } from "./_components/GetCMSData.svelte"
  const cmsData = getCMSData($layout, "homepage")
</script>

<h1>{cmsData.title}</h1>
```

This already works perfectly for single lines of text, but not so much with markdown. This is where the marked package comes handy:

```html
<!-- src/pages/markdown.svelte -->
<script>
  import { layout } from "@roxi/routify";
  import { getCMSData } from "./_components/GetCMSData.svelte"
  import marked from "marked";
  const cmsData = getCMSData($layout, "markdown")
</script>

<h1>{cmsData.title}</h1>
<section class="content">
  {@html marked(cmsData.text)}
</section>
```

Aaaand we're pretty much done!

### 2nd option: a folder for each page with its content

The second option is just a small difference in content organization.

Rather than having a CMS folder with subfolders for each page with CMS-managed content, have folders for each page right under `/pages` which contain both their content and their `.svelte` files.

...easier to express with a visual tree. In the folder structure below, "homepage" and "markdown" use the first strategy and "team" uses the second one.
```
├── pages
│   ├── _components
│   │   ├── BottomNav.svelte
│   │   └── GetCMSData.svelte
│   ├── _fallback.svelte
│   ├── _layout.svelte
│   ├── cms
│   │   ├── homepage
│   │   │   └── content.md
│   │   └── markdown
│   │       └── markdown.md
│   ├── homepage.svelte
│   ├── index.svelte
│   ├── markdown.svelte
│   └── team
│       ├── _layout.svelte
│       ├── félix-paradis.md
│       ├── index.svelte
│       ├── jakob-rosenberg.md
│       ├── rich-harris.md
│       └── youuuu.md
```

## Conclusion

This approach is based on nothing but my own experimentations; such is life on the bleeding edge. 

I specify that because I'm not sure that this approach is *the* right approach and I'll gladly point to better ideas should they arise. In other words, let me know if there's a better way.
There is one big problem with this current setup: no image optimization is happening. I have to trust that content editor will upload properly sized images…

But I hope this blog post will help the next person looking for "Routify CMS", if only by letting them know that yes, you can use a CMS with Routify. I've done it. You're not alone.

Cheers! 