import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsName } from "../actions";
import styles from "./styles/SearchBar.module.css"

export default function SearchBar(){
    const dispatch=useDispatch();

    const [name, setName]=useState("");


    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getDogsName(name));
        setName("")
    }

    return(
        <div className={styles.buscar}>
            <input
            type="text"
            placeholder="buscar..."
            value={name}
            onChange={e=>handleInputChange(e)}                    
            />

        <button  onClick={e=>handleSubmit(e)} className={styles.btn}><span role="img" aria-label="">🔎</span></button>
        </div>
    )
}