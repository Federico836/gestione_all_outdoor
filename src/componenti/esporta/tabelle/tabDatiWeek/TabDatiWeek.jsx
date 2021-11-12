import React from "react"
import styles from './TabDatiWeek.module.css'
import { useTranslation } from 'react-i18next'

const TabDatiWeek = props => {
    const { settimana, wltCicl, wlsCicl, tempoTotCicl, recTotCicl, tempoTotCiclConRec, densitaCicl, tempoZoneCicl,
        trimpCiclAerobic, trimpCiclMixed, trimpCiclAnaerobic, trimpCiclTotal, trimpCiclMin } = props

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
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>WLS</td>
                        <td></td>
                        <td>{wlsCicl}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>{t('esporta:report:tab-dati-week:passo-medio')}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>{t('esporta:report:tab-dati-week:tempo-tot-lavoro')}</td>
                        <td></td>
                        <td>{tempoTotCicl}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>{t('esporta:report:tab-dati-week:tempo-tot-recupero')}</td>
                        <td></td>
                        <td>{recTotCicl}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>{t('esporta:report:tab-dati-week:tempo-tot-allenamento')}</td>
                        <td></td>
                        <td>{tempoTotCiclConRec}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>{t('esporta:report:tab-dati-week:volume-totale')}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>{t('esporta:report:tab-dati-week:densita')}</td>
                        <td></td>
                        <td>{densitaCicl}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td rowSpan="8">{t('esporta:report:tab-dati-week:tempo-zone')}</td>
                        <td>Z1</td>
                        <td>{tempoZoneCicl.zona1}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Z2</td>
                        <td>{tempoZoneCicl.zona2}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Z3</td>
                        <td>{tempoZoneCicl.zona3}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Z4</td>
                        <td>{tempoZoneCicl.zona4}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Z5</td>
                        <td>{tempoZoneCicl.zona5}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Z6</td>
                        <td>{tempoZoneCicl.zona6}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Z7</td>
                        <td>{tempoZoneCicl.zona7}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td rowSpan="5">TRIMP</td>
                        <td>aerobic</td>
                        <td>{trimpCiclAerobic}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>mixed</td>
                        <td>{trimpCiclMixed}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>anaerobic</td>
                        <td>{trimpCiclAnaerobic}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>total</td>
                        <td>{trimpCiclTotal}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>trimp/min</td>
                        <td>{trimpCiclMin}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TabDatiWeek

