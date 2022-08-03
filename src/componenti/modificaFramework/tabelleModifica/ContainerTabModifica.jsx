import React from "react"
import { useDispatch, useSelector } from 'react-redux'

import Ciclismo from "./ciclismo/Ciclismo"
import Corsa from "./corsa/Corsa"
import Nuoto from './nuoto/Nuoto'
import Palestra from './palestra/Palestra'
import CombinatiTri from './combinatiTri/CombinatiTri'
import Sport from './sport/Sport'
import Gara from './gara/Gara'

const ContainerTabModifica = props => {
    const { modificaFrame, setModificaFrame, utente } = props
    return (
        <div>
            {modificaFrame.tipoPerSelect==="ciclismo" ?
            <Ciclismo modificaFrame={modificaFrame} setModificaFrame={setModificaFrame} utente={utente} /> :
            modificaFrame.tipoPerSelect==="corsa" ?
            <Corsa modificaFrame={modificaFrame} setModificaFrame={setModificaFrame} utente={utente} /> :
            modificaFrame.tipoPerSelect==="nuoto" ?
            <Nuoto modificaFrame={modificaFrame} setModificaFrame={setModificaFrame} utente={utente} /> :
            modificaFrame.tipoPerSelect==="palestra" ?
            <Palestra modificaFrame={modificaFrame} setModificaFrame={setModificaFrame} utente={utente} /> :
            modificaFrame.tipoPerSelect==="combinati_tri" ?
            <CombinatiTri modificaFrame={modificaFrame} setModificaFrame={setModificaFrame} utente={utente} /> :
            modificaFrame.tipoPerSelect==="gara" ?
            <Gara modificaFrame={modificaFrame} setModificaFrame={setModificaFrame} utente={utente} /> :
            <Sport modificaFrame={modificaFrame} setModificaFrame={setModificaFrame} utente={utente} />} 
        </div>
    )
}

export default ContainerTabModifica