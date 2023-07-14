import React, { useReducer } from "react"


export const cartContext = React.createContext();

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const reducer = (state, action) => {

    let updatedTotalAmount;
    let updatedItems;
    let updatedItem;
    let existingCartItemIndex;
    let existingCartItem;

    //
   switch(action.type){
        
        case "ADD":
            updatedTotalAmount = state.totalAmount + action.value.price * action.value.amount;

            existingCartItemIndex = state.items.findIndex(item => item.id === action.value.id);

            existingCartItem = state.items[existingCartItemIndex];

            if(existingCartItem){
                updatedItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount + action.value.amount
                }

                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem
            }else{
                updatedItems = state.items.concat(action.value);
            }
            
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            };

        case 'REMOVE':
            existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);

            existingCartItem = state.items[existingCartItemIndex];

            updatedTotalAmount = state.totalAmount - existingCartItem.price;

            if(existingCartItem.amount === 1){
                updatedItems = state.items.filter((item) => item.id !== action.id);
            }else{
                updatedItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount - 1
                }

                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
            }

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            };
            
        case 'DELETE':
            existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);

            existingCartItem = state.items[existingCartItemIndex];

            updatedTotalAmount = state.totalAmount - existingCartItem.price * existingCartItem.amount;

            updatedItems = state.items.filter((item) => item.id !== action.id);

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            };
   }

}



const CartProvider = (props) => {

    const [cartState, dispatch] = useReducer(reducer, defaultCartState);

    const addItemToCartHandler = (item)=>{
        dispatch({type: 'ADD', value: item})
    }

    const removeItemFromCartHandler = (id) => {
        dispatch({type: 'REMOVE', id: id})
    }

    const deleteItemFromCartHandler = (id) => {
        dispatch({type: 'DELETE', id: id})
    }
    
    const cartContextValue = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler, 
        deleteItem: deleteItemFromCartHandler
    }

    console.log(cartState);

    return <cartContext.Provider value={cartContextValue}>
        {props.children}
    </cartContext.Provider>
}

export default CartProvider