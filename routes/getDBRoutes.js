const express = require("express");
const mongoose = require("mongoose");
const getDBRoutes = express.Router();
const Equipment = mongoose.model("HelperEquipment");
const Driver = mongoose.model("Helper");
const checkSession = require("../middleware/authMiddleware");

getDBRoutes.get("/api/get-drivers", async (req, res) => {
  try {
    const foundDrivers = await Driver.find().exec();
    if (foundDrivers) {
      res.status(200).json(foundDrivers);
    }
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

// getting equipment information
getDBRoutes.get("/api/get-equipment", checkSession, async (req, res) => {
    try {
      const equipment = await Equipment.find().exec();
  
      const equipmentWithDriver = await Promise.all(
        equipment.map(async (item) => {
          const findDriver = await Driver.findById(item.equipmentOwner).exec();
          return { ...item.toObject(), driver: findDriver };
        })
      );
  
      res.status(200).json({ equipmentWithDriver });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
module.exports = getDBRoutes;
