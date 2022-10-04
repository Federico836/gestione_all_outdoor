import React from "react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts'
import { useTranslation } from 'react-i18next'

const GraficoLattatoVel = props => {
    const { puntiSelectedMader } = props

    const { t, i18n } = useTranslation()

    //console.log(puntiSelectedMader)

    const listaPuntiSelected = puntiSelectedMader.map(test => test.puntiSelected)
    const listaVel = [].concat(...listaPuntiSelected).map(punto => punto.velMs)
    const listaVelUnica = [...new Set(listaVel)]
    const datiGrafico = listaVelUnica.map(vel => ({velMs: vel})).sort((a, b) => a.velMs-b.velMs)

    puntiSelectedMader.forEach(test => {
        test.puntiSelected.forEach(punto => {
            const dato = datiGrafico.find(dato => dato.velMs===punto.velMs)
            if(dato) dato[test.data] = punto.lattato
        })
    })

    //console.log(datiGrafico)

    const listaColori = ["blue", "LightCoral", "red", "cyan", "Chocolate", "DarkMagenta", "green", "LightGray"]

    const formattaData = data => new Date(data).toLocaleDateString()
    const arrotonda = el => Math.round(el*100)/100

    return (
        <div>
            {/* <ResponsiveContainer width="100%" height={400}>
                <LineChart margin={{ top: 10, right: 10, bottom: 10, left: -20 }}>
                {puntiSelectedMader.map((test, c) => <Line data={test.puntiSelected} key={c} type="monotone" yAxisId="left"
                dataKey="lattato" stroke={listaColori[c]} fill={listaColori[c]} r={4} isAnimationActive={false} dot={true} />)}

                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey={"velMs"} type="number" domain={['dataMin-1', 'dataMax+1']} tickCount={14} >
                    <Label value={t('analisi-test:corsa:mader:velocita')} offset={-8} position="insideBottomRight" fill='#676767' fontSize={14} />
                </XAxis>

                <YAxis width={80} yAxisId="left" tick={{ fontSize: 10 }} tickCount={7}>
                    <Label value={t('analisi-test:corsa:mader:lattato')} angle={-90} position='outside' fill='#676767' fontSize={14} />
                </YAxis>

                <Legend />
                <Tooltip />
                </LineChart>
            </ResponsiveContainer> */}
            <ResponsiveContainer width="100%" height={500}>
                <LineChart data={datiGrafico} margin={{ top: 10, right: 10, bottom: 10, left: -20 }}>
                {puntiSelectedMader.map((test, c) => <Line key={c} type="monotone" yAxisId="left" connectNulls={true}
                dataKey={test.data} stroke={listaColori[c]} fill={listaColori[c]} r={4} isAnimationActive={false} dot={true} />)}

                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey={"velMs"} type="number" domain={['dataMin-0.5', 'dataMax+0.5']} tickCount={14} tickFormatter={arrotonda}>
                    <Label value={t('analisi-test:corsa:mader:velocita')} offset={-8} position="insideBottomRight" fill='#676767' fontSize={14} />
                </XAxis>

                <YAxis width={80} yAxisId="left" tick={{ fontSize: 10 }} tickCount={7}>
                    <Label value={t('analisi-test:corsa:mader:lattato')} angle={-90} position='outside' fill='#676767' fontSize={14} />
                </YAxis>

                <Legend formatter={formattaData} />
                <Tooltip formatter={(value, name, props) => [value, formattaData(name)]} labelFormatter={arrotonda} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default GraficoLattatoVel