import { dbs_example } from "../../example_database/initialization_dbs_example.js";

const officer_borrowed_items_service_receive = async (req, payload) => {
  try {
    const result = dbs_example.officer.receive_borrowed_items(req, payload);
    return result;
  } catch (error) {
    throw error.message;
  }
};

const officer_borrowed_items_service_rejected = async (req, payload) => {
  try {
    const result = await dbs_example.officer.rejected_item_loan(req, payload);
    return result;
  } catch (error) {
    throw error.message;
  }
};

export default {
  officer_borrowed_items_service_receive,
  officer_borrowed_items_service_rejected,
};
