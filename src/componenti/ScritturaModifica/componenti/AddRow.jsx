import { Paper } from "@mui/material";
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from "@mui/material/Stack";
import Select from './Select'
import TextField from '@mui/material/TextField';
import { useState } from "react";
import Button from "@mui/material/Button";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { nuoto,ciclismo,corsa } from "../const";


const AddRowCiclismo = (props) => {

    const {listDurationType,listIntensity,listTargetType,zone} = ciclismo

    const [durationType,setDurationType] = useState('TIME')
    const [intensity,setIntensity] = useState('INTERVAL')
    const [targetType,setTargetType] = useState('ZONE_W')
    const [zona,setZona] = useState("1")
    const [perceWatt,setPerceWatt] = useState("")
    const [watt,setWatt] = useState("")
    const [perceHr,setPerceHr] = useState("")
    const [hr,setHr] = useState("")
    const [ripetizioni,setRipetizioni] = useState("1")
    const [tempo,setTempo] = useState("")
    const [recupero,setRecupero] = useState("")
    const [rpm,setRpm] = useState("")
    const [distanza,setDistanza] = useState("")
    const [calorie,setCalorie] = useState("")
    const [note,setNote] = useState("")



    return (
      <div style={{marginBottom: '20px'}}>
        <Stack spacing={1} direction="row">
            <Select value={durationType} setValue={setDurationType} valuesList={listDurationType} label="Obbiettivo"/>
            <Select value={intensity} setValue={setIntensity} valuesList={listIntensity} label="Fase di lavoro"/>
            <Select value={targetType} setValue={setTargetType} valuesList={listTargetType} label="Intensità"/>
            {(targetType === "ZONE_W" || targetType === "ZONE_HR") && <Select value={zona} setValue={setZona} valuesList={(targetType === "ZONE_W") ? zone.watt : zone.hr} label="Zona"/>}
            {(targetType === "PERCENT_WATT") && <TextField id="pw" label="% Watt" variant="outlined" value={perceWatt} onChange={(e) => {setPerceWatt(e.target.value)}}/>}
            {(targetType === "PERCENT_WATT" || targetType === "ZONE_W") && <TextField disabled id="pw1" label="Watt" variant="outlined" value={watt} onChange={(e) => {setWatt(e.target.value)}}/>}
            {(targetType === "PERCENT_HR" || durationType === "HR_LESS_THAN") && <TextField id="pw2" label="% HR" variant="outlined" value={perceHr} onChange={(e) => {setPerceHr(e.target.value)}}/>}
            {(targetType === "PERCENT_HR" || targetType === "ZONE_HR" || durationType === "HR_LESS_THAN") && <TextField disabled id="pw3" label="HR" variant="outlined" value={hr} onChange={(e) => {setPerceHr(e.target.value)}}/>}
            <TextField id="pw4" label="Ripetizioni" variant="outlined" value={ripetizioni} onChange={(e) => {setRipetizioni(e.target.value)}}/>
            {(durationType === "TIME") && <TextField id="pw5" label="Tempo" variant="outlined" value={tempo} onChange={(e) => {setTempo(e.target.value)}}/>}
            <TextField id="pw6" label="Recupero" variant="outlined" value={recupero} onChange={(e) => {setRecupero(e.target.value)}}/>
            <TextField id="pw7" label="Rpm" variant="outlined" value={rpm} onChange={(e) => {setRpm(e.target.value)}}/>
            {(durationType === "DISTANCE") && <TextField id="pw8" label="Distanza" variant="outlined" value={distanza} onChange={(e) => {setDistanza(e.target.value)}}/>}
            {(durationType === "CALORIES") &&  <TextField id="pw9" label="Calorie" variant="outlined" value={calorie} onChange={(e) => {setCalorie(e.target.value)}}/>}
            <TextField id="pw10" label="Note" variant="outlined" value={note} onChange={(e) => {setNote(e.target.value)}}/>
            <Button size="large" variant="contained" endIcon={<AddCircleIcon/>}>ADD</Button>
        </Stack>
      </div>
      )


}

const AddRow = (props) => {


    

  return <AddRowCiclismo {...props}/>

    




}

export default AddRow