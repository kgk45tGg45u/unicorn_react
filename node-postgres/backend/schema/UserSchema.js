import db from '../models/UserModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLID } from 'graphql'

const AuthPayload = new GraphQLObjectType({
  name: 'AuthPayload',
  description: 'Authentication payload',
  fields: () => ({
    token: { type: GraphQLString },
    user: { type: User }
  })
});

const User = new GraphQLObjectType({
  name: 'User',
  description: 'this represents a user',
  fields: () => {
    return {
      id: {
        type: GraphQLID,
        resolve(user) {
          return user.id
        }
      },
      firstName: {
        type: GraphQLString,
        resolve(user) {
          return user.firstName
        }
      },
      lastName: {
        type: GraphQLString,
        resolve(user) {
          return user.lastName
        }
      },
      email: {
        type: GraphQLString,
        resolve(user) {
          return user.email
        }
      },
      phone: {
        type: GraphQLString,
        resolve(user) {
          return user.phone
        }
      },
      password: {
        type: GraphQLString,
        resolve(user) {
          return user.password
        }
      }
    }
  }
})



const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'this is a root query',
  fields: () => {
    return {
      users: {
        type: new GraphQLList(User),
        args: {
          id: {
            type: GraphQLInt
          },
          firstName: {
            type: GraphQLString
          },
          lastName: {
            type: GraphQLString
          },
          phone: {
            type: GraphQLString
          },
          password: {
            type: GraphQLString
          }
        },
        //validations can go here
        resolve(root, args) {
          return db.models.user.findAll({ where: args })
        }
      }
    }
  }
})


const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Functions to create and authenticate users',
  fields: () => ({
    // addUser: {
    //   type: User,
    //   args: {
    //     firstName: {
    //       type: new GraphQLNonNull(GraphQLString)
    //     }
    //   },
    //   resolve: (_, args) => {
    //     return db.models.user.create({
    //       firstName: args.firstName
    //     })
    //   }
    // },
    register: {
      type: AuthPayload,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { email, password }) => {
        const existingUser = await db.User.findOne({ where: { email } });
        if (existingUser) {
          throw new Error('User already exists');
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await db.User.create({ email, password: hashedPassword });
        const token = jwt.sign({ email: newUser.email }, `${process.env.JWT_SECRET}`, { expiresIn: '1h' });
        return {token, user: newUser}
      }
    },
    login: {
      type: AuthPayload,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { email, password }) => {
        const existingUser = await db.User.findOne({ where: { email } });
        if (!existingUser) {
          throw new Error('User does not exist');
        } else {
        // Hash the password
        const token = jwt.sign({ email: existingUser.email }, `${process.env.JWT_SECRET}`);
        return {token, user: existingUser}
        }
      }
    }
  })
});




const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})


export default Schema
