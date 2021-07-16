const express = require("express");
const router = express.Router();

router.post("/", [
  (req, res, next) => {
    if (!req.body.email) res.status(400).send({ error: "Email not found" });
    if (!req.body.password)
      res.status(400).send({ error: "Password not found" });
    else next();
  },
  (req, res, next) => {
    try {
      res.status(200).send({ message: "success login!" });
    } catch (error) {
      next(error);
    }
  },
]);

module.exports = router;
