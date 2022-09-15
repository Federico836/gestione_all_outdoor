const ciclismo = {
    listDurationType: [
        {value: 'TIME',name: 'Tempo'},
        {value: 'DISTANCE',name: 'Distanza'},
        {value: 'CALORIES',name: 'Calorie'},
        {value: 'HR_LESS_THAN',name: 'Freq. Cardiaca'},
        {value: 'OPEN',name: 'Libero'},
      ],
      listIntensity: [
        {value: 'REST',name: 'Recupero passivo'},
        {value: 'WARMUP',name: 'Riscaldamento'},
        {value: 'COOLDOWN',name: 'Defaticamento'},
        {value: 'RECOVERY',name: 'Recupero'},
        {value: 'INTERVAL',name: 'Intervallo'},
      ],
      listTargetType: [
        {value: 'PERCENT_HR',name: '% HR'},
        {value: 'PERCENT_WATT',name: '% WATT'},
        {value: 'ZONE_HR',name: 'ZONE HR'},
        {value: 'ZONE_W',name: 'ZONE WATT'},
        {value: 'CADENCE',name: 'CADENZA'},
        {value: 'OPEN',name: 'LIBERO'},
      ],
      zone: {
        watt: [
        {value: '1',name: '1'},
        {value: '2',name: '2'},
        {value: '3',name: '3'},
        {value: '4',name: '4'},
        {value: '5',name: '5'},
        {value: '6',name: '6'},
        {value: '7',name: '7'},
      ],
        hr: [
        {value: '1',name: '1'},
        {value: '2',name: '2'},
        {value: '3',name: '3'},
        {value: '4',name: '4'},
        {value: '5',name: '5'},
      ],
    }
}

const corsa = {
    listDurationType: [
        {value: 'TIME',name: 'Tempo'},
        {value: 'DISTANCE',name: 'Distanza'},
        {value: 'CALORIES',name: 'Calorie'},
        {value: 'HR_LESS_THAN',name: 'Freq. Cardiaca'},
        {value: 'OPEN',name: 'Libero'},
      ],
      listIntensity: [
        {value: 'REST',name: 'Recupero passivo'},
        {value: 'WARMUP',name: 'Riscaldamento'},
        {value: 'COOLDOWN',name: 'Defaticamento'},
        {value: 'RECOVERY',name: 'Recupero'},
        {value: 'INTERVAL',name: 'Intervallo'},
      ],
      listTargetType: [
        {value: 'PERCENT_HR',name: '% HR'},
        {value: 'PERCENT_SPEED',name: '% SPEED'},
        {value: 'ZONE_HR',name: 'ZONE HR'},
        {value: 'ZONE_SPEED',name: 'ZONE SPEED'},
      ]
}
const nuoto = {
    listDurationType: [
        {value: 'TIME',name: 'Tempo'},
        {value: 'DISTANCE',name: 'Distanza'},
        {value: 'CALORIES',name: 'Calorie'},
        {value: 'OPEN',name: 'Altro'},
      ],
      listIntensity: [
        {value: 'REST',name: 'Recupero passivo'},
        {value: 'WARMUP',name: 'Riscaldamento'},
        {value: 'COOLDOWN',name: 'Defaticamento'},
        {value: 'RECOVERY',name: 'Recupero'},
        {value: 'INTERVAL',name: 'Intervallo'},
      ],
      listStrokeType: [
        {value: 'BACKSTROKE',name: 'Dorso'},
        {value: 'BREASTSTROKE',name: 'Rana'},
        {value: 'DRILL',name: 'Tecnica'},
        {value: 'BUTTERFLY',name: 'Farfalla'},
        {value: 'FREESTYLE',name: 'Stile libero'},
        {value: 'MIXED',name: 'Misti'},
      ],
      equipmentType: [
        {value: 'NONE' , name: 'Nessuno'},
        {value: 'SWIM_FINS' , name: 'Pinne'},
        {value: 'SWIM_KICKBOARD' , name: 'Tavoletta'},
        {value: 'SWIM_PADDLES' , name: 'Palette'},
        {value: 'SWIM_PULL_BUOY' , name: 'Pull Buoy'},
        {value: 'SWIM_SNORKEL' , name: 'Snorkel'},
      ]
}

const palestra = {
    listDurationType: [
        {value: 'TIME',name: 'Tempo'},
        {value: 'DISTANCE',name: 'Distanza'},
        {value: 'CALORIES',name: 'Calorie'},
        {value: 'OPEN',name: 'Altro'},
      ],
      listIntensity: [
        {value: 'REST',name: 'Recupero passivo'},
        {value: 'WARMUP',name: 'Riscaldamento'},
        {value: 'COOLDOWN',name: 'Defaticamento'},
        {value: 'RECOVERY',name: 'Recupero'},
        {value: 'INTERVAL',name: 'Intervallo'},
      ],
      listStrokeType: [
        {value: 'BACKSTROKE',name: 'Dorso'},
        {value: 'BREASTSTROKE',name: 'Rana'},
        {value: 'DRILL',name: 'Tecnica'},
        {value: 'BUTTERFLY',name: 'Farfalla'},
        {value: 'FREESTYLE',name: 'Stile libero'},
        {value: 'MIXED',name: 'Misti'},
      ]
}

export {nuoto,ciclismo,corsa}