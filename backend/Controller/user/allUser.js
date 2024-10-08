const userModel = require("../../models/userModel");

const allUser = async (req, res) => {
  try {
    console.log("userId", req.userId);

    const allUsers = await userModel.find();

    res.json({
      message: "All User",
      data: allUsers,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = allUser;
