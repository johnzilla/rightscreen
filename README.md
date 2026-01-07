# RightScreen

A web app for generating smartphone lockscreen images that assert 4th Amendment rights.

## Usage

Open `index.html` in a browser, or serve the directory with any static file server:

```bash
python3 -m http.server 8080
```

Then visit http://localhost:8080

## Features

- Device presets for iPhone, Samsung Galaxy, Google Pixel, and tablets
- Safe zone handling for notches, dynamic islands, and punch-hole cameras
- Solid colors and gradient backgrounds
- Multiple 4th Amendment text options
- 3 font styles
- PNG download with device-appropriate resolution
- Share to X/Twitter (app link or image via Web Share API)
- State persistence via localStorage

## Tech Stack

- Vanilla HTML/CSS/JS
- Canvas API for image generation
- No build tools or dependencies
