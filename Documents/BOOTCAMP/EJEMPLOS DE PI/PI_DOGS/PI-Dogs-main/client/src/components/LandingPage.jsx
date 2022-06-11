import React from "react";
import {Link} from "react-router-dom";
import styles from "./styles/LandingPage.module.css"
//import img from "../pics/fondo_landingPage.jpg"

export default function LandingPage (){
    return (
        <body className={styles.contenedor}>  
       
            <h1 className={styles.titulo}>Pasion a 4 patas</h1>
            <p className={styles.subtitulo}>¡ Mi corazon esta lleno de huellas !</p>
            <Link to="/home">
                <button className={styles.boton}>INGRESAR</button>
            </Link>

        </body>
    )
}