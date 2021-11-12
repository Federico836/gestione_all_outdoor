import React from "react"
import styles from './TabDatiWeek.module.css'
import { useTranslation } from 'react-i18next'

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
                        <td rowSpan="22">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                        <td colSpan="2">{t('scrivi-framework:corsa:corsa')}</td>
                        <td rowSpan="22">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                        <td colSpan="2">{t('scrivi-framework:nuoto:nuoto')}</td>
                    </tr>
                    <tr>
                        <td>WLT</td>
                        <td></td>
                        <td>{wltCicl}</td>
                        <td></td>
                        <td>{wltCorsa}</td>
                        <td></td>
                        <td>{wltNuoto}</td>
                    </tr>
                    <tr>
                        <td>WLS</td>
                        <td></td>
                        <td>{wlsCicl}</td>
                        <td></td>
                        <td>{wlsCorsa}</td>
                        <td></td>
                        <td>{wlsNuoto}</td>
                    </tr>
                    <tr>
                        <td>{t('esporta:report:tab-dati-week:passo-medio')}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{passoMedioCorsa}</td>
                        <td></td>
                        <td>{passoMedioNuoto}</td>
                    </tr>
                    <tr>
                        <td>{t('esporta:report:tab-dati-week:tempo-tot-lavoro')}</td>
                        <td></td>
                        <td>{tempoTotCicl}</td>
                        <td></td>
                        <td>{tempoTotCorsa}</td>
                        <td></td>
                        <td>{tempoTotNuoto}</td>
                    </tr>
                    <tr>
                        <td>{t('esporta:report:tab-dati-week:tempo-tot-recupero')}</td>
                        <td></td>
                        <td>{recTotCicl}</td>
                        <td></td>
                        <td>{recTotCorsa}</td>
                        <td></td>
                        <td>{recTotNuoto}</td>
                    </tr>
                    <tr>
                        <td>{t('esporta:report:tab-dati-week:tempo-tot-allenamento')}</td>
                        <td></td>
                        <td>{tempoTotCiclConRec}</td>
                        <td></td>
                        <td>{tempoTotCorsaConRec}</td>
                        <td></td>
                        <td>{tempoTotNuotoConRec}</td>
                    </tr>
                    <tr>
                        <td>{t('esporta:report:tab-dati-week:volume-totale')}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{distTotCorsa}</td>
                        <td></td>
                        <td>{distTotNuoto}</td>
                    </tr>
                    <tr>
                        <td>{t('esporta:report:tab-dati-week:densita')}</td>
                        <td></td>
                        <td>{densitaCicl}</td>
                        <td></td>
                        <td>{densitaCorsa}</td>
                        <td></td>
                        <td>{densitaNuoto}</td>
                    </tr>
                    <tr>
                        <td rowSpan="8">{t('esporta:report:tab-dati-week:tempo-zone')}</td>
                        <td>Z1</td>
                        <td>{tempoZoneCicl.zona1}</td>
                        <td>FLR</td>
                        <td>{tempoZoneCorsa.zona1.toFixed(2)}</td>
                        <td>A1</td>
                        <td>{tempoZoneNuoto.zona1}</td>
                    </tr>
                    <tr>
                        <td>Z2</td>
                        <td>{tempoZoneCicl.zona2}</td>
                        <td>FLR</td>
                        <td>{tempoZoneCorsa.zona2.toFixed(2)}</td>
                        <td>A2</td>
                        <td>{tempoZoneNuoto.zona2}</td>
                    </tr>
                    <tr>
                        <td>Z3</td>
                        <td>{tempoZoneCicl.zona3}</td>
                        <td>FM</td>
                        <td>{tempoZoneCorsa.zona3.toFixed(2)}</td>
                        <td>B1</td>
                        <td>{tempoZoneNuoto.zona3}</td>
                    </tr>
                    <tr>
                        <td>Z4</td>
                        <td>{tempoZoneCicl.zona4}</td>
                        <td>FV</td>
                        <td>{tempoZoneCorsa.zona4.toFixed(2)}</td>
                        <td>B2</td>
                        <td>{tempoZoneNuoto.zona4}</td>
                    </tr>
                    <tr>
                        <td>Z5</td>
                        <td>{tempoZoneCicl.zona5}</td>
                        <td>SG</td>
                        <td>{tempoZoneCorsa.zona5.toFixed(2)}</td>
                        <td>C1</td>
                        <td>{tempoZoneNuoto.zona5}</td>
                    </tr>
                    <tr>
                        <td>Z6</td>
                        <td>{tempoZoneCicl.zona6}</td>
                        <td>VO2</td>
                        <td>{tempoZoneCorsa.zona6.toFixed(2)}</td>
                        <td>C2</td>
                        <td>{tempoZoneNuoto.zona6}</td>
                    </tr>
                    <tr>
                        <td>Z7</td>
                        <td>{tempoZoneCicl.zona7}</td>
                        <td></td>
                        <td></td>
                        <td>C3</td>
                        <td>{tempoZoneNuoto.zona7}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>D</td>
                        <td>{tempoZoneNuoto.zona8}</td>
                    </tr>
                    <tr>
                        <td rowSpan="5">TRIMP</td>
                        <td>aerobic</td>
                        <td>{trimpCiclAerobic}</td>
                        <td></td>
                        <td>{trimpCorsaAerobic}</td>
                        <td></td>
                        <td>{trimpNuotoAerobic}</td>
                    </tr>
                    <tr>
                        <td>mixed</td>
                        <td>{trimpCiclMixed}</td>
                        <td></td>
                        <td>{trimpCorsaMixed}</td>
                        <td></td>
                        <td>{trimpNuotoMixed}</td>
                    </tr>
                    <tr>
                        <td>anaerobic</td>
                        <td>{trimpCiclAnaerobic}</td>
                        <td></td>
                        <td>{trimpCorsaAnaerobic}</td>
                        <td></td>
                        <td>{trimpNuotoAnaerobic}</td>
                    </tr>
                    <tr>
                        <td>total</td>
                        <td>{trimpCiclTotal}</td>
                        <td></td>
                        <td>{trimpCorsaTotal}</td>
                        <td></td>
                        <td>{trimpNuotoTotal}</td>
                    </tr>
                    <tr>
                        <td>trimp/min</td>
                        <td>{trimpCiclMin}</td>
                        <td></td>
                        <td>{trimpCorsaMin}</td>
                        <td></td>
                        <td>{trimpNuotoMin}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TabDatiWeek

