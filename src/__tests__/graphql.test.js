import EasyGraphQLTester from 'easygraphql-tester'
import {afterAll, beforeAll, describe, expect, test} from '@jest/globals'
import {loadFiles} from '@graphql-tools/load-files'

describe("Mock queries and mutations", () => {
    let tester;
    let schema;

    beforeAll(async () => {
        try {
            schema = await loadFiles('src/data/schemas/*.gql')
            tester = new EasyGraphQLTester(schema)

        } catch (e) {
            console.log(e)
        }
    })
    afterAll(() => {
        tester.clearFixture()
    })
    test("getUsers mock", () => {
        const fixture = {
            data: {
                "getUsers": [
                    {
                        "_id": "62be66296ec7aae3559979b4",
                        "name": "1234",
                        "level": "junior",
                        "salary": null,
                        "techStack": "312321",
                        "timeStamp": null,
                        "workDuration": null,
                        "project": {
                            "_id": "62be65f56ec7aae3559979b2",
                            "techStack": null,
                            "name": "123",
                            "country": "321",
                            "duration": null,
                            "status": "active",
                            "timestamp": null,
                            "mentor": null
                        },
                        "proxy": null
                    },
                    {
                        "_id": "62be708fc9f5422f5d1b3e35",
                        "name": "1",
                        "level": "junior",
                        "salary": null,
                        "techStack": "312321",
                        "timeStamp": null,
                        "workDuration": null,
                        "project": {
                            "_id": "62be65f56ec7aae3559979b2",
                            "techStack": null,
                            "name": "123",
                            "country": "321",
                            "duration": null,
                            "status": "active",
                            "timestamp": null,
                            "mentor": null
                        },
                        "proxy": null
                    },
                    {
                        "_id": "62be7095c9f5422f5d1b3e37",
                        "name": "2",
                        "level": "middle",
                        "salary": null,
                        "techStack": "312321",
                        "timeStamp": null,
                        "workDuration": null,
                        "project": {
                            "_id": "62b9e94b1facf0ae4926a833",
                            "techStack": null,
                            "name": "da23s",
                            "country": null,
                            "duration": null,
                            "status": null,
                            "timestamp": null,
                            "mentor": {
                                "_id": "62b9e498984b466d1dcbaac7",
                                "timestamp": null,
                                "country": null,
                                "name": "das",
                                "techStack": null,
                                "workDuration": null,
                                "salary": null,
                                "level": null
                            }
                        },
                        "proxy": null
                    },
                    {
                        "_id": "62bfda40cbe7cd60b910ffb7",
                        "name": "123",
                        "level": null,
                        "salary": null,
                        "techStack": null,
                        "timeStamp": null,
                        "workDuration": null,
                        "project": null,
                        "proxy": null
                    }
                ]
            },
        };

        tester.setFixture(fixture);
        const query = `
      query getUsers {
    getUsers{
        _id
        name, level, salary, techStack,timeStamp, workDuration
        project {
            _id
            techStack,name,country,duration,status,timestamp,
            mentor {
                _id, timestamp,country,name,techStack,workDuration,salary,level
            }
        }, proxy {
            _id
            name,country,timestamp,bank,currency {
                _id, name,code
            }
        }
    }
}

    `;


        const {data, errors} = tester.mock({
          query,
            fixture,

        });

        const {getUsers} = data
        expect(getUsers).toBeInstanceOf(Array)
        expect(getUsers).toHaveLength(4)
        expect(getUsers[0].name).toBe("1234")
        expect(getUsers[0].project.name).toBe("123")
        expect(getUsers[0].project.duration).toBe(null)
        expect(getUsers[2].project.name).toBe("da23s")
        expect(getUsers[2].project.mentor.name).toBe("das")
    });

})