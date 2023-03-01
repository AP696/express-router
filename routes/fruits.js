const { Router } = require("express");
const { check, validationResult } = require("express-validator");
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

fruitRouter.post("/", [check("color").not().isEmpty()], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json({ error: errors.array() });
  } else {
    const newFruit = req.body;
    newFruit.id = fruits.length + 1;
    fruits.push(newFruit);
    res.status(201).json(newFruit);
  }
});

fruitRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedFruit = req.body;
  const fruitIndex = fruits.findIndex((fruit) => fruit.id === id);
  if (fruitIndex >= 0) {
    fruits[fruitIndex] = {
      ...fruits[fruitIndex],
      ...updatedFruit,
      id,
    };
    res.json(fruits[fruitIndex]);
  } else {
    res.status(404).send("Fruit not found");
  }
});

fruitRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const fruitIndex = fruits.findIndex((fruit) => fruit.id === id);
  if (fruitIndex >= 0) {
    fruits.splice(fruitIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Fruit not found");
  }
}); 

module.exports = { fruitRouter };
