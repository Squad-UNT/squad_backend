const express = require("express");
var cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({ message: "Hello from server!" });
});

app.use("/login", require("./routes/login"));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
