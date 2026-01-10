import userService from "../../service/user_service/user.service.js";

const borrowed_items_controller = async (req, res) => {
  try {
    const result = await userService.borrowed_items_service(req, req.body);
    return res.status(200).json({
      result,
    });
  } catch (error) {
    return res.status(401).json({
      message: "error",
      error,
    });
  }
};

const cancel_item_loan_controller = async (req, res) => {
  try {
    const result = await userService.cancel_item_loan_service(req, req.body);
    return res.status(200).json({
      result,
    });
  } catch (error) {
    return res.status(401).json({
      message: "error",
      error,
    });
  }
};

export default {
  borrowed_items_controller,
  cancel_item_loan_controller,
};
