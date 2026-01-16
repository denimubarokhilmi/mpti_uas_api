import adminService from "../../service/admin_service/admin.service.js";

const admin_update_password_controller = async (req, res) => {
  try {
    const result = await adminService.admin_update_password_service(
      req,
      req.body
    );
    return res.status(200).json({
      result,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

// CRUD user controller
const get_user_controller = async (req, res) => {
  try {
    const result = await adminService.get_user_service();
    return res.status(200).json({
      result,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

const create_user_controller = async (req, res) => {
  try {
    const result = await adminService.create_user_service(req.body);
    return res.status(200).json({
      result,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

const update_user_controller = async (req, res) => {
  try {
    const result = await adminService.update_user_service(req, req.body);
    return res.status(200).json({
      result,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

const delete_user_controller = async (req, res) => {
  try {
    const result = await adminService.delete_user_service(req.body);
    return res.status(200).json({
      result,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

// CRUD officer controller

const get_officer_controller = async (req, res) => {
  try {
    const result = await adminService.get_officer_service();
    return res.status(200).json({
      result,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

const create_officer_controller = async (req, res) => {
  try {
    const result = await adminService.create_officer_service(req.body);
    return res.status(200).json({
      result,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};
const update_officer_controller = async (req, res) => {
  try {
    const result = await adminService.update_officer_service(req, req.body);
    return res.status(200).json({
      result,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

const delete_officer_controller = async (req, res) => {
  try {
    const result = await adminService.delete_officer_service(req.body);
    return res.status(200).json({
      result,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

// CRUD inventory room
const get_room_controller = async (req, res) => {
  try {
    const result = await adminService.get_room_service();
    return res.status(200).json({
      result,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};
const create_room_controller = async (req, res) => {
  try {
    const image = req.files.image?.[0]?.filename || null;
    const payload = {
      image,
      ...req.body,
    };
    const result = await adminService.create_room_service(payload);
    return res.status(200).json({
      result,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};
const update_room_controller = async (req, res) => {
  try {
    const image = req.files.image?.[0]?.filename || null;
    const payload = {
      image,
      ...req.body,
    };
    const result = await adminService.update_room_service(payload);
    return res.status(200).json({
      result,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

const delete_room_controller = async (req, res) => {
  try {
    const result = await adminService.delete_room_service(req.body);
    return res.status(200).json({
      result,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

// CRUD inventory facility controller

const get_facility_controller = async (req, res) => {
  try {
    const result = await adminService.get_facility_service();
    return res.status(200).json({
      result,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

const create_facility_controller = async (req, res) => {
  try {
    const image = req.files.image?.[0]?.filename || null;
    const payload = {
      image,
      ...req.body,
    };
    const result = await adminService.create_facility_service(payload);
    return res.status(200).json({
      result,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

const update_facility_controller = async (req, res) => {
  try {
    const image = req.files.image?.[0]?.filename || null;
    const payload = {
      image,
      ...req.body,
    };
    const result = await adminService.update_facility_service(payload);
    return res.status(200).json({
      result,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

const delete_facility_controller = async (req, res) => {
  try {
    const result = await adminService.delete_facility_service(req.body);
    return res.status(200).json({
      result,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};
export default {
  admin_update_password_controller,
  get_user_controller,
  update_user_controller,
  create_user_controller,
  delete_user_controller,
  get_officer_controller,
  create_officer_controller,
  update_officer_controller,
  delete_officer_controller,
  get_room_controller,
  update_room_controller,
  create_room_controller,
  delete_room_controller,
  get_facility_controller,
  create_facility_controller,
  update_facility_controller,
  delete_facility_controller,
};
