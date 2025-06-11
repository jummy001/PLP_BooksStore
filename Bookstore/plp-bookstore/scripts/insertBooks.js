require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('../models/Book');

const books = [
    {
        title: "Atomic Habits",
        author: "James Clear",
        genre: "Self-Help",
        published_year: 2018,
        price: 15.99,
        in_stock: true,
        pages: 320,
        publisher: "Penguin"
      },
      {
        title: "The Pragmatic Programmer",
        author: "Andy Hunt",
        genre: "Programming",
        published_year: 1999,
        price: 39.99,
        in_stock: true,
        pages: 352,
        publisher: "Addison-Wesley"
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        published_year: 1960,
        price: 12.5,
        in_stock: false,
        pages: 281,
        publisher: "J.B. Lippincott & Co."
      },
      {
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
        published_year: 1949,
        price: 9.99,
        in_stock: true,
        pages: 328,
        publisher: "Secker & Warburg"
      },
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        published_year: 1925,
        price: 14.0,
        in_stock: true,
        pages: 180,
        publisher: "Scribner"
      },
      {
        title: "Clean Code",
        author: "Robert C. Martin",
        genre: "Programming",
        published_year: 2008,
        price: 45.0,
        in_stock: false,
        pages: 464,
        publisher: "Prentice Hall"
      },
      {
        title: "The Alchemist",
        author: "Paulo Coelho",
        genre: "Adventure",
        published_year: 1988,
        price: 10.99,
        in_stock: true,
        pages: 208,
        publisher: "HarperOne"
      },
      {
        title: "Sapiens",
        author: "Yuval Noah Harari",
        genre: "History",
        published_year: 2011,
        price: 22.99,
        in_stock: true,
        pages: 443,
        publisher: "Harvill Secker"
      },
      {
        title: "Deep Work",
        author: "Cal Newport",
        genre: "Productivity",
        published_year: 2016,
        price: 16.99,
        in_stock: true,
        pages: 304,
        publisher: "Grand Central Publishing"
      },
      {
        title: "The Lean Startup",
        author: "Eric Ries",
        genre: "Business",
        published_year: 2011,
        price: 25.0,
        in_stock: false,
        pages: 336,
        publisher: "Crown Business"
      }
];

mongoose.connect(process.env.MONGODB_URI)
.then(() => Book.insertMany(books))
.then(() => {
    console.log("Books inserted successfully");
    return mongoose.disconnect();
})
.catch(err => console.error(err));