import express from "express";
import path from "path";

const PORT = 3000;
const app = express();
const __dirname = path.resolve();

app.use(express.static(`${__dirname}/dist/`));

app.get("*", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "/dist/index.html"));
});

app.listen(PORT, function () {
  console.log(`Server started : ${PORT}...!`);
});
