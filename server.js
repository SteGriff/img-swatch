const express = require("express");
const app = express();
const ttsvgLib = require("text-to-svg");
const svgEngine = ttsvgLib.loadSync();
const svgRender = require("svg-render");
const colorThief = require('colorthief');

app.use(express.static("public"));

app.get("/api/:url", (request, response) => {
  const url = request.params.url;
  console.log("get", url);
  colorThief.getPalette(url, 5)
    .then(palette => { console.log(palette) })
    .catch(err => { 
    console.error(err);
    response.sendS
  })
});

app.get("/:text.png", (request, response) => {
  const text = request.params.text;
  const svg = makeSvg(text);
  const svgBuffer = Buffer.from(svg);

  svgRender({
    buffer: svgBuffer
  }).then(function(png) {
    response.setHeader("content-type", "image/png");
    response.send(png);
  });
});

const makeSvg = text => {
  console.log("Requested:", text);

  const attributes = { fill: "white", stroke: "black" };
  const options = {
    x: 0,
    y: 0,
    fontSize: 72,
    anchor: "top",
    attributes: attributes
  };
  const svg = svgEngine.getSVG(text, options);

  //console.log(svg);
  return svg;
};

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
