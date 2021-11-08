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

const calcTempoZone = listaRighe => {
    const zone = {
        zona1: 0,
        zona2: 0,
        zona3: 0,
        zona4: 0,
        zona5: 0,
        zona6: 0
    }

    listaRighe.map(riga => {
        const tempoRiga = calcTempoRiga(riga)

        if(riga.zona.zona==1) {
            zone.zona1 += tempoRiga
        } else if(riga.zona.zona==2) {
            zone.zona2 += tempoRiga
        } else if(riga.zona.zona==3) {
            zone.zona3 += tempoRiga
        } else if(riga.zona.zona==4) {
            zone.zona4 += tempoRiga
        } else if(riga.zona.zona==5) {
            zone.zona5 += tempoRiga
        } else if(riga.zona.zona==6) {
            zone.zona6 += tempoRiga
        }
    })

    return zone
}

const sommaZone = (sommaZone, tempoZone) => {
    sommaZone.zona1 += tempoZone.zona1
    sommaZone.zona2 += tempoZone.zona2
    sommaZone.zona3 += tempoZone.zona3
    sommaZone.zona4 += tempoZone.zona4
    sommaZone.zona5 += tempoZone.zona5
    sommaZone.zona6 += tempoZone.zona6

    return sommaZone
}

export { calcTempoTot, calcRecTot, calcDistanzaTot, calcTempoZone, sommaZone }
