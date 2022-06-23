import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['mentor', 'worker'],
        default: 'worker'
    },
    name: {
        type: String
    },
    salary: {
        type: Number
    },
    workDuration: {
        type: Number
    },
    level: {
        type: String,
        enum: ["junior", "middle"]
    },
    timestamp: {
        type: Date,
    },
    techStack: {
        type: String
    },
    project: {
        type: mongoose.Schema.Types.ObjectId, ref: "Projects", required: false
    },
    proxy: {
        type: mongoose.Schema.Types.ObjectId, ref: "Proxies"
    }


})
export const projectSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    worker: {
        type: mongoose.Schema.Types.ObjectId, ref: "Users", required: false
    },
    status: {
        type: String,
        enum: ['open', 'active','closed']
    },
    mentor: {
        type: mongoose.Schema.Types.ObjectId, ref: "Mentors", required: false
    },
    country: {
        type: String,
    },
    duration: {
        type: Number
    },
    timeStamp: {
        type: Date
    },
    techStack: {
        type: String
    }

})
export const proxySchema = new mongoose.Schema({
    name: {
        type: String
    },
    country: {
        type: String
    },
    timeStamp: {
        type: Date
    },
    bank: {
        type: String
    },
    currencies: {
        type: mongoose.Schema.Types.ObjectId, ref: "currency"
    }
})
export const currencySchema = new mongoose.Schema({
    name: {
        type: String
    },
    code: {
        type: String
    }
})
export const mentorSchema = new mongoose.Schema({
    name: {
        type: String
    },
    level: {
        type: String,
        enum: ['middle', 'senior']
    },
    workDuration: {
        type: Number
    },
    salary: {
        type: Number
    },
    country: {
        type: String
    },
    timestamp: {
        type: Date,
    },
    techStack: {
        type: String
    }
})