import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
  const dispatch = useDispatch();

  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate total cost of all items in the cart
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      return total + item.quantity * parseFloat(item.cost.replace("$", ""));
    }, 0).toFixed(2);
  };

  // Calculate subtotal for each item
  const calculateSubtotal = (item) => {
    return (item.quantity * parseFloat(item.cost.replace("$", ""))).toFixed(2);
  };

  // Handle incrementing item quantity
  const handleIncrement = (name) => {
    const item = cartItems.find((item) => item.name === name);
    if (item) {
      dispatch(updateQuantity({ name, quantity: item.quantity + 1 }));
    }
  };

  // Handle decrementing item quantity
  const handleDecrement = (name) => {
    const item = cartItems.find((item) => item.name === name);
    if (item) {
      if (item.quantity > 1) {
        dispatch(updateQuantity({ name, quantity: item.quantity - 1 }));
      } else {
        // If quantity becomes 0, remove the item
        dispatch(removeItem(name));
      }
    }
  };

  // Handle removing an item from the cart
  const handleRemove = (name) => {
    dispatch(removeItem(name));
  };

  // Handle continue shopping
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(); // Call the function passed from the parent component
  };

  // Placeholder for checkout functionality
  const handleCheckoutShopping = (e) => {
    alert("Functionality to be added for future reference");
  };

  // Total quantity counter for cart icon (optional, displayed in navbar)
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.name} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Unit Price: {item.cost}</p>
                  <p>Subtotal: ${calculateSubtotal(item)}</p>
                  <div className="cart-quantity-controls">
                    <button onClick={() => handleDecrement(item.name)}>-</button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      readOnly
                    />
                    <button onClick={() => handleIncrement(item.name)}>+</button>
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => handleRemove(item.name)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <h3>Total Quantity: {totalQuantity}</h3>
            <h3>Total Amount: ${calculateTotalAmount()}</h3>
            <div className="cart-actions">
              <button
                className="continue-shopping-btn"
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </button>
              <button className="checkout-btn" onClick={handleCheckoutShopping}>
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;