import React from "react"
import MaderCorsa from "../corsa/testMader/MaderCorsa"
import MaderNuoto from "../nuoto/testMader/MaderNuoto"

const ContainerModifica = props => {
    const { testEseguiti, setTestEseguiti, utente } = props

    return (
        <div>
            {testEseguiti.tipoSport==="corsa" && testEseguiti.tipoTest==="mader" ?
            <MaderCorsa modificaTest={testEseguiti} setTestEseguiti={setTestEseguiti} utente={utente} /> :
            testEseguiti.tipoSport==="nuoto" && testEseguiti.tipoTest==="mader" ?
            <MaderNuoto modificaTest={testEseguiti} setTestEseguiti={setTestEseguiti} utente={utente} /> : null}
        </div>
    )
}

export default ContainerModifica