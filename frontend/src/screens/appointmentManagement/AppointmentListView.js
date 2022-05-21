import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Table, Spinner } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import {confirm} from 'react-bootstrap-confirmation';
import appointmentService from "../../services/appointmentService";
import { useDispatch, useSelector } from "react-redux";

const AppointmentListView = () => {
  const { 
    appointments: appointmentList, 
    isLoading,
  } = useSelector((state) => state.appointments);
  const dispatch = useDispatch();
  const [filteredList, setFilteredList] = useState([]);
  const history = useHistory();

  const fetchAppointments = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const date = queryParams.get('date');
    dispatch(appointmentService.getAppointments(date));
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    setFilteredList(appointmentList);
  }, [appointmentList]);

  const handleOnDeleteAppointment = async (appointmentId) => {
    const result = await confirm('Are you really want to delete appointment?');
    console.log(result)
    if (result) {
      await appointmentService.deleteAppointment(appointmentId);
      fetchAppointments();
    }
  }

  const handleOnMakeAppointment = () => {
    history.push('/appointments/new');
  }

  const handleOnEditAppointment = (appointmentId) => {
    history.push(`/appointments/edit?id=${appointmentId}`);
  }

  const handleOnSearch = (nic) => {
    const filteredList = appointmentList.filter(({patientNic}) => patientNic.includes(nic));
    setFilteredList(filteredList);
  }

  return (
    <Col>
      <Row>
        <Col lg={8}>
            <Form.Control 
              type="text" 
              placeholder="1xxx" 
              size="sm"
              onChange={(e) => handleOnSearch(e.target.value)}
              />
        </Col>
        <Col lg={4} className='d-flex justify-content-end'>
          <div>
            <Button onClick={handleOnMakeAppointment}>
              Make Appointment
            </Button>
          </div>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col>
        { isLoading && 
              <div className="w-100 d-flex justify-content-center">
                <Spinner animation="border" role="status" size={'md'}/>
                </div>
                }
          { !isLoading &&
            <Table striped bordered hover>
            <thead>
              <tr>
                <td>Appointment No</td>
                <td>Name</td>
                <td>NIC Number</td>
                <td>Age</td>
                <td>Telephone No</td>
                <td>Address</td>
                <td></td>
              </tr>
            </thead>
            
            <tbody>
              { 
                filteredList.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{appointment.appointmentNo}</td>
                    <td>{appointment.patientName}</td>
                    <td>{appointment.patientNic}</td>
                    <td>{appointment.patientAge}</td>
                    <td>{appointment.patientTelephone}</td>
                    <td>{appointment.patientAddress}</td>
                    <td>
                      <div className="d-flex justify-content-end">
                        <Button 
                          className="me-2"
                          onClick={() => handleOnEditAppointment(appointment._id)}
                          >Edit
                        </Button>
                        <Button 
                          variant="danger"
                          onClick={() => handleOnDeleteAppointment(appointment._id)}
                        >Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>

          }
        </Col>
      </Row>
    </Col>
  );
}

export default AppointmentListView;