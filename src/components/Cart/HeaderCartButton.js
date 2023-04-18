import React, { useContext, useEffect, useState } from 'react'
import CartIcon from './CartIcon'
import classes from './HeaderCartButton.module.css'
import { cartContext } from '../../store/cart-context'

const HeaderCartButton = (props) => {
    const [btnHighLighted, setBtnHighLighted] = useState(false);
    const crtCtx = useContext(cartContext);
    const numberOfCartItems = crtCtx.items.reduce((curr, acc)=>{
        return curr + acc.amount
    }, 0);

    const btnClasses = `${classes.button} ${btnHighLighted ? classes.bump : ''}`

    useEffect(()=>{
        if(crtCtx.items.length === 0){
            return;
        }

        setBtnHighLighted(true);

      const timer =  setTimeout(() => {
            setBtnHighLighted(false);
        }, 300);

        return ()=>{
            clearTimeout(timer)
        }
    }, [crtCtx.items])
  return (
    <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}><CartIcon /></span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton