const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    bio: { type: String, required: true },
    nationality: { type: String, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Author", authorSchema);
