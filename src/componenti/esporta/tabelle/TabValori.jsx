import React from "react"
import { getSecondsFromHHMMSS, toHHMMSS } from "../../../utils/funzioni"
import { useTranslation } from 'react-i18next'
import styles from './TabValori.module.css'
import { Stack,TextField } from "@mui/material"
import InputAdornment from '@mui/material/InputAdornment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Chip from '@mui/material/Chip';

const TabValori = props => {
    const { ftp, setFtp, fc, setFc, passoNuoto, setPassoNuoto, passoCorsa, setPassoCorsa, ruoloLoggedUser, fc_corsa, fc_nuoto, setFc_corsa, setFc_nuoto } = props

    const { t, i18n } = useTranslation()

    const onBlurPassoCorsa = event => {
        const value = event.target.value;

        if(!value) return

        const seconds = Math.max(0, getSecondsFromHHMMSS(value))
        setPassoCorsa(seconds)
    }

    const onBlurPassoNuoto = event => {
        const value = event.target.value;

        if(!value) return

        const seconds = Math.max(0, getSecondsFromHHMMSS(value))
        setPassoNuoto(seconds)
    }

    const disabilita = ruoloLoggedUser==="allenatore" ? false : true

    return (<fieldset className={styles.container}>
        <legend>{t('esporta:valori')}:</legend>
        <Stack direction={'column'} spacing={2}>
            <Stack direction={'row'} spacing={2} justifyContent={'flex-end'}>
                <Chip label={t('scrivi-framework:ciclismo:ciclismo')} />

                <TextField InputLabelProps={{ shrink: true }} size="small" label="FTP" type={'number'} value={ftp} onChange={e => setFtp(e.target.value)} 
                           disabled={disabilita} InputProps={{endAdornment: (<InputAdornment position="end">WATT</InputAdornment>)}}/>

                <TextField InputLabelProps={{ shrink: true }} size="small" label="HR" type={'number'} value={fc} onChange={e => setFc(e.target.value)} 
                            disabled={disabilita} InputProps={{endAdornment: (<InputAdornment position="end"><FavoriteIcon/></InputAdornment>)}}/>
            </Stack>
            <Stack direction={'row'} spacing={2} justifyContent={'flex-end'}>
                <Chip label={t('scrivi-framework:corsa:corsa') + ': (' + toHHMMSS(passoCorsa) + ")"}/>

                <TextField InputLabelProps={{ shrink: true }} size="small" label="PACE / 1000" type={'text'} onBlur={onBlurPassoCorsa} 
                           disabled={disabilita} InputProps={{endAdornment: (<InputAdornment position="end">mm:ss</InputAdornment>)}}/>

                <TextField InputLabelProps={{ shrink: true }} size="small" label="HR" type={'number'} value={fc_corsa} onChange={e => setFc_corsa(e.target.value)} 
                            disabled={disabilita} InputProps={{endAdornment: (<InputAdornment position="end"><FavoriteIcon/></InputAdornment>)}}/>
            </Stack>
            <Stack direction={'row'} spacing={2} justifyContent={'flex-end'}>
                <Chip label={t('scrivi-framework:nuoto:nuoto') + ': (' + toHHMMSS(passoNuoto) + ")"} />

                <TextField InputLabelProps={{ shrink: true }} size="small" label="PACE / 100" type={'text'} onBlur={onBlurPassoNuoto} 
                           disabled={disabilita} InputProps={{endAdornment: (<InputAdornment position="end">mm:ss</InputAdornment>)}}/>

                <TextField InputLabelProps={{ shrink: true }} size="small" label="HR" type={'number'} value={fc_nuoto} onChange={e => setFc_nuoto(e.target.value)} 
                            disabled={disabilita} InputProps={{endAdornment: (<InputAdornment position="end"><FavoriteIcon/></InputAdornment>)}}/>
            </Stack>
            
        </Stack>
    </fieldset>)

    return (
        <fieldset className={styles.container}>
            <legend>{t('esporta:valori')}:</legend>

            <div className={styles.containerCiclismo}>
                <div>
                    {t('scrivi-framework:ciclismo:ciclismo')}: <input type="number" min={0} value={fc} onChange={e => setFc(e.target.value)} disabled={disabilita} /> {t('analisi-test:corsa:mader:fc')}
                </div>
                <div>
                    <input type="number" min={0} value={ftp} onChange={e => setFtp(e.target.value)} disabled={disabilita} /> ftp
                </div>
            </div>

            <div>
                {t('scrivi-framework:corsa:corsa')}: ({toHHMMSS(passoCorsa)}) <input type="text" onBlur={onBlurPassoCorsa} disabled={disabilita} /> passo 1000
            </div>

            <div>
                {t('scrivi-framework:nuoto:nuoto')}: ({toHHMMSS(passoNuoto)}) <input type="text" onBlur={onBlurPassoNuoto} disabled={disabilita} /> passo 100
            </div>
        </fieldset>
    )
}

export default TabValori

