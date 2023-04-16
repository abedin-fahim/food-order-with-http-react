import { useRef, useState } from 'react';

import classes from './Checkout.module.css'

// Checking validation
const isEmpty = (value) => value.trim() === '';
const isNotFiveChars = (value) => value.trim().length !== 5;

const Checkout = (props) => {
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        code: true,
        city: true
    });

    const nameRef = useRef();
    const streetRef = useRef();
    const codeRef = useRef();
    const cityRef = useRef();


    const confirmHandler = (event) => {
        event.preventDefault()

        const enteredName = nameRef.current.value;
        const enteredStreet = streetRef.current.value;
        const enteredCode = codeRef.current.value;
        const enteredCity = cityRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName)
        const enteredStreetIsValid = !isEmpty(enteredStreet)
        const enteredCodeIsValid = !isNotFiveChars(enteredCode)
        const enteredCityIsValid = !isEmpty(enteredCity)

        setFormInputValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            code: enteredCodeIsValid,
            city: enteredCityIsValid
        })

        
        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCodeIsValid && enteredCityIsValid
        
        if(!formIsValid){
            return;
        }
        // Submit the form
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            code: enteredCode,
            city: enteredCity
        });
    }

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={`${classes.control} ${!formInputValidity.name ? classes.invalid : ''}`}>
                <label htmlFor='name'>Your Name:</label>
                <input type='text' ref={nameRef} id='name' />
                {!formInputValidity.name && <p>Please enter a valid name</p>}
            </div>
            <div className={`${classes.control} ${!formInputValidity.street ? classes.invalid : ''}`}>
                <label htmlFor='street'>Street:</label>
                <input type='text' id='street' ref={streetRef}/>
                {!formInputValidity.street && <p>Please enter a valid name</p>}
            </div>
            <div className={`${classes.control} ${!formInputValidity.code ? classes.invalid : ''}`}>
                <label htmlFor='code'>Post Code:</label>
                <input type='text' id='code' ref={codeRef}/>
                {!formInputValidity.code && <p>Please enter a valid name</p>}
            </div>
            <div className={`${classes.control} ${!formInputValidity.city ? classes.invalid : ''}`}>
                <label htmlFor='city'>City:</label>
                <input type='text' id='city' ref={cityRef}/>
                {!formInputValidity.city && <p>Please enter a valid name</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' className={classes.submit} onClick={props.onCancel}>Cancel</button>
                <button >Confirm</button>
            </div>
        </form>
    )
};

export default Checkout;