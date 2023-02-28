const { Router } = require("express");
const userRouter = Router();

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

module.exports = { userRouter };
