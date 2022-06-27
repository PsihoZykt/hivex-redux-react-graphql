export const PORT = process.env['PORT'] || 8080;

// TODO: Hide dbString
export const environment = {
    development: {
        serverURL: `http://localhost:${PORT}/`,
        dbString: `mongodb+srv://psihoz_ykt:xmcqmdmjxslaogf@cluster0.rp2fj.gcp.mongodb.net/?retryWrites=true&w=majority`
    },
    production: {
        serverURL: `https://hivex-redux-graphql.herokuapp.com/:${PORT}/`,
        dbString: `mongodb+srv://psihoz_ykt:xmcqmdmjxslaogf@cluster0.rp2fj.gcp.mongodb.net/?retryWrites=true&w=majority`
    }
}
