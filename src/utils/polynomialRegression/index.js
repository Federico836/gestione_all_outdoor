import PolynomialRegression from './PolynomialRegression'

const calcNewton = (watt, rpm) => {
    if (rpm <= 0) {
      return 0;
    }
    return (watt * 60) / (2 * Math.PI * rpm);
  };

function calcPowerPeakTestParameters(rpm_array, watt_array,kg,range) {

    console.log({rpm_array,watt_array})
    
    const someData = [];
    const rpm = rpm_array;
    const watt = watt_array;

    const output_X = [];
    const output_y = [];
    
    let Yvalues = [];

    for (let i = 0; i < rpm.length; i++) {
        someData.push({
            x: rpm[i],
            y: watt[i]
        });
    }

    //console.log({someData})
    const poly = PolynomialRegression.read(someData, 2);
    const terms = poly.getTerms();

    let maxW = 0;
    /* for(let Luca = 50; Luca <= 150; Luca += 5) {

        let calcW = Math.round(poly.predictY(terms, Luca));

        if(maxW < calcW) maxW = calcW;

        Yvalues.push({rpm: Luca, watt: calcW})
    } */

    for(let rr = 0; rr <= 200; rr++) {
        const valY = Number(poly.predictY(terms, rr).toFixed(window.md.numDopoVirgola))

        //let calcW = Math.round(poly.predictY(terms, rr));

        if(maxW < valY) maxW = valY;

        Yvalues.push({rpm: rr, watt: valY})

        if(valY < 1) continue;

        output_y.push(valY)
        output_X.push(rr)
    }

    /* rpm.forEach((el) => {

        output_y.push(Math.round(poly.predictY(terms, el)))

    }) */

    let YAtMaxW = Yvalues.find(el => el.watt === maxW);

    let maxRpm = YAtMaxW.rpm;

    let filteredData = someData.filter((el) => (el.x >= maxRpm - range && el.x <= maxRpm + range))

    let wattOfFilteredData = filteredData.map((el) => {
        return el.y
    })

    let maxWattFilter = Math.max(...wattOfFilteredData);


    let maxWattTuttoTest = Math.max(...watt);
    let rpmAtMaxWattTuttoTest = rpm[watt.findIndex(el => el === maxWattTuttoTest)]
    let maxWattKg = (maxWattTuttoTest/kg).toFixed(1)
    let maxWattKgRange = (maxWattFilter/kg).toFixed(1)
    let newtonKgAtMaxWattTuttoTest = (calcNewton(maxWattTuttoTest,rpmAtMaxWattTuttoTest)/kg).toFixed(1)
    let newtonKgAtMaxWattInRange = (calcNewton(maxW,maxRpm)/kg).toFixed(1)

    

    const output = {maxWattCalcolato: maxW, 
                    maxRpmCalcolato: maxRpm, 
                    maxWattInRangeRpm: maxWattFilter, 
                    maxWattTuttoTest,
                    maxWattKg,
                    maxWattKgRange,
                    newtonKgAtMaxWattTuttoTest,
                    newtonKgAtMaxWattInRange,
                    y: output_y,
                    x: output_X
                    }
    
    return output;
}

export default calcPowerPeakTestParameters;