import React from "react"
import { useDispatch, useSelector } from 'react-redux'

import Ciclismo from "./ciclismo/Ciclismo"
import Corsa from "./corsa/Corsa"
import Nuoto from './nuoto/Nuoto'
import Palestra from './palestra/Palestra'
import CombinatiTri from './combinatiTri/CombinatiTri'
import Sport from './sport/Sport'

const ContainerTabModifica = props => {
    const { modificaFrame, setModificaFrame } = props
    return (
        <div>
            {modificaFrame.tipoPerSelect==="ciclismo" ?
            <Ciclismo modificaFrame={modificaFrame} setModificaFrame={setModificaFrame} /> :
            modificaFrame.tipoPerSelect==="corsa" ?
            <Corsa modificaFrame={modificaFrame} setModificaFrame={setModificaFrame} /> :
            modificaFrame.tipoPerSelect==="nuoto" ?
            <Nuoto modificaFrame={modificaFrame} setModificaFrame={setModificaFrame} /> :
            modificaFrame.tipoPerSelect==="palestra" ?
            <Palestra modificaFrame={modificaFrame} setModificaFrame={setModificaFrame} /> :
            modificaFrame.tipoPerSelect==="combinati_tri" ?
            <CombinatiTri modificaFrame={modificaFrame} setModificaFrame={setModificaFrame} /> :
            <Sport modificaFrame={modificaFrame} setModificaFrame={setModificaFrame} />} 
        </div>
    )
}

export default ContainerTabModifica