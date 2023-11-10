const mongoose = require("mongoose")
const {Schema} = mongoose;

const subscribeEmailSchema = new Schema({
    subscribeID: String,
    email: {
        type: String,
        // unique: [true, "Email already subscribed"],
        validate: {
            validator: (email) => {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
            }, 
            message: "Please provide a valid email address"
        }
    }
}, {timestamps: true})

mongoose.model("SubscribeEmail", subscribeEmailSchema)