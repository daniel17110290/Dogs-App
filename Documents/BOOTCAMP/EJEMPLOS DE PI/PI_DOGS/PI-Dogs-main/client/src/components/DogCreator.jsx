import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, createDog } from "../actions";
import styles from "./styles/DogCreator.module.css"






export default function DogCreator(){
    const dispatch=useDispatch();
    const allTemp=useSelector((state)=>state.temperaments);
    const history=useHistory();
    const [error, setError]=useState({});
    //console.log(allTemp)

    function validate(input){
        let error={};
        if(!input.name){
            error.name="Se requiere un nombre";
        }else{
            error.name=""
        }
        if(!input.height || !/[1-9]?[0-9]?[0-9] - [1-9]?[0-9]?[0-9]/g.test(input.height) || 
        ! (parseInt (input.height.slice(0,2).trim()) < parseInt (input.height.slice(4).trim()))){
            error.height=[ "se requiere un rango (min - max), ", "min < max,  " , "min y max deben ser numeros" ]
                 
            
        }else{
            error.height=""
        }
        if(!input.weight || !/[1-9]?[0-9]?[0-9] - [1-9]?[0-9]?[0-9]/g.test(input.weight) || 
        ! (parseInt (input.weight.slice(0,2).trim()) < parseInt (input.weight.slice(4).trim()))){
            error.weight=[ "se requiere un rango (min - max), ", "min < max,  " , "min y max deben ser numeros" ]
        }else{
            error.weight=""
        }
        if(!input.life_span || !/[1-9]?[0-9]?[0-9] - [1-9]?[0-9]?[0-9]/g.test(input.life_span) || 
        ! (parseInt (input.life_span.slice(0,2).trim()) < parseInt (input.life_span.slice(4).trim()))){
            error.life_span=[ "se requiere un rango (min - max), ", "min < max,  " , "min y max deben ser numeros" ]
        }else{
            error.life_span=""
        }
        return error;
    }       

    const [input, setInput]=useState({
        name:"",
        height:"",
        weight:"",
        life_span:"",
        temperament:[]
    });    

    function handleChange(e){
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
        setError(validate({
            ...input,
            [e.target.name]:e.target.value
        }))
        
    }

    function handleCheck(e){
        if(e.target.checked){
            setInput({
                ...input,
                temperament:[...input.temperament, e.target.value]
            })
                        
        }else{
            let newA=input.temperament.filter(el=>el!==e.target.value)
            setInput({
                ...input,
                temperament:[newA]
            })
        }
    };

    function handleSubmit(e){
        e.preventDefault();

        
        console.log(input)
                 
        dispatch(createDog(input))
        alert("Amigo creado correctamente")
        setInput({
             name:"",
             height:"",
             weight:"",
             life_span:"",
             temperament:[]
        })

                 
        history.push("/home")
    }

    useEffect(()=>{
        dispatch(getTemperaments())
    }, [dispatch])

    return(
        <div className={styles.cont}>
            <Link to="/home"><button className={styles.boton}>Volver al inicio</button></Link>
            <h1 className={styles.title}>Crea tu propio amigo!!!</h1>

            <form onSubmit={e=>handleSubmit(e)}>
                <div>
                    <label>Nombre:</label>
                    <input className={styles.select1}
                    type="text"
                    value={input.name}
                    name="name"
                    onChange={(e)=>handleChange(e)}
                    />
                    {error.name&&(
                        <p>{error.name}</p>
                    )}
                </div>
                <div>
                    <label>Altura:</label>
                    <input className={styles.select1} 
                    type="text"
                    value={input.height}
                    name="height"
                    onChange={e=>handleChange(e)}
                    />
                    {error.height&&(
                        <p>{error.height}</p>
                    )}
                </div>
                <div>
                    <label>Peso:</label>
                    <input className={styles.select1} 
                    type="text"
                    value={input.weight}
                    name="weight"
                    onChange={e=>handleChange(e)}
                    />
                    {error.weight&&(
                        <p>{error.weight}</p>
                    )}
                </div>
                <div>
                    <label>Años de vida:</label>
                    <input  className={styles.select1}
                    type="text"
                    value={input.life_span}
                    name="life_span"
                    onChange={e=>handleChange(e)}
                    />
                    {error.life_span&&(
                        <p>{error.life_span}</p>
                    )}
                </div>
                <div className={styles.inputcheck}>
                    <label><h2>Temperamentos:</h2></label>

                    {
                        allTemp?.map((t,index)=>(
                            <label key={index}><input className={styles.inputcheck}
                            type="checkbox"
                            name={t.temperament}
                            value={t.temperament}
                            onChange={e=>handleCheck(e)}
                            />{t.temperament  + "->"}</label>
                        ))
                    }                    
                </div>
                <div>
                    <button  type="submit" disabled={
                     error.height!==""||error.weight!==""||error.life_span!==""||input.temperament.length===0||input.name===""} >Crear amigo!!
                    </button>
                </div>
            </form>
        </div>
    )
}