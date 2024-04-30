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
          console.log('Resolving id:', council.id);
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
            type: new GraphQLList(GraphQLID), defaultValue: null ,
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
        name: { type: GraphQLString, defaultValue: null },
        members: { type: new GraphQLList(GraphQLID), defaultValue: null },
        responsible_id: { type: GraphQLID, defaultValue: null },
        phone: { type: GraphQLString, defaultValue: null },
      },
      resolve: (_, args) => {
        // Logic to create a council using the provided args
        // You can handle each argument according to its presence or absence
        // For demonstration purposes, let's assume creating a council directly from the args
        return db.Council.create({
          name: args.name,
          members: args.members,
          responsible_id: args.responsible_id,
          phone: args.phone
        });
      },
    },

  })
});


const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})


export default Schema
