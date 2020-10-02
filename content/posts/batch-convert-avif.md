---
title: "How to Batch Convert Images to .avif"
date: 2020-08-29
slug: "How-to-Batch-Convert-Images-to-.avif"
tags: ["tutorial"]
images: ["/images/posts/avif/banner.jpeg"]
description: "Convert multiple images to the .avif format using the awesome open-source cli tool Colorist."
previewImage: "/images/posts/avif/banner.avif"
previewImageFallback: "/images/posts/avif/banner.jpg"
---

{{< banner
    avifSrc="/images/posts/avif/banner.avif" 
    fallbackSrc="/images/posts/avif/banner.jpeg"
    alt="AV1's logo"
>}}

AV1 reached version 1.0.0 🎉 .avif is even more impressive than .webp compression-wise and it's gaining browser support fast. So let's get converting!

The easiest way to convert an image to .avif is to use [squoosh.app](https://squoosh.app/), but it only processes one image at a time. I've read a tweet about batch conversion being on their roadmap (Ping me if you notice that!), but until then, we're going to rely on an awesome open-source cli tool: [Colorist](https://joedrago.github.io/colorist/).

I'm working on a mac, so you might have to adjust a little if you're on Linux and probably a bit more if you're on Windows. But Colorist is available to all. Also, I'm using [ZSH](https://ohmyz.sh/) as a shell. 

## For Basic Conversions

First, install Colorist. ([Colorist's docs for installation](https://joedrago.github.io/colorist/#installation))
```zsh
brew install joedrago/repo/colorist # using Homebrew (Mac)
```


For the simplest usage, you can simply open a terminal at the folder where your photos are stored, and run this little script:

```zsh
for i in *.(png|PNG); # Starts a loop over all .png files. To include .jpg too: for i in *.(png|PNG|jpg|JPG);
  do name=`echo "${i}"` # Assign the file name to a variable
  cleanedName=$(echo "$i" | cut -f 1 -d '.') # Remove the extension from the filename ("foo.png" becomes "foo")
  colorist convert "$name" "$cleanedName.avif" # Tell colorist to convert your file to a .avif 
done
```

## To Convert and Resize Images

If you want to resize your images too, just add the `--resize` flag.

```zsh
# will resize the image to 1000x500
colorist convert "$name" "$cleanedName.avif" --resize 1000, 500
```

The best part is that if you don't specify the width or height, Colorist will use the original image's aspect ratio to calculate the missing value. ([See Colorist's docs on resize](https://joedrago.github.io/colorist/docs/Usage.html#resize).)

But your images probably don't all have the same dimensions and/or aspect ratio. So you might want to resize them to a percentage of their original size. Or only resize those over a certain threshold. For that, we have to get creative a little. I came up with this script for my humble needs:

```zsh
for i in *.(png|PNG);
  do name=`echo "${i}"`
  cleanedName=$(echo "$i" | cut -f 1 -d '.')
  ogWidth=$(colorist identify "$name" --json | jq '.width') # gets the original image's width
  newWidth=$((ogWidth / 2))
  if [[ $newWidth -lt 1000 ]] 
  then
    newWidth=1000
  fi
  if [[ $ogWidth -lt 1000 ]]
  then
    newWidth=ogWidth
  fi
  colorist convert "$name" "$cleanedName.avif" --resize $((newWidth))
done
```

Colorist's `--resize` doesn't accept percentages. But we can get the original image's dimensions by using `colorist identify "foo.png" --json`. That line gives us, in json format, a bunch of information about foo.png including the copyrights, colors, luminance... Since all I care about is the width, I extract that with [jq](https://stedolan.github.io/jq/): `jq '.width'`. You could try to parse json with pure bash, but I'd rather `brew install jq` and be done with it!

The rest of the script is simple; if the new width is smaller than 1000px, I set it to 1000px. If the original width was less than 1000px, I just use the original width.

I hope this was helpful. Go give a big GitHub star to [Colorist](https://github.com/joedrago/colorist) and [jq](https://github.com/stedolan/jq) if it was! They're the real heroes.

