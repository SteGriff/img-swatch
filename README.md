# img-swatch

**Big idea:** Get the palette (swatch) of an image by URL

Using <https://github.com/lokesh/color-thief>

## UI 🎨💻

Go to the UI at <https://img-swatch.glitch.me/> and enter your URL and the number of colours to get.

## API 🌐👷‍♀️

### Get a palette

Get the 5 predominant colours in the image (5 is the default)

```
GET https://img-swatch.glitch.me/api/{url}
```

Get a custom number of colours from the image.

```
GET https://img-swatch.glitch.me/api/{url}?n={numOfColours}
```

⚠ You have to UrlEncode the `url`. Example:

```
https://img-swatch.glitch.me/api/https%3A%2F%2Fcdn.glitch.com%2F78ba4e5b-5ff2-42d0-9ce6-7aafe2d3c594%252Fretromiami80.jpg?n=20
```

### Response

JSON array where each object has `r`, `g`, `b`, and `hex` values:

```
[
    {
        "r": 41,
        "g": 29,
        "b": 67,
        "hex": "#291d43"
    },
    {
        "r": 230,
        "g": 89,
        "b": 88,
        "hex": "#e65958"
    },
    ...
]
```

## Yo 👋🐻

@SteGriff made this. <https://stegriff.co.uk>