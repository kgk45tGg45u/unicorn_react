import db from '../models/UnionModel.js'
import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLID } from 'graphql'

const Union = new GraphQLObjectType({
  name: 'Union',
  description: 'this represents a union',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(union) {
          return union.id
        }
      },
      name: {
        type: GraphQLString,
        resolve(union) {
          return union.name
        }
      },
      address: {
        type: GraphQLString,
        resolve(union) {
          return union.address
        }
      },
      email: {
        type: GraphQLString,
        resolve(union) {
          return union.email
        }
      },
      phone: {
        type: GraphQLString,
        resolve(union) {
          return union.phone
        }
      },
      union_category_id: {
        type: GraphQLInt,
        resolve(union) {
          return union.union_category_id
        }
      },
      responsible_id: {
        type: GraphQLID,
        resolve(union) {
          return union.responsible_id
        }
      },
      members: {
        type: new GraphQLList(GraphQLID),
        resolve(union) {
          return union.members
        }
      },
      council_id: {
        type: GraphQLInt,
        resolve(union) {
          return union.unit_id
        }
      },
    }
  }
})

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is a root query',
  fields: () => {
    return {
      GetUnion: {
        type: new GraphQLList(Union),
        args: {
          members: {
            type: GraphQLID,
          }
        },
        resolve(root, args) {
          console.log('Querying unions with args:', args);
          // Retrieve unions from the database based on provided arguments
          return db.union.findAll({ where: args })
            .then(unions => unions.map(union => ({
              id: union.id,
              name: union.name,
              members: union.members,
              responsible_id: union.responsible_id// Ensure this matches the expected type
              // Add other fields if necessary
            })))
            .catch(error => {
              console.error('Error retrieving unions:', error);
              throw error; // Propagate error to the client
            });
        }
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Functions to create and authenticate unions',
  fields: () => ({
    addunion: {
      type: Union,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        user_id: {
          type: new GraphQLNonNull(GraphQLID)
        },
        unit_id: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: (_, args) => {
        return db.Union.create({
          name: args.name,
          responsible_id: args.user_id,
          members: [args.user_id],
          unit_id: args.unit_id
        })
      }
    },
  })
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})

export default Schema
