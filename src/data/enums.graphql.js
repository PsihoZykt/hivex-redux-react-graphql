import {gql} from "apollo-server-express";

export const enumsDefs = gql`
    enum ProjectStatus {
        open
        active
        closed
    }

    enum Role {
        mentor
        worker
    }
    enum Level {
        junior
        middle
        senior
    }

`