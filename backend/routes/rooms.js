const express = require("express");
const router = express.Router();
const Room = require("../models/room.js");

module.exports = router;


/* 
-REST: Treat all server urls as endpoints
-Server protects the database

Status codes: 
201: succesfully created an object
500: Backends fault
400: Bad request 

- MVC: Model view controller.
Controller - Middleman between model and view -> asks for information based on request. 
Model - Handles data logic, interacts with database. Controller -> Model -> Datalogic
View - How to present the information the controller sends it, renders html. View -> Controller -> Back to user. 
Mode & View should not interact, only through the controller.
Controller - JS, Model - SQL, View - HTML
 */

//Getting all subscribers
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//Getting One

router.get("/:id", getRoom, (req, res) => {
  res.json(res.room);
});

//Creating One
router.post("/", async (req, res) => {

  const room = new Room({
    host: req.body.host,
    key: req.body.key,
    genre: req.body.genre,
  });
 
  try {
    const newRoom = await room.save();
    res.status(201).json(newRoom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Updating One



async function getRoom(req, res, next) {
  let room;
  try {
    room = await Room.findById(req.params.id);
    if (room == null) {
      return res.status(404).json({ message: "Cannot find room" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.room = room;
  next();
}

module.exports = router;
