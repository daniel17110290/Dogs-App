import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dogDetail } from "../actions";
import styles from "./styles/Detail.module.css"

export default function Detail(props){
    console.log(props)
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(dogDetail(props.match.params.id))
    }, [dispatch, props.match.params.id] );

    const dog=useSelector((state)=>state.detail);
    const loader=useSelector((state)=>state.loading);

    console.log(dog);

    return(
        <div className={styles.todo}>
            {
                loader&&
                <div>
                    <img src="https://media.giphy.com/media/NLejkULLmXdgCfjkT7/giphy.gif" alt="" />
                </div>
            }

            {
                !loader&&
                dog.length > 0 ?

                <div className={styles.cont}>
                    <h1 className={styles.h1}>{dog[0].name}</h1>
                    <img src={dog[0].image} alt="" width="200px" height="200px" className={styles.img} />
                    <h5 className={styles.rating}>Temperamento: {dog[0].temperaments?dog[0].temperaments.map(e=>e.temperament)+",  " : dog[0].temperament+",  "}</h5>
                    <h5 className={styles.rating}>Peso: {dog[0].weight}</h5>
                    <h5 className={styles.rating}>Altura: {dog[0].height}</h5>
                    <h5 className={styles.rating}>Vida: {dog[0].life_span}</h5>


                </div> : <></>
            }

            <Link to="/home">
                <button className={styles.button}>Volver al inicio</button>
            </Link>

        </div>
    )
}