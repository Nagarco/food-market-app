import React from 'react'
import MealsImage from '../../assets/meals.jpg'
import classes from './Header.module.css'
import HeaderCartButton from '../Cart/HeaderCartButton'
const Header = (props) => {
  return (
    <>
        <header className={classes.header}>
            <h1>React Market</h1>
            <HeaderCartButton onClick={props.onShowCart} />
        </header>
        <div className={classes['main-image']}>
            <img src={MealsImage} />
        </div>
    </>
  )
}

export default Header