import React from "react"
import './TabDatiWeek.css'
import { useTranslation } from 'react-i18next'

import { toHHMMSS } from "../../../../utils/funzioni"

const TabDatiWeek = props => {
    const { settimana, wltCicl, wlsCicl, tempoTotCicl, recTotCicl, tempoTotCiclConRec, distTotCorsa, densitaCicl,
        tempoZoneCicl, trimpCiclAerobic, trimpCiclMixed, trimpCiclAnaerobic, trimpCiclTotal, trimpCiclMin,
    
        wltCorsa, wlsCorsa, passoMedioCorsa, tempoTotCorsa, recTotCorsa, tempoTotCorsaConRec, densitaCorsa, tempoZoneCorsa,
        trimpCorsaAerobic, trimpCorsaMixed, trimpCorsaAnaerobic, trimpCorsaTotal, trimpCorsaMin,
    
        wltNuoto, wlsNuoto, passoMedioNuoto, tempoTotNuoto, recTotNuoto, tempoTotNuotoConRec, distTotNuoto, densitaNuoto, 
        tempoZoneNuoto, trimpNuotoAerobic, trimpNuotoMixed, trimpNuotoAnaerobic, trimpNuotoTotal, trimpNuotoMin } = props

    const { t, i18n } = useTranslation()

    return (
        <div /*  style={{height: "90vh", marginLeft: "auto", marginRight: "auto", marginTop: "6vh"}} */>
            <table className="tab-all-week" /* style={{ height: "100%", border: "solid 1px black", borderCollapse: "collapse"}} */>
                <thead>
                    <tr>
                        <th colSpan="9">{settimana}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        {tempoTotCicl ? <><td rowSpan="22">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                        <td colSpan="2">{t('scrivi-framework:ciclismo:ciclismo')}</td></> : null}
                        {tempoTotCorsa ? <><td rowSpan="22">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                            <td colSpan="2">{t('scrivi-framework:corsa:corsa')}</td></> : null}
                        {tempoTotNuoto ? <><td rowSpan="22">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                        <td colSpan="2">{t('scrivi-framework:nuoto:nuoto')}</td></> : null}
                    </tr>
                    <tr>
                        <td>WLT</td>
                        {tempoTotCicl ? <><td></td>
                        <td>{wltCicl.toFixed(2)}</td></> : null}
                        {tempoTotCorsa ? <><td></td>
                        <td>{wltCorsa.toFixed(2)}</td></> : null}
                        {tempoTotNuoto ? <><td></td>
                        <td>{wltNuoto.toFixed(2)}</td></> : null}
                    </tr>
                    <tr>
                        <td>WLS</td>
                        {tempoTotCicl ? <><td></td>
                        <td>{wlsCicl.toFixed(2)}</td></> : null}
                        {tempoTotCorsa ? <><td></td>
                        <td>{wlsCorsa.toFixed(2)}</td></> : null}
                        {tempoTotNuoto ? <><td></td>
                        <td>{wlsNuoto.toFixed(2)}</td></> : null}
                    </tr>
                    <tr>
                        <td>{t('esporta:report:tab-dati-week:passo-medio')}</td>
                        {tempoTotCicl ? <><td></td>
                        <td></td></> : null}
                        {tempoTotCorsa ? <><td></td>
                        <td>{toHHMMSS(passoMedioCorsa)}</td></> : null}
                        {tempoTotNuoto ? <><td></td>
                        <td>{toHHMMSS(passoMedioNuoto)}</td></> : null}
                    </tr>
                    <tr>
                        <td>{t('esporta:report:tab-dati-week:tempo-tot-lavoro')}</td>
                        {tempoTotCicl ? <><td></td>
                        <td>{toHHMMSS(tempoTotCicl)}</td></> : null}
                        {tempoTotCorsa ? <><td></td>
                        <td>{toHHMMSS(tempoTotCorsa)}</td></> : null}
                        {tempoTotNuoto ? <><td></td>
                        <td>{toHHMMSS(tempoTotNuoto)}</td></> : null}
                    </tr>
                    <tr>
                        <td>{t('esporta:report:tab-dati-week:tempo-tot-recupero')}</td>
                        {tempoTotCicl ? <><td></td>
                        <td>{toHHMMSS(recTotCicl)}</td></> : null}
                        {tempoTotCorsa ? <><td></td>
                        <td>{toHHMMSS(recTotCorsa)}</td></> : null}
                        {tempoTotNuoto ? <><td></td>
                        <td>{toHHMMSS(recTotNuoto)}</td></> : null}
                    </tr>
                    <tr>
                        <td>{t('esporta:report:tab-dati-week:tempo-tot-allenamento')}</td>
                        {tempoTotCicl ? <><td></td>
                        <td>{toHHMMSS(tempoTotCiclConRec)}</td></> : null}
                        {tempoTotCorsa ? <><td></td>
                        <td>{toHHMMSS(tempoTotCorsaConRec)}</td></> : null}
                        {tempoTotNuoto ? <><td></td>
                        <td>{toHHMMSS(tempoTotNuotoConRec)}</td></> : null}
                    </tr>
                    <tr>
                        <td>{t('esporta:report:tab-dati-week:volume-totale')}</td>
                        {tempoTotCicl ? <><td></td>
                        <td></td></> : null}
                        {tempoTotCorsa ? <><td></td>
                        <td>{distTotCorsa}</td></> : null}
                        {tempoTotNuoto ? <><td></td>
                        <td>{distTotNuoto}</td></> : null}
                    </tr>
                    <tr>
                        <td>{t('esporta:report:tab-dati-week:densita')}</td>
                        {tempoTotCicl ? <><td></td>
                        <td>{densitaCicl}</td></> : null}
                        {tempoTotCorsa ? <><td></td>
                        <td>{densitaCorsa}</td></> : null}
                        {tempoTotNuoto ? <><td></td>
                        <td>{densitaNuoto}</td></> : null}
                    </tr>
                    <tr>
                        <td rowSpan="8">{t('esporta:report:tab-dati-week:tempo-zone')}</td>
                        {tempoTotCicl ? <><td>Z1</td>
                        <td>{toHHMMSS(tempoZoneCicl.zona1)}</td></> : null}
                        {tempoTotCorsa ? <><td>FLR</td>
                        <td>{toHHMMSS(tempoZoneCorsa.zona1)}</td></> : null}
                        {tempoTotNuoto ? <><td>A1</td>
                        <td>{toHHMMSS(tempoZoneNuoto.zona1)}</td></> : null}
                    </tr>
                    <tr>
                        {tempoTotCicl ? <><td>Z2</td>
                        <td>{toHHMMSS(tempoZoneCicl.zona2)}</td></> : null}
                        {tempoTotCorsa ? <><td>FLR</td>
                        <td>{toHHMMSS(tempoZoneCorsa.zona2)}</td></> : null}
                        {tempoTotNuoto ? <><td>A2</td>
                        <td>{toHHMMSS(tempoZoneNuoto.zona2)}</td></> : null}
                    </tr>
                    <tr>
                        {tempoTotCicl ? <><td>Z3</td>
                        <td>{toHHMMSS(tempoZoneCicl.zona3)}</td></> : null}
                        {tempoTotCorsa ? <><td>FM</td>
                        <td>{toHHMMSS(tempoZoneCorsa.zona3)}</td></> : null}
                        {tempoTotNuoto ? <><td>B1</td>
                        <td>{toHHMMSS(tempoZoneNuoto.zona3)}</td></> : null}
                    </tr>
                    <tr>
                        {tempoTotCicl ? <><td>Z4</td>
                        <td>{toHHMMSS(tempoZoneCicl.zona4)}</td></> : null}
                        {tempoTotCorsa ? <><td>FV</td>
                        <td>{toHHMMSS(tempoZoneCorsa.zona4)}</td></> : null}
                        {tempoTotNuoto ? <><td>B2</td>
                        <td>{toHHMMSS(tempoZoneNuoto.zona4)}</td></> : null}
                    </tr>
                    <tr>
                        {tempoTotCicl ? <><td>Z5</td>
                        <td>{toHHMMSS(tempoZoneCicl.zona5)}</td></> : null}
                        {tempoTotCorsa ? <><td>SG</td>
                        <td>{toHHMMSS(tempoZoneCorsa.zona5)}</td></> : null}
                        {tempoTotNuoto ? <><td>C1</td>
                        <td>{toHHMMSS(tempoZoneNuoto.zona5)}</td></> : null}
                    </tr>
                    <tr>
                        {tempoTotCicl ? <><td>Z6</td>
                        <td>{toHHMMSS(tempoZoneCicl.zona6)}</td></> : null}
                        {tempoTotCorsa ? <><td>VO2</td>
                        <td>{toHHMMSS(tempoZoneCorsa.zona6)}</td></> : null}
                        {tempoTotNuoto ? <><td>C2</td>
                        <td>{toHHMMSS(tempoZoneNuoto.zona6)}</td></> : null}
                    </tr>
                    <tr>
                        {tempoTotCicl ? <><td>Z7</td>
                        <td>{toHHMMSS(tempoZoneCicl.zona7)}</td></> : null}
                        {tempoTotCorsa ? <><td></td><td>&nbsp;</td></> : null}
                        {tempoTotNuoto ? <><td>C3</td>
                        <td>{toHHMMSS(tempoZoneNuoto.zona7)}</td></> : null}
                    </tr>
                    <tr>
                        {tempoTotCicl ? <><td></td>
                        <td>&nbsp;</td></> : null}
                        {tempoTotCorsa ? <><td></td><td>&nbsp;</td></> : null}
                        {tempoTotNuoto ? <><td>D</td>
                        <td>{toHHMMSS(tempoZoneNuoto.zona8)}</td></> : null}
                    </tr>
                    <tr>
                        <td rowSpan="5">TRIMP</td>
                        {tempoTotCicl ? <><td>aerobic</td>
                        <td>{trimpCiclAerobic.toFixed(2)}</td></> : null}
                        {tempoTotCorsa ? <><td>aerobic</td>
                        <td>{trimpCorsaAerobic.toFixed(2)}</td></> : null}
                        {tempoTotNuoto ? <><td>aerobic</td>
                        <td>{trimpNuotoAerobic.toFixed(2)}</td></> : null}
                    </tr>
                    <tr>
                        {tempoTotCicl ? <><td>mixed</td>
                        <td>{trimpCiclMixed.toFixed(2)}</td></> : null}
                        {tempoTotCorsa ? <><td>mixed</td>
                        <td>{trimpCorsaMixed.toFixed(2)}</td></> : null}
                        {tempoTotNuoto ? <><td>mixed</td>
                        <td>{trimpNuotoMixed.toFixed(2)}</td></> : null}
                    </tr>
                    <tr>
                        {tempoTotCicl ? <><td>anaerobic</td>
                        <td>{trimpCiclAnaerobic.toFixed(2)}</td></> : null}
                        {tempoTotCorsa ? <><td>anaerobic</td>
                        <td>{trimpCorsaAnaerobic.toFixed(2)}</td></> : null}
                        {tempoTotNuoto ? <><td>anaerobic</td>
                        <td>{trimpNuotoAnaerobic.toFixed(2)}</td></> : null}
                    </tr>
                    <tr>
                        {tempoTotCicl ? <><td>total</td>
                        <td>{trimpCiclTotal.toFixed(2)}</td></> : null}
                        {tempoTotCorsa ? <><td>total</td>
                        <td>{trimpCorsaTotal.toFixed(2)}</td></> : null}
                        {tempoTotNuoto ? <><td>total</td>
                        <td>{trimpNuotoTotal.toFixed(2)}</td></> : null}
                    </tr>
                    <tr>
                        {tempoTotCicl ? <><td>trimp/min</td>
                        <td>{trimpCiclMin.toFixed(2)}</td></> : null}
                        {tempoTotCorsa ? <><td>trimp/min</td>
                        <td>{trimpCorsaMin.toFixed(2)}</td></> : null}
                        {tempoTotNuoto ? <><td>trimp/min</td>
                        <td>{trimpNuotoMin.toFixed(2)}</td></> : null}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TabDatiWeek

