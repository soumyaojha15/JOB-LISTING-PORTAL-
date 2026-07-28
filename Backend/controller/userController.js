import UserModel from "../Model/userModel.js";

export const getUserData = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user)
      return res.status(404).json({success: false, message: "User not found" });

    return res.status(200).json({
      success: true,
      userData: {
        name: user.username,
        email: user.email,
        isAccountVerified: user.isAccountVerified,
        userType: user.userType
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, message: "Server error" });
  }
};
