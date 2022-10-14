import * as funzioniCorsa from '../componenti/esporta/tabelle/tabSport/funzioniTotaliCorsa'
import { calcolaZoneCorsa } from './funzioni'

const sommaValori = (arr,prop) => {
    return arr.map(el => el[prop]).reduce((p,c) => {return p + c})
}

const sommaValoriZone = (arr) => {
    let zone = {zona1: 0, zona2: 0, zona3: 0, zona4: 0, zona5: 0, zona6: 0, zona7: 0}

    arr.forEach(tz => {
        zone.zona1 += tz.zona1
        zone.zona2 += tz.zona2
        zone.zona3 += tz.zona3
        zone.zona4 += tz.zona4
        zone.zona5 += tz.zona5
        zone.zona6 += tz.zona6
        zone.zona7 += tz.zona7
    })

    return zone

}

const calcolaDatiCorsa = (rows, passoCorsa, hr ) => {
    const speed = (passoCorsa) ? 1000/passoCorsa : 0
    console.log({rows})
    const zoneCalcCorsa = calcolaZoneCorsa(speed)

    const rowsCalc = rows.map((riga) => {
         return {...riga, 
                    passoMin: 1000/zoneCalcCorsa[riga.zona.zona-1].min,
                    passoMax: 1000/zoneCalcCorsa[riga.zona.zona-1].max,
                    passoMedia: 1000/zoneCalcCorsa[riga.zona.zona-1].media,
                    fc: Math.round((Number(riga.perce_fc)/100)*Number(hr))
                }
    })

    return {rowsCalc}
}

const getEventiCorsa = (frameworks, eventi, passoCorsa) => {

    const eventiCorsa = eventi.map(ev => {

        let framework = frameworks.find(frame => frame.id === ev.extendedProps.mdId)

        if(framework && framework.tipoPerSelect==="corsa") {
                    const datiCorsa = calcolaDatiCorsa(framework.listaRighe,passoCorsa)
                    
                    const tempoTot = funzioniCorsa.calcTempoTot(datiCorsa.rowsCalc)
                    const recTot =   funzioniCorsa.calcRecTot(datiCorsa.rowsCalc)
                    const distTot =  funzioniCorsa.calcDistanzaTot(datiCorsa.rowsCalc)*1000
                    const tempoZone = funzioniCorsa.calcTempoZone(datiCorsa.rowsCalc)
                    const velMedia = (tempoTot) ? distTot/tempoTot : 0
                    const passoMedioCorsa = (velMedia) ? 1000/velMedia : 0
                    const densitaCorsa = (tempoTot) ? recTot/tempoTot*100 : 0
                    const tempoTotCorsaConRec =  tempoTot + recTot
                    const wltCorsa = (passoMedioCorsa) ? passoCorsa/passoMedioCorsa : 0
                    const wlsCorsa = Math.pow(wltCorsa, 3)*tempoTot/3600*100
                    const trimpCorsaAerobic = ((tempoZone.zona1+tempoZone.zona2)/60)
                    const trimpCorsaMixed = ((tempoZone.zona3+tempoZone.zona4)/60*2)
                    const trimpCorsaAnaerobic = ((tempoZone.zona5+tempoZone.zona6)/60*3)
                    const trimpCorsaTotal = (trimpCorsaAerobic+trimpCorsaMixed+trimpCorsaAnaerobic)
                    const trimpCorsaMin = (tempoTot) ? (trimpCorsaTotal/tempoTot/60) : 0

            return {event: ev, framework, settimana: ev.start.getWeek(), tempoTot,recTot,
                    distTot,tempoZone,velMedia,passoMedioCorsa,densitaCorsa,tempoTotCorsaConRec,wlsCorsa,trimpCorsaAerobic,
                    trimpCorsaMixed,trimpCorsaAnaerobic,trimpCorsaTotal,trimpCorsaMin,wltCorsa} 
        }
        else {
            return null
        }
    }).filter(el => el !== null);


    return eventiCorsa

}

