const express = require("express");
const app = express();
const ttsvgLib = require("text-to-svg");
const svgEngine = ttsvgLib.loadSync();

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.send("OK");
});

app.get("/:text.svg", (request, response) => {
  const text = request.params.text;
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

  console.log(svg);

  response.setHeader("content-type", "image/svg+xml");
  response.send(svg);
  //response.send("You said:" + text);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
