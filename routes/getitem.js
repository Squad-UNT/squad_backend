const express = require("express");
const router = express.Router();
const db = require("../db.js");

router.post("/", [
  (req, res, next) => {
    try {
      db.query(
        `SELECT * FROM items WHERE item_id = ${req.body.item_id}`,
        (error, result) => {
          if (error) throw error;
          if (result.length == 0)
            return res.status(404).send({ message: "No Item" });
          return res.status(200).send(result[0]);
        }
      );
    } catch (error) {
      next(error);
    }
  },
]);

module.exports = router;
