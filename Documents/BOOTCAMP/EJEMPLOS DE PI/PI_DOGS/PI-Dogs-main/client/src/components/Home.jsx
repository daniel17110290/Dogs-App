import React from "react";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getDogs, getTemperaments, orderByName, orderWeight, filterCreated, filterTemperament } from "../actions";
import {Link} from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import styles from "./styles/Home.module.css"



export default function Home(){
    
    const dispatch=useDispatch();

    const allDogs=useSelector((state)=>state.dogs);
    console.log(allDogs)
    const copyDogs=useSelector((state)=>state.allDogs);
    const allTemp=useSelector((state)=>state.temperaments);
    console.log(allTemp)
    const [currentPage, setCurrentPage]=useState(1);
    const [dogsPerPage]=useState(8);
    const indexOfLastDogs=currentPage * dogsPerPage;
    const indexOfFirstDogs=indexOfLastDogs - dogsPerPage;
    const currentDogs=allDogs.slice(indexOfFirstDogs, indexOfLastDogs);
    console.log(currentDogs)

    const paginado=(pageNumber)=>{
        setCurrentPage(pageNumber)
    };


    const orderFilter=[
        {
            "options"  : "Ordenar por peso" ,
            "values" : ["all", "asc", "desc"]
        },
        {
            "options" : "Orden alfabetico",
            "values" : ["all", "asc", "desc"]
        },
        {
            "options" : "Filtrar perros",
            "values" : ["all", "created", "current"]
        },
        {
            "options" : "Filtro por temperamento",
            "values" : allTemp.map((temp)=>temp.temperament)
        }
    ]
    //console.log(orderFilter[3].values)

    const [idOptions, setIdOptions]= useState(-1);
     //console.log("NUMERO"+idOptions)

    
    useEffect(()=>{
        dispatch(getDogs())
    }, [dispatch]);

    useEffect(()=>{
        dispatch(getTemperaments())
    }, [dispatch]);

    const handlerOrderFilter=function(e){
        const option=e.target.value;
       // console.log(option);
        setIdOptions(option);
        
    };  
    
    function handleFilterType (e){
        e.preventDefault();

        if(idOptions==1){
            dispatch(orderByName(e.target.value))
        }
        if(idOptions==0){
            dispatch(orderWeight(e.target.value))
        }
        if(idOptions==2){
            dispatch(filterCreated(e.target.value))
        }
        if(idOptions==3){
            dispatch(filterTemperament(e.target.value))
        }                       
    }


    function handleClick(e){
        e.preventDefault();
        dispatch(getDogs());
        //setIdOptions(-1)        
    };
    

    return(
        <div className={styles.contenedor}>

            <h1 className={styles.titulo}>Encuentra tu peludo aqui!!!</h1>

            {allDogs.length>0&&
            <Link to="/dog"><button className={styles.boton2}>Agrega a tu amigo peludo</button></Link>

           }
            <button onClick={e=>{handleClick(e)}} className={styles.boton}>Todas las razas...</button>

        

         {allDogs.length > 0  && 

            <div>
                <span className={styles.tituloSelect}>Filtros: </span>
                <select onClick={handlerOrderFilter} className={styles.select1}>
                    <option value={-1} >Selecciona un filtro</option>
                    {
                        orderFilter.map((elem, index)=>(
                            <option key={index} value={index}>{elem.options}</option>
                        ))
                    }
                </select>
            </div>

         }

         {allDogs.length>0&&

            <div>
                <span className={styles.tituloSelect}>Tipo de filtro:</span>
                <select onChange={e=>handleFilterType(e)} className={styles.select2}>
                    {
                        idOptions>-1 &&
                        (
                            orderFilter[idOptions].values.map((el, index)=>(
                                <option key={index} value={el}>{el}</option>
                            ))
                        )
                    }

                </select>
            </div>

         }

        <SearchBar/>
        
           

            <Paginado
            dogsPerPage={dogsPerPage}
            allDogs={allDogs.length}
            paginado={paginado}
            currentDogs={currentDogs}
            />

            

            {
                !allDogs.length && !copyDogs.length &&
                <div>
                    <h2>
                    <img src="https://media.giphy.com/media/NLejkULLmXdgCfjkT7/giphy.gif" alt="" />
                    </h2>
                </div>
            }

            {
                !allDogs.length && copyDogs.length > 0 && 
                   <div >
                     <h2 >No hay perros con este nombre!!! </h2>
                     
                   </div>
            }

            

            <span className={styles.todo}>
                {
                    currentDogs?currentDogs.map((el)=>(
                        <div key={el.id} >
                            <Link to={"/dogs/" + el.id} >
                                <Card
                                name={el.name}
                                image={el.image}                                
                                temperament={el.temperaments ? el.temperaments.map(e=>e.temperament + ",  ") :
                                    el.temperament + ", "
                                }
                                weight={el.weight}

                                />
                            </Link>

                        </div>
                    )): <p>perro no encontrado</p>
                }
            </span>

        </div>
    )
}
