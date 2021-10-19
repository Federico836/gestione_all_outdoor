import React from "react"
import Ciclismo from "./ciclismo/Ciclismo"
import { useDispatch, useSelector } from 'react-redux'


const ContainerTabModifica = props => {
    const { modificaFrame, setModificaFrame } = props
    return (
        <div>
            {modificaFrame.tipoPerSelect==="ciclismo" ?
            <Ciclismo modificaFrame={modificaFrame} setModificaFrame={setModificaFrame} /> :
            console.log(1)} 
        </div>
    )
}

export default ContainerTabModifica