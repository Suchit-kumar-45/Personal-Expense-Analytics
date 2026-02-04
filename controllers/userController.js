const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

// ================= REGISTER =================
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // save user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

// ================= LOGIN =================
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Error in Login API",
      error,
    });
  }
};

module.exports = {
  registerController,
  loginController,
};
