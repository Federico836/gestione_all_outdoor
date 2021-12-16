import React, {useState, useEffect, useRef} from "react"
import { useDispatch, useSelector } from "react-redux"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from "@fullcalendar/timegrid"
import Alert from "sweetalert2"
import { useTranslation } from 'react-i18next'

import { addEvento, replaceEvento, eliminaEvento } from '../../../redux/actions/EventActions'

import './Calendario.css'

const Calendario = props => {
    const { listaEventi, setRangeDateSelect, setCalendarApi, idUtente, getEventPropsFromCalendarEvent, ruoloLoggedUser } = props

    const dispatch = useDispatch()

    const { t, i18n } = useTranslation()
    
    const [events, setEvents] = useState(null)
    const calendarRef = useRef(null)

    useEffect(() => {
        if(!events /* && listaEventi.length>0 */) {
            setEvents(listaEventi)
            console.log(listaEventi)
        }
    }, [listaEventi])

    useEffect(function impostaApiCalendario() {
        const calendarApi = calendarRef.current.getApi()
        setCalendarApi(calendarApi)
    }, [])

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
                /* setListaEventi(listaEventi.filter(evento => evento.id!==eventClick.event.id)) */
                dispatch(eliminaEvento(listaEventi.find(evento => evento.id==eventClick.event.id).dbid, idUtente))
                eventClick.event.remove();
                Alert.fire(t('esporta:calendario:eliminato'), t('esporta:calendario:scritta-eliminato'), "success");
            }
        })
    }

    const rimpiazzaEvento = eventChange => {
        console.log(eventChange)
        console.log(listaEventi)
        /* setListaEventi([...listaEventi.map(evento => {
            if(eventChange.oldEvent.id!==evento.id) {
                return {...evento}
            } else {
                return {...getEventPropsFromCalendarEvent(eventChange.event), dbid: evento.dbid}
            }
        })]) */
        let end = !eventChange.event.end ? eventChange.event.start.getTime()+3600000 : eventChange.event.end
        console.log({...getEventPropsFromCalendarEvent(eventChange.event), dbid: listaEventi.find(evento => evento.id==eventChange.oldEvent.id).dbid})
        dispatch(replaceEvento({...getEventPropsFromCalendarEvent(eventChange.event), end, dbid: listaEventi.find(evento => evento.id==eventChange.oldEvent.id).dbid}, idUtente))
    }

    return (
        <div className="fc-toolbar-chunk">
            <FullCalendar ref={calendarRef}
            // generali calendario
            plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]} initialView="dayGridMonth"
            headerToolbar={{left: 'dayGridMonth,timeGridWeek,timeGridDay', center: "title"}}
            aspectRatio={ruoloLoggedUser!=="allenatore" ? 2.4 : 1.35}
            // evento drag and drop dalla tabella a lato
            eventReceive={info => {console.log(getEventPropsFromCalendarEvent(info.event));
                dispatch(addEvento({...getEventPropsFromCalendarEvent(info.event), end: new Date(info.event.start.getTime()+3600000)}, idUtente))}}
            // selezione e modifica eventi
            droppable={true} events={events} editable={true} eventClick={eventClick}
            selectable={true} select={selectionInfo => setRangeDateSelect(selectionInfo)}
            eventChange={rimpiazzaEvento} firstDay={1} />
        </div>
    )
}

export default Calendario
