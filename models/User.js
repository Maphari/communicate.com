import mongoose from "mongoose";
const { Schema } = mongoose;
import bcrypt from "bcrypt";

const userSchema = new Schema({
  clientID: String,
  name: String,
  profilePicture: String,
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "Email already taken"],
    lowecase: true,
    validate: {
      validator: (email) => {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
      },
      message: "Please enter a valid email address",
    },
  },
  password: {
    type: String,
    validate: {
      validator: (password) => {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(
          password
        );
      },
      message:
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    },
  },
});

userSchema.pre("save", function (next) {
  const user = this;
  // only hash the password if it has been modified or is new
  if (!user.isModified("password")) return next();
  // generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});
mongoose.model("user", userSchema);
