const {Dog, Temperament}=require ("../db");
const { apiDogs, dogsDb, allDogs }=require ("./util");

const getAllDogs = async (req, res)=>{
    const {name}=req.query;

    try{

        const dogTotal= await allDogs();

        if(!name){
            return res.status(200).send(dogTotal)
        }
        else{
            const searchName=await dogTotal.filter(dog=>dog.name.toLowerCase().includes(name.toLowerCase()));

            searchName.length ? res.status(200).send(searchName) : 
            res.status(404).send("dog not found")
        }

    }catch (e){
        console.log(e)
    }
}

const getDogId=async(req, res)=>{
    const {id}=req.params;

    const dogsTotal=await allDogs();

    try{

        if(id){
            let searchDogId= await dogsTotal.filter(el=>el.id==id)

            searchDogId.length ? res.status(200).send(searchDogId) :
            res.status(404).send("id not found");
        }

        return

    }catch(e){
        console.log(e)
    }
}

const postDogs = async (req, res)=>{
    try{

        const {id, name, height, weight, life_span, temperament}=req.body;

        let dogFound= await Dog.findOne({
            where:{name}
        });

        const validation= (range)=>{
            const m1=range.split("-");
            const m2=m1.map(e=>e.trim());
            const m3=m2.map(e=>parseInt(e));

            if((m3[0]<m3[1])){ 
                
                return range;
            }else{
                
                return  (`${m3[0]}  -  ${m3[1]}`)                                               
            }              
        }

        if(!dogFound){
            dogFound=await Dog.create({
                id,
                name,
                height: validation(height) + " " + "cm",
                weight: validation(weight) + " " + "kg",
                life_span: validation(life_span) + " " + "years",
                image: "https://media.giphy.com/media/ipYxohtCI8h6Os5ffs/giphy.gif"
            })
        }

        const temperamentDb=await Temperament.findAll({
            where:{temperament}
        })

        dogFound.addTemperament(temperamentDb);

        return res.status(200).send("Dog Create Successfully")



    }catch (e){
        console.log(e)
        return res.status(400).json({
            msg1: "Creation failed -> date must be (min - max) (no spaces)",
            msg2: "the first data must be less than the second data",
            msg3: "the first data and the second must be numbers"
        })
    }
}

module.exports = {getAllDogs, getDogId, postDogs};