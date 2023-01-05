import React from 'react'
import './MeasurementCard.css'

const MeasurementCard = (props) => {
    return (
        <div className='Mcard'>
            <div className='Mcard-header'>
                <h3>{props.unitType}</h3>
                <span> {props.unitValue}</span>
            </div>
            <div className='Mcard-body'>
                <p>
                    The {props.unitType} between <span>{props.origin}</span> and <span>{props.destination}</span> via the seleted route is <span>{props.unitValue}</span>.
                </p>
            </div>
        </div>
    )
}

export default MeasurementCard