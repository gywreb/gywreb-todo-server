const mongoose = require("mongoose");

const { Schema } = mongoose;

const TodoSchema = new Schema({
  description: {
    type: String,
    required: [true, "description is required"],
  },
  complete: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Todo", TodoSchema, "todos");
