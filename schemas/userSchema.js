import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: false,
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true,
    // unique: true,
  },
});
userSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 10);
});
userSchema.post("save", function () {
  console.log("this", this);
});

userSchema.methods.checkPasswordAndReturnUser = function (password) {
  const isCorrect = bcrypt.compareSync(password, this.password);
  if (isCorrect) {
    const { password, ...rest } = this.toObject();
    return rest;
  } else return null;
};

export default mongoose.model("usermodel", userSchema);
