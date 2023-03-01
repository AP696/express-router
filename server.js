const express = require("express")
const app = express()
const port = 3000

const { userRouter } = require("./routes/users");
const { fruitRouter } = require("./routes/fruits");

app.use(express.json());


// Express Routes
app.use("/users", userRouter);
app.use("/fruits", fruitRouter);

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
  });
  

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});




app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
