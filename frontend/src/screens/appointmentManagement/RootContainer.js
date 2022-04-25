import React from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import AppointmentCalendarView from './AppointmentCalendarView';
import AppointmentListView from './AppointmentListView';
import EditAppointmentView from './EditAppointmentView';
import MakeAppointmentView from './MakeAppointmentView';

const AppointmentRootContainer = () => {
  const history = useHistory();

  const navigateToCalendarView = () => {
    history.push('/appointments/calendar');
  };

  return (
    <Container>
      <Row className='mt-5'>
        <div className="d-flex justify-content-between">
          <h2>Appointments</h2>
          <Button onClick={navigateToCalendarView}>
            Calendar View
          </Button>
          </div>
      </Row>
      <hr></hr>
      <Row>
        <Switch>
          <Route path='/appointments/list'>
            <AppointmentListView />
          </Route>
          <Route path='/appointments/edit'>
            <EditAppointmentView />
          </Route>
          <Route path='/appointments/new'>
            <MakeAppointmentView />
          </Route> 
          <Route path='/appointments/calendar'>
            <AppointmentCalendarView />
          </Route>
          <Redirect to={'/appointments/calendar'}/>
        </Switch>
      </Row>
    </Container>
  );
}

export default AppointmentRootContainer;