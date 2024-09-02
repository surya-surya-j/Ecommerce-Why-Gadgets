const userModel = require("../../models/userModel");

const updateUser = async (req, res) => {
  try {
    const sessionId = req.userId;
    console.log(sessionId);

    const { userId, name, email, role } = req.body;

    const payload = await {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    };

    const user = await userModel.findById(sessionId);

    console.log(user, "use");

    const updateUser = await userModel.findByIdAndUpdate(userId, payload);

    res.json({
      data: updateUser,
      message: "user Updated",
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

module.exports = updateUser;
