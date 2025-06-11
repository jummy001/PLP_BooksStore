require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('../models/Book');

async function run() {
  await mongoose.connect(process.env.MONGO_URI);

  console.log("Find books in genre 'Programming'");
  console.log(await Book.find({ genre: 'Programming' }));

  console.log("Books after 2000");
  console.log(await Book.find({ published_year: { $gt: 2000 } }));

  console.log("Books by George Orwell");
  console.log(await Book.find({ author: "George Orwell" }));

  console.log("Update Clean Code price");
  await Book.updateOne({ title: "Clean Code" }, { $set: { price: 35.0 } });

  console.log("Delete book 1984");
  await Book.deleteOne({ title: "1984" });

  console.log("In stock and after 2010");
  console.log(await Book.find({ in_stock: true, published_year: { $gt: 2010 } }));

  console.log("Projection: title, author, price");
  console.log(await Book.find({}, "title author price"));

  console.log("Sort price ascending");
  console.log(await Book.find().sort({ price: 1 }));

  console.log("Sort price descending");
  console.log(await Book.find().sort({ price: -1 }));

  console.log("Pagination: skip 5, limit 5");
  console.log(await Book.find().skip(5).limit(5));

  console.log("Average price by genre");
  console.log(await Book.aggregate([
    { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
  ]));

  console.log("Top author");
  console.log(await Book.aggregate([
    { $group: { _id: "$author", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 1 }
  ]));

  console.log("Books grouped by decade");
  console.log(await Book.aggregate([
    {
      $group: {
        _id: { $floor: { $divide: ["$published_year", 10] } },
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        decade: { $concat: [{ $toString: { $multiply: ["$_id", 10] } }, "s"] },
        count: 1,
        _id: 0
      }
    }
  ]));

  console.log("Create index on title");
  await Book.collection.createIndex({ title: 1 });

  console.log("Create compound index");
  await Book.collection.createIndex({ author: 1, published_year: -1 });

  console.log("Explain index usage");
  console.log(await Book.find({ title: "Sapiens" }).explain("executionStats"));

  await mongoose.disconnect();
}

run().catch(console.error);
