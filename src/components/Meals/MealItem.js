import React, { useContext } from 'react'
import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm';
import { cartContext } from '../../store/cart-context';

const MealItem = (props) => {
    const cartCtx = useContext(cartContext)
    const price = `$${props.price.toFixed(2)}`;

    const addToCartHandler = (ItemAmount) => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: ItemAmount,
            price: props.price
        });
    }
  return (
    <li className={classes.meal}>
        <div>
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{price}</div>
        </div>
        <div>
            <MealItemForm onAddToCart={addToCartHandler} id={props.id} />
        </div>
    </li>
  )
}

export default MealItem