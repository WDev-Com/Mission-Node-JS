const Person = require("../models/Person");
const mongoose = require("mongoose");
exports.createPerson = async (req, res) => {
  try {
    let data = req.body;

    //create new person
    const newPerson = new Person(data);

    // save the new person document to database
    let savedPerson = await newPerson.save();
    console.log("Line No 13 Data Saved");
    res.status(200).send(savedPerson);
  } catch (err) {
    console.log("Line No 16 Error : ", err);
    res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
  }
};

exports.getPerson = async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Line No 24 Data fetch succesfully");
    res.status(200).json(data);
  } catch (err) {
    console.log("Line No 27 Error : ", err);
    res.status(404).send("Data Not Found");
  }
};

exports.deletePerson = async (req, res) => {
  try {
    let id = req.params.id;
    let removedPerson = await Person.findByIdAndDelete({ _id: id });
    console.log("Line No 34 Delete Operation Successful");
    res.status(200).json(removedPerson);
  } catch (err) {
    console.log("Line No 37  Error : ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updatePerson = async (req, res) => {
  try {
    let personId = req.params.id;
    let updateData = req.body;
    if (!mongoose.Types.ObjectId.isValid(personId)) {
      console.log("Line No 53: Invalid ObjectId");
      return res.status(400).json({ error: "Invalid Person ID" });
    }
    let updatedPerson = await Person.findByIdAndUpdate(personId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedPerson) {
      console.log("Line No 53  Person not found");
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("Line No 56  Person Data Updated Successfully");
    res.status(200).json(updatedPerson);
  } catch (err) {
    console.log("Line No 59  Error : ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
