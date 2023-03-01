const { Router } = require("express");
const { fruitRouter } = require("./fruits");
const userRouter = Router();
const { check, validationResult } = require("express-validator");

// List of Users
let users = [
  {
    id: 1,
    name: "User 1",
    age: 30,
  },
  {
    id: 2,
    name: "User 2",
    age: 45,
  },
  {
    id: 3,
    name: "User 3",
    age: 27,
  },
  {
    id: 4,
    name: "User 4",
    age: 22,
  },
];

userRouter.get("/", (req, res) => {
  try {
    res.json(users);
  } catch (error) {
    res.status(500).send("Cannot find users");
  }
});

userRouter.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});

userRouter.post("/", [check("name").not().isEmpty()], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json({ error: errors.array() });
  } else {
    const { name, age } = req.body;
    const id = users.length + 1;
    const newUser = {
      id,
      name,
      age,
    };
    users.push(newUser);
    res.status(201).json(newUser);
  }
});

userRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, age } = req.body;
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex >= 0) {
    users[userIndex] = { id, name, age };
    res.json(users[userIndex]);
  } else {
    res.status(404).send("User not found");
  }
});

userRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex >= 0) {
    users.splice(userIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send("User not found");
  }
});



module.exports = { userRouter };
