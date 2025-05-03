import React from 'react';
import useFetch from '../Hooks/useFetch';
import Card from '../component/card';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartslice';

const Products = () => {
  const [loading, error, data] = useFetch('https://dummyjson.com/products/search?q=phone');
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));

    Swal.fire({
      title: "Success!",
      text: "Item added to cart!",
      icon: "success"
    });
  };

  const goToCart = () => {
    navigate('/cart');
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (loading) {
    return <div className='flex justify-center items-center h-[80vh]'>Loading...</div>;
  }

  if (error) {
    return <div className='text-red-500'>Error loading products</div>;
  }

  return (
    <div className='flex flex-col items-center my-10'>
      <div className='text-xl font-bold mb-5'>
        Total Price: <span className='text-green-600'>${totalPrice.toFixed(2)}</span>
      </div>

      <div className='flex flex-wrap justify-center gap-10'>
        {data.products.map(product => (
          <div key={product.id}>
            <Card {...product} image={product.images[0]}/>
            <button
              onClick={() => handleAddToCart(product)}
              className='bg-blue-500 text-white px-4 py-2 rounded mt-2'
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={goToCart}
        className='fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded'
      >
        Go to Cart
      </button>
    </div>
  );
};

export default Products;
