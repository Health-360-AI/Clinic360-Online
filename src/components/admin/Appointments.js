import React, { useState, useEffect } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import listPlugin from "@fullcalendar/list"; // needed for dayClick
import EditAppointmentModal from "../common/EditAppointmentModal";

// const smalltalk = require("smalltalk");
const apiUrl = process.env.API_URL;

let eventGuid = 0;

export function createEventId() {
  return String(eventGuid++);
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>
        &nbsp;&nbsp;
        {eventInfo.event.title + " "}
        {eventInfo.event.extendedProps.patient__name &&
          eventInfo.event.extendedProps.patient__name}
      </i>
    </>
  );
}

const getEvents = async (fetchInfo, successCallback, failureCallback) => {
  try {
    const response = await fetch(`${apiUrl}/appointments`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const responseData = await response.json();
    if (successCallback) {
      return responseData.appointments;
    }
  } catch (error) {
    console.log(error.message);
    failureCallback(error);
  }
};

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>
        {formatDate(event.start, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      <i>{event.title}</i>
    </li>
  );
}

export default function Appointments(props) {
  let todayStr = props.toLocalISOString(new Date());
  let INITIAL_EVENTS = [
    {
      id: createEventId(),
      title: "All-day event",
      start: todayStr,
    },
    {
      id: createEventId(),
      title: "Tuesday Event",
      date: "2022-07-05",
      start: "2022-07-05T12:00:00",
      end: "2022-07-05T14:00:00",
      patient_id: 2,
    },
  ];
  const [state, setState] = useState({
    weekendsVisible: true,
    currentEvents: [],
    duration: "00:15:00",
  });
  const [appointments, setAppointments] = useState([]);
  const [editAppointmentModal, setEditAppointmentModal] = useState({
    show: false,
    id: null,
    title: "",
    patient_id: null,
    patient_name: null,
    calendar: null,
    start: "",
    end: "",
    allDay: null,
  });

  useEffect(() => {
    getEvents();
  }, []);

  console.log(editAppointmentModal);
  //   const handleWeekendsToggle = () => {
  //     setState({ ...state, weekendsVisible: !state.weekendsVisible });
  //   };
  const appointmentCanceled = async (appointment_id, res, calendar) => {
    try {
      const response = await fetch(
        `${apiUrl}/appointments/${appointment_id}/canceled?state=${res}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const responseData = await response.json();
      calendar.refetchEvents();
      //   getEvents();
    } catch (error) {
      console.log(error.message);
    }
  };
  const appointmentDone = async (appointment_id, res, calendar) => {
    try {
      const response = await fetch(
        `${apiUrl}/appointments/${appointment_id}/done?state=${res}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const responseData = await response.json();
      calendar.refetchEvents();
      //   getEvents();
    } catch (error) {
      console.log(error.message);
    }
  };

  function renderEventContentList(eventInfo) {
    return (
      <div className="row">
        <div className="col-5">
          <b>{eventInfo.timeText}</b>
          <i>
            &nbsp;&nbsp;
            {eventInfo.event.title + " "}
            {eventInfo.event.extendedProps.patient__name &&
              eventInfo.event.extendedProps.patient__name}
          </i>
        </div>
        <div className="col-1 offset-1 pe-0">
          <input
            id="done"
            className="form-check-input"
            type="checkbox"
            disabled={eventInfo.event.extendedProps.done}
            checked={eventInfo.event.extendedProps.canceled == 1}
            onChange={(e) =>
              appointmentCanceled(
                eventInfo.event.id,
                e.target.checked == true ? 1 : 0,
                eventInfo.view.calendar
              )
            }
          />
        </div>
        <label
          className="form-check-label col-form-label pt-0 col-2 ps-0"
          htmlFor="done"
        >
          Cancel
        </label>
        <div className="col-1 pe-0">
          <input
            id="done"
            className="form-check-input"
            type="checkbox"
            disabled={eventInfo.event.extendedProps.canceled}
            checked={eventInfo.event.extendedProps.done == 1}
            onChange={(e) =>
              appointmentDone(
                eventInfo.event.id,
                e.target.checked == true ? 1 : 0,
                eventInfo.view.calendar
              )
            }
          />
        </div>
        <label
          className="form-check-label col-form-label pt-0 col-2 ps-0"
          htmlFor="done"
        >
          Done
        </label>
      </div>
    );
  }
  const sendAppointment = async (title, start, end, all_day, patient_id) => {
    try {
      const response = await fetch(`${apiUrl}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title,
          start,
          end,
          all_day,
          patient_id,
        }),
      });
      const responseData = await response.json();
      //   getEvents();
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDateTimeChange = async (changedInfo) => {
    try {
      console.log(changedInfo);
      const response = await fetch(
        `${apiUrl}/appointments/${changedInfo.oldEvent.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title: changedInfo.oldEvent.title,
            start: changedInfo.event.startStr,
            end: changedInfo.event.endStr,
            all_day: changedInfo.event.allday,
            patient_id: changedInfo.oldEvent.extendedProps.patient__id,
          }),
        }
      );
      const responseData = await response.json();
      //   getEvents();
    } catch (error) {
      console.log(error.message);
    }
  };

  // const handleDateSelect = (selectInfo) => {
  //   let title = smalltalk
  //     .prompt("Choose Date", "Please enter a new title for your event")
  //     .then((value) => {
  //       let calendarApi = selectInfo.view.calendar;

  //       calendarApi.unselect(); // clear date selection
  //       console.log(selectInfo);
  //       calendarApi.addEvent({
  //         id: createEventId(),
  //         title: value,
  //         start: selectInfo.startStr,
  //         end: selectInfo.endStr,
  //         allDay: selectInfo.allDay,
  //       });
  //       sendAppointment(
  //         value,
  //         selectInfo.startStr,
  //         selectInfo.endStr,
  //         selectInfo.allDay,
  //         null
  //       );
  //     })
  //     .catch((e) => console.log(e));
  // };

  // const handleEventClick = (clickInfo) => {
  //   if (
  //     confirm(
  //       `Are you sure you want to delete the event '${clickInfo.event.title}'`
  //     )
  //   ) {
  //     clickInfo.event.remove();
  //   }
  // };

  // const handleEvents = (events) => {
  //   setState({ ...state, currentEvents: events });
  // };

  const handleDurationChange = (e) => {
    setState({ ...state, duration: e.target.value });
  };
  const renderSidebar = () => {
    return (
      <div className="col-12 pt-3">
        <div className="row justify-content-center">
          <div className="col-11">
            <h2>Instructions</h2>
            <ul>
              <li>
                Select dates and you will be prompted to create a new event
              </li>
              <li>Drag, drop, and resize events</li>
              <li>Click an event to delete it</li>
            </ul>
            {/* <div className="demo-app-sidebar-section">
          <label>
            <input
              type="checkbox"
              checked={state.weekendsVisible}
              onChange={handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div> */}
            {/* <div className="demo-app-sidebar-section">
          <h2>All Events ({state.currentEvents.length})</h2>
          <ul>{state.currentEvents.map(renderSidebarEvent)}</ul>
        </div> */}
          </div>
        </div>
        <div className="row">
          <label
            htmlFor="duration"
            className="col-3 col-form-label text-end mb-3"
          >
            Duration between Appointments to select
          </label>
          <div className="col-3">
            <select
              id="duration"
              onChange={handleDurationChange}
              className="form-select"
              defaultValue="00:15:00"
            >
              <option value="00:05:00">5 minutes</option>
              <option value="00:10:00">10 minutes</option>
              <option value="00:15:00">15 minutes</option>
              <option value="00:20:00">20 minutes</option>
              <option value="00:25:00">25 minutes</option>
              <option value="00:30:00">30 minutes</option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="main pt-5 pb-5">
      <EditAppointmentModal
        show={editAppointmentModal.show}
        onHide={() =>
          setEditAppointmentModal({
            ...editAppointmentModal,
            show: false,
            id: null,
            title: "",
            patient_id: null,
          })
        }
        editAppointmentModal={editAppointmentModal}
        dataToChange={{
          id: editAppointmentModal.id,
          title: editAppointmentModal.title,
          patient_id: editAppointmentModal.patient_id,
        }}
        patient={{
          patient_id: editAppointmentModal.patient_id,
          patient_name: editAppointmentModal.patient_name,
        }}
        calendar={editAppointmentModal.calendar}
      />
      <div className="row m-0 d-flex justify-content-center pb-3">
        {renderSidebar()}
        <div className="col-7">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prevYear,prev,next,nextYear today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="timeGridWeek"
            slotDuration={state.duration}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={state.weekendsVisible}
            // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            events={getEvents}
            height={"600px"}
            select={(selectInfo) => {
              //   handleDateSelect(selectInfo);
              setEditAppointmentModal({
                ...editAppointmentModal,
                show: true,
                calendar: selectInfo.view.calendar,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                all_day: selectInfo.allDay,
                title: "",
                patient_id: null,
              });
            }}
            eventContent={renderEventContent} // custom render function
            eventClick={(clickInfo) => {
              console.log(clickInfo.event.extendedProps.patient__id);
              setEditAppointmentModal({
                ...editAppointmentModal,
                show: true,
                calendar: clickInfo.view.calendar,
                id: clickInfo.event.id,
                title: clickInfo.event.title,
                start: clickInfo.event.startStr,
                end: clickInfo.event.endStr,
                patient_id: clickInfo.event.extendedProps.patient__id,
                patient_name: clickInfo.event.extendedProps.patient__name,
              });
            }}
            eventsSet={getEvents} // called after events are initialized/added/changed/removed
            eventDurationEditable={true}
            eventDrop={handleDateTimeChange}
            eventResize={handleDateTimeChange}
            /* you can update a remote database when these fire:
              eventAdd={function(){}}
              eventChange={function(){}}
              eventRemove={function(){}}
              */
          />
        </div>
        <div className="col-4 ms-5">
          <FullCalendar
            plugins={[listPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "",
            }}
            initialView="list"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={state.weekendsVisible}
            // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            events={getEvents}
            select={(selectInfo) => {
              //   handleDateSelect(selectInfo);
              setEditAppointmentModal({
                ...editAppointmentModal,
                show: true,
                calendar: selectInfo.view.calendar,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                all_day: selectInfo.allDay,
                title: "",
                patient_id: null,
              });
            }}
            eventContent={renderEventContentList} // custom render function
            // eventClick={(clickInfo) => {
            //   console.log(clickInfo);
            //   clickInfo.jsEvent.stopPropagation();
            //   setEditAppointmentModal({
            //     ...editAppointmentModal,
            //     show: true,
            //     calendar: clickInfo.view.calendar,
            //     id: clickInfo.event.id,
            //     title: clickInfo.event.title,
            //     start: clickInfo.event.startStr,
            //     end: clickInfo.event.endStr,
            //     patient_id: clickInfo.event.extendedProps.patient__id,
            //     patient_name: clickInfo.event.extendedProps.patient__name,
            //   });
            // }}
            eventsSet={getEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
              eventAdd={function(){}}
              eventChange={function(){}}
              eventRemove={function(){}}
              */
          />
        </div>
      </div>
    </section>
  );
}

// const renderSidebar = () => {
//   return (
//     <div className="demo-app-sidebar">
//       <div className="demo-app-sidebar-section">
//         <h2>Instructions</h2>
//         <ul>
//           <li>Select dates and you will be prompted to create a new event</li>
//           <li>Drag, drop, and resize events</li>
//           <li>Click an event to delete it</li>
//         </ul>
//       </div>
//       <div className="demo-app-sidebar-section">
//         <label>
//           <input
//             type="checkbox"
//             checked={this.state.weekendsVisible}
//             onChange={this.handleWeekendsToggle}
//           ></input>
//           toggle weekends
//         </label>
//       </div>
//       <div className="demo-app-sidebar-section">
//         <h2>All Events ({this.state.currentEvents.length})</h2>
//         <ul>{this.state.currentEvents.map(renderSidebarEvent)}</ul>
//       </div>
//     </div>
//   );
// };

// const handleWeekendsToggle = () => {
//   this.setState({
//     weekendsVisible: !this.state.weekendsVisible,
//   });
// };

// const handleDateSelect = (selectInfo) => {
//   let title = prompt("Please enter a new title for your event");
//   let calendarApi = selectInfo.view.calendar;

//   calendarApi.unselect(); // clear date selection

//   if (title) {
//     calendarApi.addEvent({
//       id: createEventId(),
//       title,
//       start: selectInfo.startStr,
//       end: selectInfo.endStr,
//       allDay: selectInfo.allDay,
//     });
//   }
// };

// const handleEventClick = (clickInfo) => {
//   if (
//     confirm(
//       `Are you sure you want to delete the event '${clickInfo.event.title}'`
//     )
//   ) {
//     clickInfo.event.remove();
//   }
// };

// const handleEvents = (events) => {
//   this.setState({
//     currentEvents: events,
//   });
// };

// function renderEventContent(eventInfo) {
//   return (
//     <>
//       <b>{eventInfo.timeText}</b>
//       <i>{eventInfo.event.title}</i>
//     </>
//   );
// }

// function renderSidebarEvent(event) {
//   return (
//     <li key={event.id}>
//       <b>
//         {formatDate(event.start, {
//           year: "numeric",
//           month: "short",
//           day: "numeric",
//         })}
//       </b>
//       <i>{event.title}</i>
//     </li>
//   );
// }

// function Appointments() {
//     const [state, setState] = useState({
//         weekendsVisible: true,
//         currentEvents: []

//     })

//   const handleDateClick = (arg) => {
//     // bind with an arrow function
//     alert(arg.dateStr);
//   };
//   return (
//     <section className="main pt-5 pb-5">
//       <div className="row m-0 d-flex justify-content-center pb-3">
//         {renderSidebar()}
//         <div className="col-10">
//           <FullCalendar
//             plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//             headerToolbar={{
//               left: 'prev,next today',
//               center: 'title',
//               right: 'dayGridMonth,timeGridWeek,timeGridDay'
//             }}
//             initialView='dayGridMonth'
//             editable={true}
//             selectable={true}
//             selectMirror={true}
//             dayMaxEvents={true}
//             weekends={state.weekendsVisible}
//             initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
//             select={handleDateSelect}
//             eventContent={renderEventContent} // custom render function
//             eventClick={handleEventClick}
//             eventsSet={handleEvents} // called after events are initialized/added/changed/removed
//             /* you can update a remote database when these fire:
//             eventAdd={function(){}}
//             eventChange={function(){}}
//             eventRemove={function(){}}
//             */
//             dateClick={handleDateClick}
//             events={[
//               { title: "event 1", date: "2019-04-01" },
//               { title: "event 2", date: "2019-04-02" },
//             ]}
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Appointments;
