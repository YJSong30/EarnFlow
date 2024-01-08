const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const usersSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, sparse: true },
  password: { type: String, required: true }
});

//static signup method
usersSchema.statics.signup = async function(email, password) {

  // validation

  if (!email || !password) {
    throw Error('All fields must be filled');
  }

  if (!validator.isEmail(email)){
    throw Error('Email is not valid');
  }

  if (!validator.isStrongPassword(password)){
    throw Error('Password should contain at least one upper case letter, one lower case letter, and one number');
  }

  const exists = await this.findOne({ email })

  if (exists){
    throw Error("Email already exists")
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: hash }) 

  return user 

}

module.exports = mongoose.model('Users', usersSchema);