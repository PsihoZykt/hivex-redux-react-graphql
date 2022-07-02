import {Currencies, Mentors, Projects, Proxies, Requests, Users} from "../db/dbConnector.js";

/**
 * GraphQL Resolvers
 **/


// Add item to Entity collection
export const mongoDBAddEntityResolver = (Entity, _root, input) => {
  const newItem = new Entity({...input});
  return new Promise((resolve, reject) => {
    newItem.save((err, item) => {
      if (err) {
        reject(err);
      } else resolve(item);
    });
  });
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
  console.log(input)
  const isFilter = Object.keys(filter).length !== 0;
  if (isFilter) {
    await Entity.updateMany(filter, {$set: set})
    return await Entity.find({set})
  }

}
export const resolvers = {
  Query: {

    getProjects: async () => {
      return new Promise((resolve, reject) => {
        Projects.find().populate("mentor").then((entity) => {
          resolve(entity)
        }).catch((e) => reject(e))
      })
    },
    getMentors: async () => {
      return new Promise((resolve, reject) => {
        Mentors.find().then((entity) => {
          resolve(entity)
        }).catch((e) => reject(e))
      })
    },
    getCurrencies: async () => {
      return new Promise((resolve, reject) => {
        Currencies.find().then((entity) => {
          resolve(entity)
        }).catch((e) => reject(e))
      })
    },
    getProxies: async () => {
      return new Promise((resolve, reject) => {
        Proxies.find().populate("currency").then((entity) => {
          resolve(entity)
        }).catch((e) => reject(e))
      })
    },
    getRequests: async () => {
      return new Promise((resolve, reject) => {
        Requests.find().then((entity) => {
          resolve(entity)
        }).catch((e) => reject(e))
      })
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
      return await mongoDBDeleteUserResolver(Users, root, input)
    },
    updateUsers: async (root, {input}) => {
      return await mongoDBUpdateUsersResolver(Users, root, input)
    },
    addUser: async (root, {input}) => {
      return await mongoDBAddEntityResolver(Users, root, input)
    },

  },
};
