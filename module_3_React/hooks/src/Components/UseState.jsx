import React, { useState, useEffect } from 'react';

const UseState = () => {
    const [count,setCount]=useState(1);
    
    const increment =()=>{
        setCount(count+1);
    }

    const decrement =()=>{
        setCount(count-1);
    }

    return ( <div className="xd">
        <p>{count}</p>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
    </div>);
}
 
export default UseState;