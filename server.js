const express = require("express");
const app = express();
const colorThief = require("colorthief");

app.use(express.static("public"));

// CORS Proxy endpoint for images
app.get("/api/proxy/:url", async (request, response) => {
  const url = request.params.url;
  console.log("proxy", url);
  
  try {
    const imageResponse = await fetch(url);
    
    if (!imageResponse.ok) {
      return response.status(imageResponse.status).send(`Failed to fetch image: ${imageResponse.statusText}`);
    }
    
    const contentType = imageResponse.headers.get('content-type');
    if (!contentType || !contentType.startsWith('image/')) {
      return response.status(400).send('URL does not point to an image');
    }
    
    const buffer = await imageResponse.arrayBuffer();
    
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Content-Type', contentType);
    response.send(Buffer.from(buffer));
  } catch (err) {
    console.error(err);
    response.status(500).send("Failed to proxy image");
  }
});

app.get("/api/:url", async (request, response) => {
  const url = request.params.url;
  const num = 1 * request.query.n || 5;
  console.log("get", url, num);
  
  try {
    // Fetch the image first
    const imageResponse = await fetch(url);
    
    if (!imageResponse.ok) {
      return response.status(imageResponse.status).send(`Failed to fetch image: ${imageResponse.statusText}`);
    }
    
    const contentType = imageResponse.headers.get('content-type');
    if (!contentType || !contentType.startsWith('image/')) {
      return response.status(400).send('URL does not point to an image');
    }
    
    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Pass buffer to colorThief
    const palette = await colorThief.getPalette(buffer, num, 20);
    const returnObject = makeResponse(palette);
    response.json(returnObject);
  } catch (err) {
    console.error(err);
    response.status(500).send("colorThief died, sorry");
  }
});

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

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
