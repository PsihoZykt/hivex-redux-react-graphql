// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
import mongoose from "mongoose";

// exports.friendSchema = void 0;
export const friendSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    gender: {
        type: String
    },
    age: {
        type: Number
    },
    language: {
        type: String
    },
    email: {
        type: String
    },
    contacts: {
        type: Array
    },
});
