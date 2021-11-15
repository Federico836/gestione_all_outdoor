import React from 'react'
import { useRef } from 'react'
import { Button } from "@mui/material"
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import TabCiclismoDragNDrop from './tabSport/TabCiclismoDragNDrop'
import TabCorsaDragNDrop from './tabSport/TabCorsaDragNDrop'
import TabNuotoDragNDrop from './tabSport/TabNuotoDragNDrop'
import TabPalestraDragNDrop from './tabSport/TabPalestraDragNDrop'
import TabCombinatiTriDragNDrop from './tabSport/TabCombinatiTriDragNDrop'
import TabSportDragNDrop from './tabSport/TabSportDragNDrop'

import TabDatiWeek from './tabDatiWeek/TabDatiWeek'

import { calcola7Zone } from '../../../utils/funzioni'
import { calcolaZoneCorsa } from '../../../utils/funzioni'
import { calcolaZoneNuoto } from '../../../utils/funzioni'

import * as funzioniCicl from './tabSport/funzioniTotaliCicl'
import * as funzioniCorsa from './tabSport/funzioniTotaliCorsa'
import * as funzioniNuoto from './tabSport/funzioniTotaliNuoto'

import ZoneCiclismo7 from './tabZone/ZoneCiclismo7'
import ZoneCorsa from './tabZone/ZoneCorsa'
import ZoneNuoto from './tabZone/ZoneNuoto'

import styles from './Report.module.css'

