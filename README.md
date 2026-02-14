# img-swatch

**Big idea:** Get the palette (swatch) of an image by URL

Using <https://github.com/lokesh/color-thief>

## UI 🎨💻

Go to the UI at <https://img-swatch.sign.me.uk/> and enter your URL and the number of colours to get.

## API 🌐👷‍♀️

### Get a palette

Get the 5 predominant colours in the image (5 is the default)

```
GET https://img-swatch.sign.me.uk/api/{url}
```

Get a custom number of colours from the image.

```
GET https://img-swatch.sign.me.uk/api/{url}?n={numOfColours}
```

⚠ You have to UrlEncode the `url`. Example:

```
https://img-swatch.sign.me.uk/api/https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F7%2F70%2FYellow_warbler_%252882905%2529.jpg%2F960px-Yellow_warbler_%252882905%2529.jpg?n=10
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