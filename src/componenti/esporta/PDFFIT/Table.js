import React from "react";
import { Page, Document, StyleSheet } from "@react-pdf/renderer";
import ItemsTable from "./ItemsTable";
import { useState,useEffect } from "react";
import transform from '../../../mdwifi/services/Transforms'
import CalcolaWorkout from '../../../mdwifi/services/WorkoutAsFunctions'
import { szStepsToasSteps } from '../../../mdwifi/services/WorkoutAsFunctions'

const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    flexDirection: "column",
  },
});

const Table = (props) => {



    const {id, rif} = props

    const [steps,setSteps] = useState([])

    useEffect(() => {

        fetch('https://www.magneticdays.com/api/md/get_scheletro/?id_scheletro='+ id + '&auth_cookie=' + window.md.cookie)
        .then((response) => response.json())
        .then((data) => {

        const {dati} = data
        
        const dati_filtrati = dati.filter(el => Number(el.split(';')[3]) > 0).filter(el => el.split(';').length > 20)
        const dati_mappati = dati_filtrati.map(el => {

        const split = el.split(';') // "1;;AUTO;30;;88;;Min;;;;;;;;1;;;;;;;;;;;;;;;;;;False:0;;False;False;;;;;;False"

        /* 2;;AUTO;30;150;88;;Min;;55;-55;;;;;;;;;;;;;;;;;;;;;;;False:0;;False;False;;;;;;False
           3;;BPM;33;;;147;Min;;;;;;;B;;58;;;;;;;;;;;;;;;;;False:0;;False;False;;;;;;False    */

        const duration = Number(split[3])
        const watt = Number(split[4])
        const rpm = Number(split[5])
        const bpm = Number(split[6])
        const perceWatt = Number(split[9])
        const offsetRpm = Number(split[10])
        const perceBpm = Number(split[16])
        const description = (split[8] && split[8].length > 1) ? split[8] : ' '

        const wattCalcolati = (perceWatt > 0 && rif.watt && Number(rif.watt) > 0) ? (perceWatt/100)*Number(rif.watt) : watt
        const rpmCalcolati = (offsetRpm && rif.rpm && Number(rif.rpm) > 0 && (!rpm || rpm < 1)) ? Number(rif.rpm) + offsetRpm : rpm
        const bpmCalcolati = (perceBpm > 0 && rif.accaerre && Number(rif.accaerre) > 0) ? (perceBpm/100)*Number(rif.accaerre) : bpm
        

        return {duration,watt: wattCalcolati,rpm: rpmCalcolati, bpm: bpmCalcolati,description}

        })

    setSteps(dati_mappati)


    });

    
    },[id,rif])

    

    return (
        <Document>
          <Page size="A4" style={styles.page}>
            {(steps && steps.length > 0) && <ItemsTable steps={steps} />}
          </Page>
        </Document>
      )

};

export default Table;