---
title: "Randomizing the Alert Sound on a Mac"
date: 2021-09-11T10:14:01-05:00
lastmod: 2021-11-12T10:14:01-05:00
slug: "randomizing-the-alert-sound-on-a-mac"
tags: ["tutorial", "mac"]
description: "How to set custom alert sounds and randomize which one plays"
images: ["/posts/randomizing-the-alert-sound-on-a-mac/banner.jpg",]
previewImage: "banner.jpg"
previewImageFallback: "banner.jpg"
---

{{< image_bundle_auto
  src="banner.jpg"
  alt="Apple's Finder logo, saying somthing funny in a bubble."
  caption=`Soundwave image by <a href="https://unsplash.com/@pawel_czerwinski?utm_source=medium&utm_medium=referral">Pawel Czerwinski</a> on <a href="https://unsplash.com/s/photos/map-sherbrooke?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>.`
>}}

Adding custom alert sounds to your mac is easy peasy ([see Step 0](#step-0-adding-custom-alert-sounds-to-yourmac)). But after a while of having a specific snippet from [this classic piece of Québécois culture](https://www.youtube.com/watch?v=aY3PqKkOXzg), I got kinda bored with it. What if I could get a different "tabarnak" everyday? Or add a few of Homer Simpsons' famous "D'ho!" in the mix?

Well, a tiny Python script and a single cron job is all I needed to get not only one custom alert sound, but many custom alert sounds that change automagically.

If you want to randomize your alert sound without adding custom ones, you can do that too, just use the default sounds shipped with your mac.

## Step 0: adding custom alert sounds to your mac
After you've selected nice and short audio clips, convert them to .aiff and place them in your `Sounds` folder. The full path:

`/Users/{yourName}/Library/Sounds/`

Note that you could also modify the folder where the sounds shipped with your mac are stored (`/System/Library/Sounds/`) but I tend to not modify the default filesystem if I don't need to.

Once those files are where they need to be, you can select them right from System Preferences, under "Sound", "Sound Effects".

{{< image_bundle_auto
  src="custom_sounds.png"
  alt="Screenshot of system preferences with custom sound options."
>}}

## Step 1: changing the alert sound via the command line
Copy and paste the  line below into your terminal, press enter, and it should set your alert sound to "Sosumi".

```
defaults write .GlobalPreferences com.apple.sound.beep.sound /System/Library/Sounds/Sosumi.aiff
```

Change "Sosumi" to some other sound in the Sounds folder and it will set that other sound. Change the path to the path to a sound in your custom sounds folder (`/Users/{yourName}/Library/Sounds/{yourSound.aiff}`) and it will work too.

## Step 2: choosing and setting a random sound from Python 
I'm very much not a python expert and yet this was super easy.

```python
#!/usr/bin/env python3
import subprocess, random, glob
print('HERE WE GO')

sounds = glob.glob('/Users/{yourName}/Library/Sounds/*.aiff')
sound = random.choice(sounds)
print('randomly selected sound: ', sound)
command = 'defaults write .GlobalPreferences com.apple.sound.beep.sound /Users/{yourName}/Library/Sounds/{}.aiff'.format(sound)

# You could also define an array of sounds yourself,  
# if you don't want every .aiff file to be a possibility
# sounds=['tabarnak1', 'tabarnak2', 'tabarnak3']
# sound=random.choice(sounds)
# command = 'defaults write .GlobalPreferences com.apple.sound.beep.sound /Users/{yourName}/Library/Sounds/{}.aiff'.format(sound)

subprocess.call(command, shell=True)
```

What this does: 
- import modules which are all already available in Python
- Get a list of .aiff files in your `Sounds` folder
- Select a random file from the list
- Call the command from Step 1

You'll only need to adapt the paths; just change `{yourName}` to your actual name or change the whole path if you're not using the same folder as me. (Also, remove the print() when you're done testing.)

Voilà! Running this script will set a random alert sound. I called it `randomize.py` and stored it right in the `/Users/{yourName}/Library/Sounds/` folder. I can call it from anywhere with this command:

`python3 /Users/{yourName}/Library/Sounds/randomize.py`

Note that this could've been done with another scripting language. I was going to use Bash at first, but I find Python much more intuitive.

## Step 3: Call the Python script automatically
The change needs to happen without manually triggering the Python script.

The perfect, no-download-necessary tool for this job is cron. (I wrote [a tutorial about cron](https://betterprogramming.pub/the-fun-cron-tutorial-b1c9d255a94c), but you 
don't need to go through it to understand what we'll do here.)

In the terminal, enter this command:

`env EDITOR=nano crontab -e`

nano is a command line text editor which is known to be bad, but also very simple when compared to other command line text editors. Simply copy and paste this:
```
MAILTO=""
* * * * * python3 /Users/{yourName}/Library/Sounds/randomize.py
```

Again, adapt the path (`{yourName}`) and press <kbd>ctrl</kbd> + <kbd>X</kbd> to exit nano. 
It will prompt you to save or not. 
Press <kbd>Y</kbd> to save and <kbd>enter</kbd> to accept the default file location. 

At this point, you're calling the script every minute, which is perfect for testing. 
I changed the `* * * * *` to `59 * * * *` so that the script only runs once per hour. 

The logic of *when* a cron job runs is this:
```
* * * * *  command to execute
│ │ │ │ │
│ │ │ │ └─── day of week (0 - 6) (0 to 6 are Sunday to Saturday, or use names; 7 is Sunday, the same as 0)
│ │ │ └──────── month (1 - 12)
│ │ └───────────── day of month (1 - 31)
│ └────────────────── hour (0 - 23)
└─────────────────────── min (0 - 59)

// Taken from Ole Michelsen
// https://ole.michelsen.dk/blog/schedule-jobs-with-crontab-on-mac-osx.html
```

## Step 4: Enjoy!
Alert sounds can be annoying.
But with this simple modification to my OS, I get a little giggle from what used to be ordinary and boring.

I made [a public repository](https://github.com/FelDev/alert-sounds) containing 
the script and my sound collection, should you find it inspiring.