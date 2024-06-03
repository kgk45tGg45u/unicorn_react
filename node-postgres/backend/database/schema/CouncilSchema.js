import db from '../models/CouncilModel.js'
import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLID } from 'graphql'

const Council = new GraphQLObjectType({
  name: 'Council',
  description: 'this represents a council',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(council) {
          return council.id
        }
      },
      name: {
        type: GraphQLString,
        resolve(council) {
          return council.name
        }
      },
      address: {
        type: GraphQLString,
        resolve(council) {
          return council.address
        }
      },
      email: {
        type: GraphQLString,
        resolve(council) {
          return council.email
        }
      },
      phone: {
        type: GraphQLString,
        resolve(council) {
          return council.phone
        }
      },
      council_category_id: {
        type: GraphQLInt,
        resolve(council) {
          return council.council_category_id
        }
      },
      unit_category_id: {
        type: GraphQLInt,
        resolve(council) {
          return council.unit_category_id
        }
      },
      responsible_id: {
        type: GraphQLID,
        resolve(council) {
          return council.responsible_id
        }
      },

      members: {
        type: new GraphQLList(GraphQLID),
        resolve(council) {
          return council.members
        }
      },
      unit_id: {
        type: GraphQLInt,
        resolve(council) {
          return council.unit_id
        }
      },
      input_output_tag: {
        type: GraphQLInt,
        resolve(council) {
          return council.input_output_tag
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
      GetCouncil: {
        type: new GraphQLList(Council),
        args: {
          members: {
            type: new GraphQLList(GraphQLID),
          }
        },
        resolve(root, args) {
          console.log('Querying councils with args:', args);
          // Retrieve councils from the database based on provided arguments
          return db.Council.findAll({ where: args })
            .then(councils => councils.map(council => ({
              id: council.id,
              name: council.name,
              members: council.members,
              input_output_tag: council.input_output_tag,
              responsible_id: council.responsible_id// Ensure this matches the expected type
              // Add other fields if necessary
            })))
            .catch(error => {
              console.error('Error retrieving councils:', error);
              throw error; // Propagate error to the client
            });
        }
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Functions to create and authenticate councils',
  fields: () => ({
    addCouncil: {
      type: Council,
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
        return db.Council.create({
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
