import React,{useContext,createContext,useReducer} from 'react'

export const StateContex = createContext()

export const StateProvider = ({reducer,initialState,children})=>{return(
      <StateContex.Provider value={useReducer(reducer,initialState)}>
            {children}
      </StateContex.Provider>)
}

export const useStateValue =()=>useContext(StateContex)