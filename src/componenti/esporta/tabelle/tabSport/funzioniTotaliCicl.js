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

const calcTempoZoneCicl = listaRighe => {
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

export { calcTempoTotCicl, calcRecTotCicl, calcTempoZoneCicl }