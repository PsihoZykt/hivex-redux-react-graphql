import {Currencies, Mentors, Projects, Proxies, Requests, Users} from "../db/dbConnector.js";

/**
 * GraphQL Resolvers
 **/


// Add item to Entity collection
const mongoDBAddEntityResolver = (Entity, _root, input) => {
  const newItem = new Entity({...input});
  return new Promise((resolve, reject) => {
    newItem.save((err, item) => {
      if (err) {
        reject(err);
      } else resolve(item);
    });
  });
}
export const resolvers = {
  Query: {
    getUsers: () => {
      return new Promise((resolve, reject) => {
        Users.find().populate({
          path: 'project',
          populate: {path: 'mentor'}
        }).populate({path: "proxy", populate: {path: "currency"}}).then((entity) => {
          console.log(entity)
          resolve(entity)
        }).catch((e) => console.log(e))
      })
    },
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
    addUser: async (root, {input}) => {
      return await mongoDBAddEntityResolver(Users, root, input)
    },
    addRequest: async (root, {input}) => {

      input.createdAt = new Date();
      return await mongoDBAddEntityResolver(Requests, root, input)
    }

  },
};
