import {Users} from "../../db/dbConnector.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authResolvers = {
    Query: {
        auth: async (root, {input}, context) => {
            console.log("context is", context)
            if (context.user) {
                let user;
                try {
                    user = await Users.findById(context.user.id)
                } catch (e){
                    console.log(e)
                }
                console.log(user)
                return user

            } else return null
        }
    },
    Mutation: {
        signIn: async (root, {input}) => {
            let {email, password} = input
            if (email) {
                email = email.trim().toLowerCase();
            }
            const user = await Users.findOne({email: email});
            // if there is no user, throw an authentication error
            if (!user) {
                throw new Error('Error signing in');
            }    // if the passwords don't match, throw an authentication error
            const valid = await bcrypt.compare(password, user.password);

            if (!valid) {
                console.log("Invalid password")
                throw new Error('Error signing in');
            }    // create and return the json web token
            return jwt.sign({id: user._id}, "123", null, null);

        },
        signUp: async (root, {input}) => {
            // normalize email address
            let {email, name, password} = input
            email = email.trim().toLowerCase();
            name = name.trim().toLowerCase();
            const hashed = await bcrypt.hash(password, 10); // hash the password
            let user = await new Users({email, password: hashed, name})
            try {
                await user.save()
                console.log("user saved")
                return jwt.sign({id: user._id}, "123", null, null);

            } catch (err) {
                console.log(err)
                throw new Error("Error creating account")
            }

        },


    }
};