function groupCorsa(arr, criteria) {
    const newObj = arr.reduce(function (acc, currentValue) {
      if (!acc[currentValue[criteria]]) {
        acc[currentValue[criteria]] = [];
      }
      acc[currentValue[criteria]].push(currentValue);
      return acc;
    }, {});

    let totali = {
        tempoTot: 0,
        recTot: 0,
        distTot: 0,
        tempoZone: 0,
        velMedia: 0,
        passoMedioCorsa: 0,
        densitaCorsa: 0,
        tempoTotCorsaConRec: 0, 
        wltCorsa: 0,
        wlsCorsa: 0,
        trimpCorsaAerobic: 0,
        trimpCorsaMixed: 0,
        trimpCorsaAnaerobic: 0, 
        trimpCorsaTotal: 0,
        trimpCorsaMin: 0,
    }
    const keys = Object.keys(newObj);

    const eventiCorsaGrouped = (keys.length > 0) ? keys.map(key => {

        const obj = newObj[key];

        const tempoTot = sommaValori(obj,"tempoTot")
        const recTot= sommaValori(obj,"recTot")
        const distTot= sommaValori(obj,"distTot")
        const tempoZone= sommaValoriZone(obj.map(el => el.tempoZone))
        const velMedia= sommaValori(obj,"velMedia")
        const passoMedioCorsa= sommaValori(obj,"passoMedioCorsa")
        const densitaCorsa= sommaValori(obj,"densitaCorsa")
        const tempoTotCorsaConRec= sommaValori(obj,"tempoTotCorsaConRec") 
        const wltCorsa= sommaValori(obj,"wltCorsa")
        const wlsCorsa= sommaValori(obj,"wlsCorsa")
        const trimpCorsaAerobic= sommaValori(obj,"trimpCorsaAerobic")
        const trimpCorsaMixed= sommaValori(obj,"trimpCorsaMixed")
        const trimpCorsaAnaerobic= sommaValori(obj,"trimpCorsaAnaerobic") 
        const trimpCorsaTotal= sommaValori(obj,"trimpCorsaTotal")
        const trimpCorsaMin= sommaValori(obj,"trimpCorsaMin")

        return {settimana: key, 
                dati: obj,
                tempoTot,
                recTot,
                distTot,
                tempoZone,
                velMedia,
                passoMedioCorsa,
                densitaCorsa,
                tempoTotCorsaConRec, 
                wltCorsa,
                wlsCorsa,
                trimpCorsaAerobic,
                trimpCorsaMixed,
                trimpCorsaAnaerobic, 
                trimpCorsaTotal,
                trimpCorsaMin,
               }

    }) : []

        if(eventiCorsaGrouped.length > 0) {

            totali["tempoTot"] = sommaValori(eventiCorsaGrouped,"tempoTot")
            totali["recTot"] = sommaValori(eventiCorsaGrouped,"recTot")
            totali["distTot"] = sommaValori(eventiCorsaGrouped,"distTot")
            totali["velMedia"] = sommaValori(eventiCorsaGrouped,"velMedia")
            totali["tempoZone"] = sommaValoriZone(eventiCorsaGrouped.map(el => el.tempoZone))
            totali["passoMedioCorsa"] = sommaValori(eventiCorsaGrouped,"passoMedioCorsa")
            totali["densitaCorsa"] = sommaValori(eventiCorsaGrouped,"densitaCorsa")
            totali["tempoTotCorsaConRec"] = sommaValori(eventiCorsaGrouped,"tempoTotCorsaConRec")
            totali["wltCorsa"] = sommaValori(eventiCorsaGrouped,"wltCorsa")
            totali["wlsCorsa"] = sommaValori(eventiCorsaGrouped,"wlsCorsa")
            totali["trimpCorsaAerobic"] = sommaValori(eventiCorsaGrouped,"trimpCorsaAerobic")
            totali["trimpCorsaMixed"] = sommaValori(eventiCorsaGrouped,"trimpCorsaMixed")
            totali["trimpCorsaAnaerobic"] = sommaValori(eventiCorsaGrouped,"trimpCorsaAnaerobic")
            totali["trimpCorsaTotal"] = sommaValori(eventiCorsaGrouped,"trimpCorsaTotal")
            totali["trimpCorsaMin"] = sommaValori(eventiCorsaGrouped,"trimpCorsaMin")

        }

    
    return {eventiCorsaGrouped,totali}
}




const elaboraCorsa = (frameworks, eventi, passoCorsa) => {

    const eventiCorsa = getEventiCorsa(frameworks, eventi, passoCorsa)
    const corsa = groupCorsa(eventiCorsa,"settimana")
    const eventiCorsaGrouped = corsa.eventiCorsaGrouped


    return {calcolaDatiCorsa, eventiCorsaGrouped, totaliCorsa: corsa.totali}
}

export default elaboraCorsa