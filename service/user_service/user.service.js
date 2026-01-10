import { dbs_example } from "../../example_database/initialization_dbs_example.js";
const borrowed_items_service = async (req, payload) => {
  try {
    const result = await dbs_example.user.borrowing_items(req, payload);
    return result;
  } catch (error) {
    throw error.message;
  }
};

const cancel_item_loan_service = async (req, payload) => {
  try {
    const result = await dbs_example.user.cancel_item_loan(req, payload);
    return result;
  } catch (error) {
    throw error.message;
  }
};

export default {
  borrowed_items_service,
  cancel_item_loan_service,
};
