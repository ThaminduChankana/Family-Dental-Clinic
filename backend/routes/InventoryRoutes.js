const express = require("express");

const {
    getInventory,
    CreateInventory,
    getInventoryById,
    UpdateInventory,
    DeleteInventory,
} = require("../controllers/InventoryController");
const router = express.Router();

router.route("/get").get(getInventory);
router.route("/create").post(CreateInventory);
router.route("/get/:id").get(getInventoryById).put(UpdateInventory).delete(DeleteInventory);

module.exports = router;