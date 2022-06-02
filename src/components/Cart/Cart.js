import { useContext, useState } from 'react'
import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'
import Checkout from './Checkout'
const Cart = (props) => {
	const cartCtx = useContext(CartContext)
	const [checkout, setCheckout] = useState(false)
	const checkoutHandler=(e)=>{
		setCheckout((prev) => !prev)
	}
	
	const hassItems = cartCtx.items.length > 0
	const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
    
  }
	const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount: 1})
  }
	const cartItems = (
		<ul className={classes['cart-items']}>
			{cartCtx.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					price={item.price}
					amount={item.amount}
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
					onAdd={() => cartItemAddHandler(item)}
				/>
			))}
		</ul>
	)
	return (
		<Modal onCloseCart={props.onCloseCart}>
       

			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{cartCtx.totalAmount.toFixed(2)}</span>
			</div>
			<div className={classes.actions}>
				<button
					className={classes['button--alt']}
					onClick={props.onCloseCart}
				>
					Close
				</button>
				{hassItems && <button onClick={checkoutHandler} className={classes.button}>Order</button>}
			</div>
		{	checkout &&<Checkout/>}
		</Modal>
	)
}
export default Cart
