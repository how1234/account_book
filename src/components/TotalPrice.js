import React from 'react'
import Ionicon from  'react-ionicons'
import PropTypes from 'prop-types'

const TotalPrice = ({income,outcome}) => {

    return (
        <div className="row">
            <div className="col">
                <h5>Income: <span>{income}</span></h5>
            </div>

            <div className="col">
                <h5>Outcome: <span>{outcome}</span></h5>
            </div>
        </div>
    )
}

TotalPrice.protoType ={
    income:PropTypes.number.isRequired,
    outcome:PropTypes.number.isRequired
}

export default TotalPrice