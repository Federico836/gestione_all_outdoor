import React from "react"
import styles from './TabDatiWeek.module.css'
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
            <table className={styles.tabella} /* style={{ height: "100%", border: "solid 1px black", borderCollapse: "collapse"}} */>
                <thead>
                    <tr>
                        <th colSpan="9">{t('esporta:report:tab-dati-week:settimana')+" "+settimana}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td colSpan="2">{t('scrivi-framework:ciclismo:ciclismo')}</td>
                        {tempoTotCorsa ? <><td rowSpan="22">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                            <td colSpan="2">{t('scrivi-framework:corsa:corsa')}</td></> : null}
                        <td rowSpan="22">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                        <td colSpan="2">{t('scrivi-framework:nuoto:nuoto')}</td>
                    </tr>
                    <tr>
                        <td>WLT</td>
                        <td></td>
                        <td>{wltCicl}</td>
                        {tempoTotCorsa ? <><td></td>
                        <td>{wltCorsa.toFixed(2)}</td></> : null}
                        <td></td>
                        <td>{wltNuoto}</td>
                    </tr>
                    <tr>
                        <td>WLS</td>
                        <td></td>
                        <td>{wlsCicl}</td>
                        {tempoTotCorsa ? <><td></td>
                        <td>{wlsCorsa.toFixed(2)}</td></> : null}
                        <td></td>
                        <td>{wlsNuoto}</td>
                    </tr>
                    <tr>
                        <td>{t('esporta:report:tab-dati-week:passo-medio')}</td>
                        <td></td>
                        <td></td>
                        {tempoTotCorsa ? <><td></td>
                        <td>{toHHMMSS(passoMedioCorsa)}</td></> : null}
                        <td></td>
                        <td>{passoMedioNuoto}</td>
                    </tr>
                    <tr>
                        <td>{t('esporta:report:tab-dati-week:tempo-tot-lavoro')}</td>
                        <td></td>
                        <td>{tempoTotCicl}</td>
                        {tempoTotCorsa ? <><td></td>
                        <td>{toHHMMSS(tempoTotCorsa)}</td></> : null}
                        <td></td>
                        <td>{tempoTotNuoto}</td>
                    </tr>
                    <tr>
                        <td>{t('esporta:report:tab-dati-week:tempo-tot-recupero')}</td>
                        <td></td>
                        <td>{recTotCicl}</td>
                        {tempoTotCorsa ? <><td></td>
                        <td>{toHHMMSS(recTotCorsa)}</td></> : null}
                        <td></td>
                        <td>{recTotNuoto}</td>
                    </tr>
                    <tr>
                        <td>{t('esporta:report:tab-dati-week:tempo-tot-allenamento')}</td>
                        <td></td>
                        <td>{tempoTotCiclConRec}</td>
                        {tempoTotCorsa ? <><td></td>
                        <td>{toHHMMSS(tempoTotCorsaConRec)}</td></> : null}
                        <td></td>
                        <td>{tempoTotNuotoConRec}</td>
                    </tr>
                    <tr>
                        <td>{t('esporta:report:tab-dati-week:volume-totale')}</td>
                        <td></td>
                        <td></td>
                        {tempoTotCorsa ? <><td></td>
                        <td>{distTotCorsa}</td></> : null}
                        <td></td>
                        <td>{distTotNuoto}</td>
                    </tr>
                    <tr>
                        <td>{t('esporta:report:tab-dati-week:densita')}</td>
                        <td></td>
                        <td>{densitaCicl}</td>
                        {tempoTotCorsa ? <><td></td>
                        <td>{densitaCorsa}</td></> : null}
                        <td></td>
                        <td>{densitaNuoto}</td>
                    </tr>
                    <tr>
                        <td rowSpan="8">{t('esporta:report:tab-dati-week:tempo-zone')}</td>
                        <td>Z1</td>
                        <td>{tempoZoneCicl.zona1}</td>
                        {tempoTotCorsa ? <><td>FLR</td>
                        <td>{toHHMMSS(tempoZoneCorsa.zona1)}</td></> : null}
                        <td>A1</td>
                        <td>{tempoZoneNuoto.zona1}</td>
                    </tr>
                    <tr>
                        <td>Z2</td>
                        <td>{tempoZoneCicl.zona2}</td>
                        {tempoTotCorsa ? <><td>FLR</td>
                        <td>{toHHMMSS(tempoZoneCorsa.zona2)}</td></> : null}
                        <td>A2</td>
                        <td>{tempoZoneNuoto.zona2}</td>
                    </tr>
                    <tr>
                        <td>Z3</td>
                        <td>{tempoZoneCicl.zona3}</td>
                        {tempoTotCorsa ? <><td>FM</td>
                        <td>{toHHMMSS(tempoZoneCorsa.zona3)}</td></> : null}
                        <td>B1</td>
                        <td>{tempoZoneNuoto.zona3}</td>
                    </tr>
                    <tr>
                        <td>Z4</td>
                        <td>{tempoZoneCicl.zona4}</td>
                        {tempoTotCorsa ? <><td>FV</td>
                        <td>{toHHMMSS(tempoZoneCorsa.zona4)}</td></> : null}
                        <td>B2</td>
                        <td>{tempoZoneNuoto.zona4}</td>
                    </tr>
                    <tr>
                        <td>Z5</td>
                        <td>{tempoZoneCicl.zona5}</td>
                        {tempoTotCorsa ? <><td>SG</td>
                        <td>{toHHMMSS(tempoZoneCorsa.zona5)}</td></> : null}
                        <td>C1</td>
                        <td>{tempoZoneNuoto.zona5}</td>
                    </tr>
                    <tr>
                        <td>Z6</td>
                        <td>{tempoZoneCicl.zona6}</td>
                        {tempoTotCorsa ? <><td>VO2</td>
                        <td>{toHHMMSS(tempoZoneCorsa.zona6)}</td></> : null}
                        <td>C2</td>
                        <td>{tempoZoneNuoto.zona6}</td>
                    </tr>
                    <tr>
                        <td>Z7</td>
                        <td>{tempoZoneCicl.zona7}</td>
                        {tempoTotCorsa ? <><td></td><td></td></> : null}
                        <td>C3</td>
                        <td>{tempoZoneNuoto.zona7}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        {tempoTotCorsa ? <><td></td><td></td></> : null}
                        <td>D</td>
                        <td>{tempoZoneNuoto.zona8}</td>
                    </tr>
                    <tr>
                        <td rowSpan="5">TRIMP</td>
                        <td>aerobic</td>
                        <td>{trimpCiclAerobic}</td>
                        {tempoTotCorsa ? <><td>aerobic</td>
                        <td>{trimpCorsaAerobic.toFixed(2)}</td></> : null}
                        <td></td>
                        <td>{trimpNuotoAerobic}</td>
                    </tr>
                    <tr>
                        <td>mixed</td>
                        <td>{trimpCiclMixed}</td>
                        {tempoTotCorsa ? <><td>mixed</td>
                        <td>{trimpCorsaMixed.toFixed(2)}</td></> : null}
                        <td></td>
                        <td>{trimpNuotoMixed}</td>
                    </tr>
                    <tr>
                        <td>anaerobic</td>
                        <td>{trimpCiclAnaerobic}</td>
                        {tempoTotCorsa ? <><td>anaerobic</td>
                        <td>{trimpCorsaAnaerobic.toFixed(2)}</td></> : null}
                        <td></td>
                        <td>{trimpNuotoAnaerobic}</td>
                    </tr>
                    <tr>
                        <td>total</td>
                        <td>{trimpCiclTotal}</td>
                        {tempoTotCorsa ? <><td>total</td>
                        <td>{trimpCorsaTotal.toFixed(2)}</td></> : null}
                        <td></td>
                        <td>{trimpNuotoTotal}</td>
                    </tr>
                    <tr>
                        <td>trimp/min</td>
                        <td>{trimpCiclMin}</td>
                        {tempoTotCorsa ? <><td>trimp/min</td>
                        <td>{trimpCorsaMin.toFixed(2)}</td></> : null}
                        <td></td>
                        <td>{trimpNuotoMin}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TabDatiWeek

