import { getSecondsFromHHMMSS, toHHMMSS } from "../../../../../utils/funzioni"

const calcolaDistanzaTot = riga => {
    let distanzaTot = Number(riga.distanza)
    if(isFinite(riga.serie) && riga.serie!=="" && riga.serie!==0) {
        distanzaTot *= riga.serie
    }
    if(isFinite(riga.ripetizioni) && riga.ripetizioni!=="" && riga.ripetizioni!==0) {
        distanzaTot *= riga.ripetizioni
    }

    return distanzaTot
}

const calcolaTempoPercor = riga => {
    console.log(riga.passo)
    let tempo = riga.passo*riga.distanza/100

    return toHHMMSS(tempo)
}

const calcolaRipartenza = riga => {
    let tempo = riga.passo*riga.distanza/100
    tempo += getSecondsFromHHMMSS(riga.recupero)

    return toHHMMSS(Math.ceil(tempo/5)*5)
}

const calcolaTempoTot = riga => {
    let tempo = getSecondsFromHHMMSS(calcolaRipartenza(riga))
    if(isFinite(riga.serie) && riga.serie!=="" && riga.serie!==0) {
        tempo *= riga.serie
    }
    if(isFinite(riga.ripetizioni) && riga.ripetizioni!=="" && riga.ripetizioni!==0) {
        tempo *= riga.ripetizioni
    }

    return toHHMMSS(tempo)
}

const calcolaRecuperoTot = riga => {
    let tempo = getSecondsFromHHMMSS(riga.recupero)
    if(isFinite(riga.serie) && riga.serie!=="" && riga.serie!==0) {
        tempo *= riga.serie
    }
    if(isFinite(riga.ripetizioni) && riga.ripetizioni!=="" && riga.ripetizioni!==0) {
        tempo *= riga.ripetizioni
    }

    return toHHMMSS(tempo)
}

/* const calcolaTempo = riga => {
    let tempo = riga.passo*riga.distanza/1000
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
} */

export { calcolaDistanzaTot, calcolaTempoPercor, calcolaRipartenza, calcolaTempoTot, calcolaRecuperoTot }