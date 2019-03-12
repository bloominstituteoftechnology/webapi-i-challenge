
## introduce node.js and Express.
 #what is node.js, what can it do? what can’t it do?
 node is what enables js to be developed outside of the browser and larger program languages such as c++ Jave Python ect.
 Some of the advantages of using node.js is the ability to use it on server side and removes the requirements of swithchin between front end and back end programming. Node is far more efficient in its lack of complexity and its adaptability.

 In addition, Node.js runs Asynchronous allowing for more robust programs on the end users proccessor side. Npm modules are available to implement repetitive task enabling developers to focus on more complex tasks. 


 # what is Express? why use it?
 # relationship between Express and node.js.


# see a high level overview of the main features of Express.
#learn how to manually test our Web API using a tool called Postman.services.
#create our first CRUD Web API.

## At the end of this module, you should be able to:
   #explain what Node.js is and it's core features.
    node is what enables js to be developed outside of the browser and larger program languages such as c++ Jave Python ect.
 Some of the advantages of using node.js is the ability to use it on server side and removes the requirements of swithchin between front end and back end programming. Node is far more efficient in its lack of complexity and its adaptability.

 In addition, Node.js runs Asynchronous allowing for more robust programs on the end users proccessor side. Npm modules are available to implement repetitive task enabling developers to focus on more complex tasks. 

 # disadvantages
It run Javascript on the server and can be difficult and rescource intesive to us different tools that are not js enabled
Javascript is single threaded and cannot implement or tale advantage of multiple threads on the server.

Developers whom are not js savvy or compatible may be challenged by its asycrhounous flow where most languages readily available require a syncrouhnous style developnent,

having the vast amounts of available npm registies security vulnerabilities could arise and understanding dependencies to the inexperieced devaloper could be cumbersome. 


#useage

Node can be developed inside the terminal. with this you use the console object of the terminal rather than the window object of the browser. Both are javascript objects. There are several features not available on the terminal object such as Alert() and several others. 

# a simple server with Node

sub objectives 

use Node's http module diminish the need for complex network operations. 

write a single request handler function that will handle all request. 

The request handlers receives request of action from the client and responds 

The handler takes in two arguments an object for requisition and an object and one representing a responce.

// server? What is a server?
// The server is a place on a computer that is listening for traffic and when it receives that traffic it knows what to do with said traffic

// server? What is a server?
// The server is a place on a computer that is listening for traffic and when it receives that traffic it knows what to do with said traffic

const http = require ('http');
// this in es6 can be an import statement but in order to remain compatible we are using the require syntax.

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res)=>{
  res.statusCode = 200;
  res.setHeader("Content-Type",'text/plain');
  res.end('Hello World, from NodeJS')

})

server.listen (port, hostname, () => {
  console.log(`server listening on http://${hostname}:${port}`);
});

// req will be the request object that comes to the server and res will be its response

   #explain what Express is and it's core features.
Express is a JS framework that sits on top of Nodejs Web Server and on top of the raw http module provided by the Node.js.

Its essentially like react is with js on front end except it applies to the back end.

Adds functionalities similarily to dependencies in react such as eloquent API, Middleware support and Routing.

It allows developers to implement actions that would have typically required massive amounts of code in trivial unoppinionated packages. 

Express functionality includes 

serving single page application, building Restful web services that is functional with JSON ( majority of what will be covered here at lambda involves implementation of this key feature). 

Serves static content such as files pdfs Html among other things.

Express is used to implement real-time functionalities in applications with technologies and dependencies such as Web Sockets and WebRTC. 

# Some key functionalities and uses of Express

They are functions that get request and responses and can perform operations on them through multiple functions like a stack or array. An example is authentication before responding to request with priviledged data. Middleware can but is not required to change request and response based upon criteria. 

Routing is a way to select a request based upon the http method and url used by the request. This gives developers the ability to compartmentalize an application by terms of routers. For example one route could handle authentication and another data (SPA and API )

# Express Convenience Helpers 

These are features that come ready to implement and are extention methods added to the request and response objects.
some of helpers found in these objects ar methods such as response.redirect(), response.status(), response.send(),request.ip.

# express Views 

Express can provide ways to dynamically render HTML on the server using different languages that render to the users request. 

# 3rd video notes 
Agenda 

Add Express to a node.js App
Use Express to create a web Api
Add endpoints that can respond to get request
Return json and correct http status codes

Api is a server software that provides endpoints that can be used by clients to manage resources.

an endpoints are the contacts wich make communication possible. In web applications the url is the reference to the location of data on a server. 

resources are the things application care about such as users products orders clients and returns




   #create an API that can respond to GET requests.

// The '/' slash in the get request is the root of out api 
// This function is often refferred to and understood as the request handler function and can be in es6 arrow or plain function format
 as noted earlier the first paramatar is a request object that is being passed in.


server.get('/', (req, res) =>{
res.send('Hello world from express!');
});

 functionality can be verified by going to the port in the computers browser for example port 5000 can be viewed by entering http://localhost:5000/

 when dependencies or yarn add express is implemented several assets are added one of which is 
  "server": "nodemon index.js" this allows for saves to be updated realtime rather than stopping and restarting the server. 


   #use postman to manually test Web APIs.
Postman is a client that can be used as a tool to test api's
It is a flexible gui that gives developers the abilities to test api's in ways a developing app may not be able too.


