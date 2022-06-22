import {config} from "dotenv";

export const PORT = 8080;
config();
export const environment = {
    development: {
        serverURL: `http://localhost:${PORT}/`,
        dbString: `mongodb+srv://psihoz_ykt:${process.env.DB_PASS}@cluster0.rp2fj.gcp.mongodb.net/?retryWrites=true&w=majority`
    },
    production: {
        serverURL: `http://localhost:${PORT}/`,
        dbString: 'mongodb+srv://psihoz_ykt:${process.env.DB_PASS}@cluster0.rp2fj.gcp.mongodb.net/?retryWrites=true&w=majority'
    }
}
