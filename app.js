import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(8888, () => {
  console.log("Listening on port 8888");
});
