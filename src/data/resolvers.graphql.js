import {Currencies, Mentors, Projects, Proxies, Requests, Users} from "../db/dbConnector.js";

/**
 * GraphQL Resolvers
 **/


// Add item to Entity collection
export const mongoDBAddEntityResolver = async (Entity, _root, input) => {
  const newItem = new Entity({...input});
 return await newItem.save()

}
export const mongoDBDeleteEntitiesResolver = async (Entity, _root, input) => {
  const isFilter = Object.keys(input).length !== 0;
  if (isFilter) {
    const users = await Entity.find(input);
    await Entity.deleteMany(input);
    return users;
  }
}
export const mongoDBUpdateEntitiesResolver = async (Entity, _root, input) => {
  let {filter, set} = input
  const isFilter = Object.keys(filter).length !== 0;
  if (isFilter) {
    await Entity.updateMany(filter, {$set: set})
    return await Entity.find({set})
  }

}
export const resolvers = {
  Query: {

    getProjects: () => {
      return Projects.find().populate("mentor");
    },
    getMentors: () => {
      return Mentors.find()
    },
    getCurrencies: () => {
      return Currencies.find()
    },
    getProxies: () => {
      return Proxies.find().populate("currency")
    },
    getRequests: () => {
      return Requests.find();
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

    addRequest: async (root, {input}) => {

      input.createdAt = new Date();
      return await mongoDBAddEntityResolver(Requests, root, input)
    },
    deleteUser: async (root, {input}) => {
      return await mongoDBDeleteEntitiesResolver(Users, root, input)
    },
    updateUsers: async (root, {input}) => {
      return await mongoDBUpdateEntitiesResolver(Users, root, input)
    },
    addUser: async (root, {input}) => {
      return await mongoDBAddEntityResolver(Users, root, input)
    },

  },
};
