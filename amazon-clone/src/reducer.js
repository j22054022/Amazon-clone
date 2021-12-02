export const initState = {
    basket: [],
    user: null
};

const reducer = (state, action) => {

    switch(action.type){
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item]
            };
        
        case 'REMOVE_FROM_BASKET':
            return {
                ...state,
                basket: state.basket.filter(item => item.id !== action.id)
            };

        case 'EMPTY_BASKET': 
            return{
                ...state, 
                basket: []
            };
        
        case 'SET_USER': 
            return{
                ...state,
                user: action.user
            }

        case 'CLEAR_USER': 
            return{
                ...state,
                user: null
            }
        default: 
            return state;
    }
};

export const getBasketTotal = (basket) => {
    const arrReducer = (accu, curr) => accu + curr.price
    return basket.reduce(arrReducer, 0)
}

export default reducer