import React from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";

const AppointmentForm = (props) => {
  const { appointment, onEdit } = props;

  const handleOnEdit = (field, value) => {
    onEdit(field, value);
  }

  return (
    <Row>
      <Col>
        <Form.Group className="mb-3" controlId="patientName">
          <Form.Label>Patient Name</Form.Label>
          <Form.Control
            type="text"
            value={appointment.patientName}
            onChange={(e) => handleOnEdit('patientName', e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="patientNic">
          <Form.Label>Patient NIC</Form.Label>
          <Form.Control 
            type="text"
            value={appointment.patientNic}
            onChange={(e) => handleOnEdit('patientNic', e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="patientAge">
          <Form.Label>Patient Age</Form.Label>
          <Form.Control 
            type="numberd"
            value={appointment.patientAge}
            onChange={(e) => handleOnEdit('patientAge', e.target.value)}

          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="patientTelephone">
          <Form.Label>Patient Telephone</Form.Label>
          <Form.Control 
            type="text"
            value={appointment.patientTelephone}
            onChange={(e) => handleOnEdit('patientTelephone', e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="patientAddress">
          <Form.Label>Patient Address</Form.Label>
          <Form.Control 
            type="text"
            value={appointment.patientAddress}
            onChange={(e) => handleOnEdit('patientAddress', e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="date">
          <Form.Label>Appointment Date</Form.Label>
          <DatePicker 
            id="date" 
            className="form-control"
            value={appointment.date.split('T')[0]} 
            dateFormat={"yyyy-MM-dd"}
            onChange={(date) => {
              const formattedDate = [
                date.getFullYear(),
                ('0' + (date.getMonth() + 1)).slice(-2),
                ('0' + date.getDate()).slice(-2)
              ].join('-');
              handleOnEdit('date', formattedDate);
            }}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="doctorName">
          <Form.Label>Doctor</Form.Label>
          <Form.Control 
            type="text"
            value={appointment.doctorName}
            onChange={(e) => handleOnEdit('doctorName', e.target.value)}
          />
        </Form.Group>
      </Col>
    </Row>
  )
};

export default AppointmentForm;