const Filling = require("../models/fillingModel");
const asyncHandler = require("express-async-handler");

const getFillings = asyncHandler(async (req, res) => {
  const fillings = await Filling.find();
  res.json(fillings);
});

const CreateFilling = asyncHandler(async (req, res) => {
  const {
    nic,
    cost,
    fillingMaterial,
    fillingType,
    anestheticStatus,
    date,
    checkup,
    procedure,
    remark,
  } = req.body;

  if (
    !nic ||
    !cost ||
    !fillingMaterial ||
    !fillingType ||
    !anestheticStatus ||
    !date ||
    !checkup ||
    !procedure ||
    !remark
  ) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
  } else {
    const filling = new Filling({
      nic,
      cost,
      fillingMaterial,
      fillingType,
      anestheticStatus,
      date,
      checkup,
      procedure,
      remark,
    });

    const createdFilling = await filling.save();

    res.status(201).json(createdFilling);
  }
});

const getFillingtById = asyncHandler(async (req, res) => {
  const filling = await Filling.findById(req.params.id);

  if (filling) {
    res.json(filling);
  } else {
    res.status(404).json({ message: "Filling not found" });
  }
});

const UpdateFilling = asyncHandler(async (req, res) => {
  const {
    nic,
    cost,
    fillingMaterial,
    fillingType,
    anestheticStatus,
    date,
    checkup,
    procedure,
    remark,
  } = req.body;

  const filling = await Filling.findById(req.params.id);

  if (filling) {
    filling.nic = nic;
    filling.cost = cost;
    filling.fillingMaterial = fillingMaterial;
    filling.fillingType = fillingType;
    filling.anestheticStatus = anestheticStatus;
    filling.date = date;
    filling.checkup = checkup;
    filling.procedure = procedure;
    filling.remark = remark;

    const updatedFilling = await filling.save();
    res.json(updatedFilling);
  } else {
    res.status(404);
    throw new Error("Filling not found");
  }
});

const DeleteFilling = asyncHandler(async (req, res) => {
  const filling = await Filling.findById(req.params.id);

  if (filling) {
    await filling.remove();
    res.json({ message: "Filling Removed" });
  } else {
    res.status(404);
    throw new Error("Filling not Found");
  }
});

module.exports = {
  getFillings,
  CreateFilling,
  getFillingtById,
  UpdateFilling,
  DeleteFilling,
};
