import db from '../models/UnitModel.js'
import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLID, GraphQLBoolean } from 'graphql'
import { Op } from 'sequelize'

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
        type: new GraphQLList(GraphQLID),
        resolve(unit) {
          return unit.users
        }
      },
      products: {
        type: new GraphQLList(GraphQLID),
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
            type: new GraphQLNonNull(GraphQLString),
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
      },
      GetAllUnits: {
        type: new GraphQLList(Unit),
        args: {
        },
        resolve(root, args) {
          console.log('Querying all units');
          // Retrieve units from the database based on provided arguments
          return db.Unit.findAll()
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
        },
        user_id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: (_, args) => {
        return db.Unit.create({
          name: args.name,
          users: [args.user_id]
        })
      }
    },
    editUnit: {
      type: Unit,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        user_id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: async (_, args) => {
        try {
        const unit = await db.Unit.findOne({ where: args.name })
        const userExistsInUnit = unit.users.includes(args.user_id)
        if (userExistsInUnit) {
          // If user already exists in the unit, throw an error
          throw new Error('User is already in this unit');
        }
        // If user doesn't exist in the unit, add the user to the unit's users array
        unit.users.push(args.user_id);
        await unit.save(); // Save the updated unit
        return unit;
        } catch (error) {
        throw new Error('Could not find the unit.');
        }
      }
    },
    addServiceProduct: {
      type: Unit,
      args: {
        hasService: {
          type: GraphQLBoolean
        },
        hasProduct: {
          type: GraphQLBoolean
        },
        user_id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: async (_, args) => {
        try {
          const unit = await db.Unit.findOne({ where: { users: { [Op.contains]: [args.user_id] } } })
          if (args.hasProduct) {
            unit.has_product = args.hasProduct
          }
          if (args.hasService) {
            unit.has_service = args.hasService
          }
          await unit.save();
          return unit; // Return the updated user object
        } catch (error) {
          throw new Error('Could not find the unit.');
        }
      }
    },
  })
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})

export default Schema
