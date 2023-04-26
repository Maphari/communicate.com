import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  clientID: String,
  ProfilePicture: String,
  name: String,
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email is already taken"],
    lowecase: true,
    validate: {
      validator: function (email) {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return emailRegex.test(email);
      },
      message: "Please provide a valid email address",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters"],
    validate: {
      validator: function (password) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
      },
      message: "Please enter a valid password",
    },
  },
});

// Hash the password before saving it to the database
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const hashed = await bcrypt.hash(this.password, 10);
    this.password = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});

mongoose.model("user", userSchema);
