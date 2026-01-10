import { dbs_example } from "../../example_database/initialization_dbs_example.js";

const admin_update_password_service = async (req, payload) => {
  try {
    const result = await dbs_example.admin.updateAdminPassword(req, payload);
    return result;
  } catch (error) {
    throw error.message;
  }
};

const get_user_service = async () => {
  return await dbs_example.admin.getUsers();
};

const create_user_service = async (payload) => {
  try {
    if (!payload.username || !payload.password || !payload.name) {
      throw new Error("Data user tidak lengkap");
    }
    const result = await dbs_example.admin.addUser(payload);
    return result;
  } catch (error) {
    throw error.message;
  }
};

const update_user_service = async (payload) => {
  try {
    const result = await dbs_example.admin.updateUser(payload);
    return result;
  } catch (error) {
    throw error.message;
  }
};

const delete_user_service = async (payload) => {
  try {
    const result = await dbs_example.admin.deleteUser(payload);
    return result;
  } catch (error) {
    throw error.message;
  }
};

const get_officer_service = async () => {
  try {
    return await dbs_example.admin.getOfficers();
  } catch (error) {
    throw error.message;
  }
};

const create_officer_service = async (payload) => {
  try {
    return await dbs_example.admin.addOfficer(payload);
  } catch (error) {
    throw error.message;
  }
};

const update_officer_service = async (payload) => {
  try {
    return await dbs_example.admin.updateOfficer(payload);
  } catch (error) {
    throw error.message;
  }
};

const delete_officer_service = async (payload) => {
  try {
    return await dbs_example.admin.deleteOfficer(payload);
  } catch (error) {
    throw error.message;
  }
};

const get_room_service = async () => {
  try {
    const inventory = await dbs_example.admin.getInventory();
    return inventory.room;
  } catch (error) {
    throw error.message;
  }
};

const create_room_service = async (payload) => {
  try {
    return dbs_example.admin.addRoom(payload);
  } catch (error) {
    throw error.message;
  }
};

const update_room_service = async (payload) => {
  try {
    return await dbs_example.admin.updateRoom(payload);
  } catch (error) {
    throw error.message;
  }
};

const delete_room_service = async (payload) => {
  try {
    return await dbs_example.admin.deleteRoom(payload);
  } catch (error) {
    throw error.message;
  }
};

const get_facility_service = async () => {
  const inventory = await dbs_example.admin.getInventory();
  return inventory.facility;
};

const create_facility_service = async (payload) => {
  try {
    return await dbs_example.admin.addFacility(payload);
  } catch (error) {
    throw error.message;
  }
};

const update_facility_service = async (payload) => {
  try {
    return await dbs_example.admin.updateFacility(payload);
  } catch (error) {
    throw error.message;
  }
};

const delete_facility_service = async (payload) => {
  try {
    return await dbs_example.admin.deleteFacility(payload);
  } catch (error) {
    throw error.message;
  }
};

export default {
  admin_update_password_service,

  get_user_service,
  create_user_service,
  update_user_service,
  delete_user_service,

  get_officer_service,
  create_officer_service,
  update_officer_service,
  delete_officer_service,

  get_room_service,
  create_room_service,
  update_room_service,
  delete_room_service,

  get_facility_service,
  create_facility_service,
  update_facility_service,
  delete_facility_service,
};
