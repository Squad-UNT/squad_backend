const express = require("express");
const router = express.Router();
const db = require("../db.js");

router.post("/", [
  (req, res, next) => {
    if (!req.headers.token)
      return res.status(400).send({ message: "Auth Token not found" });
    else next();
  },
  (req, res, next) => {
    try {
      db.query(
        `SELECT store_id FROM stores WHERE access_token = '${req.headers.token}'`,
        (error, result) => {
          if (error)
            return res.status(500).send({ message: "Internal Server Error" });
          if (result.length > 0) {
            const data = {
              store_id: result[0].store_id,
              name: req.body.name,
              price: parseFloat(req.body.price),
              calories: parseFloat(req.body.calories),
              type: parseInt(req.body.type),
              location: req.body.location,
              ingredients: req.body.ingredients,
              description: req.body.description,
              image: req.body.image ? req.body.image : null,
              id: req.body.id,
            };
            let sql;
            if (req.body.image)
              sql = `UPDATE items SET item_name = '${data.name}', item_price = '${data.price}', item_availability = '${data.type}', item_calories = '${data.calories}', item_ingredients = '${data.ingredients}', available_at = '${data.location}', item_image = '${data.image}', item_description = '${data.description}' WHERE store_id = '${data.store_id}' AND item_id = '${data.id}'`;
            else
              sql = `UPDATE items SET item_name = '${data.name}', item_price = '${data.price}', item_availability = '${data.type}', item_calories = '${data.calories}', item_ingredients = '${data.ingredients}', available_at = '${data.location}', item_image = NULL, item_description = '${data.description}' WHERE store_id = '${data.store_id}' AND item_id = '${data.id}'`;
            db.query(sql, (error, results) => {
              if (error)
                return res
                  .status(500)
                  .send({ message: "Internal Server Error" });
              return res
                .status(200)
                .send({ message: "successfully updated item!" });
            });
          } else return res.status(401).send({ message: "Invalid Auth Token" });
        }
      );
    } catch (error) {
      next(error);
    }
  },
]);

module.exports = router;
