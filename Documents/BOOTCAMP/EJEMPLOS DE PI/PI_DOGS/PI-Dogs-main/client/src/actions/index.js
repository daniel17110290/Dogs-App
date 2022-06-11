import axios from "axios";

export function getDogs() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/dogs");
    return dispatch({
      type: "GET_DOGS",
      payload: json.data,
    });
  };
}



export function getTemperaments() {
  return async function (dispatch) {
    var temperament = await axios.get("http://localhost:3001/temperament");
    return dispatch({
      type: "GET_TEMPERAMENTS",
      payload: temperament.data,
    });
  };
}

export function getDogsName(name){
  return async function (dispatch){

    try{
      var dogName= await axios.get ("http://localhost:3001/dogs?name=" + name);
    return dispatch({
      type:"GET_NAME_DOG",
      payload: dogName.data
    });

    }catch(e){
      return dispatch({
        type: "GET_NAME_DOG",
        payload:[]
      })

    }
    
  };
};

export function dogDetail(id){
  return async function (dispatch){

    try{

      dispatch({
        type:"SET_LOADING",
        payload:true
      })
     var dogDetail= await axios.get("http://localhost:3001/dogs/" + id);

     dispatch({
       type:"SET_LOADING",
       payload:false
     })

     return dispatch({
      type:"GET_DETAIL",
      payload: dogDetail.data
     })

    }catch(e){
      console.log(e)
    }
    
  }
}

export function orderByName(order) {
  return async function (dispatch) {
    try{
      var orderName = await axios.get("http://localhost:3001/dogorder?order=" + order);
     return dispatch({
      type: "ORDER_NAME_ALPHA",
      payload: orderName.data,
      
    });
    
    }catch(e){
      console.log(`este es el error ${e}`)
    }
    
  };
}

export function orderWeight(payload){
  return async function (dispatch){
    var orderWeight =await axios.get ("http://localhost:3001/dogorder/" + payload);
    return dispatch({
      type: "ORDER_BY_WEIGHT",
      payload: orderWeight.data
    })
  }
}

export function filterCreated(filtered){
  return async function (dispatch){
    var filterData= await axios.get("http://localhost:3001/dogstemp/" + filtered);
    return dispatch({
      type: "FILTER_CREATED",
      payload:filterData.data
    })
  }
}

export function filterTemperament(temperamento){
  return async function (dispatch){
    var temperamentData=await axios.get ("http://localhost:3001/dogstemp?temperamento=" + temperamento);
    return dispatch({
      type: "FILTER_TEMPERAMENT",
      payload:temperamentData.data
    })
  }
}

export function createDog(payload){
  return async function (dispatch){
    try{
      const createDog=await axios.post("http://localhost:3001/dogs", payload);
      return createDog

    }catch(e){
      console.log(e)
    }
  }
}
