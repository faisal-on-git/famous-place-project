import { createContext,useReducer,useEffect} from "react";
import Favourite from "../Favourite";

export const AuthContext = createContext();


export const authReducer = (user,action) => {
    switch(action.type){
        case "LOGIN":
            localStorage.setItem("user",JSON.stringify(action.payload));
            return {
                // ...state,
                user:action.payload
            };
        case "LOGOUT":
            localStorage.removeItem("user");
            return {
                // ...state,
                user:null
            };
        default:
            return user;
        }

    }

export const AuthContextProvider = ({children}) => {
    //here {children} is used to wrap the whole app with the context provider and its the props 

    const [user,dispatch] = useReducer(authReducer,{
        user:JSON.parse(localStorage.getItem("user")) || null
     
    });
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if(user){
            dispatch({type: 'LOGIN', payload: user})
        }
    }, [])
   
    return (
        <AuthContext.Provider value={{user,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
