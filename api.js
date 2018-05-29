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
        server.get('/api/users', (req, res) => {
            db
            .find()
            .then(users => {
                res.json({ users });
            })
                .catch(error => {
                    res.json({ error });
                });
        });
        
// ('/api/users', (req, res) => {
//     db.find().then(users => {
//         res.json({ users });
//     })
    // findById
    endpoints.findById = ({ id }) =>  
        server.get(`${resourceURL}/${id}`, (req, res)=> {
            const { id } = req.params;
            const { name, age, height } = req.body;
            db
            .findById(id)
            .then(users =>{
                res.json({ id: Number(id) });
        })
                .catch(error => {
                    res.json({ error });
            });
        });
        
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

server.get('/api/users', (req, res) => {
    db
    .find()
    .then(users => {
        res.json({ users });
    })
        .catch(error => {
            res.json({ error });
        });
});

server.get('/api/users', (req, res)=> {
    db
    .findById(id)
    .then(users =>{
        res.json({ id: Number(id) });
})
        .catch(error => {
            res.json({ error });
    });
});


server.get('/smurfs', (req, res) => {
    res.json(smurfs);
  });
  let smurfId = 1;
  
  server.post('/smurfs', (req, res) => {
    const { name, age, height } = req.body;
    const newSmurf = { name, age, height, id: smurfId };
    if (!name || !age || !height) {
      return sendUserError(
        'Ya gone did smurfed! Name/Age/Height are all required to create a smurf in the smurf DB.',
        res
      );
    }
    const findSmurfByName = smurf => {
      return smurf.name === name;
    };
    if (smurfs.find(findSmurfByName)) {
      return sendUserError(
        `Ya gone did smurfed! ${name} already exists in the smurf DB.`,
        res
      );
    }
  
    smurfs.push(newSmurf);
    smurfId++;
    res.json(smurfs);
  });
  
  server.put('/smurfs/:id', (req, res) => {
    const { id } = req.params;
    const { name, age, height } = req.body;
    const findSmurfById = smurf => {
      return smurf.id == id;
    };
    const foundSmurf = smurfs.find(findSmurfById);
    if (!foundSmurf) {
      return sendUserError('No Smurf found by that ID', res);
    } else {
      if (name) foundSmurf.name = name;
      if (age) foundSmurf.age = age;
      if (height) foundSmurf.height = height;
      res.json(smurfs);
    }
  });
  
  server.delete('/smurfs/:id', (req, res) => {
    const { id } = req.params;
    const foundSmurf = smurfs.find(smurf => smurf.id == id);
  
    if (foundSmurf) {
      const SmurfRemoved = { ...foundSmurf };
      smurfs = smurfs.filter(smurf => smurf.id != id);
      res.status(200).json(smurfs);
    } else {
      sendUserError('No smurf by that ID exists in the smurf DB', res);
    }
  });
  
  server.listen(port, err => {
    if (err) console.log(err);
    console.log(`server is listening on port ${port}`);
  });
  