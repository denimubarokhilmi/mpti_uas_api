import userService from "../../service/user_service/user.service.js";
import { dbs_example } from "../../example_database/initialization_dbs_example.js";
const borrowed_items_controller = async (req, res) => {
  try {
    const result = await userService.borrowed_items_service(req, req.body);
    return res.status(200).json({
      result,
    });
  } catch (error) {
    return res.status(401).json({
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
      error,
    });
  }
};

const get_item_loan_controller = async (req, res) => {
  try {
    const result = await dbs_example.user.get_borrowed_items();
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

export default {
  borrowed_items_controller,
  cancel_item_loan_controller,
  get_item_loan_controller,
};