# Building RESTful APIs with Node.js and Express Mini
// implement your API here
const express = require ('express');
// this is the equivilant in importing a package similar to react. 
const server = express();
// by calling express and assigning it to server it creates a server that is powered by express.



## Topics

- Building a RESTful API.


- Performing CRUD operations.
- Writing API endpoints.

## Assignment

Use Node.js and Express to build an API that performs CRUD operations on users.

### Download Project Files and Install Dependencies

- **Fork** and **Clone** this repository.
- **CD into the folder** where you cloned the repository.
- Type `yarn` or `npm install` to download all dependencies listed inside `package.json`.

### Database access

Database access will be done using the `db.js` file included inside the `data` folder. This file publishes the following methods:

- `find()`: calling find returns a promise that resolves to an array of all the users contained in the database.
- `findById()`: this method expects an `id` as it's only parameter and returns the user corresponding to the `id` provided or an empty array if no user with that `id` is found.
- `insert()`: calling insert passing it a user object will add it to the database and return an object with the `id` of the inserted user. The object looks like this: `{ id: 123 }`.
- `update()`: accepts two arguments, the first is the `id` of the user to update and the second is an object with the `changes` to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.
- `remove()`: the remove method accepts an `id` as it's first parameter and upon successfully deleting the user from the database it returns the number of records deleted.

Now that we have a way to add, update, remove and retrieve data from the provided database, it is time to work on the API.

### Start the API and Implement Requirements

- To start the server, type `yarn server` or `npm run server` from the root folder (where the _package.json_ file is). The server is configured to restart automatically as you make changes.
- Add the code necessary to implement the API requirements.
- **Test the API using _Postman_ as you work through the exercises.**

### User Schema

Users in the database conform to the following object structure:

```js
{
  name: "Jane Doe", // String, required
  bio: "Not Tarzan's Wife, another Jane",  // String
  created_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
  updated_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
}
```

### Write endpoints to perform the following queries.

Inside `index.js` add the code necessary to implement the following _endpoints_:

| Method | URL            | Description                                                                                                                       |
| ------ | -------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| POST   | /api/users     | Creates a user using the information sent inside the `request body`.                                                              |
| GET    | /api/users     | Returns an array of all the user objects contained in the database.                                                               |
| GET    | /api/users/:id | Returns the user object with the specified `id`.                                                                                  |
| DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.                                                            |
| PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**. |

#### Endpoint Specifications

When the client makes a `POST` request to `/api/users`:

- If the request body is missing the `name` or `bio` property:

  - cancel the request.
  - respond with HTTP status code `400` (Bad Request).
  - return the following JSON response: `{ errorMessage: "Please provide name and bio for the user." }`.

- If the information about the _user_ is valid:

  - save the new _user_ the the database.
  - return HTTP status code `201` (Created).
  - return the newly created _user document_.

- If there's an error while saving the _user_:
  - cancel the request.
  - respond with HTTP status code `500` (Server Error).
  - return the following JSON object: `{ error: "There was an error while saving the user to the database" }`.

When the client makes a `GET` request to `/api/users`:

- If there's an error in retrieving the _users_ from the database:
  - cancel the request.
  - respond with HTTP status code `500`.
  - return the following JSON object: `{ error: "The users information could not be retrieved." }`.

When the client makes a `GET` request to `/api/users/:id`:

- If the _user_ with the specified `id` is not found:

  - return HTTP status code `404` (Not Found).
  - return the following JSON object: `{ message: "The user with the specified ID does not exist." }`.

- If there's an error in retrieving the _user_ from the database:
  - cancel the request.
  - respond with HTTP status code `500`.
  - return the following JSON object: `{ error: "The user information could not be retrieved." }`.

When the client makes a `DELETE` request to `/api/users/:id`:

- If the _user_ with the specified `id` is not found:

  - return HTTP status code `404` (Not Found).
  - return the following JSON object: `{ message: "The user with the specified ID does not exist." }`.

- If there's an error in removing the _user_ from the database:
  - cancel the request.
  - respond with HTTP status code `500`.
  - return the following JSON object: `{ error: "The user could not be removed" }`.

When the client makes a `PUT` request to `/api/users/:id`:

- If the _user_ with the specified `id` is not found:

  - return HTTP status code `404` (Not Found).
  - return the following JSON object: `{ message: "The user with the specified ID does not exist." }`.

- If the request body is missing the `name` or `bio` property:

  - cancel the request.
  - respond with HTTP status code `400` (Bad Request).
  - return the following JSON response: `{ errorMessage: "Please provide name and bio for the user." }`.

- If there's an error when updating the _user_:

  - cancel the request.
  - respond with HTTP status code `500`.
  - return the following JSON object: `{ error: "The user information could not be modified." }`.

- If the user is found and the new information is valid:

  - update the user document in the database using the new information sent in the `reques body`.
  - return HTTP status code `200` (OK).
  - return the newly updated _user document_.

## Stretch Problems

To work on the stretch problems you'll need to enable the `cors` middleware. Follow these steps:

- add the `cors` npm module: `yarn add cors` or `npm i cors`.
- add `server.use(cors())` after `server.use(express.json())`.

Create a new React application and connect it to your server:

- the React application can be anywhere, but, for this project create it inside the folder for the solution.
- connect to the `/api/users` endpoint in the API and show the list of users.
- add a delete button to each displayed user that will remove it from the server.
- add forms to add and update data.
- Style the list of users however you see fit.
