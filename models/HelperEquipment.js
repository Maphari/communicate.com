const mongoose = require("mongoose");
const { Schema } = mongoose;

const helperEquipmentSchema = new Schema(
  {
    equipmentID: String,
    equipmentOwner: {
      type: Schema.Types.ObjectId,
      ref: "Helper",
    },
    carType: {
      type: String,
      required: [true, "Car model is required"],
    },
    plateNumber: {
      type: String,
      unique: [true, "Number plate has already been registered"],
      required: [true, "Number plate is required"],
    },
    carColor: {
      type: String,
      required: [true, "Car color is required"],
    },
    vihicleType: {
      type: String,
      required: [true, "vihicle Type is required"],
    },
  },
  { timestamps: true }
);

mongoose.model("HelperEquipment", helperEquipmentSchema);
