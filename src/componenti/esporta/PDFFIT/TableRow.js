import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    width: "100%",
  },
  cell: {
    width: "10%",
    border: "1px solid black",
    marginRight: '1px',
    marginBottom: '1px',
    textAlign: 'center',
    padding: '5px'
  },
  desc: {
    width: "35%",
    border: "1px solid black",
    marginRight: '1px',
    marginBottom: '1px',
    textAlign: 'center',
    padding: '5px'
  }
});

const TableRow = (props) => {

  const {steps} = props

  const rows = steps.map((step,index) => {

    const {duration, watt, rpm, bpm, description = 'N/D',rpmString = '-'} = step
    const tempo = new Date(duration * 1000).toISOString().substr(11, 8)
    

  
    return (
        <View style={styles.row} key={index}>
          <Text style={styles.cell}>{tempo}</Text>
          <Text style={styles.cell}>{Number(watt) > 0 ? Number(watt).toFixed(0) : '-'}</Text>
          <Text style={styles.cell}>{Number(rpm) > 0 ? Number(rpm).toFixed(0) : rpmString}</Text>
          <Text style={styles.cell}>{Number(bpm) > 0 ? Number(bpm).toFixed(0) : '-'}</Text>
          <Text style={styles.desc}>{description}</Text>
        </View>
      )


  } 
  );
  return <Fragment>{rows}</Fragment>;
};

export default TableRow;