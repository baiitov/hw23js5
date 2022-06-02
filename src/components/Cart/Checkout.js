import { useState, useEffect } from 'react'
import LoadingSpinner from '../UI/LoadingSpinner'
import { useInput } from '../utils/hooks/UseInput'
import classes from './Checkout.module.css'
const Checkout = (props) => {
	const {
		value: yourName,

		isValid: yourNameIsValid,
		hasError: nameInputHasError,
		valueChangeHandler: yourNameHanlder,
		valueBlurHandler: nameChangeBlur,
	} = useInput((value) => value.trim() !== '')
	const {
		value: street,
		isValid: streetNameIsValid,
		hasError: streetInputHasError,
		valueChangeHandler: streetHandler,
		valueBlurHandler: streetBlur,
	} = useInput((value) => value.trim() !== '')
	const {
		value: postal,
		isValid: postalIsValid,
		hasError: postalhassError,
		valueChangeHandler: postalHandler,
		valueBlurHandler: postalBlutHanlder,
	} = useInput((value) => value.length >= 6)
	const {
		value: city,
		isValid: cityNameIsValid,
		hasError: cityInputHasError,
		valueChangeHandler: cityHandler,
		valueBlurHandler: cityBlur,
	} = useInput((value) => value.trim() !== '')

	const [disbled, setDisbled] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [data, setData] = useState([])

	useEffect(() => {
		if (
			yourNameIsValid &&
			streetNameIsValid &&
			postalIsValid &&
			cityNameIsValid
		) {
			setDisbled(true)
		}
	}, [yourNameIsValid, streetNameIsValid, postalIsValid, cityNameIsValid])

	const confitmHandler = (event) => {
		event.preventDefault()

		const newData = {
			yourName,
			street,
			postal,
			city,
		}

		postData()
		setData(newData)
	}
	async function postData() {
		setIsLoading(true)
		const response = await fetch(
			'https://food-order-68a0d-default-rtdb.firebaseio.com/orders.json',
			{
				method: 'POST',
				headers: { 'Content-type': 'applicaton/json' },
				body: JSON.stringify(data),
			},
		)
		const newData = await response.json()
		setIsLoading(false)
	}

	const classesInput = `${
		nameInputHasError ? classes.invalid : classes.control
	}`
	const streetClasses = `${
		streetInputHasError ? classes.invalid : classes.control
	}`
	const postalclass = `${postalhassError ? classes.invalid : classes.control}`
	const cityclass = `${cityInputHasError ? classes.invalid : classes.control}`
	return (
		<form onSubmit={confitmHandler}>
			{isLoading && <LoadingSpinner />}
			<div className={classesInput}>
				<label htmlFor='name'>Your name</label>
				<input
					onBlur={nameChangeBlur}
					onChange={yourNameHanlder}
					type='text'
					value={yourName}
					id='name'
				/>
				{nameInputHasError && (
					<p className={classes.text}>Name must not be empty</p>
				)}
			</div>
			<div className={streetClasses}>
				<label htmlFor='street'>Street</label>
				<input
					value={street}
					onBlur={streetBlur}
					onChange={streetHandler}
					type='text'
					id='street'
				/>
				{streetInputHasError && (
					<p className={classes.text}>Name must not be empty</p>
				)}
			</div>
			<div className={postalclass}>
				<label htmlFor='postal'>Postal code</label>
				<input
					value={postal}
					onBlur={postalBlutHanlder}
					onChange={postalHandler}
					type='text'
					id='postal'
				/>
				{postalhassError && (
					<p className={classes.text}>password less than 6</p>
				)}
			</div>
			<div className={cityclass}>
				<label htmlFor='city'>City</label>
				<input
					value={city}
					onBlur={cityBlur}
					onChange={cityHandler}
					type='text'
					id='city'
				/>
				{cityInputHasError && (
					<p className={classes.text}>Name must not be empty</p>
				)}
			</div>
			<div className={classes.actions}>
				<button type='button' onClick={props.onCancel}>
					Cancel
				</button>
				<button disabled={!disbled}>Confirm</button>
			</div>
		</form>
	)
}
export default Checkout
