import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import userSchema from './database/schema/UserSchema.js';
import unionSchema from './database/schema/UnionSchema.js';
import unitSchema from './database/schema/UnitSchema.js';
import councilSchema from './database/schema/CouncilSchema.js';
import productAndServiceSchema from './database/schema/ProductsAndServicesSchema.js';
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

// GraphQL endpoint for union schema
app.use(
  '/union/graphql',
  cors({ origin: ['http://localhost:3000', 'https://studio.apollographql.com'] }),
  createHandler({
    schema: unionSchema,
    rootValue: root,
  })
);

// GraphQL endpoint for product and service schema
app.use(
  '/productAndService/graphql',
  cors({ origin: ['http://localhost:3000', 'https://studio.apollographql.com'] }),
  createHandler({
    schema: productAndServiceSchema,
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
app.get('/graphiql/:schemaName', (req, res) => {
  const { schemaName } = req.params;
  res.type('html');
  res.end(ruruHTML({ endpoint: `/${schemaName}/graphql` }));
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
