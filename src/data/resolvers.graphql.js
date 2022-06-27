import {Currencies, Mentors, Projects, Proxies, Requests, Users} from "../db/dbConnector.js";

/**
 * GraphQL Resolvers
 **/

// Get all values from Entity from mongo  ( Entity is one of the models from dbConnector.js )
const mongoDBGetAllResolver = (Entity) => {
  return new Promise((resolve, reject) => {
    Entity.find().then((entity) => {
      resolve(entity)
    }).catch((e) => reject(e))
  })
}
// Add item to Entity collection
const mongoDBAddEntityResolver = (Entity, _root, item) => {
  const {...rest} = item;
  const newItem = new Entity({...rest});

  return new Promise((resolve, reject) => {
    newItem.save((err, item) => {
      if (err) reject(err);
      else resolve(item);
    });
  });
}
export const resolvers = {
  Query: {
    getUsers: async () => {
      return await mongoDBGetAllResolver(Users)
    },
    getProjects: async () => {
      return await mongoDBGetAllResolver(Projects)
    },
    getMentors: async () => {
      return await mongoDBGetAllResolver(Mentors)
    },
    getCurrencies: async () => {
      return await mongoDBGetAllResolver(Currencies)
    },
    getProxies: async () => {
      return await mongoDBGetAllResolver(Proxies)
    },
    getRequests: async () => {
      return await mongoDBGetAllResolver(Requests)
    }
  },
  Mutation: {

    addProject: async (root, {input}) => {
      return await mongoDBAddEntityResolver(Projects, root, input)
    },
    addMentor: async (root, {input}) => {
      return await mongoDBAddEntityResolver(Mentors, root, input)
    },
    addProxy: async (root, {input}) => {
      return await mongoDBAddEntityResolver(Proxies, root, input)
    },
    addCurrency: async (root, {input}) => {
      return await mongoDBAddEntityResolver(Currencies, root, input)

    },
    addUser: async (root, input) => {
      return await mongoDBAddEntityResolver(Users, root, input)
    },
    addRequest: async (root, {input}) => {

      input.createdAt = new Date();
      return await mongoDBAddEntityResolver(Requests, root, input)
    }

  },
};
