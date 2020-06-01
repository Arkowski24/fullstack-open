const { ApolloServer, AuthenticationError, UserInputError, gql } = require('apollo-server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const config = require('./utils/config');

const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');


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
  
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
  
  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(
      author: String
      genre: String
    ): [Book!]!
    allAuthors: [Author!]!
    me: User
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
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
        .then(books => args.author ? books.filter(b => b.author.name === args.author) : books)
    ,
    allAuthors: () => Author.find({}),
    me: (root, args, context) => context.currentUser
  },

  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated');
      }
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = await Author({ name: args.author })
          .save();
      }
      const book = Book({
        ...args,
        author: author._id
      });
      return book.save()
        .catch(error => {
          throw new UserInputError(error.message, { invalidArgs: args });
        });
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated');
      }
      const author = await Author.findOne({ name: args.name });
      if (!author) return null;

      author.born = args.setBornTo;
      return author.save()
        .catch(error => {
          throw new UserInputError(error.message, { invalidArgs: args });
        });
    },
    createUser: async (root, args) => {
      const user = User({ ...args });
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, { invalidArgs: args });
        });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== 'password') {
        throw new UserInputError('wrong credentials');
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, config.JWT_SECRET) };
    },
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase()
      .startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), config.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  }
});

server.listen()
  .then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
