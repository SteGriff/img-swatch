/* global Vue, ColorThief */
// Use current origin for local dev, or production URL
const host = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
  ? window.location.origin 
  : "https://img-swatch.sign.me.uk";

// Helper functions
const rgbToHex = (r, g, b) =>
  "#" +
  [r, g, b]
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    })
    .join("");

const rgbToUxn = (r, g, b) =>
  [r, g, b].map((x) => Math.round(x / 16).toString(16)).join("");

const makeResponse = (palette) => {
  return palette.map((col) => {
    return {
      r: col[0],
      g: col[1],
      b: col[2],
      hex: rgbToHex(col[0], col[1], col[2]),
      uxn: rgbToUxn(col[0], col[1], col[2]),
    };
  });
};

var app = new Vue({
  el: "#app",
  data: () => {
    return {
      host: host,
      url: host + "/glitch-assets/retromiami80.jpg",
      examples: [
        host + "/glitch-assets/sunset.jfif",
        host + "/glitch-assets/retromiami80.jpg",
        host + "/glitch-assets/palm-in-water.jfif",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Yellow_warbler_%2882905%29.jpg/960px-Yellow_warbler_%2882905%29.jpg"
      ],
      message: "Gets a swatch/palette from an image URL.",
      response: window.defaultResponse,
      colours: 5
    };
  },
  computed: {
    paletteJson() {
      return this.response.map((c) => `"${c.hex}"`).join(", ");
    }
  },
  methods: {
    getPalette() {
      this.message = "Swatcherizing...";
      const colorThief = new ColorThief();
      const img = new Image();
      
      // Use proxy endpoint to handle CORS
      const encodedUrl = encodeURIComponent(this.url);
      const proxyUrl = `/api/proxy/${encodedUrl}`;
      
      img.crossOrigin = 'Anonymous';
      
      img.addEventListener('load', () => {
        try {
          const numColors = parseInt(this.colours, 10) || 5;
          const palette = colorThief.getPalette(img, numColors, 10);
          this.response = makeResponse(palette);
          this.message = "Got it! ✅";
          console.log("Palette:", this.response);
        } catch (err) {
          console.error(err);
          this.message = "Error extracting colors 😞";
        }
      });
      
      img.addEventListener('error', () => {
        this.message = "Failed to load image 😞";
      });
      
      img.src = proxyUrl;
    }
  }
});
