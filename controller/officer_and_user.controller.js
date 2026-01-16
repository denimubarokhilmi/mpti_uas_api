import officer_and_userService from "../service/officer_and_user.service.js";
const get_officer_and_user_controller = async (req, res) => {
  try {
    const result = await officer_and_userService.get_officer_and_user_service();
    res.status(200).json({ result });
  } catch (error) {
    return res.status(400).json({
      message: "error",
      error,
    });
  }
};
export default { get_officer_and_user_controller };
