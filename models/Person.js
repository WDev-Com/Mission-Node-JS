const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "wanager"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
  username: {
    required: true,
    type: String,
  },
  password: {
    require: true,
    type: String,
  },
});

// Pre-save hook for hashing the password before saving it
personSchema.pre("save", async function (next) {
  const person = this;
  if (!person.isModified("password")) {
    return next();
  }
  try {
    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    person.password = await bcrypt.hash(person.password, salt);
    next();
  } catch (err) {
    return next(err);
  }
});

// Method to compare the provided password with the stored hashed password
personSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    throw err;
  }
};

const Person = mongoose.model("Person", personSchema);
module.exports = Person;
