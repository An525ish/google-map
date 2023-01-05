import React from 'react'
import './input.css';
const Input = (props) => {
    return (
        <div className='inputs-container'>
            <label htmlFor={props.id}>{props.id}</label>
            <div className='input-content'>
                <span style={{color: `${props.color}`}}>
                {props.icon}
                </span>
                <input type="text" id={props.id} ref={props.innerRef} disabled={props.access}/>
            </div>
        </div>
    )
}

export default Input