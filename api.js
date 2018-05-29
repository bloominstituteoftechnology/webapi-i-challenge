const server = require('./server');
const db = require('./data/db');
// Named methods on db.js

// find,
// findById,
// insert,
// update,
// remove.




class API {

    constructor({ url }){
    this.url = "/api/users"
    this.endpoints = {}
    }

    // Create and store a single entity's endpoints
    //@param {A user Object} user

    createUser(user) {
    this.endpoints[user.name] = this.createBasicCRUDEndpoints(user)
    }

    createUsers(arrayOfUser) {
    arrayOfUser.forEach(this.createUser.bind(this))
    }

    //Create the basic endpoints handlers for CRUD operations
    // @param {A user Object} user

    createBasicCRUDEndpoints( {id} ) {
    var endpoints = {}

    const resourceURL = `${this.url}/${name}`

    // find
    endpoints.find = ({ query }={}) => 
        server.get(resourceURL, (req, res) => {
            db.find().then(users => {
                res.json({ users })
            })
        })
// ('/api/users', (req, res) => {
//     db.find().then(users => {
//         res.json({ users });
//     })
    // findById
    endpoints.findById = ({ id }) =>  
        server.get(`${resourceURL}/${id}`, ( req, res )=>{res.json('')})

    // insert
    endpoints.insert = (toInsert) =>  
        server.post(resourceURL, toInsert)

    // update
    endpoints.update = (toUpdate) => 
        server.put(`${resourceURL}/${update.id}`, toUpdate)

    // remove
    endpoints.remove = ({ id }) => 
        server.delete(`${resourceURL}/${id}`)

    return endpoints

    }

}

module.exports ={ API }


// server.get('/', ()=> {
//     //1st arg: route where a resource can be interacted with
//     //2nd arg: callback to deal with sending responses, and handling incoming
//     res.send('Hello from express.');
// })

// server.get('/api/users', (req, res) => {
//     db.find().then(users => {
//         res.json({ users });
//     })
//         .catch(error => {
//             res.json({ error });
//         });
// });
