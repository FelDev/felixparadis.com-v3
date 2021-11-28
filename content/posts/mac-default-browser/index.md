---
title: "Set the Default Browser From the Command Line on a Mac - Properly"
date: 2021-11-27T10:14:01-05:00
# lastmod: 2021-10-16T10:14:01-05:00
slug: "how-to-set-the-default-browser-from-the-command-line-on-a-mac"
tags: ["tutorial", "mac"]
description: "How to set a mac's default browser from the command line with ZERO mouse click."
images: ["/posts/how-to-set-the-default-browser-from-the-command-line-on-a-mac/banner.jpg"]
previewImage: "banner.jpg"
previewImageFallback: "banner.jpg"
---

{{< image_bundle_auto
  src="banner.jpg"
  alt=""
  caption=``
>}}


## Setting the default browser while opening the browser

With Chrome and most Chromium based browsers, you can open the app from the
command line and pass an argument to make it the default browser at the same time.

```
open -a "Google Chrome" --args --make-default-browser
```
Those \*could\* also work:
```
open -a "Google Chrome Dev" --args --make-default-browser
open -a "Google Chrome Beta" --args --make-default-browser
open -a "Brave Browser" --args --make-default-browser
```
But there are 3 big problems:

1. It only works with *some* browsers.
2. Involves opening the browser.
3. Requires you to manually confirm your choice.

But fear not, here is the real solution you are looking for:

## Setting the default browser from the command line, the right way

There is a tool aptly called [defaultbrowser](https://github.com/kerma/defaultbrowser)
which you can install with this one command:

```
brew install defaultbrowser
```

(If this fails, you don't have Homebrew installed. 
[GET HOMEBREW.](https://brew.sh/) It's good.)

Now that you have defaultbrowser installed, you can see a list of available
HTTP handlers simply by running `defaultbrowser` and you can set a default 
browser by giving one of the items in the list as an argument.

```
defaultbrowser chrome
```

This is nice, but we still have to confirm our choice!

{{< image_bundle_auto
  src="accept_prompt.png"
  alt="The prompt asking users to confirm they want to \"change your default web browser to X\""
  caption=``
>}}

You can quickly confirm your choice with <kbd>tab</kbd>+<kbd>space</kbd>, but 
how about automatic confirmation?

### Automatically accept the prompt with AppleScript

There is an app called **Script Editor** which ships with your mac.

Open it, and paste in this bad boi:

```applescript
on run argv
	do shell script "defaultbrowser " & item 1 of argv
	try
		tell application "System Events"
			tell application process "CoreServicesUIAgent"
				tell window 1
					tell (first button whose name starts with "use")
						perform action "AXPress"
					end tell
				end tell
			end tell
		end tell
	end try
end run
```

Most of the script above is a direct copy/paste from Stack Exchange: 
https://apple.stackexchange.com/a/255947/264341

`item 1 of argv` is going to be the first argument you give the script.

You can test run the script right in Script Editor.

{{< image_bundle_auto
  src="run_from_script_editor.png"
  alt="Location of the \"run the script\" button in Script Editor's UI"
  caption=``
>}}

Then, once your save it, you can run it with something like this:

```
osascript /Path/to/your/script/NameOfYourScript.scpt {a browser, could be "chrome"}
```

SUCCESS 🎉
But this is a rather long line.
I suggest making a few aliases in your .zprofile file. (It should be at `~/.zshrc`.)
For instance, I have these:

```
alias dbb='osascript /Path/to/the/script/setDefaultBrowser.scpt beta'
alias dbc='osascript /Path/to/the/script/setDefaultBrowser.scpt chrome'
```

GREAT SUCCESS 🎉
Now, I can switch default browser by entering `dbb` or `dbc` + <kbd>enter</kbd>.

And, in case you were wondering...

## Setting the default browser from System Preferences

You can change the default browser manually by opening system preferences and 
going to "general", "Default web browser".

{{< image_bundle_auto
  src="ui_1.png"
  alt=""
  caption=``
>}}

{{< image_bundle_auto
  src="ui_2.png"
  alt=""
  caption=``
>}}
