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
    getUsers: (parent, args, context, info) => {
      const {filter} = args;
      const shouldApplyFilters = filter !== null;


      return new Promise(async (resolve, reject) => {
        let query = {};
        // query.name = {}
        // query.project = {}
        // if (filter?.name) { query = {name: filter?.name}}
        if (filter) {
          if (filter.name) {
            query.name = {}
            query.name = {
              "name": {$eq: filter.name}
            }
          }
          if (filter.project) {
            query.project = {}

            if (filter.project?.mentor) {
              query.project.mentor = {}
              query.project.mentor.name = {
                "project.mentor.name": {$eq: filter.project.mentor.name}
              }
            }

            if (filter.project.name) {
              query.project.name = {
                "project.name": {$eq: filter.project.name}
              }
            }
          }
          query = {
            "$and": [
              query.project?.name || {},
              query.project?.mentor?.name || {},
              // {"project.mentor.name" : {$eq : "das"}},
              query.name || {}
            ]
          }

        }

        const match = {
          $match: query
        }
        console.log(match)

        const res = Users.aggregate(
            [
              {
                $lookup:
                    {
                      from: "projects",
                      localField: "project",
                      pipeline: [{
                        $lookup: {
                          from: "mentors",
                          localField: "mentor",
                          foreignField: "_id",
                          as: "mentor"
                        }
                      }, {$unwind: "$mentor"}],
                      foreignField: "_id",
                      as: "project"
                    }
              },
              {$unwind: "$project"},
              match,


            ]).then(res => {
          resolve(res)
        })

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
