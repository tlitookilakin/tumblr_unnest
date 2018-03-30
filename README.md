# tumblr_unnest
A simple JS script that allows for greater control over how user captions are displayed, primarily by un-nesting them.

# How to use:
A simple example and explanation can be found here: https://codepen.io/Tlitookilakin/pen/QmmyKa
To install this in your tumblr theme, here's what you need to do:
* Load the script by copying and pasting the following into your theme's HTML: ```<script src="https://static.tumblr.com/nwaa9ez/Om2p6dob2/t_unnest.js" type="text/javascript"></script>```
* Run the unnesting by putting this code in a ```<script>``` tag: ```unnest(captionname, avatarsize, showcolons, reblogname, addnewusername, openinnewtab);```
* The plugin is now installed, now to customize it.

# Customization:
1. **"captionname"**: The class name for the caption element.
*Example*: ```"caption"```
2. **"avatarsize"**: Avatar size. 0 or smaller disables the feature.
*Example*: ```24```
3. **"showcolons"**: Whether or not to show colons after usernames.
*Example*: ```false```
4. **"reblogname"**: The class each reblog should be given.
*Example*: ```"reply"```
5. **"addnewusername"**: Whether or not to add a username when you add a new caption.
*Example*: ```true```
6. **"openinnewtab"**: Whether or not blog links should open in a new tab.
*Example*: ```false```

All values are optional **except** ```captionname``` and ```avatarsize``` .
