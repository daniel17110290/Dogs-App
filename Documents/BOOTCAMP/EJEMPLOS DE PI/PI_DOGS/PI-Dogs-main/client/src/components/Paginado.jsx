import React from "react";
import styles from "./styles/Paginado.module.css"

export default function Paginado({dogsPerPage, allDogs, paginado, currentDogs}){
    const pageNumbers=[];

    for(let i=1; i<Math.ceil(allDogs/dogsPerPage); i++){
        pageNumbers.push(i);
    };

    

    return (
        <nav className={styles.todo}>
            <ul className={styles.li}>
                {pageNumbers&&pageNumbers.map(number=>(
                    <span key={number} onClick={()=>paginado(number)} className={styles.a}>
                        {number+" "}
                    </span>
                ))}
            </ul>
        </nav>
    )
}