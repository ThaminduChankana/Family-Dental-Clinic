import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
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
  date: '',
  appointmentNo: 2
};

const EditAppointmentView = () => {
  const [ appointment, setAppointment ] = useState(initialState);
  const [ loading, setLoading ] = useState(false);
  const history = useHistory();

  const fetchAppointment = async (id) => {
    const appointment = await appointmentService.getAppointmentById(id);
    if (appointment) {
      setAppointment(appointment);
    }
    setLoading(false);
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id');
    setLoading(true);
    fetchAppointment(id);
  }, []);
  const handleOnEdit = (field, value) => {
    setAppointment((prevState) => ({
      ...prevState,
      [field]: value
    }));
  }

  const handleOnSubmit = async () => {
    try {
      setLoading(true);
      await appointmentService.editAppointment(appointment._id, appointment);
    } finally {
      setLoading(false);
      history.goBack();
    }
  }

  const handleOnCancel = () => {
    history.goBack();
  }

  return (
    <Col>
      <Row>
        <Col>
          <div className='d-flex'>
            <h3>Edit Appointment</h3>
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
            onClick={handleOnSubmit} 
            className="me-2"
            disabled={loading}
            >
            Save
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
};

export default EditAppointmentView;