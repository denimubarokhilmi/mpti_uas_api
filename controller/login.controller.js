import loginService from "../service/login.service.js";

const loginControllers =async (req, res) => {
    try {
        const result = await loginService.loginServices(req.body);
        res.status(200).json({
            message:"succesfully",
            data : result
        })
        
    } catch (error) {
        return res.status(400).json({
            message :"error",
            error: error.message
        })
    }

};


export default { loginControllers };