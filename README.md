# iLoveBroccoli.com 🥦

A student-made website about broccoli. Plain HTML, CSS and JavaScript: no installs, no build step.

## What's in here

| File | What it does |
|---|---|
| `index.html` | Home page + "click to enter" splash screen |
| `games.html` + `game.js` | The trivia game |
| `broccolitube.html` | Video page |
| `photobooth.html` + `photobooth.js` | The broccoli photo booth |
| `style.css` | Colors, fonts and looks for every page |
| **`config.js`** | ⭐ Site name, web address, Spotify song link |
| **`questions.js`** | ⭐ All the trivia questions |
| **`videos.js`** | ⭐ YouTube links for Broccoli-tube |
| `images/` | Pictures (put quiz photos in `images/quiz/`) |

⭐ = the easiest files to change.

## Common changes

- **Add the theme song:** paste the Spotify song link into `config.js`.
- **Edit trivia:** open `questions.js`, copy a question block, change the words.
- **Add quiz photos:** save them in `images/quiz/` using the exact file names listed in `questions.js` (e.g. `broccolini.jpg`).
- **Add a video:** paste the YouTube link into `videos.js`.
- **Change colors:** edit the colors at the top of `style.css`.
- **Swap the photo booth picture:** replace `images/broccoli-hottub.jpg`, then update the `FACE` numbers at the top of `photobooth.js` so the oval sits on the face.

## Asking Claude to make changes

Upload the file you want to change and describe what you want, e.g.
*"Here's questions.js — add 5 more questions about broccoli recipes."*

## Testing

The camera only works on a real website (https), like the GitHub Pages link,
so test the photo booth there instead of opening the file straight from your computer.

## Privacy

The photo booth runs entirely in the visitor's browser. Photos are never uploaded or saved;
they disappear when the page is closed unless the visitor saves or shares them.
