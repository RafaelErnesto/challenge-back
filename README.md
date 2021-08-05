# Challenge-back API

I've tried to implement this API with a Clean Architecture design in mind, with the project divided in entities, use cases, controllers, ports and etc.
I've also used TDD :)

Technologies used in this API:
- NodeJs
- MongoDb
- Typescript
- Jest


### Running the project on Docker
This project can run locally using docker/docker-compose,once these tools are installed  you only need to go to the root of the project with your command line and run `docker-compose up -d` and docker-compose will deploy two docker containers, one with a Nodejs server and another with a mongodb server, both will be already connected and ready to use.

### Populating the database with authors

There is a script that is able to read a CSV file called `authors.csv` placed in a `folder` called files at the root of the project, once the api is running, and the CSV file is already on the correct folder you can run from your system's command line `docker ps` to discover the name of the Nodejs container, it will likely be `api-dev`, and then run `docker exec api-dev npm run populate:authors`, the script will run and read the data in the `authors.csv` and save them line by line on the Mongodb database.

### Resources

###### Authors

GET a list of authors:
 Hit the route  with a GET method `/api/author`, optionally you can use a query string name to search for an specific author by its name `/api/author?name=foo`.

###### Books

GET a list of books:

Hit `/api/book` with the optionally filter options `name, edition, publication_year, authors` as query strings `/api/book?name=Foo&edition=2`

POST a new book:

Hit  `/api/book` with the following payload as an example:
>
```json
{ "name":"Foo","edition":1,"publication_year":2010,"authors":["author_id"]}
```

UPDATE a book:

Hit `/api/book/:id` with the book new payload: 
>
```json
{ "name":"Foo Updated","edition":1,"publication_year":2015,"authors":["author_id"]}
```

DELETE a book:

Hit `/api/book/:id` to delete the book with the id passed in the query parameter.


### Tests

This API was tested with Jest and Supertest, its test coverage is shown bellow:

![image](https://user-images.githubusercontent.com/13973149/128277041-cefe1b05-ef61-4834-97b7-602b19b78cae.png)
