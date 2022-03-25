const { Router } = require('express');
const { makeAppointment, 
  updateAppointment, 
  getAppointmentsByDate, 
  deleteAppointment } = require('../controllers/appointmentController');

const routes = Router();

routes.get('/', getAppointmentsByDate);

routes.post('/', makeAppointment);

routes.put('/:id', updateAppointment);

routes.delete('/:id', deleteAppointment);

module.exports = routes;