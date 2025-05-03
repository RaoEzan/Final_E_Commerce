import React, { useState } from 'react'

const Input = ({placeholder , func}) => {
    const [val , setVal] = useState('');

    function getInputValWithOnchange (e){
        setVal(e.target.value)
        func(e.target.value)
    }
  return (
    <>
    <input onChange={getInputValWithOnchange} type="text" placeholder={placeholder} />
    </>
  )
}

export default Input