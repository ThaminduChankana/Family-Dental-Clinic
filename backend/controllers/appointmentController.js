const expressAsyncHandler = require("express-async-handler");
const AppointmentModel = require("../models/appointmentModel");

const createAppointment = expressAsyncHandler(async (req, res, next) => {
  const {
    patientName,
    patientNic,
    patientAddress,
    patientTelephone,
    patientAge,
    doctorName,
    date
  } = req.body;

  // fetch last appointment on same day
  const lastAppointment = await AppointmentModel.findOne({ date }).sort([['appointmentNo', 'desc']]);
  // find next appointment no
  const nextAppointmentNo = lastAppointment ? lastAppointment.appointmentNo+1: 1;

  // create appointment
  const createdAppointment = await AppointmentModel.create({
    patientName,
    patientNic,
    patientAddress,
    patientTelephone,
    patientAge,
    doctorName,
    date,
    appointmentNo: nextAppointmentNo
  });  

  return res.status(200).send(createdAppointment);
});

const updateAppointment = expressAsyncHandler(async (req, res, next) => {
  const appointmentId = req.params.id;
  const {
    patientName,
    patientNic,
    patientAddress,
    patientTelephone,
    patientAge,
    doctorName,
    date
  } = req.body;


  await AppointmentModel.findByIdAndUpdate(appointmentId, {
    patientName,
    patientNic,
    patientAddress,
    patientTelephone,
    patientAge,
    doctorName,
    date
  });

  const result = await AppointmentModel.findById(appointmentId);
  return res.status(200).send(result);
});

const deleteAppointment = expressAsyncHandler(async (req, res, next) => {
  const appointmentId = req.params.id
  await AppointmentModel.findByIdAndDelete(appointmentId);
  return res.status(201).send();
});

const getAppointments = expressAsyncHandler(async (req, res, next) => {
  const date = req.query.date;
  const queryObject = { date };

  if (req.patient && req.patient.nic) {
    queryObject.patientNic = req.patient.nic;
  }

  const appointments = await AppointmentModel.find(queryObject);
  return res.status(200).send(appointments);;
});

const getAppointmentById = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const appointment = await AppointmentModel.findById(id);
  return res.status(200).send(appointment);
})

module.exports = {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointments,
  getAppointmentById,
};