const Report = props => {
    const { listaEventi, rangeDateSelect, ftp, fc, passoCorsa, passoNuoto, report, setReport, tabellone } = props

    const { t, i18n } = useTranslation()

    const paginaDaStampare = useRef(null)
    const frameStampa = useRef(null)

    const eventiSelezionati = listaEventi.filter(evento => evento.start.getTime()>=rangeDateSelect.start.getTime() &&
    evento.start.getTime() < rangeDateSelect.end.getTime()).sort((a, b) => a.start.getTime()-b.start.getTime())

    const listaFramework = useSelector(state => state.frameworks.lista)

    const zoneCalcCiclismo = calcola7Zone(ftp, fc)
    const zoneCalcCorsa = calcolaZoneCorsa(1000/passoCorsa)
    const zoneCalcNuoto = calcolaZoneNuoto(100/passoNuoto)

    const stampaTabelleReport = () => {

        const listaStampaWorkouts = []
        let tempoTotCicl = []
        let tempoTotCorsa = []
        let tempoTotNuoto = []
    
        let recTotCicl = []
        let recTotCorsa = []
        let recTotNuoto = []
    
        let distTotCorsa = []
        let distTotNuoto = []
    
        const tempoZoneCicl = []
        const tempoZoneCorsa = []
        const tempoZoneNuoto = []

        const sommaWltCicl = []
        const sommaWlsCicl = []

        const contaWorkoutCicl = []
    
        for(let c=0;c<eventiSelezionati.length;c++) {
            //const framework = listaFramework.find(frame => frame.id===eventiSelezionati[c]._def.sourceId)
    
            const framework = listaFramework.find(frame => frame.id===eventiSelezionati[c].extendedProps.mdId)
            if(!framework) continue;
            
            const listaRigheFrame = framework.listaRighe.map(riga => {return {...riga}})
            
            let listaRigheFrameCalc = []
            let tabDaAggiungere = []
            if(framework.tipoPerSelect==="ciclismo") {
                listaRigheFrameCalc = listaRigheFrame.map(riga => {
                    const wattMedia = (zoneCalcCiclismo[riga.zona-1].watt_min+zoneCalcCiclismo[riga.zona-1].watt_max)/2

                    return {...riga, wattMin: zoneCalcCiclismo[riga.zona-1].watt_min, wattMax: zoneCalcCiclismo[riga.zona-1].watt_max, wattMedia,
                        fcMin: zoneCalcCiclismo[riga.zona-1].fc_min, fcMax: zoneCalcCiclismo[riga.zona-1].fc_max}
                })

                let mediaPonderata = 0
                listaRigheFrameCalc.forEach(riga => {
                    mediaPonderata += Math.pow(riga.wattMedia, 4)
                })
                
                mediaPonderata = Math.pow(mediaPonderata, 0.25)
                const wltWorkout = mediaPonderata/ftp
                const wlsWorkout = funzioniCicl.calcTempoTot(listaRigheFrameCalc)*mediaPonderata*wltWorkout/ftp/3600*100
    
                tabDaAggiungere.push(<h4>{t('scrivi-framework:ciclismo:ciclismo')}</h4>)
                tabDaAggiungere.push(<TabCiclismoDragNDrop listaRighe={listaRigheFrameCalc} />)
    
                const aggiungiTempoTot = () => tempoTotCicl.push({settimana: eventiSelezionati[c].start.getWeek(), num: funzioniCicl.calcTempoTot(listaRigheFrameCalc)})
                const aggiungiRecTot = () => recTotCicl.push({settimana: eventiSelezionati[c].start.getWeek(), num: funzioniCicl.calcRecTot(listaRigheFrameCalc)})
    
                const addOggettoZone = () => { return {zona1: 0, zona2: 0, zona3: 0, zona4: 0, zona5: 0, zona6: 0, zona7: 0}}
                const tempoZone = funzioniCicl.calcTempoZone(listaRigheFrameCalc)
                const aggiungiTempoZone = () => tempoZoneCicl.push({settimana: eventiSelezionati[c].start.getWeek(), num: funzioniCicl.sommaZone(addOggettoZone(), tempoZone)})
                const aggiungiSommaWlt = () => sommaWltCicl.push({settimana: eventiSelezionati[c].start.getWeek(), num: wltWorkout})
                const aggiungiSommaWls = () => sommaWlsCicl.push({settimana: eventiSelezionati[c].start.getWeek(), num: wlsWorkout})
                const aggiungiContaWorkout = () => contaWorkoutCicl.push({settimana: eventiSelezionati[c].start.getWeek(), num: 1})

                if(c>0) {
                    if(eventiSelezionati[c-1].start.getWeek()!==eventiSelezionati[c].start.getWeek()) {
                        aggiungiTempoTot()
                        aggiungiRecTot()
                        aggiungiTempoZone()
                        aggiungiSommaWlt()
                        aggiungiSommaWls()
                        aggiungiContaWorkout()
                    } else {
                        if(tempoTotCicl.length<1) {
                            aggiungiTempoTot()
                            aggiungiRecTot()
                            aggiungiTempoZone()
                            aggiungiSommaWlt()
                            aggiungiSommaWls()
                            aggiungiContaWorkout()
                        } else {
                            tempoTotCicl[tempoTotCicl.length-1].num += funzioniCicl.calcTempoTot(listaRigheFrameCalc)
                            recTotCicl[recTotCicl.length-1].num += funzioniCicl.calcRecTot(listaRigheFrameCalc)
                            funzioniCicl.sommaZone(tempoZoneCicl[tempoZoneCicl.length-1].num, tempoZone)
                            sommaWltCicl[sommaWltCicl.length-1].num += wltWorkout
                            sommaWlsCicl[sommaWlsCicl.length-1].num += wlsWorkout
                            contaWorkoutCicl[contaWorkoutCicl.length-1].num += 1
                        }
                    }
                } else {
                    aggiungiTempoTot()
                    aggiungiRecTot()
                    aggiungiTempoZone()
                    aggiungiSommaWlt()
                    aggiungiSommaWls()
                    aggiungiContaWorkout()
                }
            } else if(framework.tipoPerSelect==="corsa") {
                listaRigheFrameCalc = listaRigheFrame.map(riga => {
                    return {...riga, passoMin: 1000/zoneCalcCorsa[riga.zona.zona-1].min,
                        passoMax: 1000/zoneCalcCorsa[riga.zona.zona-1].max,
                        passoMedia: 1000/zoneCalcCorsa[riga.zona.zona-1].media}
                })
    
                tabDaAggiungere.push(<h4>{t('scrivi-framework:corsa:corsa')}</h4>)
                tabDaAggiungere.push(<TabCorsaDragNDrop listaRighe={listaRigheFrameCalc} />)
    
                const aggiungiTempoTot = () => tempoTotCorsa.push({settimana: eventiSelezionati[c].start.getWeek(), num: funzioniCorsa.calcTempoTot(listaRigheFrameCalc)})
                const aggiungiRecTot = () => recTotCorsa.push({settimana: eventiSelezionati[c].start.getWeek(), num: funzioniCorsa.calcRecTot(listaRigheFrameCalc)})
                const aggiungiDistanzaTot = () => distTotCorsa.push({settimana: eventiSelezionati[c].start.getWeek(), num: funzioniCorsa.calcDistanzaTot(listaRigheFrameCalc)*1000})
    
                const addOggettoZone = () => { return {zona1: 0, zona2: 0, zona3: 0, zona4: 0, zona5: 0, zona6: 0}}
                const tempoZone = funzioniCorsa.calcTempoZone(listaRigheFrameCalc)
                const aggiungiTempoZone = () => tempoZoneCorsa.push({settimana: eventiSelezionati[c].start.getWeek(), num: funzioniCorsa.sommaZone(addOggettoZone(), tempoZone)})
                if(c>0) {
                    if(eventiSelezionati[c-1].start.getWeek()!==eventiSelezionati[c].start.getWeek()) {
                        aggiungiTempoTot()
                        aggiungiRecTot()
                        aggiungiDistanzaTot()
                        aggiungiTempoZone()
                    } else {
                        if(tempoTotCorsa.length<1) {
                            aggiungiTempoTot()
                            aggiungiRecTot()
                            aggiungiDistanzaTot()
                            aggiungiTempoZone()
                        } else {
                            tempoTotCorsa[tempoTotCorsa.length-1].num += funzioniCorsa.calcTempoTot(listaRigheFrameCalc)
                            recTotCorsa[recTotCorsa.length-1].num += funzioniCorsa.calcRecTot(listaRigheFrameCalc)
                            distTotCorsa[distTotCorsa.length-1].num += funzioniCorsa.calcDistanzaTot(listaRigheFrameCalc)*1000
                            funzioniCorsa.sommaZone(tempoZoneCorsa[tempoZoneCorsa.length-1].num, tempoZone)
                        }
                    }
                } else {
                    aggiungiTempoTot()
                    aggiungiRecTot()
                    aggiungiDistanzaTot()
                    aggiungiTempoZone()
                }
    
            } else if(framework.tipoPerSelect==="nuoto") {
                listaRigheFrameCalc = listaRigheFrame.map(riga => {
                    return {...riga, passo: 100/zoneCalcNuoto[riga.zona.zona-1].perce}
                })
    
                tabDaAggiungere.push(<h4>{t('scrivi-framework:nuoto:nuoto')}</h4>)
                tabDaAggiungere.push(<TabNuotoDragNDrop listaRighe={listaRigheFrameCalc} />)
    
                const aggiungiTempoTot = () => tempoTotNuoto.push({settimana: eventiSelezionati[c].start.getWeek(), num: funzioniNuoto.calcTempoTot(listaRigheFrameCalc)})
                const aggiungiRecTot = () => recTotNuoto.push({settimana: eventiSelezionati[c].start.getWeek(), num: funzioniNuoto.calcRecTot(listaRigheFrameCalc)})
                const aggiungiDistanzaTot = () => distTotNuoto.push({settimana: eventiSelezionati[c].start.getWeek(), num: funzioniNuoto.calcDistanzaTot(listaRigheFrameCalc)})
    
                const addOggettoZone = () => { return {zona1: 0, zona2: 0, zona3: 0, zona4: 0, zona5: 0, zona6: 0, zona7: 0, zona8: 0}}
                const tempoZone = funzioniNuoto.calcTempoZone(listaRigheFrameCalc)
                const aggiungiTempoZone = () => tempoZoneNuoto.push({settimana: eventiSelezionati[c].start.getWeek(), num: funzioniNuoto.sommaZone(addOggettoZone(), tempoZone)})
                if(c>0) {
                    if(eventiSelezionati[c-1].start.getWeek()!==eventiSelezionati[c].start.getWeek()) {
                        aggiungiTempoTot()
                        aggiungiRecTot()
                        aggiungiDistanzaTot()
                        aggiungiTempoZone()
                    } else {
                        if(tempoTotNuoto.lengh<1) {
                            aggiungiTempoTot()
                            aggiungiRecTot()
                            aggiungiDistanzaTot()
                            aggiungiTempoZone()
                        } else {
                            console.log(tempoTotNuoto.length)
                            /* if(tempoTotNuoto.lengh>0) { */
                                tempoTotNuoto[tempoTotNuoto.length-1].num += funzioniNuoto.calcTempoTot(listaRigheFrameCalc)
                                recTotNuoto[recTotNuoto.length-1].num += funzioniNuoto.calcRecTot(listaRigheFrameCalc)
                                distTotNuoto[distTotNuoto.length-1].num += funzioniNuoto.calcDistanzaTot(listaRigheFrameCalc)
                                funzioniNuoto.sommaZone(tempoZoneNuoto[tempoZoneNuoto.length-1].num, tempoZone)
                            /* } */
                            console.log(tempoTotNuoto)
                        }
                    }
                } else {
                    aggiungiTempoTot()
                    aggiungiRecTot()
                    aggiungiDistanzaTot()
                    aggiungiTempoZone()
                }
    
            } else if(framework.tipoPerSelect==="palestra") {
                tabDaAggiungere.push(<h4>{t('scrivi-framework:ciclismo:ciclismo')}</h4>)
                tabDaAggiungere.push(<TabPalestraDragNDrop listaRighe={listaRigheFrame} />)
            } else if(framework.tipoPerSelect==="combinati_tri") {
                tabDaAggiungere.push(<h4>{t('scrivi-framework:palestra:palestra')}</h4>)
                tabDaAggiungere.push(<TabCombinatiTriDragNDrop listaRighe={listaRigheFrame} />)
            } else if(framework.tipoPerSelect==="altri") {
                tabDaAggiungere.push(<h4>{t('scrivi-framework:sport:altri')}</h4>)
                tabDaAggiungere.push(<TabSportDragNDrop listaRighe={listaRigheFrame} />)
            }
    
            if(c>0) {
                if(eventiSelezionati[c-1].start.getDay()!==eventiSelezionati[c].start.getDay()
                || eventiSelezionati[c-1].start.getWeek()!==eventiSelezionati[c].start.getWeek()) {
                    listaStampaWorkouts.push(<div style={{breakInside: "avoid"}}>
                        <h3>{eventiSelezionati[c].start.toISOString()}</h3>
                        {tabDaAggiungere}
                    </div>)
                } else {
                    listaStampaWorkouts.push(<div style={{marginTop: "3vh", breakInside: "avoid"}}>
                        {tabDaAggiungere}
                    </div>)
                }
            } else {
                listaStampaWorkouts.push(<div style={{breakInside: "avoid"}}>
                    <h3>{eventiSelezionati[c].start.toISOString()}</h3>
                    {tabDaAggiungere}
                </div>)
            }
    
        }
    
        // ciclismo
        const densitaCicl = []
        const tempoTotCiclConRec = []
        const wltCicl = []
    
        const trimpCiclAerobic = []
        const trimpCiclMixed = []
        const trimpCiclAnaerobic = []
        const trimpCiclTotal = []
        const trimpCiclMin = []
        for(let c=0;c<tempoTotCicl.length;c++) {
            densitaCicl.push(recTotCicl[c].num/tempoTotCicl[c].num*100)
            tempoTotCiclConRec.push(tempoTotCicl[c].num+recTotCicl[c].num)
            wltCicl.push(sommaWltCicl[c].num/contaWorkoutCicl[c].num)
    
            trimpCiclAerobic.push((tempoZoneCicl[c].num.zona1+tempoZoneCicl[c].num.zona2)/60)
            trimpCiclMixed.push((tempoZoneCicl[c].num.zona3+tempoZoneCicl[c].num.zona4)/60*2)
            trimpCiclAnaerobic.push((tempoZoneCicl[c].num.zona5+tempoZoneCicl[c].num.zona6+tempoZoneCicl[c].num.zona7)/60*3)
            trimpCiclTotal.push(trimpCiclAerobic[trimpCiclAerobic.length-1]+trimpCiclMixed[trimpCiclMixed.length-1]
                +trimpCiclAnaerobic[trimpCiclAnaerobic.length-1])
            trimpCiclMin.push(trimpCiclTotal[trimpCiclTotal.length-1]/tempoTotCicl[c].num/60)
        }
    
        // corsa
        const velMediaCorsa = []
        const passoMedioCorsa = []
        const densitaCorsa = []
        const tempoTotCorsaConRec = []
        const wltCorsa = []
        const wlsCorsa = []
    
        const trimpCorsaAerobic = []
        const trimpCorsaMixed = []
        const trimpCorsaAnaerobic = []
        const trimpCorsaTotal = []
        const trimpCorsaMin = []
        for(let c=0;c<tempoTotCorsa.length;c++) {
            const velMedia = distTotCorsa[c].num/tempoTotCorsa[c].num
            velMediaCorsa.push(velMedia)
            passoMedioCorsa.push(1000/velMedia)
            densitaCorsa.push(recTotCorsa[c].num/tempoTotCorsa[c].num*100)
            tempoTotCorsaConRec.push(tempoTotCorsa[c].num+recTotCorsa[c].num)
            wltCorsa.push(passoCorsa/passoMedioCorsa[passoMedioCorsa.length-1])
            wlsCorsa.push(Math.pow(wltCorsa[wltCorsa.length-1], 3)*tempoTotCorsa[c].num/3600*100)
    
            trimpCorsaAerobic.push((tempoZoneCorsa[c].num.zona1+tempoZoneCorsa[c].num.zona2)/60)
            trimpCorsaMixed.push((tempoZoneCorsa[c].num.zona3+tempoZoneCorsa[c].num.zona4)/60*2)
            trimpCorsaAnaerobic.push((tempoZoneCorsa[c].num.zona5+tempoZoneCorsa[c].num.zona6)/60*3)
            trimpCorsaTotal.push(trimpCorsaAerobic[trimpCorsaAerobic.length-1]+trimpCorsaMixed[trimpCorsaMixed.length-1]
                +trimpCorsaAnaerobic[trimpCorsaAnaerobic.length-1])
            trimpCorsaMin.push(trimpCorsaTotal[trimpCorsaTotal.length-1]/tempoTotCorsa[c].num/60)
        }
    
        // nuoto
        const velMediaNuoto = []
        const passoMedioNuoto = []
        const densitaNuoto = []
        const tempoTotNuotoConRec = []
        const wltNuoto = []
        const wlsNuoto = []
    
        const trimpNuotoAerobic = []
        const trimpNuotoMixed = []
        const trimpNuotoAnaerobic = []
        const trimpNuotoTotal = []
        const trimpNuotoMin = []
        for(let c=0;c<tempoTotNuoto.length;c++) {
            const velMedia = distTotNuoto[c].num/tempoTotNuoto[c].num
            velMediaNuoto.push(velMedia)
            passoMedioNuoto.push(100/velMedia)
            densitaNuoto.push(recTotNuoto/tempoTotNuoto*100)
            tempoTotNuotoConRec.push(tempoTotNuoto[c].num+recTotNuoto[c].num)
            wltNuoto.push(passoNuoto/passoMedioNuoto[passoMedioNuoto.length-1])
            wlsNuoto.push(Math.pow(wltNuoto[wltNuoto.length-1], 3)*tempoTotNuoto[c].num/3600*100)
    
            trimpNuotoAerobic.push((tempoZoneNuoto[c].num.zona1+tempoZoneNuoto[c].num.zona2)/60)
            trimpNuotoMixed.push((tempoZoneNuoto[c].num.zona3+tempoZoneNuoto[c].num.zona4)/60*2)
            trimpNuotoAnaerobic.push((tempoZoneNuoto[c].num.zona5+tempoZoneNuoto[c].num.zona6)/60*3)
            trimpNuotoTotal.push(trimpNuotoAerobic[trimpNuotoAerobic.length-1]+trimpNuotoMixed[trimpNuotoMixed.length-1]
                +trimpNuotoAnaerobic[trimpNuotoAnaerobic.length-1])
            trimpNuotoMin.push(trimpNuotoTotal[trimpNuotoTotal.length-1]/tempoTotNuoto[c].num/60)
        }

        // totaloni

        // ciclismo
        let ciclTotaloneTempo = 0
        let ciclTotaloneRec = 0
        const ciclTotaloneTempoZone = {zona1: 0, zona2: 0, zona3: 0, zona4: 0, zona5: 0, zona6: 0, zona7: 0}
        let ciclTotaloneSommaWlt = 0
        let ciclTotaloneWls = 0
        for(let c=0;c<tempoTotCicl.length;c++) {
            ciclTotaloneTempo += tempoTotCicl[c].num
            ciclTotaloneRec += recTotCicl[c].num
            funzioniCicl.sommaZone(ciclTotaloneTempoZone, tempoZoneCicl[c].num)
            ciclTotaloneSommaWlt += wltCicl[c]
            ciclTotaloneWls += sommaWlsCicl[c].num
        }
        const ciclTotaloneTempoConRec = ciclTotaloneTempo+ciclTotaloneRec
        const ciclTotaloneDensita = ciclTotaloneRec/ciclTotaloneTempo*100
        const ciclTotaloneTrimpAerobic = (ciclTotaloneTempoZone.zona1+ciclTotaloneTempoZone.zona2)/60
        const ciclTotaloneTrimpMixed = (ciclTotaloneTempoZone.zona3+ciclTotaloneTempoZone.zona4)/60*2
        const ciclTotaloneTrimpAnaerobic = (ciclTotaloneTempoZone.zona5+ciclTotaloneTempoZone.zona6+ciclTotaloneTempoZone.zona7)/60*3
        const ciclTotaloneTrimpTotal = ciclTotaloneTrimpAerobic+ciclTotaloneTrimpMixed+ciclTotaloneTrimpAnaerobic
        const ciclTotaloneTrimpMin = ciclTotaloneTrimpTotal/ciclTotaloneTempo/60
        const ciclTotaloneWlt = ciclTotaloneSommaWlt/wltCicl.length

        // corsa
        let corsaTotaloneTempo = 0
        let corsaTotaloneRec = 0
        let corsaTotaloneDistanza = 0
        const corsaTotaloneTempoZone = {zona1: 0, zona2: 0, zona3: 0, zona4: 0, zona5: 0, zona6: 0}
        for(let c=0;c<tempoTotCorsa.length;c++) {
            corsaTotaloneTempo += tempoTotCorsa[c].num
            corsaTotaloneRec += recTotCorsa[c].num
            corsaTotaloneDistanza += distTotCorsa[c].num
            funzioniCorsa.sommaZone(corsaTotaloneTempoZone, tempoZoneCorsa[c].num)
        }
        const corsaTotaloneTempoConRec = corsaTotaloneTempo+corsaTotaloneRec
        const corsaTotaloneVelMedia = corsaTotaloneDistanza/corsaTotaloneTempo
        const corsaTotalonePassoMedio = 1000/corsaTotaloneVelMedia
        const corsaTotaloneWlt = passoCorsa/corsaTotalonePassoMedio
        const corsaTotaloneWls = Math.pow(corsaTotaloneWlt, 3)*corsaTotaloneTempo/3600*1100
        const corsaTotaloneDensita = corsaTotaloneRec/corsaTotaloneTempo*100
        const corsaTotaloneTrimpAerobic = (corsaTotaloneTempoZone.zona1+corsaTotaloneTempoZone.zona2)/60
        const corsaTotaloneTrimpMixed = (corsaTotaloneTempoZone.zona3+corsaTotaloneTempoZone.zona4)/60*2
        const corsaTotaloneTrimpAnaerobic = (corsaTotaloneTempoZone.zona5+corsaTotaloneTempoZone.zona6)/60*3
        const corsaTotaloneTrimpTotal = corsaTotaloneTrimpAerobic+corsaTotaloneTrimpMixed+corsaTotaloneTrimpAnaerobic
        const corsaTotaloneTrimpMin = corsaTotaloneTrimpTotal/corsaTotaloneTempo/60

        // nuoto
        let nuotoTotaloneTempo = 0
        let nuotoTotaloneRec = 0
        let nuotoTotaloneDistanza = 0
        const nuotoTotaloneTempoZone = {zona1: 0, zona2: 0, zona3: 0, zona4: 0, zona5: 0, zona6: 0, zona7: 0, zona8: 0}
        for(let c=0;c<tempoTotNuoto.length;c++) {
            nuotoTotaloneTempo += tempoTotNuoto[c].num
            nuotoTotaloneRec += recTotNuoto[c].num
            nuotoTotaloneDistanza += distTotNuoto[c].num
            funzioniNuoto.sommaZone(nuotoTotaloneTempoZone, tempoZoneNuoto[c].num)
        }
        const nuotoTotaloneTempoConRec = nuotoTotaloneTempo+nuotoTotaloneRec
        const nuotoTotaloneVelMedia = nuotoTotaloneDistanza/nuotoTotaloneTempo
        const nuotoTotalonePassoMedio = 1000/nuotoTotaloneVelMedia
        const nuotoTotaloneWlt = passoNuoto/nuotoTotalonePassoMedio
        const nuotoTotaloneWls = Math.pow(nuotoTotaloneWlt, 3)*nuotoTotaloneTempo/3600*1100
        const nuotoTotaloneDensita = nuotoTotaloneRec/nuotoTotaloneTempo*100
        const nuotoTotaloneTrimpAerobic = (nuotoTotaloneTempoZone.zona1+nuotoTotaloneTempoZone.zona2)/60
        const nuotoTotaloneTrimpMixed = (nuotoTotaloneTempoZone.zona3+nuotoTotaloneTempoZone.zona4)/60*2
        const nuotoTotaloneTrimpAnaerobic = (nuotoTotaloneTempoZone.zona5+nuotoTotaloneTempoZone.zona6)/60*3
        const nuotoTotaloneTrimpTotal = nuotoTotaloneTrimpAerobic+nuotoTotaloneTrimpMixed+nuotoTotaloneTrimpAnaerobic
        const nuotoTotaloneTrimpMin = nuotoTotaloneTrimpTotal/nuotoTotaloneTempo/60

        /* let settimanaIniziale = tempoTotCicl[0].settimana
        if(tempoTotCorsa.length>0) {
            if(tempoTotCorsa[0].settimana>tempoTotCicl[0].settimana) {
                settimanaIniziale = tempoTotCorsa[0].settimana
            }
            if(tempoTotNuoto[0].settimana>tempoTotCorsa[0].settimana) {
                settimanaIniziale = tempoTotNuoto[0].settimana
            }
        } */

        let listaPiuLunga = {lung: tempoTotCicl.length, settimana: tempoTotCicl.length>0 ? tempoTotCicl[0].settimana : 0}
        if(tempoTotCorsa.length>tempoTotCicl.length) {
            listaPiuLunga = {lung: tempoTotCorsa.length, settimana: tempoTotCorsa.length>0 ? tempoTotCorsa[0].settimana : 0}
        }
        if(tempoTotNuoto.length>tempoTotCorsa.length) {
            listaPiuLunga = {lung: tempoTotNuoto.length, settimana: tempoTotNuoto.length>0 ? tempoTotNuoto[0].settimana : 0}
        }

        
        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }
        const eventiWeek = eventiSelezionati.map(evento => evento.start.getWeek())
        const eventiWeekSingola = eventiWeek.filter(onlyUnique)

        const listaTabDatiWeek = []
        let tabella = []
        for(let c=0;c<eventiWeekSingola.length;c++) {
            const indexCicl = tempoTotCicl.findIndex(el => el.settimana===eventiWeekSingola[c])
            const indexCorsa = tempoTotCorsa.findIndex(el => el.settimana===eventiWeekSingola[c])
            const indexNuoto = tempoTotNuoto.findIndex(el => el.settimana===eventiWeekSingola[c])

            let wltCiclSingolo = 0
            let wlsCiclSingolo = 0
            let tempoTotCiclSingolo = 0
            let recTotCiclSingolo = 0
            let tempoTotCiclConRecSingolo = 0
            let densitaCiclSingolo = 0
            let tempoZoneCiclSingolo = 0
            let trimpCiclAerobicSingolo = 0
            let trimpCiclMixedSingolo = 0
            let trimpCiclAnaerobicSingolo = 0
            let trimpCiclTotalSingolo = 0
            let trimpCiclMinSingolo = 0
            if(indexCicl>=0) {
                wltCiclSingolo = wltCicl[indexCicl]
                wlsCiclSingolo = sommaWlsCicl[indexCicl].num
                tempoTotCiclSingolo = tempoTotCicl[indexCicl].num
                recTotCiclSingolo = recTotCicl[indexCicl].num
                tempoTotCiclConRecSingolo = tempoTotCiclConRec[indexCicl]
                densitaCiclSingolo = densitaCicl[indexCicl]
                tempoZoneCiclSingolo = tempoZoneCicl[indexCicl].num
                trimpCiclAerobicSingolo = trimpCiclAerobic[indexCicl]
                trimpCiclMixedSingolo = trimpCiclMixed[indexCicl]
                trimpCiclAnaerobicSingolo = trimpCiclAnaerobic[indexCicl]
                trimpCiclTotalSingolo = trimpCiclTotal[indexCicl]
                trimpCiclMinSingolo = trimpCiclMin[indexCicl]
            }

            let wltCorsaSingolo = 0
            let wlsCorsaSingolo = 0
            let passoMedioCorsaSingolo = 0
            let tempoTotCorsaSingolo = 0
            let recTotCorsaSingolo = 0
            let tempoTotCorsaConRecSingolo = 0
            let distTotCorsaSingolo = 0
            let densitaCorsaSingolo = 0
            let tempoZoneCorsaSingolo = 0
            let trimpCorsaAerobicSingolo = 0
            let trimpCorsaMixedSingolo = 0
            let trimpCorsaAnaerobicSingolo = 0
            let trimpCorsaTotalSingolo = 0
            let trimpCorsaMinSingolo = 0
            if(indexCorsa>=0) {
                wltCorsaSingolo = wltCorsa[indexCorsa]
                wlsCorsaSingolo = wlsCorsa[indexCorsa]
                passoMedioCorsaSingolo = passoMedioCorsa[indexCorsa]
                tempoTotCorsaSingolo = tempoTotCorsa[indexCorsa].num
                recTotCorsaSingolo = recTotCorsa[indexCorsa].num
                tempoTotCorsaConRecSingolo = tempoTotCorsaConRec[indexCorsa]
                distTotCorsaSingolo = distTotCorsa[indexCorsa].num
                densitaCorsaSingolo = densitaCorsa[indexCorsa]
                tempoZoneCorsaSingolo = tempoZoneCorsa[indexCorsa].num
                trimpCorsaAerobicSingolo = trimpCorsaAerobic[indexCorsa]
                trimpCorsaMixedSingolo = trimpCorsaMixed[indexCorsa]
                trimpCorsaAnaerobicSingolo = trimpCorsaAnaerobic[indexCorsa]
                trimpCorsaTotalSingolo = trimpCorsaTotal[indexCorsa]
                trimpCorsaMinSingolo = trimpCorsaMin[indexCorsa]
            }

            let wltNuotoSingolo = 0
            let wlsNuotoSingolo = 0
            let passoMedioNuotoSingolo = 0
            let tempoTotNuotoSingolo = 0
            let recTotNuotoSingolo = 0
            let tempoTotNuotoConRecSingolo = 0
            let distTotNuotoSingolo = 0
            let densitaNuotoSingolo = 0
            let tempoZoneNuotoSingolo = 0
            let trimpNuotoAerobicSingolo = 0
            let trimpNuotoMixedSingolo = 0
            let trimpNuotoAnaerobicSingolo = 0
            let trimpNuotoTotalSingolo = 0
            let trimpNuotoMinSingolo = 0
            if(indexNuoto>=0) {
                wltNuotoSingolo = wltNuoto[indexNuoto]
                wlsNuotoSingolo = wlsNuoto[indexNuoto]
                passoMedioNuotoSingolo = passoMedioNuoto[indexNuoto]
                tempoTotNuotoSingolo = tempoTotNuoto[indexNuoto].num
                recTotNuotoSingolo = recTotNuoto[indexNuoto].num
                tempoTotNuotoConRecSingolo = tempoTotNuotoConRec[indexNuoto]
                distTotNuotoSingolo = distTotNuoto[indexNuoto].num
                densitaNuotoSingolo = densitaNuoto[indexNuoto]
                tempoZoneNuotoSingolo = tempoZoneNuoto[indexNuoto].num
                trimpNuotoAerobicSingolo = trimpNuotoAerobic[indexNuoto]
                trimpNuotoMixedSingolo = trimpNuotoMixed[indexNuoto]
                trimpNuotoAnaerobicSingolo = trimpNuotoAnaerobic[indexNuoto]
                trimpNuotoTotalSingolo = trimpNuotoTotal[indexNuoto]
                trimpNuotoMinSingolo = trimpNuotoMin[indexNuoto]
            }

            const aggiungiPagina = () => listaTabDatiWeek.push(<div style={{display: "grid", gridColumnGap: "10vw",
            gridTemplateColumns: "auto auto", alignContent: "center", marginTop: "8vh", pageBreakBefore: "always"}}>{tabella}</div>)
            
            const tabellaSingola = <TabDatiWeek settimana={t('esporta:report:tab-dati-week:settimana')+" "+
                (eventiWeekSingola[c]-(eventiWeekSingola[c]-1-c))}
            // ciclismo
            wltCicl={wltCiclSingolo} wlsCicl={wlsCiclSingolo}
            tempoTotCicl={tempoTotCiclSingolo} recTotCicl={recTotCiclSingolo} tempoTotCiclConRec={tempoTotCiclConRecSingolo}
            densitaCicl={densitaCiclSingolo} tempoZoneCicl={tempoZoneCiclSingolo} trimpCiclAerobic={trimpCiclAerobicSingolo}
            trimpCiclMixed={trimpCiclMixedSingolo} trimpCiclAnaerobic={trimpCiclAnaerobicSingolo}
            trimpCiclTotal={trimpCiclTotalSingolo} trimpCiclMin={trimpCiclMinSingolo}
            // corsa
            wltCorsa={wltCorsaSingolo} wlsCorsa={wlsCorsaSingolo} tempoTotCorsa={tempoTotCorsaSingolo}
            recTotCorsa={recTotCorsaSingolo} tempoTotCorsaConRec={tempoTotCorsaConRecSingolo} distTotCorsa={distTotCorsaSingolo}
            densitaCorsa={densitaCorsaSingolo} tempoZoneCorsa={tempoZoneCorsaSingolo} trimpCorsaAerobic={trimpCorsaAerobicSingolo}
            trimpCorsaMixed={trimpCorsaMixedSingolo} trimpCorsaAnaerobic={trimpCorsaAnaerobicSingolo}
            trimpCorsaTotal={trimpCorsaTotalSingolo} trimpCorsaMin={trimpCorsaMinSingolo} passoMedioCorsa={passoMedioCorsaSingolo}
            // nuoto
            wltNuoto={wltNuotoSingolo} wlsNuoto={wlsNuotoSingolo} passoMedioNuoto={passoMedioNuotoSingolo}
            tempoTotNuoto={tempoTotNuotoSingolo} recTotNuoto={recTotNuotoSingolo} tempoTotNuotoConRec={tempoTotNuotoConRecSingolo}
            distTotNuoto={distTotNuotoSingolo} densitaNuoto={densitaNuotoSingolo} tempoZoneNuoto={tempoZoneNuotoSingolo}
            trimpNuotoAerobic={trimpNuotoAerobicSingolo} trimpNuotoMixed={trimpNuotoMixedSingolo}
            trimpNuotoAnaerobic={trimpNuotoAnaerobicSingolo} trimpNuotoTotal={trimpNuotoTotalSingolo}
            trimpNuotoMin={trimpNuotoMinSingolo} />

            const tabellaTotali = <TabDatiWeek settimana={t('esporta:report:tab-dati-week:totale-delle-settimane')}
            // ciclismo
            wltCicl={ciclTotaloneWlt} wlsCicl={ciclTotaloneWls} tempoTotCicl={ciclTotaloneTempo}
            recTotCicl={ciclTotaloneRec} tempoTotCiclConRec={ciclTotaloneTempoConRec} densitaCicl={ciclTotaloneDensita}
            tempoZoneCicl={ciclTotaloneTempoZone} trimpCiclAerobic={ciclTotaloneTrimpAerobic} trimpCiclMixed={ciclTotaloneTrimpMixed}
            trimpCiclAnaerobic={ciclTotaloneTrimpAnaerobic} trimpCiclTotal={ciclTotaloneTrimpTotal}
            trimpCiclMin={ciclTotaloneTrimpMin}
            // corsa
            wltCorsa={corsaTotaloneWlt} wlsCorsa={corsaTotaloneWls} tempoTotCorsa={corsaTotaloneTempo}
            recTotCorsa={corsaTotaloneRec} tempoTotCorsaConRec={corsaTotaloneTempoConRec} distTotCorsa={corsaTotaloneDistanza}
            densitaCorsa={corsaTotaloneDensita} tempoZoneCorsa={corsaTotaloneTempoZone} trimpCorsaAerobic={corsaTotaloneTrimpAerobic}
            trimpCorsaMixed={corsaTotaloneTrimpMixed} trimpCorsaAnaerobic={corsaTotaloneTrimpAnaerobic}
            trimpCorsaTotal={corsaTotaloneTrimpTotal} trimpCorsaMin={corsaTotaloneTrimpMin} passoMedioCorsa={corsaTotalonePassoMedio}
            // nuoto
            wltNuoto={nuotoTotaloneWlt} wlsNuoto={nuotoTotaloneWls} passoMedioNuoto={nuotoTotalonePassoMedio}
            tempoTotNuoto={nuotoTotaloneTempo} recTotNuoto={nuotoTotaloneRec} tempoTotNuotoConRec={nuotoTotaloneTempoConRec}
            distTotNuoto={nuotoTotaloneDistanza} densitaNuoto={nuotoTotaloneDensita} tempoZoneNuoto={nuotoTotaloneTempoZone}
            trimpNuotoAerobic={nuotoTotaloneTrimpAerobic} trimpNuotoMixed={nuotoTotaloneTrimpMixed}
            trimpNuotoAnaerobic={nuotoTotaloneTrimpAnaerobic} trimpNuotoTotal={nuotoTotaloneTrimpTotal}
            trimpNuotoMin={nuotoTotaloneTrimpMin} />
            
            if(c%2===0 && c!==0) {
                aggiungiPagina()
                tabella = [tabellaSingola]
            } else {
                tabella.push(tabellaSingola)
            }
            if(c===eventiWeekSingola.length-1) {
                if(tabella.length<2) {
                    tabella.push(tabellaTotali)
                    aggiungiPagina()
                } else {
                    aggiungiPagina()
                    tabella = [tabellaTotali]
                    aggiungiPagina()
                }
            }
        }
        
        /* const listaTabDatiWeek = []
        let tabella = []
        for(let c=0;c<listaPiuLunga.lung;c++) {
            const aggiungiPagina = () => listaTabDatiWeek.push(<div style={{display: "flex", justifyContent: "space-around", alignItems: "center", pageBreakBefore: "always"}}>{tabella}</div>)
            
            const tabellaSingola = <TabDatiWeek settimana={listaPiuLunga.settimana-(listaPiuLunga.settimana-1-c)} />
            
            if(c%2===0 && c!==0) {
                aggiungiPagina()
                tabella = [tabellaSingola]
            } else {
                tabella.push(tabellaSingola)
            }
            if(c===listaPiuLunga.lung-1) {
                aggiungiPagina()
            }
        } */

        return {listaStampaWorkouts, listaTabDatiWeek}

    }

    const stampa = () => {
        const contenuto = paginaDaStampare.current
        const pagina = frameStampa.current.contentWindow
        pagina.document.open()
        pagina.document.write(`<style>
            @media print {
                @page {
                    margin: 1cm;
                    size: landscape;
                }
                /* body {
                    margin: 1.6cm;
                } */
            }

            .containerTab {
                display: flex;
            }
            
            .containerTab div span {
                display: block;
                margin-left: auto;
                margin-right: auto;
            }
            
            .inputRinomina {
                display: block;
                margin-left: auto;
                margin-right: auto;
                text-align: center;
                width: 90%;
                border: 0px;
                outline: none;
            }
            
            .inputRinomina:focus {
                border: 0px;
            }

            .zone-ciclismo7 table {
                width: 100%;
                border-collapse: collapse;
            }
            
            .zone-ciclismo7 table tr td {
                border: 1px solid black;
                text-align: center;
                font-size: 11px;
                padding: 2px;
            }

            .tab-all-week {
                margin-left: auto;
                margin-right: auto;
                margin-top: 8vh;
                width: 100%;
                border: solid 1px black;
                border-collapse: collapse;
                text-align: center;
            }
            
            .tab-all-week tr td {
                border: solid 1px black;
            }
            .tab-all-week tr th {
                border: solid 1px black;
            }

          </style>`+contenuto.innerHTML)
        pagina.document.close()
        pagina.focus()
        pagina.print()
    }

    const tabelleReport = stampaTabelleReport()

    return (
        <div>
            <div className={styles.containerBottoni}>
                <Button variant="contained" onClick={() => setReport(!report)}>{t('esporta:report:indietro')}</Button>
                <Button variant="contained" onClick={stampa}>{t('esporta:report:stampa')}</Button>
            </div>
            
            <div ref={paginaDaStampare}>
                {tabelleReport.listaStampaWorkouts}
                {tabelleReport.listaTabDatiWeek}
                {tabellone ? 
                <>
                    <div style={{pageBreakAfter: "always"}}></div>
                    {fc!==0 && ftp!==0  ? <div>
                        <h3>{t('scrivi-framework:ciclismo:ciclismo')}</h3>
                        <ZoneCiclismo7 zoneCalcCiclismo={zoneCalcCiclismo} />
                    </div> : null}
                    {passoCorsa!==0 ? <div>
                        <h3>{t('scrivi-framework:corsa:corsa')}</h3>
                        <ZoneCorsa zoneCalcCorsa={zoneCalcCorsa} />
                    </div> : null}
                    {passoNuoto!==0 ? <div>
                        <h3>{t('scrivi-framework:nuoto:nuoto')}</h3>
                        <ZoneNuoto zoneCalcNuoto={zoneCalcNuoto} />
                    </div> : null}
                </> : null}
            </div>
            <iframe ref={frameStampa} style={{display: "none"}}></iframe>
        </div>
    )
}

export default Report

Date.prototype.getWeek = function() {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

