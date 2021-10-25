import React from "react"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import Alert from "sweetalert2"
/* import resourceTimelinePlugin from '@fullcalendar/resource-timeline' */

const Calendario = props => {
    const { listaEventi, setListaEventi } = props

    const eventClick = eventClick => {
        Alert.fire({
        title: eventClick.event.title,
        html:
            `<div class="table-responsive">
                <table class="table">
                <tbody>
                <tr >
                <td>Title</td>
                <td><strong>` +
                    eventClick.event.title +
                    `</strong></td>
                </tr>
                <tr >
                <td>Start Time</td>
                <td><strong>
                ` +
                    eventClick.event.start +
                    `
                </strong></td>
                </tr>
                </tbody>
                </table>
            </div>`,
    
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Remove Event",
        cancelButtonText: "Close"

        }).then(result => {
            if (result.value) {
                setListaEventi(listaEventi.filter(evento => evento.id!==eventClick.event.id))
                Alert.fire("Deleted!", "Your Event has been deleted.", "success");
            }
        });
    };

    return (
        <div>
            <FullCalendar eventDurationEditable={true} eventStartEditable={true} plugins={[ dayGridPlugin, interactionPlugin/* resourceTimelinePlugin */  ]}
            initialView="dayGridMonth"/* "resourceTimeline" */ droppable={true} events={listaEventi} editable={true} eventResizableFromStart={true}
            eventReceive={info => setListaEventi([...listaEventi, info.event])} eventClick={eventClick} />
        </div>
    )
}

export default Calendario