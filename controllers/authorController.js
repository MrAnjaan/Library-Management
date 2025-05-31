const Author = require("../models/authors");

exports.serveAuthorsPage = (req, res) => {
  res.render('authorPage', {
    data:
    {
      title: 'Authors'
    }
  })
};

exports.serveAddAuthorPage = (req, res) => {
  res.render('addAuthor', {
    data:
    {
      title: 'Add Author'
    }
  })
};


exports.addNewAuthor = async (req, res) => {
  try {
    const { name, bio, nationality } = req.body;
    const newAuthor = new Author({
      name,
      bio,
      nationality,
    });
    await newAuthor.save();
    // res.json({ message: "Author Added Successfully", author: newAuthor });
    res.redirect('/authors');
  } catch (err) {
    res.status(500).json({ data: { error: err.message } });
  }
};

exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    if(req.user.isAdmin){
        res.render('adminAllAuthors', {
      data: {
        title: "Authors"
      },
      authors: authors
    })
    }
    else{
        res.render('allAuthors', {
      data: {
        title: "Authors"
      },
      authors: authors
    })
    }
    
    // res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAuthorById = async (req, res) => {
  try {
    const id = req.params.id;
    const author = await Author.findById(id);
    // if (!author) res.status(404).json({ message: "Author Not Found" });
    res.json(author);
  } catch (err) {
    res.status(404).json({ message: "Author Not Found" });
    // res.status(500).json({ message: err.message });
  }
};

exports.updateAuthorById = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, bio, nationality } = req.body;
    const updatedAuthor = await Author.findByIdAndUpdate(
      id,
      { $set: { name, bio, nationality } },
      { new: true }
    );
    res.json(updatedAuthor);
  } catch (err) {
    res.status(404).json({ message: "Author Not Found" });
    // res.status(500).json({ message: err.message });
  }
};
