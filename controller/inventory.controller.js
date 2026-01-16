import inventoryService from "../service/inventory.service.js";

const get_inventory_controller = async (req, res) => {
  try {
    const result = await inventoryService.get_inventory_service();
    res.status(200).json({ result });
  } catch (error) {
    return res.status(400).json({
      message: "error",
      error,
    });
  }
};

export default { get_inventory_controller };
