import { getSecondsFromHHMMSS } from "../../../../../utils/funzioni"

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

export { calcTempoRiga }