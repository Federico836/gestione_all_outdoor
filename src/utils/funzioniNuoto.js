import * as funzioniNuoto from '../componenti/esporta/tabelle/tabSport/funzioniTotaliNuoto'
import { calcolaZoneNuoto } from './funzioni'

const sommaValori = (arr,prop) => {
    return arr.map(el => el[prop]).reduce((p,c) => {return p + c})
}

const sommaValoriZone = (arr) => {
    let zone = {zona1: 0, zona2: 0, zona3: 0, zona4: 0, zona5: 0, zona6: 0, zona7: 0, zona8: 0}

    arr.forEach(tz => {
        zone.zona1 += tz.zona1
        zone.zona2 += tz.zona2
        zone.zona3 += tz.zona3
        zone.zona4 += tz.zona4
        zone.zona5 += tz.zona5
        zone.zona6 += tz.zona6
        zone.zona7 += tz.zona7
        zone.zona8 += tz.zona8
    })

    return zone

}

const calcolaDatiNuoto= (rows, passoNuoto, fc ) => {
    const speed = (passoNuoto) ? 100/passoNuoto : 0
    console.log({rows})
    const zoneCalcNuoto = calcolaZoneNuoto(speed)

    const rowsCalc = rows.map((riga) => {
         return {...riga, 
                    passo: 100/zoneCalcNuoto[riga.zona.zona-1].perce
                }
    })

    return {rowsCalc}
}

const getEventiNuoto = (frameworks, eventi, passoNuoto) => {

    const eventiNuoto = eventi.map(ev => {

        let framework = frameworks.find(frame => frame.id === ev.extendedProps.mdId)

        if(framework && framework.tipoPerSelect==="nuoto") {
                    const datiNuoto = calcolaDatiNuoto(framework.listaRighe,passoNuoto)
                    
                    const tempoTot = funzioniNuoto.calcTempoTot(datiNuoto.rowsCalc)
                    const recTot =   funzioniNuoto.calcRecTot(datiNuoto.rowsCalc)
                    const distTot =  funzioniNuoto.calcDistanzaTot(datiNuoto.rowsCalc)*1000
                    const tempoZone = funzioniNuoto.calcTempoZone(datiNuoto.rowsCalc)
                    const velMedia = (tempoTot) ? distTot/tempoTot : 0
                    const passoMedioNuoto = (velMedia) ? 100/velMedia : 0
                    const densitaNuoto = (tempoTot) ? recTot/tempoTot*100 : 0
                    const tempoTotNuotoConRec =  tempoTot + recTot
                    const wltNuoto = (passoMedioNuoto) ? passoNuoto/passoMedioNuoto : 0
                    const wlsNuoto = Math.pow(wltNuoto, 3)*tempoTot/3600*100
                    const trimpNuotoAerobic = ((tempoZone.zona1+tempoZone.zona2)/60)
                    const trimpNuotoMixed = ((tempoZone.zona3+tempoZone.zona4)/60*2)
                    const trimpNuotoAnaerobic = ((tempoZone.zona5+tempoZone.zona6)/60*3)
                    const trimpNuotoTotal = (trimpNuotoAerobic+trimpNuotoMixed+trimpNuotoAnaerobic)
                    const trimpNuotoMin = (tempoTot) ? (trimpNuotoTotal/tempoTot/60) : 0

            return {event: ev, framework, settimana: ev.start.getWeek(), tempoTot,recTot,
                    distTot,tempoZone,velMedia,passoMedioNuoto,densitaNuoto,tempoTotNuotoConRec,wlsNuoto,trimpNuotoAerobic,
                    trimpNuotoMixed,trimpNuotoAnaerobic,trimpNuotoTotal,trimpNuotoMin,wltNuoto} 
        }
        else {
            return null
        }
    }).filter(el => el !== null);


    return eventiNuoto

}

