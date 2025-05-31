const Book = require("../models/books");

exports.serveBooksPage = (req,res)=>{
  res.render('bookPage',{data:
    {
      title: "Books",
    }
  })
};

exports.addNewBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json({ message: "Book added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error adding book", error: err });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: "Error fetching books", error: err });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: "Error fetching book", error: err });
  }
};

exports.getAllBooksByAuthorId = async (req, res) => {
  try {
    const books = await Book.find({ author: req.params.id });
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: "Error fetching books", error: err });
  }
};

exports.updateBookById = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: "Error updating book", error: err });
  }
};

exports.deleteBookById = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting book", error: err });
  }
};
