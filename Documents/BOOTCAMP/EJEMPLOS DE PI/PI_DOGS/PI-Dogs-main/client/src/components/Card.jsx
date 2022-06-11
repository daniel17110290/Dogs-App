import React from "react";
import styles from "./styles/Card.module.css"

export default function Card ({image, name, temperament, weight}){
    return(
        <div className={styles.contenedor}>
            <h2 className={styles.titulo}>Raza: {name}</h2>
            <img src={image} alt="" width="280px" height="280px"  className={styles.img}/>            
            <h5 className={styles.temperaments}>Temperamentos: {temperament}</h5>
            <h5 className={styles.temperaments}>Peso: {weight}</h5>
        </div>
    )
}