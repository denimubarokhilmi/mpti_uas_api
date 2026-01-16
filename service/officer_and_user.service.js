import { dbs_example } from "../example_database/initialization_dbs_example.js";

const get_officer_and_user_service = async () => {
  try {
    const result = await dbs_example.find_user_and_officer();
    return result;
  } catch (error) {
    throw error.message;
  }
};
export default { get_officer_and_user_service };
