import React from "react"
import Button from '@mui/material/Button'
import { v4 as uuidv4 } from 'uuid'

const BottoneAddRiga = props => {
    const { puntoCliccato, puntiSelected, setPuntiSelected, modificaRiga, setModificaRiga } = props

    const aggiungiRiga = () => {
        if(puntoCliccato.punto) {
            if(modificaRiga) {
                setPuntiSelected(puntiSelected.map(riga => {
                    if(riga.idRiga===modificaRiga.idRiga) {
                        return {...puntoCliccato, idRiga: uuidv4()}
                    }
                    return riga
                }))
                setModificaRiga(null)
            } else {
                setPuntiSelected([...puntiSelected, {...puntoCliccato, idRiga: uuidv4()}])
            }
        } else {
            alert("Prima di aggiungere una riga devi selezionare un punto del grafico")
        }
    }

    return (
        <Button variant="contained" onClick={aggiungiRiga} style={{borderRadius: "50%"}}>{modificaRiga ? "✎" : "➕"}</Button>
    )
}

export default BottoneAddRiga