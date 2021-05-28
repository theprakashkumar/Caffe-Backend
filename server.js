const express = require("express");

const app = express();
app.get("/", function(req, res) {
  res.send("What");
});

app.get("/whilist", (req, res) => {
    res.send("whithslist")
})

app.listen(5000, function() {
 console.log("Server started successfully");
});