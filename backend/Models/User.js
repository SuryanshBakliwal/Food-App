const { default: mongoose } = require("mongoose");
const db = require('../db')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});


userSchema.pre('save', async function(){
  let salt = await bcrypt.genSalt();
  let hashedPass = await bcrypt.hash(this.password, salt);
  console.log(hashedPass);
  this.password = hashedPass;
})

let userModel = mongoose.model("user", userSchema);
module.exports = userModel;
