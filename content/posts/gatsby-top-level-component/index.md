---
title: "Find Out Which Top-Level Component Gatsby Is Using on Any Page"
date: 2022-04-03T10:14:01-05:00
# lastmod: 2022-01-17T10:14:01-05:00
slug: "find-out-which-top-level-component-gatsby-is-using-on-any-page"
tags: ["tutorial", "gatsby"]
description: "Always know which top-level component is being used by Gatsby to render a page."
images: ["/posts/avoiding-layout-shifts-caused-by-disapearing-scrollbars/banner.jpg"]
previewImage: "banner.jpg"
previewImageFallback: "banner.jpg"
---

{{< image_bundle_auto
  src="banner.jpg"
  alt="A commercial center map with a big \"YOU ARE HERE\" marker."
>}}

When using Gatsby on a big project with lots of templates, 
you may eventually not be sure which templates are used for which pages.
Here is a quick and simple way to know what's the top-level component used by any URL.

There's a good chance you already use **gatsby-browser.js** and its `wrapPageElement` API.
If not... well you're about to!

[wrapPageElement](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/#wrapPageElement)
gets both the current page and all its props.
The `props` object contains information about the current template being used.
You will find what you need by logging `props.pageResources.page.componentChunkName`.

```js
// gatsby-browser.js
export function wrapPageElement({ element, props }) {
  console.log(props.pageResources.page.componentChunkName)

  return (
    // return `element`, with or without a surrounding <Layout>, modifications, props, etc.
  )
}
```

For a component located at `src/templates/events.tsx`
, `props.pageResources.page.componentChunkName` will look like this: "component---src-templates-events-tsx".

So there's your answer 🎉

Note that `props.pageResources.component.name` contains the name of the component as it is exported.
But I find having the full path more helpful.
