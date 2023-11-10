require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const emailSubcription = express.Router()
const {v4: uuidv4} = require("uuid")
const EmailSubcription = mongoose.model("SubscribeEmail")

  
  emailSubcription.post("/api/subscribe", async (req, res) => {
    try {
      const { email } = req.body;

      const alreadyExist = await EmailSubcription.findOne({email})

      if(alreadyExist) 
        return res.send({message: "Email already subscribed"})

      const newEmail = new EmailSubcription({
        subscribeID: uuidv4(),
        email: email,
      });
      await newEmail.save()
      res.status(200).json({ message: 'You have successfully subscribed.' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send email' });
    }
  });

  function isValidEmail(mail) {
    return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(mail)
  }

module.exports = emailSubcription;