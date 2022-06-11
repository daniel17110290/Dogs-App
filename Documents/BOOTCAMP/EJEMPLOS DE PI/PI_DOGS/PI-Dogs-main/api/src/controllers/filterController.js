
const {Dog, Temperament}=require ("../db");
const { apiDogs, dogsDb, allDogs }=require ("./util");

const filterDogTemp= async(req, res)=>{

    const {temperamento}=req.query;
    const totalDogs=await allDogs();

    try{      

        if (temperamento==="All".toLowerCase()){
          res.status(200).send(totalDogs);
          
        }else{

            const dogFilterApi=totalDogs.filter(el=>{
                if(el.temperament){
                    return(el.temperament.toLowerCase().includes(temperamento.toLowerCase()))
                }
            })                        
           
            const dogFilterDb=totalDogs.filter(el=>el.temperaments ?.map(el=>el.temperament.toLowerCase()).includes(temperamento.toLowerCase()))
   
            const allFilter=dogFilterApi.concat(dogFilterDb);
   
            allFilter.length ? res.status(200).send(allFilter) : res.status(404).send("not filters");
        }
       
    }catch(e){ 
        console.log(`este es el error ${e}`)
    }

}

const filterDogCreated = async (req, res)=>{

    const {filtered}=req.params;
    const acDogs=await allDogs();

    try{

        if(filtered==="All".toLowerCase()){
            res.status(200).send(acDogs);
        };

        if(filtered==="created".toLocaleLowerCase()){
          const created=acDogs.filter(el=>el.createdInDb)
            return res.status(200).send(created)                          
        };

        if(filtered==="current".toLocaleLowerCase()){
            const notCreated=acDogs.filter(el=>!el.createdInDb)
            return res.status(200).send(notCreated)           
        }

    }catch(e){
        console.log (`el error aqui ${e}`)
    }    
}


module.exports={filterDogTemp, filterDogCreated};