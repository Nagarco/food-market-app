import React, { useRef, useState } from 'react'
import classes from './MealItemForm.module.css'
import Input from '../UI/Input'
const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const inputRef = useRef();

  const submitHandler = (e) => {
      e.preventDefault();
      const enteredAmount = inputRef.current.value;
      const enteredAmountNumber = +enteredAmount;

      if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 10){
        setAmountIsValid(false);
        return;
      }

      props.onAddToCart(enteredAmountNumber);

      inputRef.current.value = 1;
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
        <Input 
          ref={inputRef}
          label='Amount' 
          input={{
            id: 'amount_' + props.id,
            type: 'number',
            min: '1',
            max: '10',
            step: '1',
            defaultValue: '1'
        }} />
        <button type='submit'>+ Add</button>
        {!amountIsValid && <p>Please enter a valid amount that is less than 10</p>}
    </form>
  )
}

export default MealItemForm