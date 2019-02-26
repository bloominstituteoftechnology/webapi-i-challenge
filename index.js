// implement your API here
const express = require("express");
const cors = require("cors");
const websocket = require("websocket");

const server = express();
server.use(express.json());
server.use(cors());
const port = 8000;

const userRoutes = require("./routes/users");
//all routes in userRoutes will be prefixed with `/api/users`
server.use("/api/users", userRoutes);

//query string notes
server.get("/hobbits", (req, res) => {
  // query string parameters get added to req.query
  console.log(req.query); //localhost:8000/hobbits?sortby=name {sortby:name}
  const sortField = req.query.sortby || "id";
  const hobbits = [
    {
      id: 1,
      name: "Samwise Gamgee"
    },
    {
      id: 2,
      name: "Frodo Baggins"
    }
  ];

  // apply the sorting
  const response = hobbits.sort((a, b) =>
    a[sortField] < b[sortField] ? -1 : 1
  );

  res.status(200).json(response);
});

server.listen(port, () => {
  console.log(`starting server on ${port}`);
});
