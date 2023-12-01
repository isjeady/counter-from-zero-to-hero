'use client'
import React, { useState } from 'react'

const Counter = () => {
    
    const [counter,setCounter] = useState(0);

    const handleClick = () => {
        setCounter(counter + 1);
    }

    return (
        <div>
        <button type="button" onClick={handleClick}>Counter</button>
        
        <div>Clicks: <h1 id="clicks">{counter}</h1></div>
        </div>
    )
}

export default Counter