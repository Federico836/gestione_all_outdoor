import { getSecondsFromHHMMSS } from "../../../../utils/funzioni"

const calcTempoRiga = (riga, proprieta) => {
    let tempo = getSecondsFromHHMMSS(proprieta(riga))
    if(riga.serie>1) {
        tempo*=riga.serie
    }
    if(riga.ripetizioni>1) {
        tempo*=riga.ripetizioni
    }
    return tempo
}

const calcTempoTotCicl = listaRighe => {
    let tempoTot = 0

    listaRighe.map(riga => {
        tempoTot += calcTempoRiga(riga, riga => riga.durata)
    })

    return tempoTot
}

const calcRecTotCicl = listaRighe => {
    let tempoTot = 0

    listaRighe.map(riga => {
        tempoTot += calcTempoRiga(riga, riga => riga.recupero)
    })

    return tempoTot
}

export { calcTempoTotCicl, calcRecTotCicl }