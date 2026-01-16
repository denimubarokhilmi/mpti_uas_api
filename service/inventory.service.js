import { dbs_example } from "../example_database/initialization_dbs_example.js";
const get_inventory_service = async () => {
  try {
    const inventory = await dbs_example.find_inventorys();
    return inventory;
  } catch (error) {
    throw error.message;
  }
};

export default { get_inventory_service };
