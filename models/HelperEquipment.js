const mongoose = require("mongoose");
const { Schema } = mongoose;

const helperEquipmentSchema = new Schema(
  {
    equipmentID: String,
    equipmentOwner: {
      type: Schema.Types.ObjectId,
      ref: "Helper",
      unique: true,
    },
    carType: {
      type: String,
    },
    plateNumber: {
      type: String,
    },
    carColor: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);

mongoose.model("HelperEquipment", helperEquipmentSchema);
