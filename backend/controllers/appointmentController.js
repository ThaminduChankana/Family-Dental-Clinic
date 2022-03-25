const AppointmentModel = require('../models/appointmentModel');

const makeAppointment = async (req, res, next) => {
  try {
    const {
      patientName,
      patientNic,
      patientAddress,
      patientTelephone,
      patientAge,
      doctorName,
      date,
      appointmentNo
    } = req.body;
    
    const createdAppointment = await AppointmentModel.create({
      patientName,
      patientNic,
      patientAddress,
      patientTelephone,
      patientAge,
      doctorName,
      date,
      appointmentNo
    });  
  
    return res.status(200).json(createdAppointment);
  } catch(err) {
    return res.status(500).send({
      error: 'Create appointment failed'
    });
  }
};

const updateAppointment = async (req, res, next) => {
  try {
    const appointmentId = req.params.id;
    const {
      patientName,
      patientNic,
      patientAddress,
      patientTelephone,
      patientAge,
      doctorName,
      date,
      appointmentNo
    } = req.body;

    await AppointmentModel.findByIdAndUpdate(appointmentId, {
      patientName,
      patientNic,
      patientAddress,
      patientTelephone,
      patientAge,
      doctorName,
      date,
      appointmentNo
    });

    const result = await AppointmentModel.findById(appointmentId);
    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({
      error: 'Update appointment failed'
    });
  }
};

const deleteAppointment = async (req, res, next) => {
  try {
    const appointmentId = req.params.id;
    await AppointmentModel.findByIdAndDelete(appointmentId);
    return res.status(200).send();
  }catch (err) {
    return res.status(500).send({
      error: 'Delete appointment failed'
    });
  }
};

const getAppointmentsByDate = async (req, res, next) => {
  try {
    const date = req.query.date;
    const appointments = await AppointmentModel.find({ date });
    return res.status(200).send({ appointments });
  } catch (err) {
    return res.status(500).send({
      error: 'Get appointments failed'
    });
  }
};

module.exports = {
  makeAppointment,
  getAppointmentsByDate,
  deleteAppointment,
  updateAppointment
};
