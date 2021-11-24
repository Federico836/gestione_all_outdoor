import modello7zone from './modelli/modello7zone.json'
import modelloCorsa from './modelli/modelloCorsa.json'
import modelloNuoto from './modelli/modelloNuoto.json'

const axios = require('axios')

const calcola7Zone = (ftp, fc) => {

  /* if(!ftp || !fc) return null */

  return modello7zone.map(zona => {

      return {
          zona: zona.ZONA,
          watt_min: isFinite(zona.PERCE.FTP_MIN) && zona.PERCE.FTP_MIN.length > 0 ? Math.round((zona.PERCE.FTP_MIN/100)*ftp) : zona.PERCE.FTP_MIN,
          watt_max: isFinite(zona.PERCE.FTP_MAX) &&  zona.PERCE.FTP_MAX.length > 0 ? Math.round((zona.PERCE.FTP_MAX/100)*ftp) : zona.PERCE.FTP_MAX,
          watt_avg: isFinite(zona.PERCE.FTP_MIN) && 
                    isFinite(zona.PERCE.FTP_MAX) && 
                    zona.PERCE.FTP_MIN.length > 0 && 
                    zona.PERCE.FTP_MAX.length > 0 ? (Math.round((zona.PERCE.FTP_MIN/100)*ftp) + Math.round((zona.PERCE.FTP_MAX/100)*ftp))/2 : 0,
          fc_min: isFinite(zona.PERCE.FC_MIN) && zona.PERCE.FC_MIN.length > 0 ? Math.round((zona.PERCE.FC_MIN/100)*fc) : zona.PERCE.FC_MIN,
          fc_max: isFinite(zona.PERCE.FC_MAX) && zona.PERCE.FC_MAX.length > 0 ? Math.round((zona.PERCE.FC_MAX/100)*fc) : zona.PERCE.FC_MAX,
      }

  })

}

const calcolaZoneCorsa = velocita => {
  return modelloCorsa.map(zona => {
    return {
      zona: zona.zona,
      min: zona.perce.min*velocita,
      max: zona.perce.max*velocita,
      media: zona.perce.media*velocita,
    }
  })
}

const calcolaZoneNuoto = velocita => {
  return modelloNuoto.map(zona => {
    return {
      zona: zona.zona,
      perce: zona.perce*velocita,
      descrizione: zona.descrizione
    }
  })
}

const getSecondsFromHHMMSS = value => {
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

const toHHMMSS = secs => {
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

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    //var file = new File([filename], filepath);
    var reader = new FileReader();
    // Read file content on file loaded event
    reader.onload = function(event) {
      resolve(event.target.result);
    };
    // Convert data to base64 
    reader.readAsDataURL(file);
  });
}

const postReport = (id_utente, id_allenatore, nome_file, dati, cookie) => {

  const params = new URLSearchParams();

  params.append('auth_cookie', cookie);
  params.append('id_utente', id_utente);
  params.append('id_allenatore', id_allenatore);
  params.append('nome_file', nome_file);
  params.append('dati', dati);

  return axios.post('https://www.magneticdays.com/api/md/post_upload_planning', params)
}

const uploadFiles = files => {
  console.log(files)
  Array.from(files).forEach((file) => {

      fileToBase64(file).then(result => {
          const stringInBase64 = result.replace("data:application/pdf;base64,","")
          
          postReport(window.md.user.ID,window.md.logged_user.ID,file.name,stringInBase64,window.md.cookie).then((res) => {
              console.log(res)
              alert("file caricato correttamente")
          }).catch((error) => {
              console.log(error)
          })
      });
  })
}

export { calcola7Zone, calcolaZoneCorsa, calcolaZoneNuoto, getSecondsFromHHMMSS, toHHMMSS, uploadFiles }
