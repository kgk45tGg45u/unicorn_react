import fs from 'fs'
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
          return unit.id
        }
      },
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Functions to create and authenticate units',
  fields: () => ({
    saveProfilePicture: async (_, { imageData }) => {
      try {
        // Assuming imageData is a Buffer containing the image data
        // Save the image data to a file or database
        const filename = `profile_${Date.now()}.png`;
        fs.writeFileSync(`./profilePictures/${filename}`, imageData);
        return filename; // Return the filename or URL of the saved image
      } catch (error) {
        console.error('Error saving profile picture:', error);
        throw new Error('Failed to save profile picture');
      }
    }
  })
});

const Schema = new GraphQLSchema({
  mutation: Mutation
})

export default Schema
