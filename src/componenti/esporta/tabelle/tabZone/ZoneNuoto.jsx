import React from 'react'
import { useTranslation } from 'react-i18next'
import { toHHMMSS } from '../../../../utils/funzioni'

const ZoneNuoto = props => {
    const { zoneCalcNuoto } = props

    const { t, i18n } = useTranslation()

    return (
        <div className="zone-ciclismo7" style={{marginBottom: "6vh"}}>
            <table>
                <thead>
                    <tr>
                        <td>{t('esporta:tab-zone:nuoto:tipo-lavoro')}</td>
                        <td></td>
                        <td>{t('esporta:tab-zone:nuoto:tempo')}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>A1</td>
                        <td>min / 100</td>
                        <td>{toHHMMSS(100/zoneCalcNuoto[0].perce)}</td>
                    </tr>
                    <tr>
                        <td>A2</td>
                        <td>min / 100</td>
                        <td>{toHHMMSS(100/zoneCalcNuoto[1].perce)}</td>
                    </tr>
                    <tr>
                        <td>B1</td>
                        <td>min / 100</td>
                        <td>{toHHMMSS(100/zoneCalcNuoto[2].perce)}</td>
                    </tr>
                    <tr>
                        <td>B2</td>
                        <td>min / 100</td>
                        <td>{toHHMMSS(100/zoneCalcNuoto[3].perce)}</td>
                    </tr>
                    <tr>
                        <td>C1</td>
                        <td>min / 100</td>
                        <td>{toHHMMSS(100/zoneCalcNuoto[4].perce)}</td>
                    </tr>
                    <tr>
                        <td>C2</td>
                        <td>min / 100</td>
                        <td>{toHHMMSS(100/zoneCalcNuoto[5].perce)}</td>
                    </tr>
                    <tr>
                        <td>C3</td>
                        <td>min / 100</td>
                        <td>{toHHMMSS(100/zoneCalcNuoto[6].perce)}</td>
                    </tr>
                    <tr>
                        <td>D</td>
                        <td>min / 100</td>
                        <td>{toHHMMSS(100/zoneCalcNuoto[7].perce)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ZoneNuoto