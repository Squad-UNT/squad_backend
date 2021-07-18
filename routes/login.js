const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/", [
  (req, res, next) => {
    if (!req.body.email) res.status(400).send({ message: "Email not found" });
    if (!req.body.password)
      res.status(400).send({ message: "Password not found" });
    else next();
  },
  (req, res, next) => {
    if (req.body.email === "admin@admin") {
      if (req.body.password === "admin12345")
        res
          .status(200)
          .send({ message: "success login!", is_super_admin: true });
      else res.status(401).send({ message: "Invalid Email or Password" });
    } else next();
  },
  (req, res, next) => {
    bcrypt.compare(req.body.password, hash, function (err, result) {
      // result == true
    });
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
