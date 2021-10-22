import React from "react"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

const Calendario = props => {

    return (
        <div>
            <FullCalendar plugins={[ dayGridPlugin, interactionPlugin  ]} initialView="dayGridMonth" droppable={true} />
        </div>
    )
}

export default Calendario