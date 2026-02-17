const express = require("express");
const app = express();

//"Middleware that reads incoming requests, checks for json, convert to JS obj, stores it"
app.use(express.json());

// Books for bookstore API
let books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        copiesAvailable: 5
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        copiesAvailable: 3
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian Fiction",
        copiesAvailable: 7
    }
    /*
    {
        id: 4,
        title: "Fahrenheit 451",
        author: "Ray Bradbury",
        genre: "Dystopian Fiction",
        copiesAvailable: 12
    },
    {
        "id": 5,
        "title": "Dune",
        "author": "Frank Herbert",
        "genre": "Sci-Fi",
        "copiesAvailable": 4
    }
 
    */

    // Add more books if you'd like!
];

// Create your REST API here with the following endpoints:
    //'GET /api/books': 'Get all books',
    app.get("/api/books", (req, res) => { 
    res.json(books);
});

    //'GET /api/books/:id': 'Get a specific book',
    app.get("/api/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
});

    //'POST /api/books': 'Add a new book',
    app.post("/api/books", (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        copiesAvailable: req.body.copiesAvailable
    };

    books.push(newBook);

    res.status(201).json(newBook);
});

    //'PUT /api/books/:id': 'Update a book',
    app.put("/api/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    // Update 
    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.genre = req.body.genre || book.genre;
    book.copiesAvailable =
        req.body.copiesAvailable || book.copiesAvailable;

    res.json(book);
});

    //'DELETE /api/books/:id': 'Delete a book'
    app.delete("/api/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    const deletedBook = books.splice(index, 1);

    res.json(deletedBook[0]);
});

//Start server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app; //for tests









