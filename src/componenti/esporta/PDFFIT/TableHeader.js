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
    marginRight: '1px',
    marginBottom: '1px',
    textAlign: 'center',
    fontSize: '16pt'
  },
  desc: {
    width: "35%",
    marginRight: '1px',
    marginBottom: '1px',
    textAlign: 'center',
    fontSize: '16pt'
  }
});

const TableRow = (props) => {

  return <View style={styles.row}>
  <Text style={styles.cell}>Tempo</Text>
  <Text style={styles.cell}>WATT</Text>
  <Text style={styles.cell}>RPM</Text>
  <Text style={styles.cell}>BPM</Text>
  <Text style={styles.desc}>DESCRIZIONE</Text>
</View>;
};

export default TableRow;