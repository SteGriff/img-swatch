/* global Vue */
const host = "https://img-swatch.sign.me.uk";

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
