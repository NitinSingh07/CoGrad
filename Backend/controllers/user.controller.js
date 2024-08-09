import User from "../models/user.model.js"; // Adjust the path as needed

const getUserProfile = async (req, res) => {
  console.log(req.user, "user");
  const _id = req.user.id;
  // console.log("User", user);
  const user = await User.findById(_id);
  console.log("User", user);
  return res
    .status(200)
    .json({message:"new user",user:user});
};

export default getUserProfile;
