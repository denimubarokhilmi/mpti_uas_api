import loginService from "../service/login.service.js";

const loginControllers = async (req, res) => {
  try {
    const result = await loginService.loginServices(req.body);
    res.status(200).json({ result });
  } catch (error) {
    return res.status(400).json({
      message: "error",
      error,
    });
  }
};

export default { loginControllers };
