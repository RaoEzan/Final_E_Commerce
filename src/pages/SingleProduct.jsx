import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, increaseQuantity, decreaseQuantity } from "../redux/cartslice"; 

import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
// import { removeFromCart } from './redux/cartslice';


const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const cartItem = useSelector(state =>
    state.cart.cartItems.find(item => item.id === parseInt(id))
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError('Something went wrong while fetching product data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    Swal.fire({
      title: "Success!",
      text: "Product added to cart!",
      icon: "success"
    });
  };

  const handleIncrease = () => {
    dispatch(increaseQuantity(product.id));
  };

  const handleDecrease = () => {
    dispatch(decreaseQuantity(product.id));
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;
  if (!product) return <div className="text-center py-10">No product found.</div>;

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-md rounded-xl">
      <div className="flex flex-col md:flex-row gap-10">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full md:w-1/2 object-contain h-[300px]"
        />

        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-purple-600">{product.title}</h2>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-xl text-blue-600 font-semibold">
              ${product.price?.toFixed(2)}
            </p>

            {cartItem ? (
              <div className="mt-6">
                <div className="flex items-center gap-4 mb-2">
                  <button
                    onClick={handleDecrease}
                    className="px-3 py-1 bg-black  rounded hover:bg-gray-400"
                  >
                    -
                  </button>
                  <span className="text-lg text-black">{cartItem.quantity}</span>
                  <button 
                    onClick={handleIncrease}
                    className="px-3 py-1 text-white bg-black  rounded hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>
                <p className="text-green-600 font-semibold">
                  Total: ${(cartItem.quantity * product.price).toFixed(2)}
                </p>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add to Cart
              </button>
            )}
            <button
                onClick={() => navigate('/cart')}
                className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg hover:bg-green-700">
                Go to Cart
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
