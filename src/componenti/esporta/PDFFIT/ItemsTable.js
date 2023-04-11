import React from "react";
import { View, StyleSheet, Image,Text } from "@react-pdf/renderer";
import TableRow from "./TableRow";
import TableHeader from './TableHeader'

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "column",
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px'
  },
});

const ItemsTable = (props) => {

    const {steps,nome = ""} = props

    return (
        <View style={styles.tableContainer}>
          <Image src={'https://www.magneticdays.com/c3/intestazione_report-min.png'} style={{width: '450px', alignSelf: 'flex-start', marginBottom: '20px', marginTop: '20px', marginLeft: '70px'}}/>
          <Text style={styles.title}>{nome}</Text>
          <TableHeader/>
          <TableRow steps={steps} />
        </View>
      )

}

export default ItemsTable;