import React, { useContext } from 'react'
import classes from './Cart.module.css'
import Modal from '../UI/Modal';
import { cartContext } from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = (props) => {

    const cartCtx = useContext(cartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const hasItems = cartCtx.items.length > 0;

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item, amount: 1})
    }

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);

    }

    const cartItemDelete = (id) => {
        cartCtx.deleteItem(id);

    }

    const cartItems = <ul className={classes['cart-items']}>
            {cartCtx.items.map(e => (
            <CartItem
                key={e.id}
                name={e.name}
                amount={e.amount}
                price={e.price}
                onRemove={cartItemRemoveHandler.bind(null, e.id)}
                onAdd={cartItemAddHandler.bind(null, e)}
                onDelete={cartItemDelete.bind(null, e.id)} />
            ))}
        </ul>;


  return (
    <Modal onClose={props.onClose}>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {hasItems && <button className={classes.button}>Order</button>}
        </div>
    </Modal>
  )
}

export default Cart