import { createContext, useContext, useReducer } from "react";

// Prepare the dataLayer
export const StateContext = createContext();

// Wrap our app and provide the Data layer
// 創造一個新component名為StateProvider，它將StateContext.Provider包起來
// children 則是原本就會傳入functional component的物件之屬性(只是平常很少接收而已)，children屬性的值為該component的JSX中所包含的所有元素
export const StateProvider = ({reducer, initState, children}) => (
    <StateContext.Provider value={useReducer(reducer, initState)}>
        {children}
    </StateContext.Provider>
);

// Pull info from the data layer
// useContext(..) 會回傳 <StateContext>內設定的value
export const useStateValue = () => useContext(StateContext);