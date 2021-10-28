// IMPORTS ------------------------------------------
import express from 'express';
import './db-connect.js';
// --------------------------------------------------


// SETUPS -------------------------------------------
const app = express();
// --------------------------------------------------


// MIDDLEWARE ---------------------------------------
app.use(express.json());
// --------------------------------------------------


// ROUTES -------------------------------------------
app.get("/", (req, res) => {
  res.send("<h1>FlatMates API");
});
// --------------------------------------------------


const port = 7;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});


// ERROR HANDLER ------------------------------------
app.use(
  function errorHandler (err, req, res, next) {
    res.status(err.status || 400)
    .send({
      error: {
        message: err.message,
        status: err.status
      }
    })
  }
);
// --------------------------------------------------