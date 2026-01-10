import exxpress from "express";
import loginController from "../controller/login.controller.js";
import userController from "../controller/users/user.controller.js";
import officerController from "../controller/officers/officer.controller.js";
import adminController from "../controller/admin/admin.controller.js";
import { authMiddleware } from "../middleware/auth.js";
const router = exxpress.Router();

// login route
router.post("/login", loginController.loginControllers);

router.use(authMiddleware);

// user routes
router
  .route("/borrowed_items")
  .post(userController.borrowed_items_controller)
  .delete(userController.cancel_item_loan_controller);

// officer routes
router.put(
  "/officer/borrowed_items_receive",
  officerController.officer_borrowed_items_controller_receive
);
router.put(
  "/officer/borrowed_items_rejected",
  officerController.officer_borrowed_items_controller_rejected
);

//admin routes
router.put(
  "/admin/profile/password",
  adminController.admin_update_password_controller
);

// CRUD user routes
router
  .route("/admin/users")
  .get(adminController.get_user_controller)
  .post(adminController.create_user_controller)
  .put(adminController.update_user_controller)
  .delete(adminController.delete_user_controller);

// CRUD officer routes
router
  .route("/admin/officers")
  .get(adminController.get_officer_controller)
  .post(adminController.create_officer_controller)
  .put(adminController.update_officer_controller)
  .delete(adminController.delete_officer_controller);

// CRUD invenroy room routes
router
  .route("/admin/inventory/room")
  .get(adminController.get_room_controller)
  .post(adminController.create_room_controller)
  .put(adminController.update_room_controller)
  .delete(adminController.delete_room_controller);

// CRUD inventory facility routes
router
  .route("/admin/inventory/facility")
  .get(adminController.get_facility_controller)
  .post(adminController.create_facility_controller)
  .put(adminController.update_facility_controller)
  .delete(adminController.delete_facility_controller);

export { router };
