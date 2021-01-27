const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const todo = require("./routes/todo");
const { errorHandler } = require("./middleware/errorHandler");
const { ConnectMongo } = require("./database/dbConnect");

ConnectMongo.getConnect();

app.use(cors());
app.use(express.json());

app.use("/api/todos", todo);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Todolist App server is running at ${PORT}`);
});
