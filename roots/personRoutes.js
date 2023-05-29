const express = require("express");
const router = express.Router();
const person = require("../models/personschema");
//adding new person
router.post("/newPerson", (req, res) => {
  let newPerson = new person(req.body);
  newPerson.save((err, data) => {
    if (err) throw err;
    else res.send(data);
  });
});
//adding many persons in the same time
const Person = require("../models/personschema");
router.post("/newPersons", (req, res) => {
  Person.create(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});
//finding all persons having a given name
router.get("/namesPersons/:name", (req, res) => {
  Person.find({ name: req.params.name })
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});
//finding just one person using name
router.get("/namePerson/:name", (req, res) => {
  Person.findOne({ name: req.params.name })
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});
//finding person using id
router.get("/idPerson/:id", (req, res) => {
  Person.findById(req.params.id, req.body)
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});
//updating person using id
router.put("/updatePerson/:id", (req, res) => {
  Person.findByIdAndUpdate(req.params.id, req.body)
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});
//removing person using id
router.delete("/deletePerson/:id", (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});
//removing person using name
router.delete("/deleteNamePerson/:name", (req, res) => {
  Person.remove({ name: req.params.name })
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});
//finding,limiting,sorting and hiding age (persons who likes burritos)
router.get("/searchByFood", (req, res) => {
  Person.find({ favoriteFoods: "burritos" })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err) {
        console.log(err);
        res.json({ msg: "error" });
      } else {
        res.json(data);
      }
    });
});

module.exports = router;

