import {Currencies, Users} from "../../db/dbConnector.js";
import {getFilteredEntity} from "../../helpers/FilterParsing.js";
import {
    mongoDBAddEntityResolver,
    mongoDBDeleteEntitiesResolver,
    mongoDBUpdateEntitiesResolver
} from "../resolvers.graphql.js";

export const authResolvers = {
    Query: {
        getCurrencies: async (root, {input}) => {
            let currencies = await Currencies.find().lean()
            return getFilteredEntity(currencies, input)
        },

    },
    Mutation: {


        login: async (root, {input}) => {
            try {
                const {email, password} = req.body
                const candidate = await Users.findOne(input.email)
                if (candidate) {
                  return candidate
                }
                const hashedPassword = await bcrypt.hash(password, 12)
                const user = new User({email, password: hashedPassword})
                await user.save();
                res.status(201).json({message: 'User created'})
            } catch (e) {
                res.status(500).json({message: "Somethings goes wrong"})
            }

        },
        signup: async (root, {input}) => {
            return await mongoDBDeleteEntitiesResolver(Currencies, root, input)
        },


    }
};
