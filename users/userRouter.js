const express = require('express');

const db = require('../data/db.js');

const router = express.Router();


// handles routes that start with: /api/users


router.get('/', (req, res) => { // GET ALL DATA
    db
    .find() //get the data
    .then(users => {  //send the data
        res.json(users);
    })
    .catch(error => {   // send error if one
        // handle error
        res.status(500).json(error);
    });

});

router.get('/orders',(req, res) => {
    res.send('These are all the orders of all the users')
});

router.get('/:id', (req, res) => { // GET DATA BY ID
    const { id } = req.params;

    db
    .findById(id) //get a data's id
    .then(users => {  //send the data for that id
        res.json(users[0]);
    })
    .catch(error => {   // send error if one
        // handle error
        res.status(500).json(error);
    });

});

router.get('/:id/orders', (req, res) => { // GET ORDER DATA OF ID
    res.send(`These are the orders for user with id:${req.params.id}`)
});

//-----------------------------------------------------------------

router.post('/', (req, res) => {   // INSERT DATA
    const user = req.body
    db
    .insert(user) //insert object 
    .then(response => {  //
        res.status(201).json(response) //newly created user document
    })
    .catch(error => {   // send error if one
        // handle error
        res.status(500).json({error: "Error while saving user to database"});
    });

});

router.delete('/:id', (req, res) => { // DELETE DATA
    const { id } = req.params;
    let user;
    
    db.findById(id)
        .then( response => { // respond with deleted object
            user ={ ...response[0] }; //copies deleted object (response) to return

        db
        .remove(id) // delete object of specific id
        .then(response => {  //response
            res.status(200).json(user);
        })
        .catch(error => {   // send error if one
            // handle error
            res.status(500).json(error);
        });
    })
    .catch(error => { // send error if one
        res.status(500).json(error);
    })

});

router.put('/:id', (req, res) => { // UPDATE DATA
    const { id } = req.params;
    const update = req.body;

    let user;
    
    db.update(id, update)
      .then( count => { 
        
        if (count > 0) {
            //newly updated obj
            db.findById(id).then(updatedUser => {
                res.status(200).json(updatedUser[0])
            })
        } else {
            res.status(404).json({message: 'User with that Id does not exsist'})
        }
        
        })
        .catch(error => { // send error if one
        res.status(500).json(error);
        })

});

module.exports = router;