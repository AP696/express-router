const { Router } = require("express");
const fruitRouter = Router();

// List of Fruits
let fruits = [
  {
    id: 1,
    name: "Apple",
    color: "Red",
  },
  {
    id: 2,
    name: "Banana",
    color: "Yellow",
  },
  { id: 3, name: "Kiwi", color: "Green" },
  {
    id: 4,
    name: "Grape",
    color: "Purple",
  },
];

fruitRouter.get("/", (req, res) => {
  try {
    res.json(fruits);
  } catch (error) {
    res.send("Fruit not found");
  }
});

fruitRouter.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const fruit = fruits.find((fruit) => fruit.id === id);
  if (fruit) {
    res.json(fruit);
  } else {
    res.status(404).send("Fruit not found");
  }
});

module.exports = { fruitRouter };
