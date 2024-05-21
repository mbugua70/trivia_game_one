const WorkOutModel = require("../models/workOut");
const mongoose = require("mongoose");


// handling errors
// const  handleErrors = (err)=> {
//   let errors = {title: '', reps: '', load:''}
// }
// controllers functions

// workOut all
module.exports.workOut_get_all = async (req, res) => {
  const user_id = req.user._id;
  //   res.json({ msg: "Get all the workouts" });
  try {
    const allWorkOut = await WorkOutModel.find({ user_id });
    console.log(allWorkOut);
    if (allWorkOut.length === 0) {
      return res
        .status(200)
        .json({ success: true, msg: "You have no workout record available" });
    }
    return res.status(200).json({ success: true, allWorkOut });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports.single_get_workOut = async (req, res) => {
  //   res.json({ msg: "Get Single workout" });
  try {
    const paramsID = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(paramsID)) {
      return res.status(404).json({ error: "No such workout" });
    }
    const SingleWorkOut = await WorkOutModel.findById(paramsID);
    // console.log(SingleWorkOut);
    if (!SingleWorkOut) {
      return res.status(400).json({ error: "No such workout" });
    }
    res.status(200).json({ success: true, SingleWorkOut });
    // if(SingleWorkOut)
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports.workOut_post = async (req, res) => {
  //   res.json({ msg: "Post new workout" });
  const { title, reps, load } = req.body;

  const user_id = req.user._id;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }

  if (!reps) {
    emptyFields.push("reps");
  }

  if (!load) {
    emptyFields.push("load");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const createWorkOut = await WorkOutModel.create({
      title,
      reps,
      load,
      user_id,
    });
    res.status(201).json({ success: true, createWorkOut });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports.workOut_delete = async (req, res) => {
  //   res.json({ msg: "Delete workout" });
  try {
    const paramsID = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(paramsID)) {
      return res.status(404).json({ error: "No such workout" });
    }
    const deleteResult = await WorkOutModel.findByIdAndDelete({
      _id: paramsID,
    });
    console.log(deleteResult);
    if (!deleteResult) {
      return res.status(400).json({ error: "No such workout" });
    }
    res.status(200).json({
      success: true,
      deleteResult
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({error: err.message})
  }
};

module.exports.workOut_update = async (req, res) => {
  //   res.json({ msg: "Update workout" });

  try {
    const paramsID = req.params.id;
    const updatedValue = req.body;
    if (!mongoose.Types.ObjectId.isValid(paramsID)) {
      return res.status(404).json({ error: "No such workout" });
    }
    const updatedWork = await WorkOutModel.findByIdAndUpdate(
      paramsID,
      updatedValue,
      { new: true }
    );

    if (!updatedWork) {
      return res.status(404).json({ error: "No such workout" });
    }

    console.log(updatedWork);
    res.status(200).json({ success: true, updatedWork });
  } catch (err) {
    console.log(err);
    res.status(400).json({error: err.message})
  }
};
