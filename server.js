const express = require("express");
const app = express();
const ttsvgLib = require("text-to-svg");
const svgEngine = ttsvgLib.loadSync();
const svgRender = require("svg-render");
const colorThief = require("colorthief");

app.use(express.static("public"));

app.get("/api/:url", (request, response) => {
  const url = request.params.url;
  const num = request.query.n || 5;
  console.log("get", url, request.query);
  colorThief
    .getPalette(url, num)
    .then(palette => {
      const returnObject = makeResponse(palette);
      console.log("OK!", returnObject);
      response.json(returnObject);
    })
    .catch(err => {
      console.error(err);
      response.status(500).send("colorThief died, sorry");
    });
});

const makeResponse = palette => {
  // rgbToHex(102, 51, 153); // #663399
  return palette.map(col => {
    return {
      r: col[0],
      g: col[1],
      b: col[2],
      hex: rgbToHex(col[0], col[1], col[2])
    };
  });
};

const rgbToHex = (r, g, b) =>
  "#" +
  [r, g, b]
    .map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    })
    .join("");

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
