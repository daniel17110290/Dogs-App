import React from 'react';
import { Link } from "react-router-dom";
//import styles from "./RutaCualquiera.module.css"

export default function RutaCualquiera(){
    return (
        <div >
            <Link to="/home" ><button >To Home...</button></Link>
            <div >
                        <h2 >No existen perros con este nombre \ (o_o) / </h2>
                        <img src="https://media.giphy.com/media/Pn1gZzAY38kbm/giphy.gif" alt=""  />
                    </div>
        </div>
    )
}