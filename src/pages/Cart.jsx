import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../redux/cartslice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20 text-gray-600 text-xl">
        Your cart is empty. <br />
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Cart</h2>

      {cartItems.map(item => (
        <div
          key={item.id}
          className="flex items-center justify-between mb-4 p-4 border rounded shadow-sm"
        >
          <div className="flex items-center gap-4">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-24 h-24 object-contain"
            />
            <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => dispatch(decreaseQuantity(item.id))}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              -
            </button>
            <span className="text-lg">{item.quantity}</span>
            <button
              onClick={() => dispatch(increaseQuantity(item.id))}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              +
            </button>
          </div>

          <div className="text-right">
            <p className="text-green-600 font-semibold">
              Total: ${(item.quantity * item.price).toFixed(2)}
            </p>
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="mt-2 text-red-500 text-sm hover:underline"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="text-right mt-8">
        <h3 className="text-xl font-bold text-blue-600">
          Grand Total: ${totalPrice.toFixed(2)}
        </h3>
      </div>
    </div>
  );
};

export default Cart;
