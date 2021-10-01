import modello7zone from './modelli/modello7zone.json'

const calcola7Zone = (ftp, fc) => {

    if(!ftp || !fc) return null

    return  modello7zone.map(zona => {

        return {
            zona: zona.ZONA,
            watt_min: isFinite(zona.PERCE.FTP_MIN) && zona.PERCE.FTP_MIN.length > 0 ? Math.round((zona.PERCE.FTP_MIN/100)*ftp) : zona.PERCE.FTP_MIN,
            watt_max: isFinite(zona.PERCE.FTP_MAX) &&  zona.PERCE.FTP_MAX.length > 0 ? Math.round((zona.PERCE.FTP_MAX/100)*ftp) : zona.PERCE.FTP_MAX,
            fc_min: isFinite(zona.PERCE.FC_MIN) && zona.PERCE.FC_MIN.length > 0 ? Math.round((zona.PERCE.FC_MIN/100)*fc) : zona.PERCE.FC_MIN,
            fc_max: isFinite(zona.PERCE.FC_MAX) && zona.PERCE.FC_MAX.length > 0 ? Math.round((zona.PERCE.FC_MAX/100)*fc) : zona.PERCE.FC_MAX,
        }

    })

}

export {calcola7Zone}