const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  patientNic: {
    type: String,
    required: true
  },
  patientAddress: {
    type: String,
    required: true
  },
  patientTelephone: {
    type: String,
    required: true
  },
  patientAge: {
    type: String,
    required: true
  },
  doctorName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  appointmentNo: {
    type: Number,
    required: true
  }
},
{
  timestamps: true
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
