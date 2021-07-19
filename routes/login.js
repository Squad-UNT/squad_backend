const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../db.js");

function getRandomToken() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

router.post("/", [
  (req, res, next) => {
    if (!req.body.email)
      return res.status(400).send({ message: "Email not found" });
    if (!req.body.password)
      return res.status(400).send({ message: "Password not found" });
    else next();
  },
  (req, res, next) => {
    if (req.body.email === "admin@admin") {
      if (req.body.password === "admin12345")
        return res.status(200).send({
          email: req.body.email,
          is_super_admin: true,
          token: "onk93vo2n6j5uv6on6q8c",
        });
      else
        return res.status(401).send({ message: "Invalid Email or Password" });
    } else next();
  },
  (req, res, next) => {
    db.query(
      `SELECT admin_password FROM stores where admin_email = '${req.body.email}'`,
      (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
          bcrypt.compare(
            req.body.password,
            result[0].admin_password,
            (err, result) => {
              if (result == true) {
                return res.status(200).send({
                  email: req.body.email,
                  is_super_admin: false,
                  token: "onk93vo2n6j5uv6on6q8c",
                });
              } else
                return res
                  .status(401)
                  .send({ message: "Invalid Email or Password" });
            }
          );
        } else
          return res.status(401).send({ message: "Invalid Email or Password" });
      }
    );
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
