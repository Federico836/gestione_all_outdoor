import React from "react"
import { useState, useEffect } from "react"
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'

import { Draggable } from '@fullcalendar/interaction'
import { Button } from "@mui/material"

import styles from './TabListaFrameworkMD.module.css'


const TabListaFrameworksMD = (props) => {

    const listaFrameworks = useSelector(state => state.mdFrameworks.lista)


}