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

import { calcola7Zone, calcolaZoneCorsa, calcolaZoneNuoto } from '../../../utils/funzioni'

import * as funzioniCicl from './tabSport/funzioniTotaliCicl'
import * as funzioniCorsa from './tabSport/funzioniTotaliCorsa'
import * as funzioniNuoto from './tabSport/funzioniTotaliNuoto'

import ZoneCiclismo7 from './tabZone/ZoneCiclismo7'
import ZoneCorsa from './tabZone/ZoneCorsa'
import ZoneNuoto from './tabZone/ZoneNuoto'

import Intestazione from './logo/intestazione_cybertest.png'
import PrimaPaginaReport from './primaPaginaReport/PrimaPaginaReport'

import styles from './Report.module.css'
import './Report.css'

import elaboraCiclismo from '../../../utils/funzioniCiclismo'
import elaboraCorsa from '../../../utils/funzioniCorsa'
import elaboraNuoto from '../../../utils/funzioniNuoto'

import * as GraficoWeek from './grafici/settimana/GraficoWeek'
import * as GraficoTot from './grafici/totali/GraficoTot'

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


    const getWeeks = (arr,criteria = "settimana") => {

        const newObj = arr.map(el => { return {settimana: el.start.getWeek()}}).reduce(function (acc, currentValue) {
            if (!acc[currentValue[criteria]]) {
              acc[currentValue[criteria]] = [];
            }
            acc[currentValue[criteria]].push(currentValue);
            return acc;
          }, {});
    
         return Object.keys(newObj)
    }

    const stampaTabelleReport = () => {

        const listaStampaWorkouts = []
       
        const weeks = getWeeks(eventiSelezionati)

        const ciclismo = elaboraCiclismo(listaFramework,eventiSelezionati,ftp,fc)
        const corsa = elaboraCorsa(listaFramework,eventiSelezionati,passoCorsa)
        const nuoto = elaboraNuoto(listaFramework,eventiSelezionati,passoNuoto)        
       
        const eventi = weeks.map(w => {

            const c = ciclismo.eventiCiclismoGrouped.find(el => el.settimana === w)
            const cor = corsa.eventiCorsaGrouped.find(el => el.settimana === w)
            const n = nuoto.eventiNuotoGrouped.find(el => el.settimana === w)

            return {settimana: w, ciclismo: c, corsa: cor, nuoto: n}
        })
    
        for(let c=0;c<eventiSelezionati.length;c++) {
            //const framework = listaFramework.find(frame => frame.id===eventiSelezionati[c]._def.sourceId)

            console.log(rangeDateSelect)
    
            let framework = listaFramework.find(frame => frame.id===eventiSelezionati[c].extendedProps.mdId)
            /* if(!framework) continue; */
            if(!framework) {
                if(eventiSelezionati[c].extendedProps.mdId==999) {
                    framework = {tipoPerSelect: "MagneticDays", listaRighe: []}
                } else {
                    continue
                }
            }
            
            const listaRigheFrame = framework.listaRighe.map(riga => {return {...riga}})
            
            let listaRigheFrameCalc = []
            let tabDaAggiungere = []

             if(framework.tipoPerSelect==="ciclismo") {

                const datiCiclismo = ciclismo.calcolaDatiCiclismo(listaRigheFrame,ftp,fc)  
                listaRigheFrameCalc = datiCiclismo.rowsCalc
                tabDaAggiungere.push(<h4>{t('scrivi-framework:ciclismo:ciclismo')}</h4>)
                tabDaAggiungere.push(<TabCiclismoDragNDrop listaRighe={datiCiclismo.rowsCalc} />)
    
            } else if(framework.tipoPerSelect==="corsa") {

                const datiCorsa = corsa.calcolaDatiCorsa(listaRigheFrame, passoCorsa)
                listaRigheFrameCalc = datiCorsa.rowsCalc
                tabDaAggiungere.push(<h4>{t('scrivi-framework:corsa:corsa')}</h4>)
                tabDaAggiungere.push(<TabCorsaDragNDrop listaRighe={listaRigheFrameCalc} />)
            
            } else if(framework.tipoPerSelect==="nuoto") {

                const datiNuoto = nuoto.calcolaDatiNuoto(listaRigheFrame, passoNuoto)
                listaRigheFrameCalc = datiNuoto.rowsCalc
                tabDaAggiungere.push(<h4>{t('scrivi-framework:nuoto:nuoto')}</h4>)
                tabDaAggiungere.push(<TabNuotoDragNDrop listaRighe={listaRigheFrameCalc} />)
            
            } else if(framework.tipoPerSelect==="palestra") {
                tabDaAggiungere.push(<h4>{t('scrivi-framework:ciclismo:ciclismo')}</h4>)
                tabDaAggiungere.push(<TabPalestraDragNDrop listaRighe={listaRigheFrame} />)
            } else if(framework.tipoPerSelect==="combinati_tri") {
                tabDaAggiungere.push(<h4>{t('scrivi-framework:palestra:palestra')}</h4>)
                tabDaAggiungere.push(<TabCombinatiTriDragNDrop listaRighe={listaRigheFrame} />)
            } else if(framework.tipoPerSelect==="altri") {
                tabDaAggiungere.push(<h4>{t('scrivi-framework:sport:altri')}</h4>)
                tabDaAggiungere.push(<TabSportDragNDrop listaRighe={listaRigheFrame} />)
            } else if(framework.tipoPerSelect==="MagneticDays") {
                tabDaAggiungere.push(<h4>Magnetic Days</h4>)
            } else if(framework.tipoPerSelect==="gara") {
                tabDaAggiungere.push(<h4>{t('scrivi-framework:gara:gara')}</h4>)
                tabDaAggiungere.push(<div style={{whiteSpace: "pre-wrap"}}>{framework.testo}</div>)
            }

            const dataConOSenzaOrario = evento => evento.allDay ? evento.start.toLocaleDateString() :
            evento.start.toLocaleDateString()+" "+t('esporta:report:prima-pagina:dalle')+" "+evento.start.toLocaleTimeString()
            +" "+t('esporta:report:prima-pagina:alle')+" "+evento.end.toLocaleTimeString()
    
            if(c>0) {
                if(eventiSelezionati[c-1].start.getDay()!==eventiSelezionati[c].start.getDay()
                || eventiSelezionati[c-1].start.getWeek()!==eventiSelezionati[c].start.getWeek()) {
                    listaStampaWorkouts.push(<div style={{breakInside: "avoid"}}>
                        <h3>{dataConOSenzaOrario(eventiSelezionati[c])}</h3>
                        {tabDaAggiungere}
                    </div>)
                } else {
                    listaStampaWorkouts.push(<div style={{marginTop: "3vh", breakInside: "avoid"}}>
                        {tabDaAggiungere}
                    </div>)
                }
            } else {
                listaStampaWorkouts.push(<div style={{breakInside: "avoid"}}>
                    <h3>{dataConOSenzaOrario(eventiSelezionati[c])}</h3>
                    {tabDaAggiungere}
                </div>)
            }
    
        }
    
        let listaTabDatiWeek = []
        let tabella = []
        let contaTabelle = 0

        const aggiungiPagina = () => listaTabDatiWeek.push(<div style={{display: "grid", gridColumnGap: "5vw",
        gridTemplateColumns: "auto auto", alignContent: "center", marginTop: "8vh", pageBreakBefore: "always"}}>{tabella}</div>)

        for(let c=0;c<eventi.length;c++) {
            
            const week = eventi[c]

            // (eventiWeekSingola[c]-(eventiWeekSingola[c]-1-c))
            const tabellaSingola = <TabDatiWeek settimana={t('esporta:report:tab-dati-week:settimana')+" "+(contaTabelle+1)}
            // ciclismo
            wltCicl={(week.ciclismo) ? week.ciclismo.wltWorkoutTot: null} 
            wlsCicl={(week.ciclismo) ? week.ciclismo.wlsWorkoutTot: null}
            tempoTotCicl={(week.ciclismo) ? week.ciclismo.tempoTot: null} 
            recTotCicl={(week.ciclismo) ? week.ciclismo.recTot: null} 
            tempoTotCiclConRec={(week.ciclismo) ? week.ciclismo.tempoTotCiclConRec: null}
            densitaCicl={(week.ciclismo) ? week.ciclismo.densitaCicl: null} 
            tempoZoneCicl={(week.ciclismo) ? week.ciclismo.tempoZone: null} 
            trimpCiclAerobic={(week.ciclismo) ? week.ciclismo.trimpCiclAerobic: null}
            trimpCiclMixed={(week.ciclismo) ? week.ciclismo.trimpCiclMixed: null} 
            trimpCiclAnaerobic={(week.ciclismo) ? week.ciclismo.trimpCiclAnaerobic: null}
            trimpCiclTotal={(week.ciclismo) ? week.ciclismo.trimpCiclTotal: null} 
            trimpCiclMin={(week.ciclismo) ? week.ciclismo.trimpCiclMin: null} 
            // corsa
            tempoTotCorsa={(week.corsa) ? week.corsa.tempoTot : null}
            recTotCorsa={(week.corsa) ? week.corsa.recTot : null}
            distTotCorsa={(week.corsa) ? week.corsa.distTot : null}
            tempoZoneCorsa={(week.corsa) ? week.corsa.tempoZone : null}
            velMedia={(week.corsa) ? week.corsa.velMedia : null}
            passoMedioCorsa={(week.corsa) ? week.corsa.passoMedioCorsa : null}
            densitaCorsa={(week.corsa) ? week.corsa.densitaCorsa : null}
            tempoTotCorsaConRec={(week.corsa) ? week.corsa.tempoTotCorsaConRec : null} 
            wltCorsa={(week.corsa) ? week.corsa.wltCorsa : null}
            wlsCorsa={(week.corsa) ? week.corsa.wlsCorsa : null}
            trimpCorsaAerobic={(week.corsa) ? week.corsa.trimpCorsaAerobic : null}
            trimpCorsaMixed={(week.corsa) ? week.corsa.trimpCorsaMixed : null}
            trimpCorsaAnaerobic={(week.corsa) ? week.corsa.trimpCorsaAnaerobic : null} 
            trimpCorsaTotal={(week.corsa) ? week.corsa.trimpCorsaTotal : null}
            trimpCorsaMin={(week.corsa) ? week.corsa.trimpCorsaMin : null}   

            // nuoto
            tempoTotNuoto={(week.nuoto) ? week.nuoto.tempoTot : null}
            recTotNuoto={(week.nuoto) ? week.nuoto.recTot : null}
            distTotNuoto={(week.nuoto) ? week.nuoto.distTot : null}
            tempoZoneNuoto={(week.nuoto) ? week.nuoto.tempoZone : null}
            velMedia={(week.nuoto) ? week.nuoto.velMedia : null}
            passoMedioNuoto={(week.nuoto) ? week.nuoto.passoMedioNuoto : null}
            densitaNuoto={(week.nuoto) ? week.nuoto.densitaNuoto : null}
            tempoTotNuotoConRec={(week.nuoto) ? week.nuoto.tempoTotNuotoConRec : null} 
            wltNuoto={(week.nuoto) ? week.nuoto.wltNuoto : null}
            wlsNuoto={(week.nuoto) ? week.nuoto.wlsNuoto : null}
            trimpNuotoAerobic={(week.nuoto) ? week.nuoto.trimpNuotoAerobic : null}
            trimpNuotoMixed={(week.nuoto) ? week.nuoto.trimpNuotoMixed : null}
            trimpNuotoAnaerobic={(week.nuoto) ? week.nuoto.trimpNuotoAnaerobic : null} 
            trimpNuotoTotal={(week.nuoto) ? week.nuoto.trimpNuotoTotal : null}
            trimpNuotoMin={(week.nuoto) ? week.nuoto.trimpNuotoMin : null} />

            if(contaTabelle%2===0 && contaTabelle!==0) {
                aggiungiPagina()
                tabella = [tabellaSingola]
            } else {
                tabella.push(tabellaSingola)
            }
            contaTabelle++
        }

        /* const tabGraficiWeek = []
        tabGraficiWeek.push(<GraficoWeek.CiclTempoZone eventi={eventi} />)
        tabGraficiWeek.push(<GraficoWeek.CorsaTempoZone eventi={eventi} />)
        tabGraficiWeek.push(<GraficoWeek.NuotoTempoZone eventi={eventi} />)
        tabGraficiWeek.push(<GraficoWeek.CiclTrimp eventi={eventi} />)
        tabGraficiWeek.push(<GraficoWeek.CorsaTrimp eventi={eventi} />)
        tabGraficiWeek.push(<GraficoWeek.NuotoTrimp eventi={eventi} />) */

        const tabGraficiWeek = [<div className="containerGrafico">
            <div><span>{(t('scrivi-framework:ciclismo:ciclismo')+" "+t('esporta:report:tab-dati-week:settimana')).toUpperCase()}
            </span><GraficoWeek.CiclTempoZone eventi={eventi} /></div>
            
            <div><span>{(t('scrivi-framework:corsa:corsa')+" "+t('esporta:report:tab-dati-week:settimana')).toUpperCase()}
            </span><GraficoWeek.CorsaTempoZone eventi={eventi} /></div>
            
            <div><span>{(t('scrivi-framework:nuoto:nuoto')+" "+t('esporta:report:tab-dati-week:settimana')).toUpperCase()}
            </span><GraficoWeek.NuotoTempoZone eventi={eventi} /></div>
            
            <div><span>{(t('scrivi-framework:ciclismo:ciclismo')+" TRIMP "+t('esporta:report:tab-dati-week:settimana')).toUpperCase()}
            </span><GraficoWeek.CiclTrimp eventi={eventi} /></div>
            
            <div><span>{(t('scrivi-framework:corsa:corsa')+" TRIMP "+t('esporta:report:tab-dati-week:settimana')).toUpperCase()}
            </span><GraficoWeek.CorsaTrimp eventi={eventi} /></div>
            
            <div><span>{(t('scrivi-framework:nuoto:nuoto')+" TRIMP "+t('esporta:report:tab-dati-week:settimana')).toUpperCase()}
            </span><GraficoWeek.NuotoTrimp eventi={eventi} /></div>
        </div>]
        tabGraficiWeek.push(<div className="containerGrafico">
            <div><span>{("Weight Load Training "+t('esporta:report:tab-dati-week:settimana')).toUpperCase()}
            </span><GraficoWeek.Wlt eventi={eventi} tipo="cicl" /></div>
            
            <div><span>{("Weight Load Training "+t('esporta:report:tab-dati-week:settimana')).toUpperCase()}
            </span><GraficoWeek.Wlt eventi={eventi} tipo="corsa" /></div>
            
            <div><span>{("Weight Load Training "+t('esporta:report:tab-dati-week:settimana')).toUpperCase()}
            </span><GraficoWeek.Wlt eventi={eventi} tipo="nuoto" /></div>
            
            <div><span>{("Weight Load Stress "+t('esporta:report:tab-dati-week:settimana')).toUpperCase()}
            </span><GraficoWeek.Wls eventi={eventi} tipo="cicl" /></div>
            
            <div><span>{("Weight Load Stress "+t('esporta:report:tab-dati-week:settimana')).toUpperCase()}
            </span><GraficoWeek.Wls eventi={eventi} tipo="corsa" /></div>
            
            <div><span>{("Weight Load Stress "+t('esporta:report:tab-dati-week:settimana')).toUpperCase()}
            </span><GraficoWeek.Wls eventi={eventi} tipo="nuoto" /></div>
        </div>)
        tabGraficiWeek.push(<div className="containerGrafico">
            <div><span>{(t('scrivi-framework:ciclismo:ciclismo')+" TOT").toUpperCase()}
            </span><GraficoTot.CiclTempoZone tempoZone={ciclismo.totaliCiclismo.tempoZone} /></div>
            
            <div><span>{(t('scrivi-framework:corsa:corsa')+" TOT").toUpperCase()}
            </span><GraficoTot.CorsaTempoZone tempoZone={corsa.totaliCorsa.tempoZone} /></div>
            
            <div><span>{(t('scrivi-framework:nuoto:nuoto')+" TOT").toUpperCase()}
            </span><GraficoTot.NuotoTempoZone tempoZone={nuoto.totaliNuoto.tempoZone} /></div>
            
            <div><span>{(t('scrivi-framework:ciclismo:ciclismo')+" TRIMP TOT").toUpperCase()}
            </span><GraficoTot.CiclTrimp totali={ciclismo.totaliCiclismo} /></div>
            
            <div><span>{(t('scrivi-framework:corsa:corsa')+" TRIMP TOT").toUpperCase()}
            </span><GraficoTot.CorsaTrimp totali={corsa.totaliCorsa} /></div>
            
            <div><span>{(t('scrivi-framework:nuoto:nuoto')+" TRIMP TOT").toUpperCase()}
            </span><GraficoTot.NuotoTrimp totali={nuoto.totaliNuoto} /></div>
        </div>)

        const tabellaTotali = <TabDatiWeek settimana={t('esporta:report:tab-dati-week:totale-delle-settimane')}
        // ciclismo
        wltCicl={ciclismo.totaliCiclismo.wltWorkoutTot} wlsCicl={ciclismo.totaliCiclismo.wlsWorkoutTot}
        tempoTotCicl={ciclismo.totaliCiclismo.tempoTot} recTotCicl={ciclismo.totaliCiclismo.recTot} tempoTotCiclConRec={ciclismo.totaliCiclismo.tempoTotCiclConRec}
        densitaCicl={ciclismo.totaliCiclismo.densitaCicl} tempoZoneCicl={ciclismo.totaliCiclismo.tempoZone} trimpCiclAerobic={ciclismo.totaliCiclismo.trimpCiclAerobic}
        trimpCiclMixed={ciclismo.totaliCiclismo.trimpCiclMixed} trimpCiclAnaerobic={ciclismo.totaliCiclismo.trimpCiclAnaerobic}
        trimpCiclTotal={ciclismo.totaliCiclismo.trimpCiclTotal} trimpCiclMin={ciclismo.totaliCiclismo.trimpCiclMin} 

        // corsa
        tempoTotCorsa={(corsa.totaliCorsa) ? corsa.totaliCorsa.tempoTot : null}
        recTotCorsa={(corsa.totaliCorsa) ? corsa.totaliCorsa.recTot : null}
        distTotCorsa={(corsa.totaliCorsa) ? corsa.totaliCorsa.distTot : null}
        tempoZoneCorsa={(corsa.totaliCorsa) ? corsa.totaliCorsa.tempoZone : null}
        velMedia={(corsa.totaliCorsa) ? corsa.totaliCorsa.velMedia : null}
        passoMedioCorsa={(corsa.totaliCorsa) ? corsa.totaliCorsa.passoMedioCorsa : null}
        densitaCorsa={(corsa.totaliCorsa) ? corsa.totaliCorsa.densitaCorsa : null}
        tempoTotCorsaConRec={(corsa.totaliCorsa) ? corsa.totaliCorsa.tempoTotCorsaConRec : null} 
        wltCorsa={(corsa.totaliCorsa) ? corsa.totaliCorsa.wltCorsa : null}
        wlsCorsa={(corsa.totaliCorsa) ? corsa.totaliCorsa.wlsCorsa : null}
        trimpCorsaAerobic={(corsa.totaliCorsa) ? corsa.totaliCorsa.trimpCorsaAerobic : null}
        trimpCorsaMixed={(corsa.totaliCorsa) ? corsa.totaliCorsa.trimpCorsaMixed : null}
        trimpCorsaAnaerobic={(corsa.totaliCorsa) ? corsa.totaliCorsa.trimpCorsaAnaerobic : null} 
        trimpCorsaTotal={(corsa.totaliCorsa) ? corsa.totaliCorsa.trimpCorsaTotal : null}
        trimpCorsaMin={(corsa.totaliCorsa) ? corsa.totaliCorsa.trimpCorsaMin : null} 

        //nuoto
        tempoTotNuoto={(nuoto.totaliNuoto) ? nuoto.totaliNuoto.tempoTot : null}
        recTotNuoto={(nuoto.totaliNuoto) ? nuoto.totaliNuoto.recTot : null}
        distTotNuoto={(nuoto.totaliNuoto) ? nuoto.totaliNuoto.distTot : null}
        tempoZoneNuoto={(nuoto.totaliNuoto) ? nuoto.totaliNuoto.tempoZone : null}
        velMedia={(nuoto.totaliNuoto) ? nuoto.totaliNuoto.velMedia : null}
        passoMedioNuoto={(nuoto.totaliNuoto) ? nuoto.totaliNuoto.passoMedioNuoto : null}
        densitaNuoto={(nuoto.totaliNuoto) ? nuoto.totaliNuoto.densitaNuoto : null}
        tempoTotNuotoConRec={(nuoto.totaliNuoto) ? nuoto.totaliNuoto.tempoTotNuotoConRec : null} 
        wltNuoto={(nuoto.totaliNuoto) ? nuoto.totaliNuoto.wltNuoto : null}
        wlsNuoto={(nuoto.totaliNuoto) ? nuoto.totaliNuoto.wlsNuoto : null}
        trimpNuotoAerobic={(nuoto.totaliNuoto) ? nuoto.totaliNuoto.trimpNuotoAerobic : null}
        trimpNuotoMixed={(nuoto.totaliNuoto) ? nuoto.totaliNuoto.trimpNuotoMixed : null}
        trimpNuotoAnaerobic={(nuoto.totaliNuoto) ? nuoto.totaliNuoto.trimpNuotoAnaerobic : null} 
        trimpNuotoTotal={(nuoto.totaliNuoto) ? nuoto.totaliNuoto.trimpNuotoTotal : null}
        trimpNuotoMin={(nuoto.totaliNuoto) ? nuoto.totaliNuoto.trimpNuotoMin : null} />

        if(tabella.length<2) {
            tabella.push(tabellaTotali)
            aggiungiPagina()
        } else {
            aggiungiPagina()
            tabella = [tabellaTotali]
            aggiungiPagina()
        }

        return { listaStampaWorkouts, listaTabDatiWeek, tabGraficiWeek }
    }

    const stampa = () => {
        const contenuto = paginaDaStampare.current
        const pagina = frameStampa.current.contentWindow
        pagina.document.open()
        pagina.document.write(`<style>
            @media print {
                @page {
                    margin: 1cm;
                    size: landscape A4;
                }
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

            .intestazione-report {
                position: fixed;
                height: 90vh;
            }
            .container-tab-report {
                margin-left: 6vw;
            }

            .container-prima-pagina-report {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                page-break-after: always;
            }

            .containerGrafico {
                height: 80vw;
                display: grid;
                grid-template-columns: auto auto auto;
                grid-template-rows: auto auto auto;
                row-gap: 8%;
                align-content: center;
                page-break-before: always;
                margin-left: -3vw;
            }
            .containerGrafico>div {
                text-align: center;
            }
            .containerGrafico>div>span {
                margin-left: 5vw;
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
                <PrimaPaginaReport dataInizio={rangeDateSelect.start} dataFine={new Date(rangeDateSelect.end-86400000)} />
                <img src={Intestazione} className="intestazione-report" />
                <div className="container-tab-report">
                    {tabelleReport.listaStampaWorkouts}
                    {tabelleReport.listaTabDatiWeek}
                    {tabelleReport.tabGraficiWeek}
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
