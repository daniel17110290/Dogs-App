const initialState = {
  dogs: [],
  allDogs: [],
  temperaments: [],
  detail: [],
  loading: false
};

function rootReduccer(state = initialState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };

    case "GET_NAME_DOG":
      return{
        ...state,
        dogs:action.payload
      };

    case "GET_TEMPERAMENTS":
      return {
        ...state,
        temperaments: action.payload,
      };

    case "GET_DETAIL":
      return{
        ...state,
        detail: action.payload
      }

    case "ORDER_NAME_ALPHA":
      return {
        ...state,
        dogs: action.payload,
      };

    case "ORDER_BY_WEIGHT":
      return{
        ...state,
        dogs: action.payload
      }

    case "FILTER_CREATED":
      return{
        ...state,
        dogs:action.payload
      }

    case "FILTER_TEMPERAMENT":
      return{
        ...state,
        dogs:action.payload
      }

    case "SET_LOADING":
      return{
        ...state,
        loading:action.payload
      }
    
    default:
      return state;
  }
}

export default rootReduccer;
