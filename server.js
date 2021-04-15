const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.send("OK");
});

app.get("/:text.svg", (request, response) => {
  console.log("Requested:", request.params.text);
  response.send("You said:" + request.params.text);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
