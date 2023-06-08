const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const helperSchema = new Schema(
  {
    clientID: String,
    available: { type: Boolean, default: true },
    location: {
      type: {
        type: String,
        enum: ["Point"], // Specify the GeoJSON type
      },
      coordinates: {
        type: [Number], // Array of [longitude, latitude]
      },
    },
    username: {
      type: String,
      minLength: [3, "more than 3 characters required"],
      required: [true, "  username is required"],
      unique: [true, " username is already taken"],
      lowecase: true,
      validate: {
        validator: (newUsername) => {
          return /^(?!.*[-_]{2})[a-zA-Z0-9][a-zA-Z0-9_-]{1,18}[a-zA-Z0-9]$/.test(
            newUsername
          );
        },
        message: "Please enter a valid username",
      },
    },

    email: {
      type: String,
      required: [true, " email is required"],
      unique: [true, " email is already taken"],
      lowecase: true,
      validate: {
        validator: (newEmail) => {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(newEmail);
        },
        message: "Please enter a valid email address",
      },
    },
    mobile: {
      type: String,
      unique: [true, "Phone number is already taken"],
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
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      validate: {
        validator: (newPassword) => {
          return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(
            newPassword
          );
        },
        message:
          "Password must be at least 8 characters long, one uppercase letter, and one lowercase letter and special characters",
      },
    },
  },
  { timestamps: true }
);

// Middleware function hash the password before saving before saving
helperSchema.pre("save", function (next) {
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

mongoose.model("Helper", helperSchema);