function groupNuoto(arr, criteria) {
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
        passoMedioNuoto: 0,
        densitaNuoto: 0,
        tempoTotNuotoConRec: 0, 
        wltNuoto: 0,
        wlsNuoto: 0,
        trimpNuotoAerobic: 0,
        trimpNuotoMixed: 0,
        trimpNuotoAnaerobic: 0, 
        trimpNuotoTotal: 0,
        trimpNuotoMin: 0,
    }
    const keys = Object.keys(newObj);

    const eventiNuotoGrouped = (keys.length > 0) ? keys.map(key => {

        const obj = newObj[key];

        const tempoTot = sommaValori(obj,"tempoTot")
        const recTot= sommaValori(obj,"recTot")
        const distTot= sommaValori(obj,"distTot")
        const tempoZone= sommaValoriZone(obj.map(el => el.tempoZone))
        const velMedia= sommaValori(obj,"velMedia")
        const passoMedioNuoto= sommaValori(obj,"passoMedioNuoto")
        const densitaNuoto= sommaValori(obj,"densitaNuoto")
        const tempoTotNuotoConRec= sommaValori(obj,"tempoTotNuotoConRec") 
        const wltNuoto= sommaValori(obj,"wltNuoto")
        const wlsNuoto= sommaValori(obj,"wlsNuoto")
        const trimpNuotoAerobic= sommaValori(obj,"trimpNuotoAerobic")
        const trimpNuotoMixed= sommaValori(obj,"trimpNuotoMixed")
        const trimpNuotoAnaerobic= sommaValori(obj,"trimpNuotoAnaerobic") 
        const trimpNuotoTotal= sommaValori(obj,"trimpNuotoTotal")
        const trimpNuotoMin= sommaValori(obj,"trimpNuotoMin")

        return {settimana: key, 
                dati: obj,
                tempoTot,
                recTot,
                distTot,
                tempoZone,
                velMedia,
                passoMedioNuoto,
                densitaNuoto,
                tempoTotNuotoConRec, 
                wltNuoto,
                wlsNuoto,
                trimpNuotoAerobic,
                trimpNuotoMixed,
                trimpNuotoAnaerobic, 
                trimpNuotoTotal,
                trimpNuotoMin,
               }

    }) : []

        if(eventiNuotoGrouped.length > 0) {

            totali["tempoTot"] = sommaValori(eventiNuotoGrouped,"tempoTot")
            totali["recTot"] = sommaValori(eventiNuotoGrouped,"recTot")
            totali["distTot"] = sommaValori(eventiNuotoGrouped,"distTot")
            totali["velMedia"] = sommaValori(eventiNuotoGrouped,"velMedia")
            totali["tempoZone"] = sommaValoriZone(eventiNuotoGrouped.map(el => el.tempoZone))
            totali["passoMedioNuoto"] = sommaValori(eventiNuotoGrouped,"passoMedioNuoto")
            totali["densitaNuoto"] = sommaValori(eventiNuotoGrouped,"densitaNuoto")
            totali["tempoTotNuotoConRec"] = sommaValori(eventiNuotoGrouped,"tempoTotNuotoConRec")
            totali["wltNuoto"] = sommaValori(eventiNuotoGrouped,"wltNuoto")
            totali["wlsNuoto"] = sommaValori(eventiNuotoGrouped,"wlsNuoto")
            totali["trimpNuotoAerobic"] = sommaValori(eventiNuotoGrouped,"trimpNuotoAerobic")
            totali["trimpNuotoMixed"] = sommaValori(eventiNuotoGrouped,"trimpNuotoMixed")
            totali["trimpNuotoAnaerobic"] = sommaValori(eventiNuotoGrouped,"trimpNuotoAnaerobic")
            totali["trimpNuotoTotal"] = sommaValori(eventiNuotoGrouped,"trimpNuotoTotal")
            totali["trimpNuotoMin"] = sommaValori(eventiNuotoGrouped,"trimpNuotoMin")

        }

    
    return {eventiNuotoGrouped,totali}
}




const elaboraNuoto = (frameworks, eventi, passoNuoto) => {

    const eventiNuoto = getEventiNuoto(frameworks, eventi, passoNuoto)
    const nuoto = groupNuoto(eventiNuoto,"settimana")
    const eventiNuotoGrouped = nuoto.eventiNuotoGrouped


    return {calcolaDatiNuoto, eventiNuotoGrouped, totaliNuoto: nuoto.totali}
}

export default elaboraNuoto