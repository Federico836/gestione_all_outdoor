import React, { useState, useEffect } from "react"
import BottoniTop from "./bottoniTop/BottoniTop"
import ContainerTabListaTest from "./tabListaTest/ContainerTabListaTest"
import api from "../../../api/index"

const ContainerTestEseguiti = props => {

    const { setTestEseguiti, utente } = props

    const [listaTest, setListaTest] = useState([])

    useEffect(async function richiediTestEseguiti() {
        if(utente) {
            const res = await api.getTests(utente.id_utente)
            setListaTest(res.data.map(test => ({id: test.id, ...JSON.parse(test.dati)})))
        }
    }, [utente])

    return (
        <div>
            <BottoniTop setTestEseguiti={setTestEseguiti} />
            <ContainerTabListaTest listaTest={listaTest} setListaTest={setListaTest} setTestEseguiti={setTestEseguiti} />
        </div>
    )
}

export default ContainerTestEseguiti