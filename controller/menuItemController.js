const MenuItem = require("../models/Menu");
const mongoose = require("mongoose");
exports.createMenu = async (req, res) => {
  try {
    let data = req.body;
    let newMenuItem = new MenuItem(data);
    let savedMenuItem = await newMenuItem.save();
    console.log("Line No 8 Menu Item Saved Successfully");
    res.status(200).json(savedMenuItem);
  } catch (err) {
    console.log("Line No 11 Error : ", err);
    res.status(500).json({ error: "Inernal Server Error" });
  }
};

exports.getMenu = async (req, res) => {
  try {
    let data = await MenuItem.find();
    console.log("Line No 19 Menu Data Fetch Sucessfully");
    res.status(200).json(data);
  } catch (err) {
    console.log("Line No 22 Error : ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateMenuItem = async (req, res) => {
  try {
    let updateData = req.body;
    let menuItemID = req.params.id;
    console.log(updateData);
    console.log(menuItemID);
    if (!mongoose.Types.ObjectId.isValid(menuItemID)) {
      console.log("Line No 32: Invalid ObjectId");
      return res.status(400).json({ error: "Invalid Menu Item ID" });
    }
    let updatedMenuItem = await MenuItem.findByIdAndUpdate(
      menuItemID,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedMenuItem) {
      console.log("Line No 44 Menu Item Not Found");
      res.status(404).json({ error: "Menu Item Not Found" });
    }
    console.log("Line No 47 Menu Item Updated Successfully");
    res.status(200).json(updatedMenuItem);
  } catch (err) {
    console.log("Line No 50 Error : ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteMenuItem = async (req, res) => {
  try {
    let menuItemID = req.params.id;
    let deletedMenuItem = await MenuItem.findByIdAndDelete({ _id: menuItemID });
    console.log("Line No 59 Delete Operation Successful");
    res.status(200).json(deletedMenuItem);
  } catch (err) {
    console.log("Line No 62 Error : ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
