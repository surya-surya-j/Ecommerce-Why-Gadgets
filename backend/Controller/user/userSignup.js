const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

const userSignupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (user) {
      throw new Error("Already User Exists");
    }

    if (!email) {
      throw new Error("Please Provide email");
    }
    if (!name) {
      throw new Error("Please Provide name");
    }
    if (!password) {
      throw new Error("Please Provide password");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Something is Wrong");
    }

    const payload = await {
      ...req.body,
      role: "GENERAL",
      password: hashPassword,
    };

    const userData = new userModel(payload);
    const saveUser = await userData.save();

    res.status(201).json({
      data: saveUser,
      success: true,
      message: "user Created Successfully",
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = userSignupController;
