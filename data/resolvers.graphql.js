import {Currencies,  Mentors, Projects, Proxies, Users} from "../db/dbConnector.js";

/**
 * GraphQL Resolvers
 **/

export const resolvers = {
  Query: {

    getUsers: (root, {id}) => {
      return new Promise((resolve, reject) => {
        Users.findOne({_id: id} , (err, users) => {
          if(err) reject(err);
          else resolve(users)
        })
      })
    },
    getProject: (root, {id}) => {
      return new Promise((resolve, reject) => {
        Projects.findOne({_id: id} , (err, projects) => {
          if(err) reject(err);
          else resolve(projects)
        })
      })
    },
    getMentors: (root, {id}) => {
      return new Promise((resolve, reject) => {
        Mentors.findOne({_id: id} , (err, mentors) => {
          if(err) reject(err);
          else resolve(mentors)
        })
      })
    },
    getProxies: (root, {id}) => {
      return new Promise((resolve, reject) => {
        Proxies.findOne({_id: id} , (err, proxies) => {
          if(err) reject(err);
          else resolve(proxies)
        })
      })
    },
    getCurrencies: (root, {id}) => {
      return new Promise((resolve, reject) => {
        Currencies.findOne({_id: id} , (err, currencies) => {
          if(err) reject(err);
          else resolve(currencies)
        })
      })
    },




  },
  Mutation: {
    // addFriend: (root, { friend }) => {
    //   const { ...rest } = friend;
    //   const newFriend = new Friends({ ...rest });
    //
    //   return new Promise((resolve, reject) => {
    //     newFriend.save((err, friend) => {
    //       if (err) reject(err);
    //       else resolve(friend);
    //     });
    //   });
    // },
    // addSeries: (root, { series }) => {
    //   const { ...rest } = series;
    //   const newSeries = new Series({
    //     ...rest,
    //   });
    //
    //   return new Promise((resolve, reject) => {
    //     newSeries.save((err, series) => {
    //       if (err) reject(err);
    //       resolve(series);
    //     });
    //   });
    // },
    addUser: (root, { user }) => {
      const { ...rest } = user;
      const newUsers = new Users({
        ...rest,
      });

      return new Promise((resolve, reject) => {
        newUsers.save((err, users) => {
          if (err) reject(err);
          resolve(users);
        });
      });
    },
    // addProject: (root, { project }) => {
    //   const { ...rest } = project;
    //   const newProjects = new Projects({
    //     ...rest,
    //   });
    //
    //   return new Promise((resolve, reject) => {
    //     newProjects.save((err, projects) => {
    //       if (err) reject(err);
    //       resolve(projects);
    //     });
    //   });
    // },
    // addMentor: (root, { mentors }) => {
    //   const { ...rest } = mentors;
    //   const newMentors = new Mentors({
    //     ...rest,
    //   });
    //
    //   return new Promise((resolve, reject) => {
    //     newMentors.save((err, mentors) => {
    //       if (err) reject(err);
    //       resolve(mentors);
    //     });
    //   });
    // },
    // addProxy: (root, { proxies }) => {
    //   const { ...rest } = proxies;
    //   const newProxies = new Proxies({
    //     ...rest,
    //   });
    //
    //   return new Promise((resolve, reject) => {
    //     newProxies.save((err, proxies) => {
    //       if (err) reject(err);
    //       resolve(proxies);
    //     });
    //   });
    // },
    addCurrency: (root, { currencies }) => {
      const { ...rest } =  currencies;
      const newCurrencies = new Currencies({
        ...rest,
      });

      return new Promise((resolve, reject) => {
        newCurrencies.save((err, currencies) => {
          if (err) reject(err);
          resolve(currencies);
        });
      });
    },

  },
};
