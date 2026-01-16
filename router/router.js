import exxpress from "express";
import loginController from "../controller/login.controller.js";
import userController from "../controller/users/user.controller.js";
import officerController from "../controller/officers/officer.controller.js";
import adminController from "../controller/admin/admin.controller.js";
import { authMiddleware } from "../middleware/auth.js";
import inventoryController from "../controller/inventory.controller.js";
import officer_and_userController from "../controller/officer_and_user.controller.js";
import { dbs_example } from "../example_database/initialization_dbs_example.js";
import { upload } from "../middleware/upload.js";
const router = exxpress.Router();

// login route
router.post("/login", loginController.loginControllers);

router.use(authMiddleware);

router.get("/inventory", inventoryController.get_inventory_controller);
router.get(
  "/users_and_officer",
  officer_and_userController.get_officer_and_user_controller
);

// user routes
router
  .route("/borrowed_items")
  .post(userController.borrowed_items_controller)
  .delete(userController.cancel_item_loan_controller)
  .get(userController.get_item_loan_controller);

router.get("/users", async (req, res) => {
  try {
    const result = await dbs_example.user.find_user(req.user.username);
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
});

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
router.put("/admin/profile", adminController.admin_update_password_controller);

router.get("/admin", async (req, res) => {
  try {
    const result = await dbs_example.admin.find_admin(req.user.username);
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

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
  .post(
    upload.fields([{ name: "image", maxCount: 1 }]),
    adminController.create_room_controller
  )
  .put(
    upload.fields([{ name: "image", maxCount: 1 }]),
    adminController.update_room_controller
  )
  .delete(adminController.delete_room_controller);

// CRUD inventory facility routes
router
  .route("/admin/inventory/facility")
  .get(adminController.get_facility_controller)
  .post(
    upload.fields([{ name: "image", maxCount: 1 }]),
    adminController.create_facility_controller
  )
  .put(
    upload.fields([{ name: "image", maxCount: 1 }]),
    adminController.update_facility_controller
  )
  .delete(adminController.delete_facility_controller);

export { router };
