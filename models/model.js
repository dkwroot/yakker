const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  bio: {
    type: String,
    require: false
  },
  picture: {
    type: String,
    require: false
  },
  comments: {
    type: Array,
    require: false
  }
});

UserSchema.pre("save", async function(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

const UserModel = mongoose.model("yakkers", UserSchema);

module.exports = UserModel;
