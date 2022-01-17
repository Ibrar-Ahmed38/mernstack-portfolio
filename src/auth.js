const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
require("./Db/Conn");
const User = require("./Db/models/user");
const bcrypt = require("bcryptjs");

router.get("", (req, res) => {
  res.send("This is a authentication");
});

router.post("/register", async (req, res) => {
  const { name, email, phone, password } = req.body;
  console.log("body", req.body);

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ error: "Please fill your form correctly" });
  }

  try {
    let token;
    const useExist = await User.findOne({ email: email });

    if (useExist) {
      res.status(400).json({ message: "Already Email Login" });
    }

    const user = new User({ name, email, phone, password });
    console.log("user data", req.body);
    await user.save();
    res.status(201).json({ message: "user registered sucessfully" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    console.log("emaill", req.body);
    if (!email || !password) {
      res.json({ error: "Please Fill Both" });
    }

    const userLogin = await User.findOne({ email: email });
    console.log("userlogin", userLogin);

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      const token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.json({ error: "Invalid Password" });
      } else {
        res.status(200).json({ message: "user is loggin " });
      }
    } 
  } catch (err) {
    res.status(400).json({ error: "maslo aahy" });
  }
});

module.exports = router;
