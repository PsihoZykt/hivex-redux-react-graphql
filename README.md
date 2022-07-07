# GraphQL Server

## Steps to run the application

```
   npm install
   npm start

   Open a browser and go to http://localhost:8080/graphql
```

## Tech Stack Used

- `ExpressJS`
- `GraphQL`
- `NodeJS`
- `MongoDB`
- `Apollo Server`
Available entities: 
- currency 
- mentor
- project
- proxy
- request
- user

Available commands:


? means optional


- hivex get-fields -values currencies? | mentors? | projects? | proxies? | requests? | users?

  (example: hivex -get-fields -values mentors | projects)

- hivex get-[entities] -values [field] -f? [filter] | [field2] -f [filter2]

  (example: hivex get-users -values name -f 1 | project.name) 

- hivex add-[entity] -values [field]=[value] | ...

  (example: hivex add-user -values name=1)

- hivex delete-[entities] -values [field] -f [filter] | ...

  (example: hivex delete-projects -values _id -f 123)

- hivex update-[entities] -values [field] -f [filter] | ... -set [field]=[updatedValue]

  (example: hivex update-currencies -values name-f 1 | -set code=1)
