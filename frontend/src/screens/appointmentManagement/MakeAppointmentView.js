import React, { useState } from 'react';
import { Col, Row, Button, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import appointmentService from '../../services/appointmentService';
import AppointmentForm from './AppointmentForm';

const initialState = {
  patientName: '',
  patientNic: '',
  patientAddress: '',
  patientTelephone: '',
  patientAge: '',
  doctorName: '',
  date: ''
};

const MakeAppointmentView = () => {
  const [ appointment, setAppointment ] = useState(initialState);
  const [ loading, setLoading ] = useState(false);
  const history = useHistory();

  const handleOnEdit = (field, value) => {
    setAppointment((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleOnSubmit = async () => {
    try {
      setLoading(true);
      await appointmentService.makeAppointment(appointment);
    } finally {
      setLoading(false);
    }
  };

  const handleOnCancel = () => {

  return (
    <Col>
      <Row>
        <Col>
          <div>
            <h3>Make an Appointment</h3>
            {loading && <Spinner className="ms-3" animation="border" role="status" size={'md'}/>}
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={8}>
          <AppointmentForm
            onEdit={handleOnEdit}
            appointment={appointment}
          />
        </Col>
      </Row>
      <Row>
        <div>
          <Button 
            disabled={loading}
            onClick={handleOnSubmit}
            className="me-2">
            Submit
          </Button>
          <Button 
            variant="secondary"
            onClick={handleOnCancel}>
            Cancel
          </Button>
        </div>
      </Row>
    </Col>
  );
}

export default MakeAppointmentView;