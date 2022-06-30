import React from "react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts'
import { useTranslation } from 'react-i18next'
import styles from "./GraficoLattato.module.css"

const GraficoLattato = props => {
    const { puntiSelected, lattatoTabTotali, tabTotali } = props

    const { t, i18n } = useTranslation()

    const datiGrafico = puntiSelected.map(riga => ({...riga, velKmh: Math.round(riga.velKmh*10)/10}))

    return (
        <div className={styles.container}>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={datiGrafico} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                <Line type="monotone" yAxisId="left" dataKey="lattato" stroke="blue" fill="blue" r={4} isAnimationActive={false} dot={true} />
                <Line type="monotone" yAxisId="right" dataKey="heartrate" stroke="red" fill="red" r={4} isAnimationActive={false} dot={true} />
            
                <ReferenceLine yAxisId="left" y={lattatoTabTotali.lattato1} stroke="green" strokeDasharray="3 3" />
                <ReferenceLine yAxisId="left" y={lattatoTabTotali.lattato2} stroke="red" strokeDasharray="3 3" />
                <ReferenceLine yAxisId="left" stroke="green" strokeDasharray="3 3" segment={[{ x: tabTotali.velKmh1, y: 0 }, { x: tabTotali.velKmh1, y: lattatoTabTotali.lattato1 }]} />
                <ReferenceLine yAxisId="left" stroke="red" strokeDasharray="3 3" segment={[{ x: tabTotali.velKmh2, y: 0 }, { x: tabTotali.velKmh2, y: lattatoTabTotali.lattato2 }]} />

                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey={"velKmh"} type="number" domain={['dataMin-1', 'dataMax+1']} tickCount={14} >
                    <Label value={t('analisi-test:corsa:mader:velocita')} offset={-8} position="insideBottomRight" fill='#676767' fontSize={14} />
                </XAxis>

                <YAxis width={80} yAxisId="left" tick={{ fontSize: 10 }} tickCount={7}>
                    <Label value={t('analisi-test:corsa:mader:lattato')} angle={-90} position='outside' fill='#676767' fontSize={14} />
                </YAxis>
                <YAxis width={80} yAxisId="right" orientation="right" tick={{ fontSize: 10 }} tickCount={7} domain={['dataMin-10', 'dataMax+10']}>
                    <Label value={t('analisi-test:corsa:mader:fc')} angle={-90} position='outside' fill='#676767' fontSize={14} />
                </YAxis>

                <Legend />
                <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default GraficoLattato