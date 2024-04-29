import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import userSchema from './database/schema/UserSchema.js'; // Import user schema
import unitSchema from './database/schema/UnitSchema.js'; // Import unit schema
import councilSchema from './database/schema/CouncilSchema.js'; // Import unit schema
import cors from 'cors';
import { ruruHTML } from 'ruru/server';
import jwt from 'jsonwebtoken';

// const JWT_SECRET = 'your-secret-key';

// // Middleware to verify JWT token
// const authenticateJWT = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (token) {
//     jwt.verify(token, JWT_SECRET, (err, decoded) => {
//       if (err) {
//         return res.status(401).json({ message: 'Unauthorized' });
//       }
//       req.userId = decoded.userId;
//       next();
//     });
//   } else {
//     res.status(401).json({ message: 'Unauthorized' });
//   }
// };

const app = express();
const port = 3001;
var root = {
  hello() {
    return 'Hello world!';
  },
};

// Apply CORS middleware to all routes
app.use(cors());



// GraphQL endpoint for user schema
app.use(
  '/user/graphql',
  cors({ origin: ['http://localhost:3000', 'https://studio.apollographql.com'] }),
  createHandler({
    schema: userSchema,
    rootValue: root,
  })
);

// GraphQL endpoint for unit schema
app.use(
  '/unit/graphql',
  cors({ origin: ['http://localhost:3000', 'https://studio.apollographql.com'] }),
  createHandler({
    schema: unitSchema,
    rootValue: root,
  })
);

// GraphQL endpoint for council schema
app.use(
  '/council/graphql',
  cors({ origin: ['http://localhost:3000', 'https://studio.apollographql.com'] }),
  createHandler({
    schema: councilSchema,
    rootValue: root,
  })
);

// Serve the GraphiQL IDE.
app.get('/', (req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/council/graphql' }));
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
