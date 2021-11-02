import { getSecondsFromHHMMSS } from "../../../../utils/funzioni"

const calcolaDistanzaRiga = riga => {
    let distanzaTot = riga.distanza/1000
    if(isFinite(riga.serie) && riga.serie!=="" && riga.serie!==0) {
        distanzaTot *= riga.serie
    }
    if(isFinite(riga.ripetizioni) && riga.ripetizioni!=="" && riga.ripetizioni!==0) {
        distanzaTot *= riga.ripetizioni
    }

    return distanzaTot
}

const calcTempoRiga = riga => {
    let tempo = riga.passoMedia*riga.distanza/1000
    if(isFinite(riga.serie) && riga.serie!=="" && riga.serie!==0) {
        tempo *= riga.serie
    }
    if(isFinite(riga.ripetizioni) && riga.ripetizioni!=="" && riga.ripetizioni!==0) {
        tempo *= riga.ripetizioni
    }
    return tempo
}

const calcRecRiga = riga => {
    let recupero = getSecondsFromHHMMSS(riga.recupero)
    if(isFinite(riga.serie) && riga.serie!=="" && riga.serie!==0) {
        recupero *= riga.serie
    }
    if(isFinite(riga.ripetizioni) && riga.ripetizioni!=="" && riga.ripetizioni!==0) {
        recupero *= riga.ripetizioni
    }
    return recupero
}

const calcTempoTot = listaRighe => {
    let tempoTot = 0
    listaRighe.map(riga => {
        tempoTot += calcTempoRiga(riga)
    })
    
    return tempoTot
}

const calcRecTot = listaRighe => {
    let recTot = 0
    listaRighe.map(riga => {
        recTot += calcRecRiga(riga)
    })

    return recTot
}

const calcDistanzaTot = listaRighe => {
    let distanzaTot = 0
    listaRighe.map(riga => {
        distanzaTot += calcolaDistanzaRiga(riga)
    })

    return distanzaTot
}

export { calcTempoTot, calcRecTot, calcDistanzaTot }
