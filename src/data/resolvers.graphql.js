import {Currencies, Mentors, Projects, Proxies, Requests, Users} from "../db/dbConnector.js";
import {getKeysArrFromObject} from "../helpers/FilterParsing.js";
import _ from "lodash";

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
const mongoDBDeleteUserResolver = async (Entity, _root, input) => {
  const isFilter = Object.keys(input).length !== 0;
  if (isFilter) {
    const users = await Entity.find(input);
    await Entity.deleteMany(input);
    return users;
  }
}
const mongoDBUpdateUsersResolver = async (Entity, _root, input) => {
  let {filter, set} = input
  console.log(filter)
  console.log(set)

  const isFilter = Object.keys(filter).length !== 0;
  if (isFilter) {
    await Entity.updateMany(filter, {$set: set})
    const updatedUsers = await Entity.find({set})
    return updatedUsers
  }

}
export const resolvers = {
  Query: {
    getUsers: (parent, args, context, info) => {
      const {filter} = args;

      const shouldApplyFilters = filter !== null;

      return new Promise(async (resolve, reject) => {
        let query = {};
        let filterFieldsArr = [{}]
        let filterFields = {}
        if (filter) {
          let keys = getKeysArrFromObject(filter)
          keys.forEach(key => {
            filterFieldsArr.push({[key]: {$eq: _.get(filter, key)}})
          })
          console.log(filterFieldsArr)
          query = {
            "$and": [
              ...filterFieldsArr
            ]
          }
        }

        const match = {
          $match: query
        }

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
                      }, {
                        $unwind: {
                          path: "$mentor",
                          "preserveNullAndEmptyArrays": true
                        }
                      }],
                      foreignField: "_id",
                      as: "project"
                    }
              },
              {
                $unwind: {
                  path: "$project",
                  "preserveNullAndEmptyArrays": true
                }
              },
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
    },
    deleteUser: async (root, {input}) => {
      return await mongoDBDeleteUserResolver(Users, root, input)
    },
    updateUsers: async (root, {input}) => {
      return await mongoDBUpdateUsersResolver(Users, root, input)
    }

  },
};
