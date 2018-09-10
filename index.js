// import your node modules
const express = require("express"); //CommonJS modules

const path = require("path");

const server = express();

const userRoutes = require("./users/userRoutes.js"); //<====== this changed
const configMiddleware = require("./config/middleware.js");

//configure middleware for ther server
configMiddleware(server);

server.get("/download", (req, res, next) => {
  const filePath = path.join(__dirname, "index.html");
  res.sendFile(filePath, (err) => {
    // if there is an error the callback function will get an error as it's first argument
    if (err) {
      // we could handle the error here or pass it down to error-handling middleware like so:
      next(err); // call the next error-handling middleware in the queue
    } else {
      console.log("File sent successfully");
    }
  });
});

server.get("/", (req, res) => {
  res.send("Hello FSW12");
});

server.use("/api", userRoutes);

server.use(errorHandler);

//start the server
server.listen(9000, () => console.log("\n== API on port 9k ==\n"));

function errorHandler(err, req, res, next) {
  console.error(err);

  switch (err.statusCode) {
    case 404:
      res.status(404).json({
        message: "There was an error performing the required operation"
      });

      break;

    default:
      res.status(500).json({
        message: "There was an error performing the required operation"
      });

      break;
  }
}
