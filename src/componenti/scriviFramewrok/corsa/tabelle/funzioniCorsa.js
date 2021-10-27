import { getSecondsFromHHMMSS, toHHMMSS } from "../../../../utils/funzioni"

const calcolaDistanzaTot = riga => {
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
    let recupero = getSecondsFromHHMMSS(riga.recupero)
    if(isFinite(riga.serie) && riga.serie!=="" && riga.serie!==0) {
        tempo *= riga.serie
        recupero *= riga.serie
    }
    if(isFinite(riga.ripetizioni) && riga.ripetizioni!=="" && riga.ripetizioni!==0) {
        tempo *= riga.ripetizioni
        recupero *= riga.ripetizioni
    }
    return toHHMMSS(tempo+recupero)
}

const calcRecuperoRiga = riga => {
    let recupero = getSecondsFromHHMMSS(riga.recupero)
    if(isFinite(riga.serie) && riga.serie!=="" && riga.serie!==0) {
        recupero *= riga.serie
    }
    if(isFinite(riga.ripetizioni) && riga.ripetizioni!=="" && riga.ripetizioni!==0) {
        recupero *= riga.ripetizioni
    }
    return toHHMMSS(recupero)
}

export { calcolaDistanzaTot, calcTempoRiga, calcRecuperoRiga }
