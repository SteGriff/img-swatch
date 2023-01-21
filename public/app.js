/* global Vue */
var app = new Vue({
  el: "#app",
  data: () => {
    return {
      url:
        "https://cdn.glitch.com/78ba4e5b-5ff2-42d0-9ce6-7aafe2d3c594%2Fretromiami80.jpg",
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
      const encodedUrl = encodeURIComponent(this.url);
      const endpoint = `/api/${encodedUrl}?n=${this.colours}`;
      console.log("Call", endpoint);
      fetch(endpoint)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.response = data;
          this.message = "Got it! ✅";
        });
    }
  }
});
