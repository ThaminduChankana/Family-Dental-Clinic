import React from "react";
import { Col } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import { useHistory } from 'react-router-dom';

const AppointmentCalendarView = () => {
  const history = useHistory();

  const handleOnDateClick = (arg) => {
    history.push(`/appointments/list?date=${arg.dateStr}`);
  }

  return (
    <Col lg={8}>
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        dateClick={handleOnDateClick}
      />
    </Col>
  );
}

export default AppointmentCalendarView;