import React, {useState, useEffect} from "react"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from "@fullcalendar/timegrid"
import Alert from "sweetalert2"
import { useTranslation } from 'react-i18next'

import './Calendario.css'

const Calendario = props => {
    const { listaEventi, setListaEventi, setRangeDateSelect } = props

    const { t, i18n } = useTranslation()
    
    const [events, setEvents] = useState(null)

    const getEventPropsFromCalendarEvent = (calEvent) => {

        return {
                ...calEvent,
                extendedProps: calEvent.extendedProps,
                allDay: calEvent.allDay, 
                backgroundColor: calEvent.backgroundColor,
                borderColor: calEvent.borderColor,
                display: calEvent.display,
                id: calEvent.id,
                title: calEvent.title,
                start: (calEvent.start) ? new Date(calEvent.start.getTime()) : null,
                end: (calEvent.end) ? new Date(calEvent.end.getTime()) : null
        }

    }

    useEffect(() => {

        if(!events) {
            setEvents(listaEventi)
            console.log({listaEventi})
        }

    },[listaEventi])

    const eventClick = eventClick => {
        Alert.fire({
        title: eventClick.event.title,
        html:
            `<div class="table-responsive">
                <table class="table">
                <tbody>
                <tr >
                <td><nobr>${t('esporta:calendario:data-inizio')}</nobr></td>
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
                eventClick.event.remove();
                Alert.fire(t('esporta:calendario:eliminato'), t('esporta:calendario:scritta-eliminato'), "success");
            }
        })
    }

    const rimpiazzaEvento = eventChange => {
        console.log(eventChange)
        console.log(listaEventi)
        setListaEventi([...listaEventi.map(evento => {
            if(eventChange.oldEvent.id!==evento.id) {
                return {...evento}
            } else {
                return {...getEventPropsFromCalendarEvent(eventChange.event)}
            }
        })])
    }

    return (
        <div className="fc-toolbar-chunk">
            <FullCalendar
            // generali calendario
            plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]} initialView="dayGridMonth"
            headerToolbar={{left: 'dayGridMonth,timeGridWeek,timeGridDay', center: "title"}}
            // evento drag and drop dalla tabella a lato
            /* eventReceive={info => {setListaEventi([...listaEventi, {...info.event, start: new Date(info.event.start.getTime()+43200000),
                end: new Date(info.event.end.getTime()+46800000)}]); console.log(info.event)}} */
            eventReceive={info => {
                setListaEventi([...listaEventi, getEventPropsFromCalendarEvent(info.event)]);
            }}
            // selezione e modifica eventi
            droppable={true} events={events}  editable={true} eventClick={eventClick}
            selectable={true} select={selectionInfo => setRangeDateSelect(selectionInfo)}
            eventChange={rimpiazzaEvento} />
        </div>
    )
}

export default Calendario
