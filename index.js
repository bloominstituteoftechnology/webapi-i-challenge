// implement your API here
const  db  = require("./data/db")

const express= require("express");
const port =8000;
const parser=express.json()
const server=express();
//parses body and add it to req object
server.use(parser);
server.get("/api/users",(req,res)=>{
    console.log("Users " + db.find())
    db.find()
    .then((user) => {
            console.log("User -> ",user)
            res.json(user);
        }
    ).catch(err => {
        res.status(500).json({error: "The users information could not be retrieved." });
    }) 
})
server.post("/api/users",(req,res)=>{
       const user=req.body;
       if(user.name && user.bio){
           res.status(201).json(user);
        }else{
            res.status(400).json({errorMessage:"Please provide name and bio for the user."  })
            return;
        }   
            db.insert(user)
            .then(user=>{
                 console.log("The new user",user);
                 res.status(201).json(user);
           })
        
        
      
       .catch(error=>{
           res.status(500).json({error: "There was an error while saving the user to the database" })

       })


})

server.delete("/api/users/:id",(req,res)=>{
       const id= req.params.id;
       db.remove(id)
       .then(user=>{
            if(user){
               console.log("deleted id is",user)
               res.json(user)
            }else{
               res.status(404).json({message: "The user with the specified ID does not exist." })
            }
        })

        .catch(error=>{
         res.status(500).json({message: "The server can't delete the api."})


        })
})
server.put("/api/users/:id",(req,res)=>{
    console.log("-------------------------------");
    console.log(req.params)
    console.log("-------------------------------");
      const {id}=req.params;
      const updateUser=req.body;
      if(!id){

         res.status(404).json({message: "The user with the specified ID does not exist." })
      }
       if(updateUser.name && updateUser.bio){
        res.status(201).json(updateUser);
       }else{
         res.status(400).json({errorMessage:"Please provide name and bio for the user."  })
      return;   
      }   
      db.update(id,updateUser)
      .then(updated=>{
        res.status(201).json(updated);
    })

    .catch(error=>{
     res.status(500).json({ error: "The user information could not be modified."})


    })
})
    server.get("/api/users/:id",(req,res)=>{
           const id= req.params.id;
           db.findById(id)
           .then(user=>{
                if(user){
                   res.json(user);

                }else{
                res.status(404).json({message: "The user with the specified ID does not exist."})
                }

           })

           .catch(error=>{
            res.status(500).json({ error: "The user information could not be retrieved."})
       
           })

   })    



server.listen(port,()=>{

    console.log(`server listening on port ${port}`)

})