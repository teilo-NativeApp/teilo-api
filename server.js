// IMPORTS ------------------------------------------
import express from 'express';
import cors from 'cors';
import './db-connect.js';

import usersRouter from "./routes/usersRouter.js";
import groupsRouter from "./routes/groupsRouter.js";
import eventsRouter from "./routes/eventsRouter.js";
import tasksRouter from "./routes/tasksRouter.js";
// --------------------------------------------------


// SETUPS -------------------------------------------
const app = express();
// --------------------------------------------------


// MIDDLEWARE ---------------------------------------
app.use(express.json());

app.use(cors({ origin: "http://localhost:19006", credentials: true }));
// --------------------------------------------------


// ROUTES -------------------------------------------
app.get("/", (req, res) => {
  res.send("<h1>FlatMates API</h1>");
});

app.use("/users", usersRouter);

app.use("/groups", groupsRouter);

app.use("/events", eventsRouter);

app.use("/tasks", tasksRouter);
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