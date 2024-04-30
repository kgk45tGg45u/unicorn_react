import db from '../models/UserModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLID, GraphQLBoolean } from 'graphql'

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
      },
      birthday: {
        type: GraphQLString,
        resolve(user) {
          return user.birthday
        }
      },
      address: {
        type: GraphQLString,
        resolve(user) {
          return user.address
        }
      },
      zip: {
        type: GraphQLString,
        resolve(user) {
          return user.zip
        }
      },
      city: {
        type: GraphQLString,
        resolve(user) {
          return user.city
        }
      },
      country: {
        type: GraphQLString,
        resolve(user) {
          return user.country
        }
      },
      disability: {
        type: new GraphQLList(GraphQLString),
        resolve(user) {
          return user.disability
        }
      },
      working: {
        type: GraphQLBoolean,
        resolve(user) {
          return user.working
        }
      },
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
            type: GraphQLID
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
          return db.User.findAll({ where: args })
        }
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Functions to create and authenticate users',
  fields: () => ({
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
    },
    updateUserProfile: {
      type: User,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        birthday: { type: GraphQLString },
        phone: { type: GraphQLString },
        address: { type: GraphQLString },
        disability: { type: new GraphQLList(GraphQLString) },
        zip: { type: GraphQLInt },
        city: { type: GraphQLString },
        country: { type: GraphQLString },
        working: { type: GraphQLBoolean }
      },
      resolve: async (_, { id, firstName, lastName, email, password, birthday, phone, address, disability, zip, city, country, working }) => {
        try {
          // Find the user by ID
          const user = await db.User.findOne({ where: { id } });
          if (!user) {
            throw new Error('User not found');
          }
          // Update user profile with new first name and last name if provided
          if (firstName) {
            user.firstName = firstName;
          }
          if (lastName) {
            user.lastName = lastName;
          }
          if (email) {
            user.email = email;
          }
          if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
          }
          if (birthday) {
            user.birthday = birthday;
          }
          if (phone) {
            user.phone = phone;
          }
          if (address) {
            user.address = address;
          }
          if (disability) {
            user.disability = disability;
          }
          if (zip) {
            user.zip = zip;
          }
          if (city) {
            user.city = city;
          }
          if (country) {
            user.country = country;
          }
          if (working) {
            user.working = working
          }
          if (working === false){
            user.working = false
          }

          // Save changes to the database
          await user.save();
          return user; // Return the updated user object
        } catch (error) {
          console.error('Error updating user profile:', error);
          throw error; // Propagate error to the client
        }
      },
    },
  })
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})
export default Schema
