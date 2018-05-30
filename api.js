const server = require('./server');
const db = require('./data/db');


//This is my API file, I have it separated from the server.js file so that I can keep my code cleaner and simplify my calls.


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
    this.endpoints[user.id] = this.createBasicCRUDEndpoints(user)
    }

    createUsers(users) {
    users.forEach(this.createUser.bind(this))
    }

    //Create the basic endpoints handlers for CRUD operations
    // @param {A user Object} user

    createBasicCRUDEndpoints( {id} ) {
    var endpoints = {}

    const resourceURL = `${this.url}/${id}`
        
    // find (all)
    endpoints.find = ({ query }={}) => 
        server.get(resourceURL, (req, res) => {
            db
            .find()
            .then(users => {
                res.json({ users });
            })
            .catch(error => {
                res.json({ error });
            });
        });

    // findById
    endpoints.findById = ({ id }) =>  
        server.get(`${resourceURL}/${id}`, (req, res)=> {
            const { id } = req.params;
            const { name, bio } = req.body;
            db
            .findById({ id })
            .then(users =>{
                res.json({ users:id });
        })
                .catch(error => {
                    res.json({ error });
            });
        });

    // insert
    endpoints.insert = (toInsert) => 
        console.log("Something!")    
    server.post(resourceURL, ( req, res )  => {
            const { name, bio } = req.body;
        db
            .insert({ name, bio })
            .then(response => {
            res.json(response);
            })
            .catch(error => {
            console.log(error)
                res.json(error);
        });
    });

    // update
    endpoints.update = (toUpdate) => 
        server.put(`${resourceURL}/${update.id}`, ( req, res) =>{
            const { id } = req.params;
            const { name, bio } = req.body;
            const selectedUserForUpdate = user =>{
                return 
                db
                .findById({ id }) == id;
        };
        if (!selectedUserForUpdate) {
            return sendUserError('No user to edit!'. res);
            } else {
                if (name) selectedUserForUpdate.name = name;
                if (bio) selectedUserForUpdate.bio = bio;
                res.json(users);
            }
        })

    // remove
    endpoints.remove = ({ id }) => 
        server.delete(`${resourceURL}/${id}`, ( req, res ) => {
            const { id } = req.params;
            const { name, bio } = req.body;
            const selectedUserforRemoval = user =>{
                return 
                db
                .findById({ id }) == id;
        };
        
        if (selectedUserforRemoval) {
            const userRemoved = { ...selectedUserforRemoval };
            users = users.filter(user => users.id != id);
            res.status(200).json(users);
            } else {
                sendUserError("No user matches that ID to delete! You probably ran them off already...", res);
            }
        })
        
        
        
return endpoints

}}

module.exports = API