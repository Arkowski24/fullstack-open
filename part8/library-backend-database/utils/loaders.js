const DataLoader = require('dataloader');
const Book = require('../models/book');

const authorBooksLoader = new DataLoader(authorIds => {
  return Book.find({ author: { $in: authorIds }})
    .then(books => {
      return authorIds.map(authorId => books.filter(b => b.author.toString() === authorId.toString()));
    });
});

module.exports = { authorBooksLoader };
