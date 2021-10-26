import React from "react"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from "@fullcalendar/timegrid"
import Alert from "sweetalert2"

import './Calendario.css'

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
                <td><nobr>Start Time</nobr></td>
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
        <div className="fc-toolbar-chunk">
            <FullCalendar plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]} 
            headerToolbar={{left: 'dayGridMonth timeGridWeek timeGridDay', center: "title"}}
            eventReceive={info => setListaEventi([...listaEventi, info.event])} initialView="dayGridMonth"
            droppable={true} events={listaEventi} editable={true} eventClick={eventClick} />
        </div>
    )
}

export default Calendario
