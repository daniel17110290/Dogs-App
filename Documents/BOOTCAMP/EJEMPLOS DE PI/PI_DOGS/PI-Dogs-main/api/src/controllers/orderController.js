const {allDogs}=require ("./util")

const orderNameAlpha=async(req, res)=>{

    const {order}=req.query;

    const totalDog=await allDogs();

    const apiDogs=await allDogs();

    try{

       if (order==="ALL".toLowerCase()) {
        res.status(200).send(totalDog)
       } 

       const orderAsc= apiDogs.sort(function(a, b){
               if(a.name.toLowerCase() > b.name.toLowerCase()){
                   return 1;
               };

               if(a.name.toLowerCase() < b.name.toLowerCase()){
                   return -1;
               };
               return 0; 
        })

        const orderDesc= totalDog.sort(function(a, b){
            if(a.name.toLowerCase() > b.name.toLowerCase()){
                return -1;
            };

            if(a.name.toLowerCase() < b.name.toLowerCase()){
                return 1;
            };
            return 0; 
     })

        if(order==="asc".toLowerCase()){
            return res.status(200).send(orderAsc) 
        }else {
            if(order==="desc".toLowerCase()){
                return res.status(200).send(orderDesc) 
            } 
        } 

        
       

    }catch(e){
        console.log(`el error es= ${e}`)
    }

}

const orderWeight = async (req, res)=>{

    const {ordWeight}=req.params;
    const arDogs=await allDogs();  
    const brDogs= await allDogs()

    try{
        if(ordWeight==="All".toLowerCase()){
            res.status(200).send(arDogs)
        }

        // const weightAsc= await arDogs.sort(function(a,b){
        //     if((parseInt(a.weight.slice(0, 2).trim()) * parseInt(a.weight.slice(4).trim()))/2 > (parseInt(b.weight.slice(0, 2).trim()) * parseInt(b.weight.slice(4).trim()))/2) {
        //         return 1;
        //     };

        //     if((parseInt(a.weight.slice(0, 2).trim()) * parseInt(a.weight.slice(4).trim()))/2 < (parseInt(b.weight.slice(0, 2).trim()) * parseInt(b.weight.slice(4).trim()))/2){
        //         return -1;
        //     };
        //     return 0;            
        // })

        // const weightDesc= await arDogs.sort(function(a,b){
        //     if((parseInt(a.weight.slice(0, 2).trim()) * parseInt(a.weight.slice(4).trim()))/2 > (parseInt(b.weight.slice(0, 2).trim()) * parseInt(b.weight.slice(4).trim()))/2) {
        //         return -1;
        //     };

        //     if((parseInt(a.weight.slice(0, 2).trim()) * parseInt(a.weight.slice(4).trim()))/2 < (parseInt(b.weight.slice(0, 2).trim()) * parseInt(b.weight.slice(4).trim()))/2){
        //         return 1;
        //     };
        //     return 0;            
        // })

        const weightAsc= await brDogs.sort(function(a, b){
            if(parseInt(a.weight.slice(4).trim()) > parseInt(b.weight.slice(4).trim()))  {
                return 1;
            };

            if(parseInt(a.weight.slice(4).trim())< parseInt(b.weight.slice(4).trim())){
                return -1;
            };
            return 0;            
        })

        const weightDesc= await arDogs.sort(function(a, b){
            if(parseInt(a.weight.slice(4).trim())> parseInt(b.weight.slice(4).trim())) {
                return -1;
            };

            if(parseInt(a.weight.slice(4).trim())< parseInt(b.weight.slice(4).trim())){
                return 1;
            };
            return 0;            
        })

        if(ordWeight==="asc".toLowerCase()){
            res.status(200).send(weightAsc)
        }

        if(ordWeight==="desc".toLowerCase()){
            res.status(200).send(weightDesc)
        }

    }catch(e){
        console.log(`he aqui el error ${e}`)
    }

}

module.exports={orderNameAlpha, orderWeight};