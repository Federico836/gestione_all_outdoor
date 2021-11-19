import * as funzioniCicl from '../componenti/esporta/tabelle/tabSport/funzioniTotaliCicl'
import { calcola7Zone } from './funzioni'


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

function groupCiclismo(arr, criteria) {
    const newObj = arr.reduce(function (acc, currentValue) {
      if (!acc[currentValue[criteria]]) {
        acc[currentValue[criteria]] = [];
      }
      acc[currentValue[criteria]].push(currentValue);
      return acc;
    }, {});

    console.log({newObj})

    let totali = {
        tempoTot: 0,
        recTot: 0,
        wltWorkoutTot: 0,
        wlsWorkoutTot: 0,
        tempoZone: 0,
        densitaCicl: 0,
        tempoTotCiclConRec: 0,
        wltAvg: 0,
        trimpCiclAerobic: 0,
        trimpCiclMixed: 0,
        trimpCiclAnaerobic: 0,
        trimpCiclTotal: 0,
        trimpCiclMin: 0
    }
    const keys = Object.keys(newObj);
    const eventiCiclismoGrouped = (keys.length > 0) ? keys.map(key => {

        const obj = newObj[key];

        const tempoTot = sommaValori(obj,"tempoTot")
        const recTot = sommaValori(obj,"recTot")
        const wltWorkoutTot = sommaValori(obj,"wltWorkout")
        const wlsWorkoutTot = sommaValori(obj,"wlsWorkout")
        const tempoZone = sommaValoriZone(obj.map(el => el.tempoZone))
        const densitaCicl = (recTot && tempoTot) ? (recTot/tempoTot)*100 : 0
        const tempoTotCiclConRec = recTot + tempoTot
        const wltAvg = (obj.length) > 0 ? wltWorkoutTot / obj.length : 0
        const trimpCiclAerobic = (tempoZone.zona1+tempoZone.zona2)/60
        const trimpCiclMixed = (tempoZone.zona3+tempoZone.zona4)/60*2
        const trimpCiclAnaerobic = (tempoZone.zona5+tempoZone.zona6+tempoZone.zona7)/60*3
        const trimpCiclTotal = (trimpCiclAerobic + trimpCiclMixed + trimpCiclAnaerobic)
        const trimpCiclMin = (tempoTot && trimpCiclTotal) ? trimpCiclTotal/tempoTot/60 : 0

    
        return {settimana: key, 
                dati: obj, 
                tempoTot, 
                recTot, 
                wltWorkoutTot, wlsWorkoutTot,tempoZone,densitaCicl,
                tempoTotCiclConRec,wltAvg,trimpCiclAerobic,trimpCiclMixed,trimpCiclAnaerobic,trimpCiclTotal,trimpCiclMin}

    }) : []

        if(eventiCiclismoGrouped.length > 0) {

            totali["tempoTot"] = sommaValori(eventiCiclismoGrouped,"tempoTot")
            totali["recTot"] = sommaValori(eventiCiclismoGrouped,"recTot")
            totali["wltWorkoutTot"] = sommaValori(eventiCiclismoGrouped,"wltWorkoutTot")
            totali["wlsWorkoutTot"] = sommaValori(eventiCiclismoGrouped,"wlsWorkoutTot")
            totali["tempoZone"] = sommaValoriZone(eventiCiclismoGrouped.map(el => el.tempoZone))
            totali["densitaCicl"] = sommaValori(eventiCiclismoGrouped,"densitaCicl")
            totali["tempoTotCiclConRec"] = sommaValori(eventiCiclismoGrouped,"tempoTotCiclConRec")
            totali["wltAvg"] = sommaValori(eventiCiclismoGrouped,"wltAvg")
            totali["trimpCiclAerobic"] = sommaValori(eventiCiclismoGrouped,"trimpCiclAerobic")
            totali["trimpCiclMixed"] = sommaValori(eventiCiclismoGrouped,"trimpCiclMixed")
            totali["trimpCiclAnaerobic"] = sommaValori(eventiCiclismoGrouped,"trimpCiclAnaerobic")
            totali["trimpCiclTotal"] = sommaValori(eventiCiclismoGrouped,"trimpCiclTotal")
            totali["trimpCiclMin"] = sommaValori(eventiCiclismoGrouped,"trimpCiclMin")

        }

    
    return {eventiCiclismoGrouped,totali}
}

const calcolaMediaPonderata = (watt_avg_array) => {

   if(!watt_avg_array || watt_avg_array.length < 1) return 0

   return Math.pow(watt_avg_array.reduce((prev,curr) => {
        return prev + Math.pow(curr, 4)
    }), 0.25)
}

const calcolaDatiCiclismo = (rows, ftp, fc) => {

    console.log({rows})
    const zoneCiclismo = calcola7Zone(ftp || 200, fc || 160)

    const rowsCalc = rows.map((riga) => {
         return {...riga, 
                 wattMin: zoneCiclismo[riga.zona-1].watt_min, 
                 wattMax: zoneCiclismo[riga.zona-1].watt_max, 
                 wattMedia: zoneCiclismo[riga.zona-1].watt_avg,
                 fcMin: zoneCiclismo[riga.zona-1].fc_min, 
                 fcMax: zoneCiclismo[riga.zona-1].fc_max}
    })

    const mediaPonderata = calcolaMediaPonderata(rowsCalc.map(row => row.wattMedia))
    const wltWorkout = (mediaPonderata && ftp) ? mediaPonderata / ftp : 0
    const wlsWorkout = (mediaPonderata && ftp && wltWorkout) ? funzioniCicl.calcTempoTot(rowsCalc)*mediaPonderata*wltWorkout/ftp/3600*100 : 0


    return {rowsCalc,mediaPonderata,wltWorkout,wlsWorkout}
}

const getEventiCiclismo = (frameworks, eventi, ftp, fc) => {

    const eventiCiclismo = eventi.map(ev => {

        let framework = frameworks.find(frame => frame.id === ev.extendedProps.mdId)

        if(framework && framework.tipoPerSelect==="ciclismo") {
            const datiCiclismo = calcolaDatiCiclismo(framework.listaRighe,ftp,fc)

            return {event: ev, 
                    framework, 
                    settimana: ev.start.getWeek(),
                    tempoTot: funzioniCicl.calcTempoTot(datiCiclismo.rowsCalc),
                    recTot:   funzioniCicl.calcRecTot(datiCiclismo.rowsCalc),
                    wltWorkout: datiCiclismo.wltWorkout,
                    wlsWorkout: datiCiclismo.wlsWorkout,
                    tempoZone: funzioniCicl.calcTempoZone(datiCiclismo.rowsCalc)
                   } 
        }
        else {
            return null
        }
    }).filter(el => el !== null);


    return eventiCiclismo

}

const elaboraCiclismo = (frameworks, eventi, ftp, fc) => {

        const eventiCiclismo = getEventiCiclismo(frameworks,eventi, ftp, fc)
        const ciclismo =  groupCiclismo(eventiCiclismo,"settimana")
        const eventiCiclismoGrouped = ciclismo.eventiCiclismoGrouped
        const eventiCiclismoTotali = ciclismo.totali

        return {eventiCiclismoGrouped, totaliCiclismo: eventiCiclismoTotali, calcolaDatiCiclismo}

}

export default elaboraCiclismo