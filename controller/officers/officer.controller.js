import officerService from "../../service/officer_service/officer.service.js";
const officer_borrowed_items_controller_receive = async (req, res) => {
  try {
    const result = await officerService.officer_borrowed_items_service_receive(
      req,
      req.body
    );
    return res.status(200).json({
      result,
    });
  } catch (error) {
    return res.status(401).json({
      message: "error",
      error,
    });
  }
};

const officer_borrowed_items_controller_rejected = async (req, res) => {
  try {
    const result = await officerService.officer_borrowed_items_service_rejected(
      req,
      req.body
    );
    return res.status(200).json({
      result,
    });
  } catch (error) {
    return res.status(401).json({
      message: "error",
      error,
    });
  }
};

export default {
  officer_borrowed_items_controller_receive,
  officer_borrowed_items_controller_rejected,
};
