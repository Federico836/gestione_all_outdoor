import React from "react"
import { useDispatch, useSelector } from 'react-redux'
import Ciclismo from "./ciclismo/Ciclismo"
import Corsa from "./corsa/Corsa"

const ContainerTabModifica = props => {
    const { modificaFrame, setModificaFrame } = props
    return (
        <div>
            {modificaFrame.tipoPerSelect==="ciclismo" ?
            <Ciclismo modificaFrame={modificaFrame} setModificaFrame={setModificaFrame} /> :
            modificaFrame.tipoPerSelect==="corsa" ?
            <Corsa modificaFrame={modificaFrame} setModificaFrame={setModificaFrame} /> :
            console.log(1)} 
        </div>
    )
}

export default ContainerTabModifica