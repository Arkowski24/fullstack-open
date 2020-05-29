const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');

const config = require('./utils/config');

const Author = require('./models/author');
const Book = require('./models/book');


mongoose.set('useFindAndModify', false);
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }
  
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  
  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(
      author: String
      genre: String
    ): [Book!]!
    allAuthors: [Author!]!
  }
  
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book!
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`;

const resolvers = {
  Author: {
    bookCount: (root) => Book.find({ author: { $in: [root._id] } })
      .then(r => r.length)
  },

  Query: {
    authorCount: () => Author.find({})
      .then(r => r.length),
    bookCount: () => Book.find({})
      .then(r => r.length),
    allBooks: (root, args) =>
      Book.find(args.genre ? { genres: args.genre } : {})
        .populate('author')
        .then(books => books.filter(b => b.author.name === args.author))
    ,
    allAuthors: () => Author.find({})
  },

  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = await Author({ name: args.author })
          .save();
      }

      const book = Book({
        ...args,
        author: author._id
      });
      return book.save();
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.author });
      if (!author) return null;

      author.born = args.setBornTo;
      return author.save();
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen()
  .then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
