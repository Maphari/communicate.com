const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    clientID: String,
    username: {
      type: String,
      required: [true, "username is required"],
      minlength: [4, "username must be at least 4 characters"],
    },
    profilePicture: String,
    state: { type: String, default: "user" },
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
    mobile: {
      type: String,
      required: [true, "Phone number is required"],
      validate: {
        validator: (newPhoneNumber) => {
          return /^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,3}[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,4}$/.test(
            newPhoneNumber
          );
        },
        message: "Please provide a valid phone Number",
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
  },
  { timestamps: true }
);

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
