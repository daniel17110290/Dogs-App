const axios=require ("axios");
const e = require("express");

const {Dog, Temperament}=require ("../db");

const createTemperaments =async()=>{
    const allData=await axios.get("https://api.thedogapi.com/v1/breeds");
    //console.log (allData)

    const arrayTemp=[]

    const data=allData.data;
    
    data.forEach(el=> {
      if (el.hasOwnProperty("temperament")){
        arrayTemp.push(el.temperament)
      }

    });    
    
    const dataArr=arrayTemp.toString();

    const dataArr2=dataArr.trim()   
    
    const newString=dataArr2.split(",");
    const stringTotal=newString.map(e=>e.trim().toLowerCase())
       
    const temperaments=[...new Set(stringTotal)];   
    
    console.log(temperaments.length)

    temperaments.map(e=>{
      Temperament.findOrCreate({
        where:{
          temperament: e
        }
      })
    })
                   
    console.log("database created")
    
};

const apiDogs = async ()=>{
  try{

    const dogsApi= await axios.get ("https://api.thedogapi.com/v1/breeds")
    const dogsApi2=dogsApi.data

    const allDogs=dogsApi2.map(el=>{
      return {
        id: el.id,
        name: el.name,
        height: el.height.metric + " cm",
        weight: el.weight.metric + " kg",
        life_span: el.life_span,
        temperament:el.temperament,
        image: el.image.url

      }
    })
    return (allDogs)

  }catch(e){
    console.log(e)
  }

}


const dogsDb=async()=>{
    const temperamentByDb=await Dog.findAll({
        include:{
            model: Temperament,
            attributes:["temperament"],
            through:{attributes:[]},
        }
    });
    return temperamentByDb
};

const allDogs=async()=>{
  let infoFromApi=await apiDogs();
  let infoFromDb=await dogsDb();
  let infoTotal=infoFromApi.concat(infoFromDb);
  return (infoTotal);
}

module.exports={createTemperaments, apiDogs, dogsDb, allDogs};