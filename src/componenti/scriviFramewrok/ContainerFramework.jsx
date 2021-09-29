import React from "react"
import { useState } from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import Ciclismo from "./tipiFramework/Ciclismo.jsx"

import styles from './ContainerFramework.module.css'

const ContainerFramework = (props) => {
    const { setPagina } = props
    
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button variant="contained" className={styles.bottoneApriMenu} onClick={() => setPagina("menu_princ")} >Indietro</Button>
            <Button variant="contained" className={styles.bottoneApriMenu} onClick={() => setOpen(!open)} >menu</Button>
            <Router>
                <div>
                    <Drawer anchor={"left"} open={open} onClose={() => setOpen(!open)} >
                        <List className={styles.linkLista}>
                            <ListItem button key={"Home"}>
                                <ListItemIcon>
                                    <Link to="/"><ListItemText primary={"Home"} /></Link>
                                </ListItemIcon>
                            </ListItem>

                            <ListItem button key={"Ciclismo"}>
                                <ListItemIcon>
                                    <Link to="/ciclismo"><ListItemText primary={"Ciclismo"} /></Link>
                                </ListItemIcon>
                            </ListItem>
                            
                            <ListItem button key={"Users"}>
                                <ListItemIcon>
                                    <Link to="/users"><ListItemText primary={"Users"} /></Link>
                                </ListItemIcon>
                            </ListItem>
                        </List>
                    </Drawer>

                    <Switch>
                        <Route path="/">
                            {/* <Home /> */}
                        </Route>
                        <Route path="/ciclismo">
                            <Ciclismo />
                        </Route>
                        <Route path="/users">
                            {/* <Users /> */}
                        </Route>
                    </Switch>
                </div>
            </Router>
        </>
    )
}

export default ContainerFramework
