// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// exports.seriesSchema = void 0;
import mongoose from "mongoose";

export const seriesSchema = new mongoose.Schema({
    seriesName: {
        type: String
    },
    year: {
        type: Number
    },
    rating: {
        type: String
    }
});
