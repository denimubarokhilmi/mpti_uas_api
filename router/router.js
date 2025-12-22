import exxpress from 'express';
import loginController from '../controller/login.controller.js';
const router = exxpress.Router();

// login route
router.post('/login', loginController.loginControllers);

export {
    router
};
