const mongoose = require("mongoose");
//Models/user.js
const Author = require("./authors");
const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    genre: { type: String, required: true },
    publication_year: { type: String, required: true },
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: Author, required: true },

  },
  { timestamps: true }
);
module.exports = mongoose.model("Book", bookSchema);
