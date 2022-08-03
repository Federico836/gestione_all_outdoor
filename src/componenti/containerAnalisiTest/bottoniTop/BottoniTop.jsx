import React from "react"
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import styles from "./BottoniTop.module.css"

const BottoniTop = props => {
    const { setPagina, open, setOpen, tipoTest, setTipoTest, listaTest, salvaDati, utente } = props

    const { t, i18n } = useTranslation()

    return (
        <div className={styles.container}>
            <Button variant="contained" onClick={() => setPagina("menu_princ")}>{t('main-container:indietro')}</Button>
            <Button variant="contained" onClick={() => setOpen(!open)}>menu</Button>

            <div>
                {t('analisi-test:tipo-test')}&nbsp;&nbsp;
               <select onChange={e => setTipoTest(e.target.value)} value={tipoTest}>
                    {listaTest.map((test, c) => <option value={test} key={c}>{test}</option>)}
               </select>
           </div>

           {utente ? <div>{utente.nome+" "+utente.cognome}</div> : null}

           <Button variant="contained" onClick={salvaDati}>{t('esporta:salva')}</Button>
        </div>
    )
}

export default BottoniTop