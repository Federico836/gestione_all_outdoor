import modello7zone from './modelli/modello7zone.json'

const calcola7Zone = (ftp, fc) => {

    /* if(!ftp || !fc) return null */

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

const getSecondsFromHHMMSS = (value) => {
    const [str1, str2, str3] = value.split(":");

    const val1 = Number(str1);
    const val2 = Number(str2);
    const val3 = Number(str3);

    if (!isNaN(val1) && isNaN(val2) && isNaN(val3)) {
    // seconds
      return val1;
    }

    if (!isNaN(val1) && !isNaN(val2) && isNaN(val3)) {
    // minutes * 60 + seconds
      return val1 * 60 + val2;
    }

    if (!isNaN(val1) && !isNaN(val2) && !isNaN(val3)) {
    // hours * 60 * 60 + minutes * 60 + seconds
      return val1 * 60 * 60 + val2 * 60 + val3;
    }

    return 0;
}

const toHHMMSS = (secs) => {
    const secNum = parseInt(secs.toString(), 10);
    const hours = Math.floor(secNum / 3600);
    const minutes = Math.floor(secNum / 60) % 60;
    const seconds = secNum % 60;

    return [hours, minutes, seconds]
      .map((val) => (val < 10 ? `0${val}` : val))
      .filter((val, index) => val !== "00" || index > 0)
      .join(":")
      .replace(/^0/, "");
}

export { calcola7Zone, getSecondsFromHHMMSS, toHHMMSS }
