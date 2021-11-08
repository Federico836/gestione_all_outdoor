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

const calcTempoTot = listaRighe => {
    let tempoTot = 0

    listaRighe.map(riga => {
        tempoTot += calcTempoRiga(riga, riga => riga.durata)
    })

    return tempoTot
}

const calcRecTot = listaRighe => {
    let tempoTot = 0

    listaRighe.map(riga => {
        tempoTot += calcTempoRiga(riga, riga => riga.recupero)
    })

    return tempoTot
}

const calcTempoZone = listaRighe => {
    const zone = {
        zona1: 0,
        zona2: 0,
        zona3: 0,
        zona4: 0,
        zona5: 0,
        zona6: 0,
        zona7: 0
    }

    listaRighe.map(riga => {
        const tempoRiga = calcTempoRiga(riga, riga => riga.durata)

        if(riga.zona==1) {
            zone.zona1 += tempoRiga
        } else if(riga.zona==2) {
            zone.zona2 += tempoRiga
        } else if(riga.zona==3) {
            zone.zona3 += tempoRiga
        } else if(riga.zona==4) {
            zone.zona4 += tempoRiga
        } else if(riga.zona==5) {
            zone.zona5 += tempoRiga
        } else if(riga.zona==6) {
            zone.zona6 += tempoRiga
        } else if(riga.zona==7) {
            zone.zona7 += tempoRiga
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
    sommaZone.zona7 += tempoZone.zona7

    return sommaZone
}

export { calcTempoTot, calcRecTot, calcTempoZone, sommaZone }