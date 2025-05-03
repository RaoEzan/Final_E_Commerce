import React from 'react'
import { useNavigate } from 'react-router-dom'

const Card = ({price,title , description , image , id}) => {
    const navigate = useNavigate();
    return (
        <div className="card w-96 bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <figure className="h-60 bg-black flex items-center justify-center">
          <img
            src={image}
            alt={title}
            className="object-contain h-full p-4"
          />
        </figure>
        
        <div
          className="card-body px-6 py-4 space-y-2 cursor-pointer"
          onClick={() => navigate(`/product/${id}`)}
        >
          <h2 className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200 line-clamp-1">
            {title}
          </h2>
      
          <p className="text-sm text-gray-600 line-clamp-2">
            {description}
          </p>
      
          <div className="flex items-center justify-between mt-4">
            <span className="text-lg font-semibold text-blue-600">${price}</span>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
              onClick={(e) => {
                e.stopPropagation(); // prevent bubbling
                navigate(`/product/${id}`);
              }}
            >
              See more
            </button>
          </div>
        </div>
      </div>
      
    )
}

export default Card