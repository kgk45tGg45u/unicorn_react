import db from '../models/UnitModel.js'
import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLID, GraphQLBoolean } from 'graphql'

const Unit = new GraphQLObjectType({
  name: 'Unit',
  description: 'this represents a unit',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(unit) {
          console.log('Resolving id:', unit.id);
          return unit.id
        }
      },
      name: {
        type: GraphQLString,
        resolve(unit) {
          return unit.name
        }
      },
      address: {
        type: GraphQLString,
        resolve(unit) {
          return unit.address
        }
      },
      status: {
        type: GraphQLString,
        resolve(unit) {
          return unit.status
        }
      },
      unit_category_id: {
        type: GraphQLInt,
        resolve(unit) {
          return unit.unit_category_id
        }
      },
      union_id: {
        type: GraphQLInt,
        resolve(unit) {
          return unit.union_id
        }
      },
      has_product: {
        type: GraphQLBoolean,
        resolve(unit) {
          return unit.has_product
        }
      },
      has_service: {
        type: GraphQLInt,
        resolve(unit) {
          return unit.has_service
        }
      },
      users: {
        type: GraphQLList(GraphQLID),
        resolve(unit) {
          return unit.users
        }
      },
      products: {
        type: GraphQLList(GraphQLID),
        resolve(unit) {
          return unit.products
        }
      }
    }
  }
})



const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is a root query',
  fields: () => {
    return {
      GetUnit: {
        type: new GraphQLList(Unit),
        args: {
          name: {
            type: GraphQLNonNull(GraphQLString),
          }
        },
        resolve(root, args) {
          console.log('Querying units with args:', args);
          // Retrieve units from the database based on provided arguments
          return db.Unit.findAll({ where: args })
            .then(units => units.map(unit => ({
              id: unit.id,
              name: unit.name,
              status: unit.status,
              users: unit.users, // Ensure this matches the expected type
              // Add other fields if necessary
            })))
            .catch(error => {
              console.error('Error retrieving units:', error);
              throw error; // Propagate error to the client
            });
        }
      }
    }
  }
});



const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Functions to create and authenticate units',
  fields: () => ({
    addUnit: {
      type: Unit,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (_, args) => {
        return db.Unit.create({
          name: args.name
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
