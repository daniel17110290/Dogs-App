const {Temperament}= require ("../db")

const getTemperament=async (req,res)=>{
    try{

        const temperamentFound=await Temperament.findAll();

        temperamentFound.length ? res.status(200).send(temperamentFound) : 
        res.status(404).send("temperaments not found")

    }catch (e){
        console.log(e)
    }
}

module.exports={getTemperament};