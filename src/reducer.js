export const initialState = {
      user:null
};


export const actionType = {
      type:"SET_USER"
}

const reducer =(state,action)=>{
      switch(action.type){
            case actionType.type:
                  return {
                        ...state,
                        user:action.user
                  }
            default:
                  return state;
      }
}

export default reducer