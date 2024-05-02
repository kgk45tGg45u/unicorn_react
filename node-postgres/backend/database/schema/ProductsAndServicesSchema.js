import db from '../models/ProductsAndServicesModel.js'
import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLBoolean } from 'graphql'

const ProductAndService = new GraphQLObjectType({
  name: 'ProductAndService',
  description: 'this represents a product / service',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(product_and_service) {
          return product_and_service.id
        }
      },
      name: {
        type: GraphQLString,
        resolve(product_and_service) {
          return product_and_service.name
        }
      },
      description: {
        type: GraphQLString,
        resolve(product_and_service) {
          return product_and_service.description
        }
      },
      type: {
        type: GraphQLString,
        resolve(product_and_service) {
          return product_and_service.type
        }
      },
      service: {
        type: GraphQLBoolean,
        resolve(product_and_service) {
          return product_and_service.service
        }
      },
      category_id: {
        type: GraphQLInt,
        resolve(product_and_service) {
          return product_and_service.category_id
        }
      },
      measurement_unit: {
        type: GraphQLInt,
        resolve(product_and_service) {
          return product_and_service.measurement_unit
        }
      },
      unit_id: {
        type: GraphQLInt,
        resolve(product_and_service) {
          return product_and_service.unit_id
        }
      },
      stock: {
        type: GraphQLInt,
        resolve(product_and_service) {
          return product_and_service.stock
        }
      },
      tags: {
        type: new GraphQLList(GraphQLString),
        resolve(product_and_service) {
          return product_and_service.tags
        }
      },
      active: {
        type: GraphQLBoolean,
        resolve(product_and_service) {
          return product_and_service.active
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
      GetProductsAndServices: {
        type: new GraphQLList(ProductAndService),
        args: {
          name: {
            type: GraphQLString,
          },
          id: {
            type: GraphQLInt,
          }
        },
        resolve(root, args) {
          return db.ProductAndService.findOne({ where: args })
        }
      },
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Functions to create/edit products or services',
  fields: () => ({
    addProductAndService: {
      type: ProductAndService,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        unit_id: {
          type: new GraphQLNonNull(GraphQLInt)
        },
        active: {
          type: new GraphQLNonNull(GraphQLBoolean)
        },
        service: {
          type: new GraphQLNonNull(GraphQLBoolean)
        }
      },
      resolve: async (_, args) => {
        try {
          const product = await db.ProductAndService.create({
            name: args.name,
            unit_id: args.unit_id,
            active: args.active
          })
          if (args.description) {
            product.description = args.description
          }
          if (args.type) {
            product.type = args.type
          }
          if (args.service && args.service === true) {
            product.service = true
          } else {
            product.service = false
          }
          if (args.category_id) {
            product.category_id = args.category_id
          }
          if (args.measurement_unit) {
            product.measurement_unit = args.measurement_unit
          }
          if (args.stock) {
            product.stock = args.stock
          }
          if (args.tags) {
            product.tags.push(args.tags)
          }
          await product.save()
          return product
        } catch (error) {
          console.error('Error creating Product or service', error);
          throw error;
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
